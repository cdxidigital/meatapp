import { i as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { c as Send, d as Mic, m as Lock, u as Phone } from "./_libs/lucide-react.mjs";
import { M as useGrid, f as Portrait, o as Frame, w as getPerson } from "./_ssr/ui-DkqkjVF3.mjs";
import { a as Route$3 } from "./_ssr/router-CCdndJ4K.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-D1hYEhar.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var voices = /* @__PURE__ */ new Map();
function rememberVoice(id, url) {
	voices.set(id, url);
}
function voiceUrl(id) {
	return voices.get(id) ?? null;
}
var REACTIONS = [
	{
		id: "warm",
		label: "Warm"
	},
	{
		id: "yes",
		label: "Yes"
	},
	{
		id: "later",
		label: "Later"
	}
];
function ChatPage() {
	const { id } = Route$3.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
		immersive: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatView, { id })
	});
}
var EMPTY_THREAD = [];
function ChatView({ id }) {
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
	const [text, setText] = (0, import_react.useState)("");
	const [seal, setSeal] = (0, import_react.useState)(false);
	const [picker, setPicker] = (0, import_react.useState)(null);
	const [recording, setRecording] = (0, import_react.useState)(false);
	const endRef = (0, import_react.useRef)(null);
	const recorder = (0, import_react.useRef)(null);
	const lastAt = messages[messages.length - 1]?.at ?? 0;
	(0, import_react.useEffect)(() => {
		markRead(id);
	}, [
		id,
		lastAt,
		markRead
	]);
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({ block: "end" });
	}, [messages.length, typingId]);
	if (!person) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/inbox",
			className: "font-semibold text-ember",
			children: "Back to inbox"
		})
	});
	async function toggleRecord() {
		if (recorder.current) {
			recorder.current.stop();
			return;
		}
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const mime = typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "";
			const media = new MediaRecorder(stream, mime ? { mimeType: mime } : void 0);
			const chunks = [];
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "safe-top flex items-center gap-2 border-b border-line px-3 pb-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/p/$id",
						params: { id },
						"aria-label": `Back to ${person.name}`,
						className: "press inline-flex min-h-11 items-center px-1 text-sm font-semibold",
						children: "Back"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "relative size-10 overflow-hidden rounded-2xl bg-raised",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
							id: person.id,
							name: person.name,
							size: "sm"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "truncate text-base font-semibold",
							children: person.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-muted",
							children: typingId === id ? "Typing" : person.pronouns
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/call/$id",
						params: { id },
						className: "press inline-flex min-h-11 items-center gap-2 rounded-full bg-raised px-3 text-sm font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
							className: "size-4",
							"aria-hidden": "true"
						}), " Call"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto w-full max-w-lg flex-1 space-y-3 overflow-y-auto px-3 py-4",
				children: [
					messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "rounded-2xl border border-line bg-surface px-3 py-4 text-sm text-muted",
						children: [person.boundaries, " Say hello when you mean it."]
					}) : null,
					messages.map((msg) => {
						const mine = msg.from === "me";
						const audio = msg.voice ? voiceUrl(msg.id) : null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: mine ? "ml-auto max-w-[85%]" : "max-w-[85%]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: mine ? "rounded-2xl rounded-br-md bg-ember px-3 py-2 text-ember-ink" : "rounded-2xl rounded-bl-md bg-raised px-3 py-2",
									children: msg.voice ? audio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
										controls: true,
										src: audio
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm",
										children: "Voice note ended with this session. It was never uploaded."
									}) : msg.seal === "sealed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-semibold",
											children: "View-once note"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs opacity-80",
											children: "Opens once, then disappears from this chat."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "press mt-2 min-h-11 text-sm font-semibold underline",
											onClick: () => openSeal(id, msg.id),
											children: "Open once"
										})
									] }) : msg.seal === "read" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm",
										children: msg.text
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-mono text-xs opacity-70",
										children: "Disappears in a few seconds"
									})] }) : msg.seal === "expired" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm",
										children: "This note expired."
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm",
										children: msg.text
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex flex-wrap items-center gap-2",
									children: [msg.reaction ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold text-ember",
										children: REACTIONS.find((item) => item.id === msg.reaction)?.label
									}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "min-h-11 text-xs text-faint",
										onClick: () => setPicker(picker === msg.id ? null : msg.id),
										children: "React"
									})]
								}),
								picker === msg.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 flex gap-2",
									children: REACTIONS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "press min-h-11 rounded-full border border-line px-3 text-xs",
										onClick: () => {
											react(id, msg.id, item.id);
											setPicker(null);
										},
										children: item.label
									}, item.id))
								}) : null
							]
						}, msg.id);
					}),
					typingId === id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Typing…"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
				className: "safe-bottom border-t border-line bg-bg px-3 py-3",
				onSubmit: (event) => {
					event.preventDefault();
					submit();
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-lg items-end gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": seal,
							"aria-label": seal ? "Sealed note on" : "Seal a view-once note",
							className: seal ? "press grid size-11 place-items-center rounded-full bg-ember text-ember-ink" : "press grid size-11 place-items-center rounded-full bg-raised",
							onClick: () => setSeal((value) => !value),
							disabled: blocked || recording,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": recording,
							"aria-label": recording ? "Stop voice note" : "Record a voice note",
							className: recording ? "press grid size-11 place-items-center rounded-full bg-ember text-ember-ink" : "press grid size-11 place-items-center rounded-full bg-raised",
							onClick: () => void toggleRecord(),
							disabled: blocked || seal,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "sr-only",
							htmlFor: "composer",
							children: "Message"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							id: "composer",
							rows: 1,
							maxLength: 500,
							value: text,
							disabled: blocked,
							placeholder: blocked ? "Blocked" : seal ? "View-once note" : recording ? "Recording…" : "Message",
							className: "field max-h-32 min-h-11 flex-1 resize-none",
							onChange: (event) => setText(event.target.value),
							onKeyDown: (event) => {
								if (event.key === "Enter" && !event.shiftKey) {
									event.preventDefault();
									submit();
								}
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "press grid size-11 place-items-center rounded-full bg-ember text-ember-ink disabled:opacity-40",
							"aria-label": "Send",
							disabled: blocked || !text.trim(),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-5" })
						})
					]
				})
			})
		]
	});
}
//#endregion
export { ChatPage as component };
