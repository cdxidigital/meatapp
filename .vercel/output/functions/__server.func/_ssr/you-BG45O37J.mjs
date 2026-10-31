import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { M as useGrid, _ as Toggle, c as Monogram, d as PRONOUNS, g as TAGS, j as toggleItem, l as NoticesButton, n as AVAILABILITY, o as Frame, s as LOOKING, t as AREAS, x as areaById } from "./ui-DkqkjVF3.mjs";
import { c as hashCode, l as makeLoginCode, o as QrCard, s as createPasskey, u as passkeySupported } from "./router-CCdndJ4K.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/you-BG45O37J.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function compressImage(file) {
	const bitmap = await createImageBitmap(file);
	const scale = Math.min(1, 720 / Math.max(bitmap.width, bitmap.height));
	const canvas = document.createElement("canvas");
	canvas.width = Math.max(1, Math.round(bitmap.width * scale));
	canvas.height = Math.max(1, Math.round(bitmap.height * scale));
	const ctx = canvas.getContext("2d");
	if (!ctx) {
		bitmap.close();
		throw new Error("Could not read that image");
	}
	ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
	bitmap.close();
	return canvas.toDataURL("image/jpeg", .72);
}
function YouPage() {
	const me = useGrid((s) => s.me);
	const patchMe = useGrid((s) => s.patchMe);
	const pushToast = useGrid((s) => s.pushToast);
	const birthYear = useGrid((s) => s.gate.birthYear);
	const age = birthYear ? (/* @__PURE__ */ new Date()).getFullYear() - birthYear : null;
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [spare, setSpare] = (0, import_react.useState)(null);
	const lock = useGrid((s) => s.lock);
	const devicePeople = useGrid((s) => s.devicePeople);
	const deviceAlerts = useGrid((s) => s.deviceAlerts);
	const area = areaById(me.areaId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "safe-top flex items-center justify-between px-3 pt-4 lg:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-xl items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-extrabold",
				children: "You"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoticesButton, {})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl space-y-6 px-3 py-4 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "overflow-hidden rounded-card border border-line bg-surface",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[7.5rem_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative aspect-portrait bg-raised",
						children: me.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: me.photo,
							alt: "",
							className: "cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monogram, {
							id: "you",
							name: me.name || "You"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs uppercase tracking-wide text-muted",
								children: "How you appear"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 text-xl font-semibold",
								children: me.name || "Unnamed"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: [
									me.pronouns,
									age ? `${age}` : null,
									area.name
								].filter(Boolean).join(" · ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-3 space-y-1 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: me.incognito ? "Not listed" : "Listed nearby" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: me.showOnline ? "Live mark can show" : "Live mark hidden" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: me.showDistance ? "Distance band visible" : "Distance hidden" })
								]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "press inline-flex min-h-11 cursor-pointer items-center rounded-2xl border border-line bg-raised px-4 text-sm font-semibold",
					children: [busy ? "Reading photo…" : me.photo ? "Replace photo" : "Add a photo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "sr-only",
						type: "file",
						accept: "image/*",
						disabled: busy,
						onChange: (event) => {
							const file = event.target.files?.[0];
							event.target.value = "";
							if (!file) return;
							setBusy(true);
							compressImage(file).then((photo) => patchMe({ photo })).catch(() => pushToast("Couldn’t read that image")).finally(() => setBusy(false));
						}
					})]
				}), me.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "press min-h-11 text-sm font-semibold text-ember",
					onClick: () => patchMe({ photo: null }),
					children: "Remove photo"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "-mt-3 text-xs text-faint",
				children: "Kept on this device."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1 block text-sm text-muted",
					children: "Display name"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "field",
					maxLength: 40,
					value: me.name,
					onChange: (event) => patchMe({ name: event.target.value })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1 block text-sm text-muted",
					children: "Email, if you added one"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "field",
					type: "email",
					autoComplete: "email",
					maxLength: 80,
					value: me.email ?? "",
					onChange: (event) => patchMe({ email: event.target.value.trim() })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-sm text-muted",
				children: "Pronouns"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: PRONOUNS.map((pronoun) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": me.pronouns === pronoun,
					className: chip(me.pronouns === pronoun),
					onClick: () => patchMe({ pronouns: pronoun }),
					children: pronoun
				}, pronoun))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1 block text-sm text-muted",
					children: "About"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: "field min-h-28 resize-none",
					maxLength: 280,
					value: me.bio,
					onChange: (event) => patchMe({ bio: event.target.value })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-sm text-muted",
				children: "Home area"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: AREAS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": me.areaId === item.id,
					className: chip(me.areaId === item.id),
					onClick: () => patchMe({ areaId: item.id }),
					children: item.name
				}, item.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-sm text-muted",
				children: "Open to"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: LOOKING.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": me.lookingFor.includes(item.id),
					className: chip(me.lookingFor.includes(item.id)),
					onClick: () => patchMe({ lookingFor: toggleItem(me.lookingFor, item.id) }),
					children: item.label
				}, item.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-sm text-muted",
				children: "Interests"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: TAGS.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": me.tags.includes(tag),
					className: chip(me.tags.includes(tag)),
					onClick: () => patchMe({ tags: toggleItem(me.tags, tag) }),
					children: tag
				}, tag))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1 block text-sm text-muted",
					children: "Usually free"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "field",
					value: me.availability,
					onChange: (event) => patchMe({ availability: event.target.value }),
					children: AVAILABILITY.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1 block text-sm text-muted",
					children: "Boundaries"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: "field min-h-24 resize-none",
					maxLength: 240,
					value: me.boundaries,
					onChange: (event) => patchMe({ boundaries: event.target.value })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "lock",
				className: "scroll-mt-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-bold",
						children: "Login"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "A passkey uses this phone. A QR is a spare key you keep. The next visit stays locked until one of them opens it."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [lock.credentialId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "press min-h-11 rounded-full border border-line px-4 text-sm",
							onClick: () => useGrid.getState().setLock({ credentialId: null }),
							children: "Remove passkey"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "press min-h-11 rounded-2xl bg-ember px-4 text-sm font-semibold text-ember-ink disabled:opacity-40",
							disabled: !passkeySupported(),
							onClick: () => {
								createPasskey(me.name || "You").then((credentialId) => {
									useGrid.getState().setLock({ credentialId });
									pushToast("Passkey saved on this device");
								}).catch(() => pushToast("Passkey wasn’t created"));
							},
							children: "Add a passkey"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "press min-h-11 rounded-2xl border border-line bg-raised px-4 text-sm font-semibold",
							onClick: () => {
								const code = makeLoginCode();
								hashCode(code).then((codeHash) => {
									useGrid.getState().setLock({ codeHash });
									setSpare(code);
								});
							},
							children: lock.codeHash ? "New QR spare key" : "Create a QR spare key"
						})]
					}),
					!passkeySupported() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "This browser can’t make a passkey. Use a QR spare key."
					}) : null,
					lock.credentialId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: "Passkey is on."
					}) : null,
					spare ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCard, { code: spare })
					}) : lock.codeHash ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "A spare key is saved. A new QR replaces the old one."
					}) : null,
					lock.credentialId || lock.codeHash ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "press mt-3 min-h-11 text-sm font-semibold text-ember",
						onClick: () => useGrid.getState().clearLock(),
						children: "Remove login"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-bold",
					children: "On this device"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Your profile is stored in this browser. Anyone you save is copied here too, including their photo."
				}),
				devicePeople.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "No one else is saved yet. Open a profile and choose Save."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 divide-y divide-line border-y border-line",
					children: devicePeople.map((person) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/p/$id",
						params: { id: person.id },
						className: "flex min-h-11 items-center justify-between text-sm font-semibold",
						children: [person.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							children: "→"
						})]
					}) }, person.id))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl font-bold",
				children: "Privacy"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 divide-y divide-line border-y border-line",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						on: me.showOnline,
						label: "Show that I’m around",
						hint: "Turn off to hide a live mark.",
						onChange: (showOnline) => patchMe({ showOnline })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						on: me.showDistance,
						label: "Show a distance band",
						hint: "Off means people in range only see that distance is hidden.",
						onChange: (showDistance) => patchMe({ showDistance })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						on: me.softDistance,
						label: "Soft distance labels",
						hint: "Nearby, instead of a kilometre band. Exact distance is never shown.",
						onChange: (softDistance) => patchMe({ softDistance })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						on: me.incognito,
						label: "Incognito",
						hint: "Browse without being listed.",
						onChange: (incognito) => patchMe({ incognito })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						on: deviceAlerts,
						label: "Alerts on this device",
						hint: "Replies, plans, and check-ins can alert this browser when MEAT is in the background.",
						onChange: (on) => {
							if (!on) {
								useGrid.getState().setDeviceAlerts(false);
								return;
							}
							if (typeof Notification === "undefined") {
								pushToast("This browser has no alerts");
								return;
							}
							if (Notification.permission === "denied") {
								pushToast("This browser is blocking alerts");
								return;
							}
							if (Notification.permission === "granted") {
								useGrid.getState().setDeviceAlerts(true);
								return;
							}
							Notification.requestPermission().then((result) => {
								if (result === "granted") useGrid.getState().setDeviceAlerts(true);
								else pushToast("Alerts stay inside MEAT");
							});
						}
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/help",
				className: "press flex min-h-11 items-center justify-between rounded-2xl border border-line bg-raised px-4 text-sm font-semibold",
				children: ["Help and tutorial", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					children: "→"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/safety",
				className: "press flex min-h-11 items-center justify-between rounded-2xl border border-line bg-raised px-4 text-sm font-semibold",
				children: ["Safety centre", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					children: "→"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-faint",
				children: "Photos, chats, and this profile stay in this browser. Age uses your birth year, not the exact day."
			})
		]
	})] });
}
function chip(on) {
	return on ? "press min-h-11 rounded-full border border-ember bg-ember px-3 text-sm font-medium text-ember-ink" : "press min-h-11 rounded-full border border-line bg-raised px-3 text-sm font-medium";
}
//#endregion
export { YouPage as component };
