import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, Mic, Phone, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Frame, Portrait } from "@/components/grid/ui";
import { getPerson } from "@/lib/grid/model";
import { useGrid, type Msg, type Reaction } from "@/lib/grid/store";
import { draftLine } from "@/lib/grid/upgrade";
import { rememberVoice, voiceUrl } from "@/lib/grid/voices";

export const Route = createFileRoute("/c/$id")({
  component: ChatPage,
});

const REACTIONS: { id: Reaction; label: string }[] = [
  { id: "warm", label: "Warm" },
  { id: "yes", label: "Yes" },
  { id: "later", label: "Later" },
];

function ChatPage() {
  const { id } = Route.useParams();
  return (
    <Frame immersive>
      <ChatView id={id} />
    </Frame>
  );
}

const EMPTY_THREAD: Msg[] = [];

function ChatView({ id }: { id: string }) {
  const person = getPerson(id);
  const messages = useGrid((s) => s.threads[id] ?? EMPTY_THREAD);
  const typingId = useGrid((s) => s.typingId);
  const blocked = useGrid((s) => s.blocked.includes(id));
  const send = useGrid((s) => s.send);
  const sendVoice = useGrid((s) => s.sendVoice);
  const openSeal = useGrid((s) => s.openSeal);
  const react = useGrid((s) => s.react);
  const markRead = useGrid((s) => s.markRead);
  const pushToast = useGrid((s) => s.pushToast);
  const me = useGrid((s) => s.me);
  const [text, setText] = useState("");
  const [seal, setSeal] = useState(false);
  const [picker, setPicker] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const recorder = useRef<MediaRecorder | null>(null);
  const lastAt = messages[messages.length - 1]?.at ?? 0;

  useEffect(() => {
    const pending = useGrid.getState().takeDraft(id);
    if (pending) setText(pending);
  }, [id]);

  useEffect(() => {
    markRead(id);
  }, [id, lastAt, markRead]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length, typingId]);

  if (!person) {
    return (
      <div className="grid min-h-dvh place-items-center">
        <Link to="/inbox" className="font-semibold text-ember">
          Back to inbox
        </Link>
      </div>
    );
  }

  async function toggleRecord() {
    if (recorder.current) {
      recorder.current.stop();
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "";
      const media = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      const chunks: Blob[] = [];
      media.ondataavailable = (event) => {
        if (event.data.size) chunks.push(event.data);
      };
      media.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        const blob = new Blob(chunks, { type: media.mimeType || "audio/webm" });
        const msgId = crypto.randomUUID();
        rememberVoice(msgId, URL.createObjectURL(blob));
        sendVoice(id, msgId);
        setRecording(false);
        recorder.current = null;
      };
      media.start();
      recorder.current = media;
      setRecording(true);
    } catch {
      pushToast("Microphone stayed off");
    }
  }

  function submit() {
    if (!text.trim()) return;
    send(id, text, seal);
    setText("");
    setSeal(false);
  }

  return (
    <div className="flex h-dvh flex-col">
      <header className="safe-top flex items-center gap-2 border-b border-line px-3 pb-3">
        <Link to="/p/$id" params={{ id }} aria-label={`Back to ${person.name}`} className="press inline-flex min-h-11 items-center px-1 text-sm font-semibold">
          Back
        </Link>
        <span className="relative size-10 overflow-hidden rounded-2xl bg-raised">
          <Portrait id={person.id} name={person.name} size="sm" />
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-semibold">{person.name}</h1>
          <p className="truncate text-xs text-muted">{typingId === id ? "Typing" : person.pronouns}</p>
        </div>
        <Link to="/call/$id" params={{ id }} className="press inline-flex min-h-11 items-center gap-2 rounded-full bg-raised px-3 text-sm font-semibold">
          <Phone className="size-4" aria-hidden="true" /> Call
        </Link>
      </header>
      <div className="mx-auto w-full max-w-lg flex-1 space-y-3 overflow-y-auto px-3 py-4">
        {messages.length === 0 ? (
          <>
            <p className="rounded-2xl border border-line bg-surface px-3 py-4 text-sm text-muted">
              {person.boundaries} Say hello when you mean it.
            </p>
            <button type="button" className="press min-h-11 text-sm font-semibold text-ember" onClick={() => setText(draftLine(me, person))}>
              Draft a first line
            </button>
          </>
        ) : null}
        {messages.map((msg) => {
          const mine = msg.from === "me";
          const audio = msg.voice ? voiceUrl(msg.id) : null;
          return (
            <div key={msg.id} className={mine ? "ml-auto max-w-[85%]" : "max-w-[85%]"}>
              <div className={mine ? "rounded-2xl rounded-br-md bg-ember px-3 py-2 text-ember-ink" : "rounded-2xl rounded-bl-md bg-raised px-3 py-2"}>
                {msg.voice ? (
                  audio ? (
                    <audio controls src={audio} />
                  ) : (
                    <p className="text-sm">Voice note ended with this session. It was never uploaded.</p>
                  )
                ) : msg.seal === "sealed" ? (
                  <div>
                    <p className="text-sm font-semibold">View-once note</p>
                    <p className="mt-1 text-xs opacity-80">Opens once, then disappears from this chat.</p>
                    <button type="button" className="press mt-2 min-h-11 text-sm font-semibold underline" onClick={() => openSeal(id, msg.id)}>
                      Open once
                    </button>
                  </div>
                ) : msg.seal === "read" ? (
                  <div>
                    <p className="text-sm">{msg.text}</p>
                    <p className="mt-1 font-mono text-xs opacity-70">Disappears in a few seconds</p>
                  </div>
                ) : msg.seal === "expired" ? (
                  <p className="text-sm">This note expired.</p>
                ) : (
                  <p className="text-sm">{msg.text}</p>
                )}
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                {msg.reaction ? <span className="text-xs font-semibold text-ember">{REACTIONS.find((item) => item.id === msg.reaction)?.label}</span> : null}
                <button type="button" className="min-h-11 text-xs text-faint" onClick={() => setPicker(picker === msg.id ? null : msg.id)}>
                  React
                </button>
              </div>
              {picker === msg.id ? (
                <div className="mt-1 flex gap-2">
                  {REACTIONS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className="press min-h-11 rounded-full border border-line px-3 text-xs"
                      onClick={() => {
                        react(id, msg.id, item.id);
                        setPicker(null);
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
        {typingId === id ? <p className="text-sm text-muted">Typing…</p> : null}
        <div ref={endRef} />
      </div>
      <form
        className="safe-bottom border-t border-line bg-bg px-3 py-3"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <div className="mx-auto flex max-w-lg items-end gap-2">
          <button
            type="button"
            aria-pressed={seal}
            aria-label={seal ? "Sealed note on" : "Seal a view-once note"}
            className={seal ? "press grid size-11 place-items-center rounded-full bg-ember text-ember-ink" : "press grid size-11 place-items-center rounded-full bg-raised"}
            onClick={() => setSeal((value) => !value)}
            disabled={blocked || recording}
          >
            <Lock className="size-5" />
          </button>
          <button
            type="button"
            aria-pressed={recording}
            aria-label={recording ? "Stop voice note" : "Record a voice note"}
            className={recording ? "press grid size-11 place-items-center rounded-full bg-ember text-ember-ink" : "press grid size-11 place-items-center rounded-full bg-raised"}
            onClick={() => void toggleRecord()}
            disabled={blocked || seal}
          >
            <Mic className="size-5" />
          </button>
          <label className="sr-only" htmlFor="composer">
            Message
          </label>
          <textarea
            id="composer"
            rows={1}
            maxLength={500}
            value={text}
            disabled={blocked}
            placeholder={blocked ? "Blocked" : seal ? "View-once note" : recording ? "Recording…" : "Message"}
            className="field max-h-32 min-h-11 flex-1 resize-none"
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                submit();
              }
            }}
          />
          <button type="submit" className="press grid size-11 place-items-center rounded-full bg-ember text-ember-ink disabled:opacity-40" aria-label="Send" disabled={blocked || !text.trim()}>
            <Send className="size-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
