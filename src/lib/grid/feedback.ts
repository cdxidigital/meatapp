export type FeedbackCall = "continue" | "hold" | "pass";
export type FeedbackDecision = "pending" | FeedbackCall;

export type Assessment = {
  app: number;
  lives: number;
  profit: number;
  durable: number;
  harms: string[];
  notes: string[];
  call: FeedbackCall;
  summary: string;
};

export type FeedbackItem = {
  id: string;
  text: string;
  at: number;
  assessment: Assessment;
  decision: FeedbackDecision;
  decidedAt: number | null;
};

const APP = ["bug", "crash", "slow", "confusing", "filter", "search", "layout", "readable", "notification", "offline", "error", "clearer", "faster", "simpler", "keyboard", "contrast", "empty state"];
const LIVES = ["safe", "safety", "block", "report", "consent", "privacy", "respect", "boundary", "honest", "quiet", "pressure", "time", "wellbeing", "well-being", "anxious", "lonely"];
const PROFIT = ["return", "invite", "share", "subscribe", "premium", "plus", "pay", "retain", "referral", "worth paying", "come back"];
const DURABLE = ["local", "privacy", "expire", "consent", "device", "offline", "export", "backup", "accessible", "plain language"];

const HARMS: { phrase: string; reason: string }[] = [
  { phrase: "under 18", reason: "It would weaken the age line." },
  { phrase: "younger than 18", reason: "It would weaken the age line." },
  { phrase: "minors", reason: "It would weaken the age line." },
  { phrase: "exact location", reason: "It would publish a precise spot." },
  { phrase: "street address", reason: "It would publish a precise spot." },
  { phrase: "always share location", reason: "It would publish a precise spot." },
  { phrase: "paywall safety", reason: "Safety would cost money." },
  { phrase: "charge for block", reason: "Safety would cost money." },
  { phrase: "charge for report", reason: "Safety would cost money." },
  { phrase: "skip consent", reason: "It would skip a clear yes." },
  { phrase: "no consent", reason: "It would skip a clear yes." },
  { phrase: "blanket consent", reason: "It would treat a profile as a yes." },
];

function has(text: string, phrase: string) {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?:^|[^a-z0-9])${escaped}(?=$|[^a-z0-9])`, "i").test(text);
}

function hits(text: string, phrases: string[]) {
  return phrases.reduce((count, phrase) => count + (has(text, phrase) ? 1 : 0), 0);
}

function score(count: number, base: number) {
  return Math.max(0, Math.min(100, base + count * 22));
}

export function assessFeedback(raw: string): Assessment {
  const text = raw.trim().toLowerCase();
  const harms = HARMS.filter((item) => has(text, item.phrase)).map((item) => item.reason);
  const uniqueHarms = [...new Set(harms)];
  const thin = text.length < 24;
  const appHits = hits(text, APP);
  const lifeHits = hits(text, LIVES);
  const profitHits = hits(text, PROFIT);
  const durableHits = hits(text, DURABLE);
  const base = thin ? 0 : 12;
  const app = score(appHits, base);
  const lives = score(lifeHits, base);
  const profit = score(profitHits, base);
  const durable = score(durableHits, thin ? 0 : 18);
  const notes: string[] = [];
  if (appHits) notes.push("It would make the product clearer or more reliable.");
  if (lifeHits) notes.push("It would make using MEAT safer, calmer, or more honest.");
  if (profitHits) notes.push("It could bring people back or make a paid extra worth it.");
  if (!notes.length && !thin) notes.push("It doesn’t say which of those three it would change.");
  if (durableHits) notes.push("It still helps if the look of the app changes.");
  else if (!thin) notes.push("It isn’t tied to a habit that outlasts one release.");

  let call: FeedbackCall = "pass";
  let summary = "Not enough there to change the product.";
  const best = Math.max(app, lives, profit);
  if (uniqueHarms.length) {
    call = "pass";
    summary = "Don’t continue. It would cost safety, privacy, or the age line.";
  } else if (thin) {
    call = "hold";
    summary = "Say what should change, and who it helps.";
  } else if (best >= 56) {
    call = "continue";
    summary = "Worth a next version. It helps at least one of the three, without a hard stop.";
  } else if (best >= 28) {
    call = "hold";
    summary = "Possible. It needs a sharper reason before it becomes work.";
  }

  return { app, lives, profit, durable, harms: uniqueHarms, notes, call, summary };
}
