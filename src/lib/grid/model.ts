export type Looking = "chat" | "friends" | "dates" | "relationship" | "community";
export type SortMode = "smart" | "near" | "active";
export type ShelfPolicy = "accept" | "decline" | "pending";

export type Filters = {
  radiusKm: number;
  minAge: number;
  maxAge: number;
  onlineOnly: boolean;
  verifiedOnly: boolean;
  lookingFor: Looking[];
  tags: string[];
  favouritesOnly: boolean;
  query: string;
  sort: SortMode;
};

export const DEFAULT_FILTERS: Filters = {
  radiusKm: 25,
  minAge: 18,
  maxAge: 70,
  onlineOnly: false,
  verifiedOnly: false,
  lookingFor: [],
  tags: [],
  favouritesOnly: false,
  query: "",
  sort: "smart",
};

export const RADII = [0.5, 1, 5, 10, 25, 50, 100] as const;

export const TAGS = [
  "photography",
  "coffee",
  "ocean",
  "design",
  "food",
  "books",
  "film",
  "fitness",
  "dogs",
  "music",
  "art",
  "night walks",
  "cooking",
  "gardens",
  "dancing",
  "local history",
] as const;

export const LOOKING: { id: Looking; label: string; hint: string }[] = [
  { id: "chat", label: "Chat", hint: "Low-pressure conversation" },
  { id: "friends", label: "Friends", hint: "People around the city" },
  { id: "dates", label: "Dates", hint: "One-to-one plans" },
  { id: "relationship", label: "Relationship", hint: "Something ongoing" },
  { id: "community", label: "Community", hint: "Scenes, groups, local life" },
];

export const AVAILABILITY = ["Mornings", "Afternoons", "Evenings", "Weekends", "Variable shifts"] as const;

export const REPORT_REASONS = [
  "Unwanted contact",
  "Harassment",
  "Hate or a threat",
  "Spam",
  "Someone under 18",
  "Something else",
] as const;

export const PRONOUNS = ["he/him", "he/they"] as const;

export type Area = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  x: number;
  y: number;
  note: string;
};

export const AREAS: Area[] = [
  { id: "scarborough", name: "Scarborough", lat: -31.894, lng: 115.758, x: 18, y: 16, note: "Beach terrace and the long sunset" },
  { id: "cottesloe", name: "Cottesloe", lat: -31.994, lng: 115.757, x: 16, y: 42, note: "Pines and early swims" },
  { id: "fremantle", name: "Fremantle", lat: -32.056, lng: 115.748, x: 24, y: 80, note: "Port, markets, live rooms" },
  { id: "subiaco", name: "Subiaco", lat: -31.949, lng: 115.824, x: 36, y: 46, note: "Leafy streets, long lunches" },
  { id: "leederville", name: "Leederville", lat: -31.932, lng: 115.841, x: 44, y: 34, note: "Oxford Street after dark" },
  { id: "northbridge", name: "Northbridge", lat: -31.947, lng: 115.857, x: 52, y: 36, note: "Lanes and late rooms" },
  { id: "cbd", name: "Perth CBD", lat: -31.953, lng: 115.86, x: 55, y: 48, note: "River edge and the city grid" },
  { id: "lawley", name: "Mount Lawley", lat: -31.928, lng: 115.872, x: 66, y: 28, note: "Beaufort cafes" },
  { id: "maylands", name: "Maylands", lat: -31.927, lng: 115.894, x: 78, y: 34, note: "Peninsula and warehouses" },
  { id: "southperth", name: "South Perth", lat: -31.974, lng: 115.862, x: 54, y: 66, note: "Foreshore loop" },
  { id: "vicpark", name: "Victoria Park", lat: -31.976, lng: 115.903, x: 74, y: 64, note: "Albany Highway" },
];

export type Venue = { id: string; name: string; areaId: string; detail: string };

export const VENUES: Venue[] = [
  { id: "eq", name: "Elizabeth Quay lawn", areaId: "cbd", detail: "Open grass by the river steps" },
  { id: "pcc", name: "Perth Cultural Centre", areaId: "northbridge", detail: "Gallery steps, public and lit" },
  { id: "hyde", name: "Hyde Park, west end", areaId: "northbridge", detail: "The big trees, street side" },
  { id: "ox", name: "Oxford Street corner", areaId: "leederville", detail: "Outside, plenty of people around" },
  { id: "sub", name: "Subiaco theatre garden", areaId: "subiaco", detail: "Front garden, facing the street" },
  { id: "cott", name: "Cottesloe pine lawn", areaId: "cottesloe", detail: "Grass above the beach" },
  { id: "freo", name: "Fremantle Markets front", areaId: "fremantle", detail: "Public doors on South Terrace" },
  { id: "scar", name: "Scarborough clock tower", areaId: "scarborough", detail: "The plaza, not the sand" },
  { id: "vic", name: "Vic Park station steps", areaId: "vicpark", detail: "Busy and well lit" },
  { id: "may", name: "Maylands peninsula path", areaId: "maylands", detail: "Shared path by the water" },
  { id: "south", name: "South Perth foreshore", areaId: "southperth", detail: "River path, public benches" },
];

export type ShelfNote = { title: string; body: string };

export type Person = {
  id: string;
  name: string;
  pronouns: string;
  age: number;
  areaId: string;
  bio: string;
  tags: string[];
  lookingFor: Looking[];
  availability: string;
  boundaries: string;
  verified: boolean;
  showDistance: boolean;
  showOnline: boolean;
  usuallyOnline: boolean;
  recency: "today" | "week";
  repliesFast: boolean;
  wavesBack: boolean;
  waveReply: string;
  replies: string[];
  shelf: ShelfNote[] | null;
  shelfPolicy: ShelfPolicy | null;
};

export const PEOPLE: Person[] = [
  {
    id: "rowan",
    name: "Rowan Hale",
    pronouns: "he/him",
    age: 29,
    areaId: "leederville",
    bio: "Shoots night markets and river light. Usually a quiet table, a camera, and too many bookmarks.",
    tags: ["photography", "coffee", "night walks", "film"],
    lookingFor: ["friends", "dates"],
    availability: "Evenings",
    boundaries: "Happy to chat first. Ask before sending photos.",
    verified: false,
    showDistance: true,
    showOnline: true,
    usuallyOnline: true,
    recency: "today",
    repliesFast: true,
    wavesBack: true,
    waveReply: "Wave received. I'm around if you want an actual sentence.",
    replies: [
      "Hey. I'm between rolls of film and a mediocre coffee. What's your night doing?",
      "Leederville is loud. I can do a quieter table if you want to say hi properly.",
      "Tell me a picture you still think about. I'll go first if that's easier.",
    ],
    shelf: null,
    shelfPolicy: null,
  },
  {
    id: "mateo",
    name: "Mateo Ruiz",
    pronouns: "he/him",
    age: 32,
    areaId: "northbridge",
    bio: "Bar lead on William Street. Off nights I'm hunting a good dumpling or a terrible dance floor.",
    tags: ["food", "dancing", "music", "night walks"],
    lookingFor: ["dates", "chat"],
    availability: "Variable shifts",
    boundaries: "Easy conversation is fine. Pressure is not. No photos unless I ask.",
    verified: false,
    showDistance: true,
    showOnline: true,
    usuallyOnline: true,
    recency: "today",
    repliesFast: true,
    wavesBack: true,
    waveReply: "Waved back. Service is about to start, but I'm here.",
    replies: [
      "You caught me before service. I have ten minutes and strong opinions about noodles.",
      "If you're in Northbridge later I'll be the one pretending not to watch the door.",
      "A wave is cute. A real sentence is better. How's your week actually going?",
    ],
    shelf: null,
    shelfPolicy: null,
  },
  {
    id: "amira",
    name: "Amir Shah",
    pronouns: "he/him",
    age: 27,
    areaId: "lawley",
    bio: "Brand designer. Mount Lawley cafes, gallery Saturdays, playlists that run too long.",
    tags: ["design", "art", "coffee", "books"],
    lookingFor: ["relationship", "friends"],
    availability: "Weekends",
    boundaries: "I like a slow start. Please don't open with a comment about how I look.",
    verified: false,
    showDistance: true,
    showOnline: true,
    usuallyOnline: false,
    recency: "today",
    repliesFast: false,
    wavesBack: false,
    waveReply: "",
    replies: [
      "Hi. I'm probably in a cafe with a laptop I am not using. What are you into this week?",
      "Gallery Saturday is a standing plan. Company is optional and welcome.",
      "Tell me what you're reading, or what you abandoned. Both count.",
    ],
    shelf: null,
    shelfPolicy: null,
  },
  {
    id: "jules",
    name: "Jules Okonkwo",
    pronouns: "he/him",
    age: 34,
    areaId: "fremantle",
    bio: "High school science, weekend swells at South Beach. The dog is the real personality.",
    tags: ["ocean", "fitness", "dogs", "cooking"],
    lookingFor: ["dates", "friends"],
    availability: "Mornings",
    boundaries: "Kind, direct, and no pressure to meet until we've actually talked.",
    verified: false,
    showDistance: true,
    showOnline: true,
    usuallyOnline: true,
    recency: "today",
    repliesFast: false,
    wavesBack: false,
    waveReply: "",
    replies: [
      "Morning. I teach, then I chase a small wave if the wind behaves.",
      "The dog has already approved this conversation. I still get a vote.",
      "Freo is a trip from the CBD, so I'm better in messages than in last-minute plans.",
    ],
    shelf: [
      { title: "South Beach", body: "Dawn patrol. The dog thinks everyone is already a friend." },
      { title: "Off days", body: "Tuesdays. I'm useless before coffee and honest about it." },
    ],
    shelfPolicy: "decline",
  },
  {
    id: "sable",
    name: "Sable Quinn",
    pronouns: "he/him",
    age: 26,
    areaId: "cbd",
    bio: "Writes songs in a CBD walk-up. Looking for people who stay for the second set.",
    tags: ["music", "film", "night walks", "dancing"],
    lookingFor: ["chat", "community"],
    availability: "Evenings",
    boundaries: "Ask before you photograph or share anything I send.",
    verified: false,
    showDistance: false,
    showOnline: true,
    usuallyOnline: true,
    recency: "today",
    repliesFast: true,
    wavesBack: true,
    waveReply: "Hey. Wave seen. I'm in the middle of a verse but I'll write back.",
    replies: [
      "Hi. I'm in the CBD and the building is loud. What's the last song that actually got you?",
      "Second set is the real one. First set is just manners.",
      "I keep distance hidden on purpose. If we meet, we pick a public room.",
    ],
    shelf: null,
    shelfPolicy: null,
  },
  {
    id: "noah",
    name: "Noah Park",
    pronouns: "he/him",
    age: 31,
    areaId: "subiaco",
    bio: "Architect. Serious about shade trees and unserious about losing at board games.",
    tags: ["design", "coffee", "books", "gardens"],
    lookingFor: ["relationship"],
    availability: "Weekends",
    boundaries: "I prefer names and full sentences. Photos can wait.",
    verified: true,
    showDistance: true,
    showOnline: true,
    usuallyOnline: false,
    recency: "week",
    repliesFast: false,
    wavesBack: false,
    waveReply: "",
    replies: [
      "Hello. I'm slower than the grid wants me to be. That's on purpose.",
      "Subiaco on a Saturday, somewhere with a table big enough for a game.",
      "If you're looking for something ongoing, say so. I am too.",
    ],
    shelf: [
      { title: "Courtyard", body: "A shaded Subiaco courtyard I'm designing. The fig tree stays." },
      { title: "Saturday", body: "Hyde Park, north side. Bad coffee, decent book." },
    ],
    shelfPolicy: "accept",
  },
  {
    id: "indigo",
    name: "Indigo Voss",
    pronouns: "he/him",
    age: 28,
    areaId: "vicpark",
    bio: "Florist and local-history nerd. Vic Park markets, then somewhere with cake.",
    tags: ["gardens", "art", "coffee", "local history"],
    lookingFor: ["friends", "community"],
    availability: "Afternoons",
    boundaries: "Friendship is a complete outcome. Please don't treat it as a waiting room.",
    verified: false,
    showDistance: false,
    showOnline: true,
    usuallyOnline: true,
    recency: "today",
    repliesFast: true,
    wavesBack: false,
    waveReply: "",
    replies: [
      "Hi. I was reading about a dance that used to happen two streets from here.",
      "Markets, then cake. That's the whole personality and I'm at peace with it.",
      "I hide my distance. If we meet it's a public bench, not a pin.",
    ],
    shelf: null,
    shelfPolicy: null,
  },
  {
    id: "harper",
    name: "Harper Lin",
    pronouns: "he/him",
    age: 36,
    areaId: "cottesloe",
    bio: "Physio. Early swims, late dinners. I will talk about shoulders if you let me.",
    tags: ["fitness", "ocean", "cooking", "dogs"],
    lookingFor: ["dates", "relationship"],
    availability: "Mornings",
    boundaries: "Be direct about what you want. No photos unless I ask.",
    verified: true,
    showDistance: true,
    showOnline: true,
    usuallyOnline: false,
    recency: "today",
    repliesFast: false,
    wavesBack: false,
    waveReply: "",
    replies: [
      "Hello. I was in the water at six. I'm more articulate now.",
      "Cottesloe is a ride from the city. I'm worth a plan, not a maybe.",
      "Tell me how you actually like to spend a Sunday. I'll go first: swim, market, long lunch.",
    ],
    shelf: [
      { title: "Swim", body: "The pylon end at Cottesloe, early. Not the busy stairs." },
      { title: "On repeat", body: "Late-70s city pop. I'll name the record if we actually talk." },
      { title: "Window", body: "Free most Sundays after nine." },
    ],
    shelfPolicy: "accept",
  },
  {
    id: "kai",
    name: "Kai Nakamura",
    pronouns: "he/him",
    age: 30,
    areaId: "scarborough",
    bio: "Dive instructor between seasons. Scarborough sunsets are a personality trait, unfortunately.",
    tags: ["ocean", "photography", "fitness", "film"],
    lookingFor: ["friends", "dates"],
    availability: "Afternoons",
    boundaries: "Outdoor plans only until we've met once. Tell me if you can't swim; that's fine.",
    verified: false,
    showDistance: true,
    showOnline: true,
    usuallyOnline: true,
    recency: "today",
    repliesFast: true,
    wavesBack: true,
    waveReply: "Waved back from the beach path. Wind is rude today.",
    replies: [
      "Hey. I'm between dives and sandwiches. What are you doing near the water, if anything?",
      "Scarborough is a trip from the CBD. Say if that's annoying and we'll just talk.",
      "I take photos of horizons and pretend it's a job. Sometimes it is.",
    ],
    shelf: null,
    shelfPolicy: null,
  },
  {
    id: "remy",
    name: "Remy Laurent",
    pronouns: "he/him",
    age: 38,
    areaId: "fremantle",
    bio: "Wine buyer who still gets excited about a perfect roast chicken. Slow replies. Real ones.",
    tags: ["food", "books", "film", "cooking"],
    lookingFor: ["relationship", "dates"],
    availability: "Evenings",
    boundaries: "No rush, and no tests. I answer when I mean it.",
    verified: true,
    showDistance: true,
    showOnline: false,
    usuallyOnline: false,
    recency: "week",
    repliesFast: false,
    wavesBack: false,
    waveReply: "",
    replies: [
      "Hello. I don't show online, so if you're reading this, I chose to write.",
      "Freo in the evening, a table, not a club. That's my whole speed.",
      "Tell me a meal you can cook without a recipe. I'll judge it kindly.",
    ],
    shelf: [
      { title: "Table", body: "A corner in a Freo wine bar. I'll name it only if I say yes." },
      { title: "Cook", body: "Roast chicken, properly. Happy to trade recipes before anything else." },
    ],
    shelfPolicy: "pending",
  },
  {
    id: "tess",
    name: "Theo Adeyemi",
    pronouns: "he/him",
    age: 29,
    areaId: "leederville",
    bio: "Nurse on rotating shifts. If I'm here, I have twenty minutes and opinions about noodles.",
    tags: ["fitness", "coffee", "dogs", "cooking"],
    lookingFor: ["friends", "chat"],
    availability: "Variable shifts",
    boundaries: "Please be normal about shift work. I disappear, then I come back.",
    verified: false,
    showDistance: true,
    showOnline: true,
    usuallyOnline: true,
    recency: "today",
    repliesFast: true,
    wavesBack: true,
    waveReply: "Wave got me between notes. Hi.",
    replies: [
      "Hi. I've got a short window and I'm using it on you. What's good near you food-wise?",
      "Leederville noodles are a serious topic. I will not be brief.",
      "Friends and chat are the brief. Dates can be a later conversation, not an assumption.",
    ],
    shelf: null,
    shelfPolicy: null,
  },
  {
    id: "orion",
    name: "Orion Blake",
    pronouns: "he/him",
    age: 33,
    areaId: "northbridge",
    bio: "Plays records, not a brand. Northbridge after midnight. Quiet walks before noon.",
    tags: ["music", "dancing", "art", "night walks"],
    lookingFor: ["chat", "community"],
    availability: "Evenings",
    boundaries: "No unsolicited pictures. If I share a shelf, I can close it.",
    verified: false,
    showDistance: false,
    showOnline: true,
    usuallyOnline: true,
    recency: "today",
    repliesFast: false,
    wavesBack: false,
    waveReply: "",
    replies: [
      "Hey. I'm not a brand account. If you want music talk, I have time.",
      "I keep my distance hidden. Northbridge is enough location for strangers.",
      "Noon walks are the honest version of me. Midnight is just the job.",
    ],
    shelf: null,
    shelfPolicy: null,
  },
];

export type Me = {
  name: string;
  pronouns: string;
  bio: string;
  tags: string[];
  lookingFor: Looking[];
  areaId: string;
  availability: string;
  boundaries: string;
  showDistance: boolean;
  showOnline: boolean;
  incognito: boolean;
  softDistance: boolean;
  photo: string | null;
  email: string;
};

export const BLANK_ME: Me = {
  name: "",
  pronouns: "",
  bio: "",
  tags: [],
  lookingFor: [],
  areaId: "cbd",
  availability: "Evenings",
  boundaries: "Ask before sending photos.",
  showDistance: false,
  showOnline: true,
  incognito: false,
  softDistance: true,
  photo: null,
  email: "",
};

export function hash(value: string) {
  let h = 0;
  for (let i = 0; i < value.length; i++) h = (h * 31 + value.charCodeAt(i)) >>> 0;
  return h;
}

export function areaById(id: string) {
  return AREAS.find((area) => area.id === id) ?? AREAS[6];
}

export function getPerson(id: string) {
  return PEOPLE.find((person) => person.id === id) ?? null;
}

export function kmBetween(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const r = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * r * Math.asin(Math.min(1, Math.sqrt(s)));
}

export function distanceBand(km: number, showDistance: boolean, soft: boolean) {
  if (!showDistance) return { label: "Distance hidden", detail: "No distance band" };
  if (km < 1) return { label: "Very close", detail: "Under 1 km" };
  if (km < 3) return { label: "Nearby", detail: "1–3 km" };
  if (km < 8) return { label: "A short ride", detail: "3–8 km" };
  if (km < 16) return { label: "Across town", detail: "8–16 km" };
  const far = { label: "A trip", detail: "16 km or more" };
  if (soft) return { label: far.label, detail: far.detail };
  return far;
}

export function bandText(km: number, showDistance: boolean, soft: boolean) {
  const band = distanceBand(km, showDistance, soft);
  if (!showDistance) return band.label;
  return soft ? band.label : band.detail;
}

export function isAdultYear(year: number | null) {
  if (!year) return false;
  return year <= new Date().getFullYear() - 18;
}

export function adultCutoff() {
  return new Date().getFullYear() - 18;
}

export function toggleItem<T extends string>(list: T[], value: T) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function presence(person: Person, now: number | null) {
  if (!person.showOnline) return false;
  if (now == null) return person.usuallyOnline;
  const slot = Math.floor(now / 120000);
  const flip = (hash(person.id) + slot) % 7 === 0;
  return flip ? !person.usuallyOnline : person.usuallyOnline;
}

export type Ranked = {
  person: Person;
  km: number;
  score: number;
  reasons: string[];
  online: boolean;
  shared: string[];
  band: string;
};

export function rankPeople(input: {
  filters: Filters;
  browseAreaId: string;
  me: Me;
  hidden: string[];
  blocked: string[];
  favourites: string[];
  now: number | null;
}) {
  const origin = areaById(input.browseAreaId);
  const query = input.filters.query.trim().toLowerCase();
  const rows: Ranked[] = [];

  for (const person of PEOPLE) {
    if (input.hidden.includes(person.id) || input.blocked.includes(person.id)) continue;
    if (input.filters.favouritesOnly && !input.favourites.includes(person.id)) continue;
    if (person.age < input.filters.minAge || person.age > input.filters.maxAge) continue;
    if (input.filters.verifiedOnly && !person.verified) continue;
    const online = presence(person, input.now);
    if (input.filters.onlineOnly && !online) continue;
    if (input.filters.lookingFor.length && !person.lookingFor.some((item) => input.filters.lookingFor.includes(item))) {
      continue;
    }
    if (input.filters.tags.length && !input.filters.tags.every((tag) => person.tags.includes(tag))) continue;
    const area = areaById(person.areaId);
    if (query) {
      const hay = [person.name, person.pronouns, person.bio, area.name, ...person.tags, ...person.lookingFor]
        .join(" ")
        .toLowerCase();
      if (!hay.includes(query)) continue;
    }
    const km = kmBetween(origin, area);
    if (km > input.filters.radiusKm) continue;

    const shared = person.tags.filter((tag) => input.me.tags.includes(tag));
    const sameIntent = person.lookingFor.some((item) => input.me.lookingFor.includes(item));
    const reasons: string[] = [];
    if (person.showDistance && km < 8) {
      reasons.push(km < 1 ? "Very close" : km < 3 ? "Nearby" : "Short ride");
    }
    if (online) reasons.push("Live now");
    if (shared.length) reasons.push(shared.length === 1 ? "1 shared" : `${shared.length} shared`);
    if (sameIntent) reasons.push("Same intent");
    if (person.repliesFast) reasons.push("Replies often");

    const distanceWeight = Math.max(0, 36 - km * 1.4);
    const fresh = online ? 22 : person.recency === "today" ? 10 : 0;
    const overlap = Math.min(24, shared.length * 8);
    const intentFit = sameIntent ? 18 : 4;
    const activity = person.repliesFast ? 6 : 0;
    const score = Math.round(distanceWeight + fresh + overlap + intentFit + activity);

    rows.push({
      person,
      km,
      score,
      reasons: reasons.slice(0, 3),
      online,
      shared,
      band: bandText(km, person.showDistance, input.me.softDistance),
    });
  }

  rows.sort((a, b) => {
    if (input.filters.sort === "near") return a.km - b.km || b.score - a.score;
    if (input.filters.sort === "active") {
      return Number(b.online) - Number(a.online) || (a.person.recency === b.person.recency ? 0 : a.person.recency === "today" ? -1 : 1) || b.score - a.score;
    }
    return b.score - a.score || a.km - b.km;
  });

  return rows;
}

export function shortTime(at: number, now = Date.now()) {
  const delta = Math.max(0, now - at);
  if (delta < 60_000) return "Now";
  if (delta < 3_600_000) return `${Math.floor(delta / 60_000)}m`;
  if (delta < 86_400_000) return `${Math.floor(delta / 3_600_000)}h`;
  return `${Math.floor(delta / 86_400_000)}d`;
}

export function windowTarget(kind: "hour" | "evening" | "tomorrow") {
  const now = new Date();
  if (kind === "hour") return { label: "In about an hour", target: Date.now() + 3_600_000 };
  if (kind === "evening") {
    const target = new Date(now);
    target.setHours(19, 0, 0, 0);
    if (target.getTime() < Date.now() + 30 * 60_000) target.setDate(target.getDate() + 1);
    return { label: "Evening, 7pm", target: target.getTime() };
  }
  const target = new Date(now);
  target.setDate(target.getDate() + 1);
  target.setHours(14, 0, 0, 0);
  return { label: "Tomorrow afternoon", target: target.getTime() };
}

export function lookingLabel(id: Looking) {
  return LOOKING.find((item) => item.id === id)?.label ?? id;
}
