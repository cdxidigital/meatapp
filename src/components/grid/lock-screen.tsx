import { useEffect, useRef, useState } from "react";
import { renderSVG } from "uqr";
import { Wordmark } from "@/components/grid/ui";
import { hashCode, loginPayload, parseLoginCode, passkeySupported, unlockPasskey } from "@/lib/grid/lock";
import { isAdultYear } from "@/lib/grid/model";
import { useGrid } from "@/lib/grid/store";

export function QrCard({ code }: { code: string }) {
  const svg = renderSVG(loginPayload(code), { pixelSize: 8, whiteColor: "#f4f0e6", blackColor: "#14110e", ecc: "M" });
  return (
    <div className="rounded-card bg-[#f4f0e6] p-4 text-[#14110e]">
      <div className="mx-auto w-56 [&_svg]:h-auto [&_svg]:w-full" dangerouslySetInnerHTML={{ __html: svg }} />
      <p className="mt-3 break-all text-center font-mono text-sm tracking-wide">{code}</p>
      <p className="mt-2 text-center text-xs">Save this. It is shown once. The next visit can scan it or type it.</p>
    </div>
  );
}

export function LockScreen() {
  const hydrated = useGrid((s) => s.hydrated);
  const onboarded = useGrid((s) => s.onboarded);
  const birthYear = useGrid((s) => s.gate.birthYear);
  const lock = useGrid((s) => s.lock);
  const sessionOpen = useGrid((s) => s.sessionOpen);
  const openSession = useGrid((s) => s.openSession);
  const erase = useGrid((s) => s.erase);
  const [code, setCode] = useState("");
  const [scan, setScan] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [wiping, setWiping] = useState(false);

  const locked = Boolean(lock.credentialId || lock.codeHash);
  if (!hydrated || !onboarded || !isAdultYear(birthYear) || !locked || sessionOpen) return null;

  async function tryCode(raw: string) {
    if (!lock.codeHash) return;
    const next = await hashCode(raw);
    if (next === lock.codeHash) {
      openSession();
      return;
    }
    setError("That code doesn’t match.");
  }

  return (
    <div className="fixed inset-0 z-40 overflow-y-auto bg-bg">
      <div className="mx-auto flex min-h-dvh max-w-md flex-col px-5 py-8">
        <Wordmark />
        <h1 className="mt-8 font-display text-4xl font-extrabold">Unlock MEAT</h1>
        <p className="mt-3 text-sm text-muted">This browser already has your list. A passkey or your spare QR opens it. Nothing is sent to a server.</p>
        {lock.credentialId ? (
          <button
            type="button"
            className="press mt-6 min-h-11 rounded-2xl bg-ember text-sm font-semibold text-ember-ink disabled:opacity-40"
            disabled={busy || !passkeySupported()}
            onClick={() => {
              setBusy(true);
              setError("");
              void unlockPasskey(lock.credentialId!)
                .then((ok) => {
                  if (ok) openSession();
                  else setError("Passkey was cancelled.");
                })
                .catch(() => setError("This browser couldn’t use the passkey."))
                .finally(() => setBusy(false));
            }}
          >
            Unlock with passkey
          </button>
        ) : null}
        {lock.codeHash ? (
          <form
            className="mt-4 space-y-3"
            onSubmit={(event) => {
              event.preventDefault();
              void tryCode(code);
            }}
          >
            <label className="block">
              <span className="mb-1 block text-sm text-muted">Spare key</span>
              <input className="field font-mono uppercase" autoCapitalize="characters" autoComplete="off" value={code} onChange={(event) => setCode(parseLoginCode(event.target.value))} />
            </label>
            <button type="submit" className="press min-h-11 w-full rounded-2xl border border-line bg-raised text-sm font-semibold">
              Unlock with code
            </button>
            <button type="button" className="press min-h-11 w-full text-sm font-semibold text-ember" onClick={() => setScan((open) => !open)}>
              {scan ? "Close camera" : "Scan QR"}
            </button>
            {scan ? <QrScanner onCode={(value) => void tryCode(value)} /> : null}
          </form>
        ) : null}
        {error ? <p className="mt-4 text-sm text-ember">{error}</p> : null}
        {!passkeySupported() && lock.credentialId ? <p className="mt-4 text-sm text-muted">This browser has no passkey. Use the spare key.</p> : null}
        {wiping ? (
          <div className="mt-auto pt-8">
            <p className="text-sm text-muted">This removes the profile, chats, and saved people on this browser. It cannot be undone.</p>
            <button type="button" className="press mt-3 min-h-11 w-full rounded-2xl bg-ember text-sm font-semibold text-ember-ink" onClick={() => erase()}>
              Erase this device
            </button>
            <button type="button" className="press mt-2 min-h-11 w-full text-sm font-semibold" onClick={() => setWiping(false)}>
              Cancel
            </button>
          </div>
        ) : (
          <button type="button" className="press mt-auto min-h-11 text-sm text-faint" onClick={() => setWiping(true)}>
            Lost both? Erase this device
          </button>
        )}
      </div>
    </div>
  );
}

function QrScanner({ onCode }: { onCode: (value: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const onCodeRef = useRef(onCode);
  onCodeRef.current = onCode;
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const Detector = (window as unknown as { BarcodeDetector?: new (options: { formats: string[] }) => { detect: (source: HTMLVideoElement) => Promise<Array<{ rawValue: string }>> } }).BarcodeDetector;
    if (!Detector || !navigator.mediaDevices?.getUserMedia) {
      setFailed(true);
      return;
    }
    let stop = false;
    let stream: MediaStream | null = null;
    const detector = new Detector({ formats: ["qr_code"] });
    void navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((next) => {
        stream = next;
        const video = videoRef.current;
        if (!video) return;
        video.srcObject = next;
        void video.play();
        const tick = () => {
          if (stop) return;
          void detector
            .detect(video)
            .then((codes) => {
              const raw = codes[0]?.rawValue;
              if (raw) onCodeRef.current(raw);
            })
            .catch(() => undefined)
            .finally(() => {
              if (!stop) window.setTimeout(tick, 250);
            });
        };
        tick();
      })
      .catch(() => setFailed(true));
    return () => {
      stop = true;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  if (failed) return <p className="text-sm text-muted">This browser can’t scan. Type the spare key instead.</p>;
  return <video ref={videoRef} className="aspect-square w-full rounded-card bg-black object-cover" muted playsInline />;
}
