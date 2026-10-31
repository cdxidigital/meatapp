import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Mic, MicOff, Video, VideoOff, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ReportForm } from "@/components/grid/report-form";
import { Button, Frame, Portrait, Sheet } from "@/components/grid/ui";
import { getPerson } from "@/lib/grid/model";
import { useGrid } from "@/lib/grid/store";

export const Route = createFileRoute("/call/$id")({
  component: CallPage,
});

function CallPage() {
  const { id } = Route.useParams();
  return (
    <Frame immersive>
      <CallView id={id} />
    </Frame>
  );
}

function CallView({ id }: { id: string }) {
  const person = getPerson(id);
  const block = useGrid((s) => s.block);
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<"idle" | "live" | "denied">("idle");
  const [level, setLevel] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [reportOpen, setReportOpen] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };
  }, []);

  if (!person) {
    return (
      <div className="grid min-h-dvh place-items-center">
        <Link to="/" className="font-semibold text-ember">
          Back
        </Link>
      </div>
    );
  }

  async function start() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      const audio = stream.getAudioTracks()[0];
      const context = new AudioContext();
      await context.resume();
      const source = context.createMediaStreamSource(stream);
      const analyser = context.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      const data = new Uint8Array(analyser.fftSize);
      let frame = 0;
      const tick = () => {
        analyser.getByteTimeDomainData(data);
        let sum = 0;
        for (const value of data) {
          const sample = (value - 128) / 128;
          sum += sample * sample;
        }
        setLevel(Math.min(1, Math.sqrt(sum / data.length) * 4));
        if (streamRef.current) frame = window.requestAnimationFrame(tick);
        else void context.close();
      };
      frame = window.requestAnimationFrame(tick);
      stream.getAudioTracks()[0]?.addEventListener("ended", () => window.cancelAnimationFrame(frame));
      setMicOn(audio?.enabled ?? true);
      setPhase("live");
    } catch {
      setPhase("denied");
    }
  }

  function toggleMic() {
    const track = streamRef.current?.getAudioTracks()[0];
    if (!track) return;
    track.enabled = !track.enabled;
    setMicOn(track.enabled);
  }

  function toggleCam() {
    const track = streamRef.current?.getVideoTracks()[0];
    if (!track) return;
    track.enabled = !track.enabled;
    setCamOn(track.enabled);
  }

  function beep() {
    const context = new AudioContext();
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.frequency.value = 660;
    gain.gain.value = 0.05;
    osc.connect(gain);
    gain.connect(context.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.22);
    osc.stop(context.currentTime + 0.24);
    window.setTimeout(() => void context.close(), 400);
  }

  function end() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }

  return (
    <div className="relative min-h-dvh bg-bg">
      <div className="absolute inset-0">
        <Portrait id={person.id} name={person.name} eager />
        <div className="absolute inset-0 bg-bg/70" />
      </div>
      <div className="safe-top relative z-10 flex min-h-dvh flex-col px-4 pb-6">
        <div className="flex items-center justify-between">
          <Link to="/c/$id" params={{ id }} aria-label="Back to chat" className="press inline-flex min-h-11 items-center rounded-full bg-bg/80 px-3 text-sm font-semibold" onClick={end}>
            Back
          </Link>
          <button type="button" className="press min-h-11 rounded-full bg-bg/80 px-3 text-sm font-semibold" onClick={() => setReportOpen(true)}>
            Report
          </button>
        </div>
        <div className="mx-auto mt-8 w-full max-w-md text-center">
          <p className="font-mono text-xs uppercase tracking-wide text-ember">Device check</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold">{person.name.split(" ")[0]}</h1>
          <p className="mt-3 text-sm text-muted">
            Nothing is sent. This only checks the camera and microphone on your phone.
          </p>
        </div>
        <div className="relative mx-auto mt-6 aspect-portrait w-full max-w-xs overflow-hidden rounded-card border border-line bg-raised">
          <video ref={videoRef} autoPlay playsInline muted className={phase === "live" && camOn ? "cover" : "hidden"} />
          {phase !== "live" || !camOn ? (
            <div className="absolute inset-0 grid place-items-center px-6 text-center text-sm text-muted">
              {phase === "denied" ? "Camera stayed off. You can still use messages." : camOn ? "Camera preview appears after you start the check." : "Camera paused."}
            </div>
          ) : null}
        </div>
        {phase === "live" ? (
          <div className="mx-auto mt-4 w-full max-w-xs">
            <div
              role="meter"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(level * 100)}
              aria-label="Microphone level"
              className="h-1.5 overflow-hidden rounded-full bg-line"
            >
              <div className="h-full bg-signal" style={{ width: `${Math.round(level * 100)}%` }} />
            </div>
          </div>
        ) : null}
        <div className="mx-auto mt-auto flex w-full max-w-md flex-col gap-3 pt-6">
          {phase === "idle" || phase === "denied" ? (
            <Button onClick={() => void start()}>Check camera and mic</Button>
          ) : (
            <div className="flex justify-center gap-2">
              <button type="button" className="press grid size-14 place-items-center rounded-full bg-raised" aria-pressed={micOn} aria-label={micOn ? "Mute microphone" : "Unmute microphone"} onClick={toggleMic}>
                {micOn ? <Mic className="size-5" /> : <MicOff className="size-5" />}
              </button>
              <button type="button" className="press grid size-14 place-items-center rounded-full bg-raised" aria-pressed={camOn} aria-label={camOn ? "Turn camera off" : "Turn camera on"} onClick={toggleCam}>
                {camOn ? <Video className="size-5" /> : <VideoOff className="size-5" />}
              </button>
              <button type="button" className="press grid size-14 place-items-center rounded-full bg-raised" aria-label="Play a short speaker test" onClick={beep}>
                <Volume2 className="size-5" />
              </button>
            </div>
          )}
          <button
            type="button"
            className="press min-h-11 text-sm text-muted"
            onClick={() => {
              end();
              block(person.id);
              void navigate({ to: "/" });
            }}
          >
            Block {person.name.split(" ")[0]}
          </button>
        </div>
      </div>
      <Sheet open={reportOpen} onOpenChange={setReportOpen} title="Report" description="Available before, during, and after a call.">
        <ReportForm personId={person.id} onDone={() => setReportOpen(false)} />
      </Sheet>
    </div>
  );
}
