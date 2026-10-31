import type { Me, Person } from "@/lib/grid/model";

export type DeviceProfile = {
  id: string;
  name: string;
  pronouns: string;
  age: number | null;
  areaId: string;
  bio: string;
  tags: string[];
  lookingFor: string[];
  availability: string;
  boundaries: string;
  verified: boolean;
  photo: Blob | null;
  savedAt: number;
  self: boolean;
};

const DB_NAME = "meat-device";
const STORE = "profiles";

function openDb() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("no-db"));
      return;
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function run<T>(mode: IDBTransactionMode, fn: (store: IDBObjectStore) => IDBRequest<T>) {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const tx = db.transaction(STORE, mode);
        const request = fn(tx.objectStore(STORE));
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      }),
  );
}

export function writeDeviceProfile(profile: DeviceProfile) {
  return run("readwrite", (store) => store.put(profile, profile.id)).then(() => undefined);
}

export function deleteDeviceProfile(id: string) {
  return run("readwrite", (store) => store.delete(id)).then(() => undefined);
}

export function listDeviceProfiles() {
  return run<DeviceProfile[]>("readonly", (store) => store.getAll());
}

export function clearDeviceProfiles() {
  return new Promise<void>((resolve) => {
    if (typeof indexedDB === "undefined") {
      resolve();
      return;
    }
    const request = indexedDB.deleteDatabase(DB_NAME);
    request.onsuccess = () => resolve();
    request.onerror = () => resolve();
    request.onblocked = () => resolve();
  });
}

export async function savePersonProfile(person: Person) {
  let photo: Blob | null = null;
  try {
    const response = await fetch(`/portraits/${person.id}.jpg`);
    if (response.ok) photo = await response.blob();
  } catch {
    photo = null;
  }
  await writeDeviceProfile({
    id: person.id,
    name: person.name,
    pronouns: person.pronouns,
    age: person.age,
    areaId: person.areaId,
    bio: person.bio,
    tags: [...person.tags],
    lookingFor: [...person.lookingFor],
    availability: person.availability,
    boundaries: person.boundaries,
    verified: person.verified,
    photo,
    savedAt: Date.now(),
    self: false,
  });
}

function dataUrlToBlob(value: string | null) {
  if (!value?.startsWith("data:")) return null;
  const [head, body] = value.split(",");
  if (!body) return null;
  const mime = /:(.*?);/.exec(head)?.[1] ?? "image/jpeg";
  const binary = atob(body);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return new Blob([bytes], { type: mime });
}

export function saveSelfProfile(me: Me, age: number | null) {
  return writeDeviceProfile({
    id: "me",
    name: me.name || "You",
    pronouns: me.pronouns,
    age,
    areaId: me.areaId,
    bio: me.bio,
    tags: [...me.tags],
    lookingFor: [...me.lookingFor],
    availability: me.availability,
    boundaries: me.boundaries,
    verified: false,
    photo: dataUrlToBlob(me.photo),
    savedAt: Date.now(),
    self: true,
  });
}
