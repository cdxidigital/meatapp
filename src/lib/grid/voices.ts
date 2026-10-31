const voices = new Map<string, string>();

export function rememberVoice(id: string, url: string) {
  voices.set(id, url);
}

export function voiceUrl(id: string) {
  return voices.get(id) ?? null;
}
