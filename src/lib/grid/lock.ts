const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function makeLoginCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  let code = "";
  for (const byte of bytes) code += ALPHABET[byte % ALPHABET.length];
  return code;
}

export function loginPayload(code: string) {
  return `MEAT1.${code}`;
}

export function parseLoginCode(raw: string) {
  const text = raw.trim().toUpperCase().replace(/\s+/g, "");
  return text.startsWith("MEAT1.") ? text.slice(6) : text;
}

export async function hashCode(code: string) {
  const data = new TextEncoder().encode(parseLoginCode(code));
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function randomBytes(size: number) {
  return crypto.getRandomValues(new Uint8Array(size));
}

function toBase64Url(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let text = "";
  for (const byte of bytes) text += String.fromCharCode(byte);
  return btoa(text).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const text = atob(padded);
  const bytes = new Uint8Array(text.length);
  for (let index = 0; index < text.length; index += 1) bytes[index] = text.charCodeAt(index);
  return bytes;
}

export function passkeySupported() {
  return typeof window !== "undefined" && typeof PublicKeyCredential !== "undefined" && !!navigator.credentials;
}

export async function createPasskey(name: string) {
  const credential = (await navigator.credentials.create({
    publicKey: {
      challenge: randomBytes(32),
      rp: { name: "MEAT", id: location.hostname },
      user: { id: randomBytes(16), name: name || "you", displayName: name || "You" },
      pubKeyCredParams: [
        { type: "public-key", alg: -7 },
        { type: "public-key", alg: -257 },
      ],
      authenticatorSelection: { authenticatorAttachment: "platform", residentKey: "preferred", userVerification: "required" },
      timeout: 60_000,
      attestation: "none",
    },
  })) as PublicKeyCredential | null;
  if (!credential) throw new Error("cancelled");
  return toBase64Url(credential.rawId);
}

export async function unlockPasskey(credentialId: string) {
  const credential = await navigator.credentials.get({
    publicKey: {
      challenge: randomBytes(32),
      rpId: location.hostname,
      allowCredentials: [{ type: "public-key", id: fromBase64Url(credentialId) }],
      userVerification: "required",
      timeout: 60_000,
    },
  });
  return Boolean(credential);
}
