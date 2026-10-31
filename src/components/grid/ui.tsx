import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "@tanstack/react-router";
import { Bell, Compass, LayoutGrid, MessageCircle, UserRound, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { hash, shortTime } from "@/lib/grid/model";
import { unreadCount, useGrid } from "@/lib/grid/store";

const MONO = ["mono-a", "mono-b", "mono-c", "mono-d"] as const;

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="57 0 840 700" className={cn("h-4 w-auto shrink-0 text-ember", className)} aria-hidden="true">
      <path fill="currentColor" d="M57 0V700H251L479 327L701 700H895L897 0H682L680 319L528 63H424L272 308V0Z" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-fg", className)}>
      <Mark className="h-[0.85em]" />
      <span className="wordmark text-[1.05rem]">MEAT</span>
    </span>
  );
}

export function Monogram({ id, name, size = "lg" }: { id: string; name: string; size?: "sm" | "lg" }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <div className={cn("mono", MONO[hash(id) % MONO.length])} aria-hidden="true">
      <span className={cn("font-display font-extrabold", size === "sm" ? "text-xs" : "text-3xl")}>{initials || "G"}</span>
    </div>
  );
}

export function Portrait({
  id,
  name,
  eager = false,
  size = "lg",
}: {
  id: string;
  name: string;
  eager?: boolean;
  size?: "sm" | "lg";
}) {
  const [failed, setFailed] = useState(false);
  const local = useGrid((s) => s.devicePhotos[id]);
  if (failed && !local) return <Monogram id={id} name={name} size={size} />;
  return (
    <img
      src={local ?? `/portraits/${id}.jpg?v=spark`}
      alt=""
      className="cover"
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : "auto"}
      onError={() => setFailed(true)}
    />
  );
}

export function Sheet({
  open,
  onOpenChange,
  title,
  description,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="sheet-overlay fixed inset-0 z-50" />
        <Dialog.Content className="sheet-panel fixed bottom-0 z-50 overflow-y-auto rounded-t-3xl border border-line bg-surface px-4 pt-3 outline-none">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-line" aria-hidden="true" />
          <div className="flex items-start justify-between gap-3">
            <div>
              <Dialog.Title className="font-display text-xl font-bold">{title}</Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-muted">{description}</Dialog.Description>
            </div>
            <Dialog.Close className="press grid size-11 shrink-0 place-items-center rounded-full bg-raised" aria-label="Close">
              <X className="size-5" />
            </Dialog.Close>
          </div>
          <div className="mt-4">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function Button({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "solid" }) {
  return (
    <button
      {...props}
      className={cn(
        "press inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40",
        variant === "primary" && "bg-ember text-ember-ink",
        variant === "solid" && "bg-fg text-bg",
        variant === "ghost" && "border border-line bg-raised text-fg",
        className,
      )}
    />
  );
}

export function Chip({
  on,
  children,
  onClick,
}: {
  on?: boolean;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={cn(
        "press min-h-11 shrink-0 rounded-full border px-3 text-sm font-medium",
        on ? "border-ember bg-ember text-ember-ink" : "border-line bg-raised text-fg",
      )}
    >
      {children}
    </button>
  );
}

export function Toggle({
  on,
  label,
  hint,
  onChange,
}: {
  on: boolean;
  label: string;
  hint: string;
  onChange: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="press flex w-full items-center gap-3 py-3 text-left"
    >
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold">{label}</span>
        <span className="mt-0.5 block text-sm text-muted">{hint}</span>
      </span>
      <span className={cn("relative h-7 w-12 shrink-0 rounded-full p-1", on ? "bg-ember" : "bg-line")} aria-hidden="true">
        <span className={cn("block size-5 rounded-full transition-transform", on ? "translate-x-5 bg-ember-ink" : "bg-fg")} />
      </span>
    </button>
  );
}

export function NoticesButton() {
  const [open, setOpen] = useState(false);
  const [fresh, setFresh] = useState<string[]>([]);
  const notifs = useGrid((s) => s.notifs);
  const unread = notifs.filter((note) => !note.read).length;
  const readNotifs = useGrid((s) => s.readNotifs);
  return (
    <>
      <button
        type="button"
        className="press relative grid size-11 place-items-center rounded-full bg-raised"
        aria-label={unread ? `Notices, ${unread} new` : "Notices"}
        onClick={() => {
          setFresh(notifs.filter((note) => !note.read).map((note) => note.id));
          setOpen(true);
          readNotifs();
        }}
      >
        <Bell className="size-5" />
        {unread > 0 ? (
          <span className="absolute -right-0.5 -top-0.5 grid min-h-4 min-w-4 place-items-center rounded-full bg-ember px-1 text-xs font-semibold text-ember-ink">
            {unread > 9 ? "9+" : unread}
          </span>
        ) : null}
      </button>
      <Sheet open={open} onOpenChange={setOpen} title="Notices" description="Kept on this device. Nothing here is sent to a server.">
        {notifs.length === 0 ? (
          <p className="text-sm text-muted">Replies, shelf answers, plans, and check-ins show up here.</p>
        ) : (
          <ul className="space-y-3">
            {notifs.map((note) => (
              <li key={note.id} className={cn("rounded-2xl border bg-raised px-3 py-3", fresh.includes(note.id) ? "border-ember" : "border-line")}>
                <p className="text-sm font-semibold">{note.title}</p>
                <p className="mt-1 text-sm text-muted">{note.body}</p>
                <p className="mt-2 font-mono text-xs text-faint">{shortTime(note.at)}</p>
                {note.personId ? (
                  <Link to="/c/$id" params={{ id: note.personId }} className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-ember" onClick={() => setOpen(false)}>
                    Open chat
                  </Link>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </Sheet>
    </>
  );
}

function Nav() {
  const threads = useGrid((s) => s.threads);
  const readAt = useGrid((s) => s.readAt);
  const muted = useGrid((s) => s.muted);
  const blocked = useGrid((s) => s.blocked);
  const incognito = useGrid((s) => s.me.incognito);
  const unread = unreadCount(threads, readAt, muted, blocked);
  const items: {
    to: "/" | "/explore" | "/inbox" | "/you";
    label: string;
    icon: typeof LayoutGrid;
    exact: boolean;
    badge?: number;
  }[] = [
    { to: "/", label: "Nearby", icon: LayoutGrid, exact: true },
    { to: "/explore", label: "Explore", icon: Compass, exact: false },
    { to: "/inbox", label: "Inbox", icon: MessageCircle, exact: false, badge: unread },
    { to: "/you", label: "You", icon: UserRound, exact: false },
  ];

  return (
    <nav
      className="safe-bottom fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-line bg-bg px-2 lg:inset-y-0 lg:left-0 lg:w-56 lg:flex-col lg:items-stretch lg:justify-start lg:gap-1 lg:border-t-0 lg:border-r lg:px-3 lg:pt-6"
      aria-label="Primary"
    >
      <div className="mb-6 hidden px-2 lg:block">
        <Wordmark />
      </div>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: item.exact }}
            aria-label={item.badge ? `${item.label}, ${item.badge} unread` : item.label}
            className="press flex min-h-11 min-w-11 flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl px-1 text-xs font-medium lg:flex-none lg:flex-row lg:justify-start lg:gap-3 lg:px-3 lg:py-3 lg:text-sm"
            activeProps={{ className: "text-ember lg:bg-raised" }}
            inactiveProps={{ className: "text-faint" }}
          >
            <span className="relative">
              <Icon className="size-5" aria-hidden="true" />
              {item.badge ? (
                <span className="absolute -right-2 -top-2 grid min-h-4 min-w-4 place-items-center rounded-full bg-ember px-1 text-xs font-semibold text-ember-ink">
                  {item.badge}
                </span>
              ) : null}
            </span>
            {item.label}
          </Link>
        );
      })}
      <p className={cn("mt-auto hidden px-3 pb-6 text-xs lg:block", incognito ? "text-ember" : "text-faint")}>
        {incognito ? "Not listed." : "Listed nearby."}
      </p>
    </nav>
  );
}

export function ToastHost() {
  const toast = useGrid((s) => s.toast);
  const clearToast = useGrid((s) => s.clearToast);
  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(clearToast, 3200);
    return () => window.clearTimeout(id);
  }, [toast, clearToast]);
  if (!toast) return null;
  return (
    <div className="toast-host" role="status">
      <div className="flex items-center justify-between gap-3 rounded-full border border-line bg-raised px-4 py-2">
        <p className="text-sm">{toast.text}</p>
        {toast.undo ? (
          <button
            type="button"
            className="press min-h-11 shrink-0 font-semibold text-ember"
            onClick={() => {
              toast.undo?.();
              clearToast();
            }}
          >
            Undo
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function Frame({ children, immersive = false }: { children: ReactNode; immersive?: boolean }) {
  const hydrated = useGrid((s) => s.hydrated);
  const birthYear = useGrid((s) => s.gate.birthYear);
  const onboarded = useGrid((s) => s.onboarded);
  const ready = hydrated && birthYear !== null && birthYear <= new Date().getFullYear() - 18 && onboarded;
  useEffect(() => {
    const tick = () => {
      const state = useGrid.getState();
      const now = Date.now();
      if (state.passportUntil && state.passportUntil <= now) state.clearPassport();
      if (state.rightNowUntil && state.rightNowUntil <= now) state.endRightNow();
    };
    tick();
    const id = window.setInterval(tick, 20_000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <>
      {ready ? (
        immersive ? (
          <div className="min-h-dvh">{children}</div>
        ) : (
          <div className="min-h-dvh pb-32 lg:pb-10 lg:pl-56">
            {children}
            <Nav />
          </div>
        )
      ) : null}
      <ToastHost />
    </>
  );
}

export function BackLink({ to, label }: { to: "/" | "/inbox" | "/you" | "/explore"; label: string }) {
  return (
    <Link
      to={to}
      aria-label={label}
      className="press inline-flex min-h-11 items-center gap-1 rounded-full bg-bg/80 px-3 text-sm font-semibold text-fg"
    >
      Back
    </Link>
  );
}
