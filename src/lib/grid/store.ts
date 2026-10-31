import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  BLANK_ME,
  DEFAULT_FILTERS,
  type Filters,
  type Me,
  getPerson,
} from "@/lib/grid/model";
import { clearDeviceProfiles, deleteDeviceProfile, listDeviceProfiles, savePersonProfile, saveSelfProfile } from "@/lib/grid/profiles-db";
import type { MeatMode } from "@/lib/grid/upgrade";
import { assessFeedback, type FeedbackItem } from "@/lib/grid/feedback";

export type Reaction = "warm" | "yes" | "later";

export type Msg = {
  id: string;
  from: "me" | "them";
  at: number;
  text: string;
  reaction?: Reaction;
  seal?: "sealed" | "read" | "expired";
  voice?: boolean;
};

export type AlbumStatus = "pending" | "open" | "declined" | "revoked" | "expired";

export type Album = { status: AlbumStatus; until?: number };

export type Report = { id: string; personId: string; reason: string; note: string; at: number };

export type LogItem = { id: string; at: number; label: string };

export type Note = { id: string; at: number; title: string; body: string; read: boolean; personId?: string };

export type VaultEvent = { id: string; personId: string; action: "asked" | "opened" | "closed" | "revoked"; at: number };

export type Lock = { credentialId: string | null; codeHash: string | null };

export type Meetup = {
  venueId: string;
  windowLabel: string;
  target: number;
  note: string;
  startedAt: number;
  checks: { at: number; kind: "here" | "safe" | "leave" }[];
  closed: boolean;
};

export type SavedFilter = { id: string; name: string; filters: Filters };

export type Toast = { text: string; undo?: () => void } | null;

type Gate = { birthYear: number | null };

type Data = {
  gate: Gate;
  onboarded: boolean;
  me: Me;
  filters: Filters;
  saved: SavedFilter[];
  browseAreaId: string;
  density: "cozy" | "dense";
  waves: Record<string, number>;
  favourites: string[];
  hidden: string[];
  blocked: string[];
  muted: string[];
  reports: Report[];
  album: Record<string, Album>;
  threads: Record<string, Msg[]>;
  readAt: Record<string, number>;
  meetups: Record<string, Meetup>;
  trusted: string;
  log: LogItem[];
  notifs: Note[];
  deviceAlerts: boolean;
  loginHint: boolean;
  lock: Lock;
  mode: MeatMode;
  visibleModes: MeatMode[];
  rightNowUntil: number | null;
  chemistry: boolean;
  passportUntil: number | null;
  interests: Record<string, "yes" | "pass">;
  matches: string[];
  rsvps: Record<string, "going" | "maybe">;
  vaultLog: VaultEvent[];
  plus: boolean;
  drafts: Record<string, string>;
  feedback: FeedbackItem[];
};

type Store = Data & {
  hydrated: boolean;
  epoch: number;
  typingId: string | null;
  toast: Toast;
  sessionOpen: boolean;
  devicePeople: { id: string; name: string }[];
  devicePhotos: Record<string, string>;
  setHydrated: () => void;
  setGateYear: (year: number) => void;
  clearGate: () => void;
  patchMe: (patch: Partial<Me>) => void;
  finishOnboarding: () => void;
  setFilters: (patch: Partial<Filters>) => void;
  resetFilters: () => void;
  saveFilter: (name: string) => void;
  applySaved: (id: string) => void;
  deleteSaved: (id: string) => void;
  setBrowse: (id: string) => void;
  setDensity: (density: "cozy" | "dense") => void;
  wave: (id: string) => void;
  toggleFavourite: (id: string) => void;
  hide: (id: string) => void;
  unhide: (id: string) => void;
  mute: (id: string) => void;
  unmute: (id: string) => void;
  block: (id: string) => void;
  unblock: (id: string) => void;
  report: (personId: string, reason: string, note: string) => void;
  requestShelf: (id: string) => void;
  revokeShelf: (id: string) => void;
  send: (personId: string, text: string, seal?: boolean) => void;
  sendVoice: (personId: string, msgId: string) => void;
  openSeal: (personId: string, msgId: string) => void;
  react: (personId: string, msgId: string, reaction: Reaction) => void;
  markRead: (personId: string) => void;
  appendThem: (personId: string, text: string) => void;
  setTrusted: (name: string) => void;
  startMeetup: (personId: string, meetup: Omit<Meetup, "checks" | "closed" | "startedAt"> & { startedAt?: number }) => void;
  checkMeetup: (personId: string, kind: "here" | "safe" | "leave") => void;
  clearMeetup: (personId: string) => void;
  pushNotif: (title: string, body: string, personId?: string) => void;
  setDeviceAlerts: (on: boolean) => void;
  setLock: (patch: Partial<Lock>) => void;
  clearLock: () => void;
  openSession: () => void;
  refreshDevice: () => Promise<void>;
  readNotifs: () => void;
  pushToast: (text: string, undo?: () => void) => void;
  clearToast: () => void;
  dismissLoginHint: () => void;
  setMode: (mode: MeatMode) => void;
  toggleVisibleMode: (mode: MeatMode) => void;
  startRightNow: () => void;
  endRightNow: () => void;
  setChemistry: (on: boolean) => void;
  setPassport: (areaId: string) => void;
  clearPassport: () => void;
  interest: (id: string, choice: "yes" | "pass") => void;
  rsvp: (id: string, status: "going" | "maybe") => void;
  setPlus: (on: boolean) => void;
  setDraft: (personId: string, text: string) => void;
  takeDraft: (personId: string) => string;
  submitFeedback: (text: string) => void;
  decideFeedback: (id: string, decision: FeedbackItem["decision"]) => void;
  erase: () => void;
};

const replyTimers = new Map<string, number>();
const sealTimers = new Map<string, number>();

let selfTimer = 0;
function scheduleSelfSave() {
  if (typeof window === "undefined") return;
  window.clearTimeout(selfTimer);
  selfTimer = window.setTimeout(() => {
    const { me, gate } = useGrid.getState();
    const age = gate.birthYear ? new Date().getFullYear() - gate.birthYear : null;
    void saveSelfProfile(me, age).catch(() => undefined);
  }, 400);
}

function uid() {
  return crypto.randomUUID();
}

function fresh(): Data {
  return {
    gate: { birthYear: null },
    onboarded: false,
    me: { ...BLANK_ME },
    filters: { ...DEFAULT_FILTERS, lookingFor: [], tags: [] },
    saved: [],
    browseAreaId: "cbd",
    density: "cozy",
    waves: {},
    favourites: [],
    hidden: [],
    blocked: [],
    muted: [],
    reports: [],
    album: {},
    threads: {},
    readAt: {},
    meetups: {},
    trusted: "",
    log: [],
    notifs: [],
    deviceAlerts: false,
    loginHint: true,
    lock: { credentialId: null, codeHash: null },
    mode: "exploring",
    visibleModes: ["dating", "social", "exploring", "now"],
    rightNowUntil: null,
    chemistry: false,
    passportUntil: null,
    interests: {},
    matches: [],
    rsvps: {},
    vaultLog: [],
    plus: false,
    drafts: {},
    feedback: [],
  };
}

const storage = {
  getItem: (key: string) => {
    if (typeof window === "undefined") return null;
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string) => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, value);
    } catch {
      try {
        const parsed = JSON.parse(value) as { state?: { me?: { photo?: string | null } } };
        if (parsed.state?.me) parsed.state.me.photo = null;
        window.localStorage.setItem(key, JSON.stringify(parsed));
      } catch {
        /* ignore quota */
      }
    }
  },
  removeItem: (key: string) => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(key);
  },
};

function devicePing(title: string, body: string) {
  if (typeof window === "undefined" || typeof Notification === "undefined") return;
  if (!useGrid.getState().deviceAlerts || Notification.permission !== "granted") return;
  if (document.visibilityState === "visible") return;
  try {
    new Notification(title, { body });
  } catch {
    /* the in-app list still has it */
  }
}

export const useGrid = create<Store>()(
  persist(
    (set, get) => ({
      ...fresh(),
      hydrated: false,
      sessionOpen: false,
      devicePeople: [],
      devicePhotos: {},
      epoch: 0,
      typingId: null,
      toast: null,
      setHydrated: () => {
        set({ hydrated: true });
        void get().refreshDevice();
      },
      setGateYear: (year) => set({ gate: { birthYear: year } }),
      clearGate: () => set({ gate: { birthYear: null }, onboarded: false }),
      patchMe: (patch) => {
        set((s) => ({ me: { ...s.me, ...patch } }));
        scheduleSelfSave();
      },
      finishOnboarding: () =>
        set((s) => ({
          onboarded: true,
          browseAreaId: s.me.areaId,
          notifs: [
            {
              id: uid(),
              at: Date.now(),
              title: "Distance stays coarse",
              body: "People show a band such as Nearby or Across town. Never a pin.",
              read: false,
            },
            {
              id: uid(),
              at: Date.now(),
              title: "Safety stays free",
              body: "Block, report, hide, and meetup check-ins are never paywalled.",
              read: false,
            },
          ],
        })),
      setFilters: (patch) => set((s) => ({ filters: { ...s.filters, ...patch } })),
      resetFilters: () => set({ filters: { ...DEFAULT_FILTERS, lookingFor: [], tags: [] } }),
      saveFilter: (name) =>
        set((s) => ({
          saved: [{ id: uid(), name: name.trim().slice(0, 24), filters: s.filters }, ...s.saved].slice(0, s.plus ? 12 : 3),
          toast: { text: "Filter set saved on this device" },
        })),
      applySaved: (id) => {
        const found = get().saved.find((item) => item.id === id);
        if (!found) return;
        set({ filters: { ...found.filters }, toast: { text: `Applied “${found.name}”` } });
      },
      deleteSaved: (id) => set((s) => ({ saved: s.saved.filter((item) => item.id !== id) })),
      setBrowse: (id) => set({ browseAreaId: id }),
      setDensity: (density) => set({ density }),
      wave: (id) => {
        const person = getPerson(id);
        if (!person || get().waves[id] || get().blocked.includes(id)) return;
        const epoch = get().epoch;
        set((s) => ({
          waves: { ...s.waves, [id]: Date.now() },
          toast: { text: `Waved at ${person.name.split(" ")[0]}` },
          log: [{ id: uid(), at: Date.now(), label: `Waved at ${person.name}` }, ...s.log].slice(0, 50),
        }));
        if (!person.wavesBack || get().muted.includes(id)) return;
        window.setTimeout(() => {
          if (get().epoch !== epoch || get().blocked.includes(id)) return;
          get().appendThem(id, person.waveReply);
        }, 1400);
      },
      toggleFavourite: (id) => {
        const person = getPerson(id);
        const removing = get().favourites.includes(id);
        set((s) => ({
          favourites: removing ? s.favourites.filter((item) => item !== id) : [...s.favourites, id],
          toast: { text: removing ? "Removed from this device" : person ? `${person.name.split(" ")[0]} saved on this device` : "Saved on this device" },
        }));
        const done = removing || !person ? deleteDeviceProfile(id) : savePersonProfile(person);
        void done.then(() => get().refreshDevice()).catch(() => get().pushToast("Couldn’t write that profile"));
      },
      hide: (id) => {
        if (get().hidden.includes(id)) return;
        set((s) => ({
          hidden: [...s.hidden, id],
          toast: { text: "Hidden from your grid", undo: () => get().unhide(id) },
        }));
      },
      unhide: (id) => set((s) => ({ hidden: s.hidden.filter((item) => item !== id), toast: { text: "Back on your grid" } })),
      mute: (id) =>
        set((s) => ({
          muted: s.muted.includes(id) ? s.muted : [...s.muted, id],
          toast: { text: "Muted. They can still be messaged.", undo: () => get().unmute(id) },
        })),
      unmute: (id) => set((s) => ({ muted: s.muted.filter((item) => item !== id) })),
      block: (id) => {
        const person = getPerson(id);
        set((s) => ({
          blocked: s.blocked.includes(id) ? s.blocked : [...s.blocked, id],
          hidden: s.hidden.filter((item) => item !== id),
          toast: { text: person ? `${person.name.split(" ")[0]} is blocked` : "Blocked" },
          log: [{ id: uid(), at: Date.now(), label: `Blocked ${person?.name ?? "a profile"}` }, ...s.log].slice(0, 50),
        }));
      },
      unblock: (id) => set((s) => ({ blocked: s.blocked.filter((item) => item !== id), toast: { text: "Unblocked" } })),
      report: (personId, reason, note) => {
        const person = getPerson(personId);
        get().block(personId);
        set((s) => ({
          reports: [{ id: uid(), personId, reason, note: note.trim(), at: Date.now() }, ...s.reports],
          notifs: [
            {
              id: uid(),
              at: Date.now(),
              title: "Report saved on this device",
              body: "Saved on this device. It is not shown to them.",
              read: false,
            },
            ...s.notifs,
          ].slice(0, 30),
          log: [{ id: uid(), at: Date.now(), label: `Reported ${person?.name ?? "a profile"} · ${reason}` }, ...s.log].slice(0, 50),
        }));
      },
      requestShelf: (id) => {
        const person = getPerson(id);
        if (!person?.shelf || !person.shelfPolicy) return;
        const epoch = get().epoch;
        set((s) => ({ album: { ...s.album, [id]: { status: "pending" } }, vaultLog: noteVault(s.vaultLog, id, "asked") }));
        if (person.shelfPolicy === "pending") return;
        window.setTimeout(() => {
          if (get().epoch !== epoch) return;
          if (person.shelfPolicy === "accept") {
            set((s) => ({
              album: { ...s.album, [id]: { status: "open", until: Date.now() + 24 * 3_600_000 } },
              vaultLog: noteVault(s.vaultLog, id, "opened"),
              toast: { text: `${person.name.split(" ")[0]} opened their shelf` },
            }));
            get().pushNotif(`${person.name.split(" ")[0]} opened a shelf`, "Access expires. You can close it from their profile.", id);
          } else {
            set((s) => ({
              album: { ...s.album, [id]: { status: "declined" } },
              vaultLog: noteVault(s.vaultLog, id, "closed"),
              toast: { text: `${person.name.split(" ")[0]} kept their shelf closed` },
            }));
            get().pushNotif(`${person.name.split(" ")[0]} kept a shelf closed`, "The notes stay private.", id);
          }
        }, 700);
      },
      revokeShelf: (id) => {
        const person = getPerson(id);
        set((s) => ({
          album: { ...s.album, [id]: { status: "revoked" } },
          vaultLog: noteVault(s.vaultLog, id, "revoked"),
          toast: { text: "Shelf access revoked" },
          log: [{ id: uid(), at: Date.now(), label: `Revoked shelf access · ${person?.name ?? id}` }, ...s.log].slice(0, 50),
        }));
      },
      appendThem: (personId, text) => {
        const person = getPerson(personId);
        set((s) => ({
          threads: {
            ...s.threads,
            [personId]: [...(s.threads[personId] ?? []), { id: uid(), from: "them", at: Date.now(), text }],
          },
          typingId: s.typingId === personId ? null : s.typingId,
        }));
        const who = person?.name.split(" ")[0] ?? "Someone";
        get().pushNotif(`${who} replied`, text.slice(0, 140), personId);
      },
      send: (personId, text, seal) => {
        const trimmed = text.trim();
        if (!trimmed || get().blocked.includes(personId)) return;
        const person = getPerson(personId);
        const msg: Msg = {
          id: uid(),
          from: "me",
          at: Date.now(),
          text: trimmed.slice(0, 500),
          seal: seal ? "sealed" : undefined,
        };
        set((s) => ({
          threads: { ...s.threads, [personId]: [...(s.threads[personId] ?? []), msg] },
        }));
        if (!person || get().muted.includes(personId)) return;
        const epoch = get().epoch;
        const reply = seal
          ? "I'll only open that if I mean to. View-once notes shouldn't linger."
          : person.replies[(get().threads[personId]?.length ?? 1) % person.replies.length];
        set({ typingId: personId });
        const prev = replyTimers.get(personId);
        if (prev) window.clearTimeout(prev);
        const timer = window.setTimeout(() => {
          if (get().epoch !== epoch || get().blocked.includes(personId) || get().muted.includes(personId)) {
            if (get().typingId === personId) set({ typingId: null });
            return;
          }
          get().appendThem(personId, reply);
        }, 1100);
        replyTimers.set(personId, timer);
      },
      sendVoice: (personId, msgId) => {
        if (get().blocked.includes(personId)) return;
        const person = getPerson(personId);
        set((s) => ({
          threads: {
            ...s.threads,
            [personId]: [
              ...(s.threads[personId] ?? []),
              { id: msgId, from: "me" as const, at: Date.now(), text: "Voice note", voice: true },
            ],
          },
        }));
        if (!person || get().muted.includes(personId)) return;
        const epoch = get().epoch;
        set({ typingId: personId });
        window.setTimeout(() => {
          if (get().epoch !== epoch || get().blocked.includes(personId)) return;
          get().appendThem(personId, "Got the voice note. I'll listen properly, not on a loud street.");
        }, 1200);
      },
      openSeal: (personId, msgId) => {
        set((s) => ({
          threads: {
            ...s.threads,
            [personId]: (s.threads[personId] ?? []).map((msg) =>
              msg.id === msgId && msg.seal === "sealed" ? { ...msg, seal: "read" as const } : msg,
            ),
          },
        }));
        const key = `${personId}:${msgId}`;
        const prev = sealTimers.get(key);
        if (prev) window.clearTimeout(prev);
        const epoch = get().epoch;
        const timer = window.setTimeout(() => {
          if (get().epoch !== epoch) return;
          set((s) => ({
            threads: {
              ...s.threads,
              [personId]: (s.threads[personId] ?? []).map((msg) =>
                msg.id === msgId ? { ...msg, seal: "expired" as const, text: "" } : msg,
              ),
            },
          }));
        }, 6000);
        sealTimers.set(key, timer);
      },
      react: (personId, msgId, reaction) =>
        set((s) => ({
          threads: {
            ...s.threads,
            [personId]: (s.threads[personId] ?? []).map((msg) => (msg.id === msgId ? { ...msg, reaction } : msg)),
          },
        })),
      markRead: (personId) => set((s) => ({ readAt: { ...s.readAt, [personId]: Date.now() } })),
      setTrusted: (name) => set({ trusted: name.slice(0, 40) }),
      startMeetup: (personId, meetup) => {
        const person = getPerson(personId);
        set((s) => ({
          meetups: {
            ...s.meetups,
            [personId]: { ...meetup, startedAt: Date.now(), checks: [], closed: false },
          },
          log: [
            { id: uid(), at: Date.now(), label: `Meetup plan with ${person?.name ?? "someone"}` },
            ...s.log,
          ].slice(0, 50),
          toast: { text: "Plan saved on this device" },
        }));
        get().pushNotif("Meetup plan saved", `With ${person?.name.split(" ")[0] ?? "someone"}. Check in from the plan.`, personId);
      },
      checkMeetup: (personId, kind) => {
        const person = getPerson(personId);
        if (!get().meetups[personId]) return;
        const label =
          kind === "here" ? "Checked in: I'm here" : kind === "safe" ? "Checked in: I'm safe" : "Fast exit: leaving now";
        set((s) => {
          const current = s.meetups[personId];
          if (!current) return s;
          return {
            meetups: {
              ...s.meetups,
              [personId]: {
                ...current,
                closed: kind === "leave" ? true : current.closed,
                checks: [...current.checks, { at: Date.now(), kind }],
              },
            },
            log: [{ id: uid(), at: Date.now(), label: `${label} · ${person?.name ?? personId}` }, ...s.log].slice(0, 50),
            toast: { text: label },
          };
        });
        get().pushNotif(label, person ? `With ${person.name.split(" ")[0]}. Kept on this device.` : "Kept on this device.", personId);
      },
      clearMeetup: (personId) =>
        set((s) => {
          const next = { ...s.meetups };
          delete next[personId];
          return { meetups: next };
        }),
      pushNotif: (title, body, personId) => {
        set((s) => ({
          notifs: [{ id: uid(), at: Date.now(), title, body, read: false, personId }, ...s.notifs].slice(0, 30),
        }));
        devicePing(title, body);
      },
      setDeviceAlerts: (deviceAlerts) => set({ deviceAlerts }),
      setLock: (patch) => set((s) => ({ lock: { ...s.lock, ...patch }, sessionOpen: true })),
      clearLock: () => set({ lock: { credentialId: null, codeHash: null }, sessionOpen: true }),
      openSession: () => set({ sessionOpen: true }),
      refreshDevice: async () => {
        const { me, gate, favourites } = get();
        const age = gate.birthYear ? new Date().getFullYear() - gate.birthYear : null;
        try {
          await saveSelfProfile(me, age);
          const current = await listDeviceProfiles();
          const have = new Set(current.map((row) => row.id));
          for (const id of favourites) {
            const person = getPerson(id);
            if (person && !have.has(id)) await savePersonProfile(person);
          }
          const rows = await listDeviceProfiles();
          const photos: Record<string, string> = {};
          for (const row of rows) {
            if (row.self || !row.photo) continue;
            photos[row.id] = URL.createObjectURL(row.photo);
          }
          const previous = get().devicePhotos;
          for (const url of Object.values(previous)) URL.revokeObjectURL(url);
          set({
            devicePeople: rows.filter((row) => !row.self).map((row) => ({ id: row.id, name: row.name })),
            devicePhotos: photos,
          });
        } catch {
          /* this browser has no profile store */
        }
      },
      readNotifs: () => set((s) => ({ notifs: s.notifs.map((note) => ({ ...note, read: true })) })),
      pushToast: (text, undo) => set({ toast: { text, undo } }),
      clearToast: () => set({ toast: null }),
      dismissLoginHint: () => set({ loginHint: false }),
      setMode: (mode) => set({ mode }),
      toggleVisibleMode: (mode) =>
        set((s) => {
          const has = s.visibleModes.includes(mode);
          const visibleModes = has ? s.visibleModes.filter((item) => item !== mode) : [...s.visibleModes, mode];
          return { visibleModes: visibleModes.length ? visibleModes : [mode] };
        }),
      startRightNow: () =>
        set({
          rightNowUntil: Date.now() + 3_600_000,
          mode: "now",
          toast: { text: "You’re listed for an hour. It ends on its own." },
        }),
      endRightNow: () => {
        if (!get().rightNowUntil) return;
        set({ rightNowUntil: null, toast: { text: "Right now has ended" } });
      },
      setChemistry: (chemistry) => set({ chemistry }),
      setPassport: (areaId) => {
        const hours = get().plus ? 72 : 24;
        set({
          browseAreaId: areaId,
          passportUntil: Date.now() + hours * 3_600_000,
          toast: { text: `Passport open for ${hours} hours` },
        });
      },
      clearPassport: () =>
        set((s) => ({
          passportUntil: null,
          browseAreaId: s.me.areaId,
          toast: { text: "Back to your home area" },
        })),
      interest: (id, choice) => {
        const person = getPerson(id);
        if (!person || get().blocked.includes(id)) return;
        if (choice === "pass") {
          set((s) => ({ interests: { ...s.interests, [id]: "pass" }, toast: { text: "Passed" } }));
          return;
        }
        const mutual = person.wavesBack;
        set((s) => ({
          interests: { ...s.interests, [id]: "yes" },
          matches: mutual && !s.matches.includes(id) ? [id, ...s.matches] : s.matches,
          waves: mutual ? { ...s.waves, [id]: s.waves[id] ?? Date.now() } : s.waves,
          toast: {
            text: mutual
              ? `You and ${person.name.split(" ")[0]} both said yes`
              : "Interest saved on this device. It needs a yes from them too.",
          },
        }));
        if (mutual) get().pushNotif("It’s mutual", `${person.name.split(" ")[0]} said yes. Chat is open.`, id);
      },
      rsvp: (id, status) =>
        set((s) => ({
          rsvps: { ...s.rsvps, [id]: status },
          toast: { text: status === "going" ? "You’re down. Saved on this device." : "Saved as maybe" },
        })),
      setPlus: (plus) => set({ plus, toast: { text: plus ? "MEAT+ is on for this device" : "MEAT+ is off" } }),
      setDraft: (personId, text) => set((s) => ({ drafts: { ...s.drafts, [personId]: text } })),
      takeDraft: (personId) => {
        const text = get().drafts[personId] ?? "";
        if (!text) return "";
        set((s) => {
          const drafts = { ...s.drafts };
          delete drafts[personId];
          return { drafts };
        });
        return text;
      },
      submitFeedback: (text) => {
        const clean = text.trim().slice(0, 600);
        if (clean.length < 8) {
          set({ toast: { text: "Write a little more first" } });
          return;
        }
        const item: FeedbackItem = {
          id: uid(),
          text: clean,
          at: Date.now(),
          assessment: assessFeedback(clean),
          decision: "pending",
          decidedAt: null,
        };
        set((s) => ({ feedback: [item, ...s.feedback].slice(0, 40) }));
      },
      decideFeedback: (id, decision) => {
        if (decision === "pending") return;
        const item = get().feedback.find((row) => row.id === id);
        if (!item || item.decision !== "pending") return;
        if (decision === "continue" && item.assessment.call === "pass") {
          set({ toast: { text: "That one doesn’t clear the bar" } });
          return;
        }
        set((s) => ({
          feedback: s.feedback.map((row) => (row.id === id ? { ...row, decision, decidedAt: Date.now() } : row)),
          toast: {
            text:
              decision === "continue"
                ? "Queued for the next version. This device won’t rewrite itself."
                : decision === "hold"
                  ? "Held. Nothing changes yet."
                  : "Passed. It stays on the record.",
          },
        }));
      },
      erase: () => {
        const previous = get().devicePhotos;
        for (const url of Object.values(previous)) URL.revokeObjectURL(url);
        set({
          ...fresh(),
          hydrated: true,
          epoch: get().epoch + 1,
          typingId: null,
          sessionOpen: false,
          devicePeople: [],
          devicePhotos: {},
          toast: { text: "MEAT data on this device was erased" },
        });
        void useGrid.persist.clearStorage();
        void clearDeviceProfiles();
      },
    }),
    {
      name: "grid-state-v1",
      storage: createJSONStorage(() => storage),
      skipHydration: true,
      partialize: (state) => ({
        gate: state.gate,
        onboarded: state.onboarded,
        me: state.me,
        filters: state.filters,
        saved: state.saved,
        browseAreaId: state.browseAreaId,
        density: state.density,
        waves: state.waves,
        favourites: state.favourites,
        hidden: state.hidden,
        blocked: state.blocked,
        muted: state.muted,
        reports: state.reports,
        album: state.album,
        threads: state.threads,
        readAt: state.readAt,
        meetups: state.meetups,
        trusted: state.trusted,
        log: state.log,
        notifs: state.notifs,
        deviceAlerts: state.deviceAlerts,
        loginHint: state.loginHint,
        lock: state.lock,
        mode: state.mode,
        visibleModes: state.visibleModes,
        rightNowUntil: state.rightNowUntil,
        chemistry: state.chemistry,
        passportUntil: state.passportUntil,
        interests: state.interests,
        matches: state.matches,
        rsvps: state.rsvps,
        vaultLog: state.vaultLog,
        plus: state.plus,
        drafts: state.drafts,
        feedback: state.feedback,
      }),
      onRehydrateStorage: () => () => {
        useGrid.setState({ hydrated: true });
      },
    },
  ),
);

function noteVault(log: VaultEvent[], personId: string, action: VaultEvent["action"]) {
  return [{ id: uid(), personId, action, at: Date.now() }, ...log].slice(0, 40);
}

export function unreadCount(threads: Record<string, Msg[]>, readAt: Record<string, number>, muted: string[], blocked: string[]) {
  let count = 0;
  for (const [id, msgs] of Object.entries(threads)) {
    if (muted.includes(id) || blocked.includes(id)) continue;
    const last = msgs[msgs.length - 1];
    if (last && last.from === "them" && last.at > (readAt[id] ?? 0)) count += 1;
  }
  return count;
}
