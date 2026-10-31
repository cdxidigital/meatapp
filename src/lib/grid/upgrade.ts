import { getPerson, hash, type Looking, type Me, type Person } from "@/lib/grid/model";

export type MeatMode = "dating" | "social" | "exploring" | "now";

export const MODES: { id: MeatMode; label: string; hint: string }[] = [
  { id: "dating", label: "Dating", hint: "Dates and something ongoing" },
  { id: "social", label: "Social", hint: "Chat, friends, and community" },
  { id: "exploring", label: "Exploring", hint: "Everyone in range" },
  { id: "now", label: "Right now", hint: "Men who show they’re around" },
];

export function modeLabel(mode: MeatMode) {
  return MODES.find((item) => item.id === mode)?.label ?? mode;
}

export function personModes(person: Person): MeatMode[] {
  const modes: MeatMode[] = ["exploring"];
  if (person.lookingFor.some((item) => item === "dates" || item === "relationship")) modes.push("dating");
  if (person.lookingFor.some((item) => item === "chat" || item === "friends" || item === "community")) modes.push("social");
  if (person.usuallyOnline) modes.push("now");
  return modes;
}

export function fitsMode(person: Person, mode: MeatMode) {
  return personModes(person).includes(mode);
}

export function chemistry(me: Me, person: Person) {
  const shared = person.tags.filter((tag) => me.tags.includes(tag));
  const intents = person.lookingFor.filter((item) => me.lookingFor.includes(item));
  const notes: string[] = [];
  if (shared.length) notes.push(shared.length === 1 ? `Shared: ${shared[0]}` : `Shared: ${shared.slice(0, 3).join(", ")}`);
  if (intents.length) notes.push(`Same intent: ${intents.map(intentLabel).join(", ")}`);
  if (!notes.length) notes.push("Little overlap in what you both wrote.");
  const score = Math.min(96, 28 + shared.length * 16 + intents.length * 14);
  return { score, notes, shared, intents };
}

function intentLabel(id: Looking) {
  if (id === "chat") return "chat";
  if (id === "friends") return "friends";
  if (id === "dates") return "dates";
  if (id === "relationship") return "relationship";
  return "community";
}

export function draftLine(me: Me, person: Person) {
  const { shared, intents } = chemistry(me, person);
  const who = person.name.split(" ")[0];
  if (shared[0]) return `Hey ${who}. You listed ${shared[0]} too. Want to start there?`;
  if (intents[0]) return `Hey ${who}. I'm also open to ${intentLabel(intents[0])}.`;
  return `Hey ${who}. I'm nearby if you want a proper hello.`;
}

export function radarPoint(id: string, km: number) {
  const angle = ((hash(id) % 360) * Math.PI) / 180;
  const band = km < 3 ? 26 : km < 8 ? 44 : km < 16 ? 62 : 76;
  const jitter = (hash(`${id}:j`) % 7) - 3;
  const radius = band + jitter;
  return {
    x: Math.min(86, Math.max(14, 50 + Math.cos(angle) * radius)),
    y: Math.min(86, Math.max(14, 50 + Math.sin(angle) * radius)),
  };
}

export type SceneEvent = {
  id: string;
  kind: "event" | "club";
  title: string;
  when: string;
  areaId: string;
  detail: string;
};

export const SCENE: SceneEvent[] = [
  { id: "river-friday", kind: "event", title: "River room", when: "Friday, 8pm", areaId: "cbd", detail: "A public room by Elizabeth Quay. Arrive on your own." },
  { id: "late-set", kind: "event", title: "Late set", when: "Saturday, 10pm", areaId: "northbridge", detail: "Music in a lit venue. No address in the listing." },
  { id: "market-hour", kind: "event", title: "Market hour", when: "Sunday, 11am", areaId: "fremantle", detail: "Coffee first, then the markets if you both want." },
  { id: "lane-club", kind: "club", title: "Lane club", when: "Most Thursdays", areaId: "northbridge", detail: "A small regular night. Ask the host before you bring someone." },
  { id: "dawn-swim", kind: "club", title: "Dawn swim", when: "Weekday mornings", areaId: "cottesloe", detail: "A swim, then leave. Not a house party." },
];

export type Circle = { id: string; name: string; memberIds: string[]; detail: string };

export const CIRCLES: Circle[] = [
  { id: "sunday-table", name: "Sunday table", memberIds: ["rowan", "mateo"], detail: "Two men who host a public lunch. Joint profile, separate chats." },
  { id: "night-walk", name: "Night walk", memberIds: ["sable", "orion"], detail: "A pair who walk the river and go home after." },
];

export function circleMembers(circle: Circle) {
  return circle.memberIds.map((id) => getPerson(id)).filter((person) => person != null);
}
