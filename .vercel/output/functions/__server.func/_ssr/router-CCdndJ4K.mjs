import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as useRouter, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { o as TriangleAlert } from "../_libs/lucide-react.mjs";
import { M as useGrid, T as isAdultYear, _ as Toggle, b as adultCutoff, d as PRONOUNS, f as Portrait, g as TAGS, i as Chip, j as toggleItem, r as Button, s as LOOKING, t as AREAS, u as PEOPLE, y as Wordmark } from "./ui-DkqkjVF3.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as renderSVG } from "../_libs/uqr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CCdndJ4K.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "Something unexpected happened. Reload, or go back to the list.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-bg px-6 text-center text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-ember",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
						className: "mx-auto size-8",
						strokeWidth: 2
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-3xl font-extrabold",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm break-words text-muted",
					children: errorMessage(error)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-col items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "press min-h-11 font-semibold text-ember",
						onClick: () => window.location.reload(),
						children: "Reload"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex min-h-11 items-center text-sm text-muted",
						children: "Back to nearby"
					})]
				})
			]
		})
	});
}
function AppNotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-bg px-6 text-center text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-wide text-ember",
					children: "MEAT"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl font-extrabold",
					children: "That page isn’t here."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "The link may be old, or it never existed."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-6 inline-flex min-h-11 items-center font-semibold text-ember",
					children: "Back to nearby"
				})
			]
		})
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function Gate() {
	const hydrated = useGrid((s) => s.hydrated);
	const birthYear = useGrid((s) => s.gate.birthYear);
	const onboarded = useGrid((s) => s.onboarded);
	const me = useGrid((s) => s.me);
	const setHydrated = useGrid((s) => s.setHydrated);
	const setGateYear = useGrid((s) => s.setGateYear);
	const clearGate = useGrid((s) => s.clearGate);
	const patchMe = useGrid((s) => s.patchMe);
	const finish = useGrid((s) => s.finishOnboarding);
	const [year, setYear] = (0, import_react.useState)("");
	const [checked, setChecked] = (0, import_react.useState)(false);
	const [step, setStep] = (0, import_react.useState)(0);
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	(0, import_react.useEffect)(() => {
		useGrid.persist.rehydrate();
		const id = window.setTimeout(() => setHydrated(), 1200);
		return () => window.clearTimeout(id);
	}, [setHydrated]);
	if (pathname === "/info") return null;
	if (hydrated && isAdultYear(birthYear) && onboarded) return null;
	if (birthYear !== null && !isAdultYear(birthYear)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 grid place-items-center bg-bg px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rise max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-8 font-display text-4xl font-extrabold",
					children: "You can’t use MEAT yet."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted",
					children: "This space is for people who are already 18. A birth year is a check, not an identity proof."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-8",
					variant: "ghost",
					onClick: clearGate,
					children: "Entered the wrong year"
				})
			]
		})
	});
	if (!isAdultYear(birthYear)) {
		const cutoff = adultCutoff();
		const years = Array.from({ length: cutoff - 1940 + 1 }, (_, index) => cutoff - index);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-40 overflow-y-auto bg-bg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid min-h-dvh lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative hidden lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-full grid-cols-2",
						children: PEOPLE.slice(0, 6).map((person, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative min-h-24 overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
								id: person.id,
								name: person.name,
								eager: index < 2
							})
						}, person.id))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rise flex flex-col px-5 pt-5 pb-8 lg:justify-center lg:px-12 lg:py-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 font-mono text-xs uppercase tracking-wide text-ember",
							children: "Perth · men"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 font-display text-3xl font-extrabold leading-none lg:text-4xl",
							children: "Nearby, without the pin."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-md text-sm text-muted",
							children: "A social space for men seeking men. Distance is a band, never a pin. What you add stays on this device."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex lg:hidden",
							children: PEOPLE.slice(0, 5).map((person) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "relative -ml-2 size-11 overflow-hidden rounded-full border-2 border-bg first:ml-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
									id: person.id,
									name: person.name,
									eager: true,
									size: "sm"
								})
							}, person.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "mt-5 max-w-md space-y-3",
							onSubmit: (event) => {
								event.preventDefault();
								if (!year || !checked) return;
								setGateYear(Number(year));
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mb-1 block text-sm text-muted",
										children: "Year of birth"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: "field",
										value: year,
										autoComplete: "bday-year",
										onChange: (event) => setYear(event.target.value),
										required: true,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "Select a year"
										}), years.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: item,
											children: item
										}, item))]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex min-h-11 items-start gap-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										className: "mt-1 size-5",
										checked,
										onChange: (event) => setChecked(event.target.checked)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "I am 18 or older. If I turn 18 this year but haven’t yet, I’ll wait." })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									className: "w-full",
									disabled: !year || !checked,
									children: "Continue"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-faint",
									children: "Your birth year stays in this browser. It is not uploaded."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/info",
									className: "inline-flex min-h-11 items-center text-sm font-semibold text-ember",
									children: "Sign up"
								})
							]
						})
					]
				})]
			})
		});
	}
	const progress = (step + 1) / 3;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 overflow-y-auto bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex min-h-dvh max-w-lg flex-col px-5 pt-6 pb-28",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 h-1 overflow-hidden rounded-full bg-line",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full bg-ember",
						style: { width: `${progress * 100}%` }
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 font-mono text-xs uppercase tracking-wide text-muted",
					children: [
						"Step ",
						step + 1,
						" of 3"
					]
				}),
				step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rise mt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl font-extrabold",
							children: "What should people call you?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-muted",
							children: "Display name only. MEAT never asks for a legal name."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-6 block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-sm text-muted",
								children: "Display name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								maxLength: 40,
								value: me.name,
								placeholder: "What people call you",
								onChange: (event) => patchMe({ name: event.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 mt-5 text-sm text-muted",
							children: "Pronouns, if you want them shown"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: PRONOUNS.map((pronoun) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								on: me.pronouns === pronoun,
								onClick: () => patchMe({ pronouns: pronoun }),
								children: pronoun
							}, pronoun))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-3 block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: "Custom pronouns"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								maxLength: 24,
								value: PRONOUNS.includes(me.pronouns) ? "" : me.pronouns,
								placeholder: "Or write your own",
								onChange: (event) => patchMe({ pronouns: event.target.value })
							})]
						})
					]
				}) : null,
				step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rise mt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl font-extrabold",
							children: "What are you open to?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-muted",
							children: "Pick at least one intent. Interests help explain why someone appears."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 flex flex-wrap gap-2",
							children: LOOKING.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								on: me.lookingFor.includes(item.id),
								onClick: () => patchMe({ lookingFor: toggleItem(me.lookingFor, item.id) }),
								children: item.label
							}, item.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 mt-6 text-sm text-muted",
							children: "Interests"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: TAGS.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								on: me.tags.includes(tag),
								onClick: () => patchMe({ tags: toggleItem(me.tags, tag) }),
								children: tag
							}, tag))
						})
					]
				}) : null,
				step === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rise mt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl font-extrabold",
							children: "Where are you local?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-muted",
							children: "This sets your home area in Perth. It is not a live pin, and travel later only changes what you browse."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 flex flex-wrap gap-2",
							children: AREAS.map((area) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								on: me.areaId === area.id,
								onClick: () => patchMe({ areaId: area.id }),
								children: area.name
							}, area.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 divide-y divide-line border-y border-line",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
									on: me.showOnline,
									label: "Show that I’m around",
									hint: "People can see a live mark. Turn it off and you stay quiet.",
									onChange: (showOnline) => patchMe({ showOnline })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
									on: me.showDistance,
									label: "Show a distance band",
									hint: "Off by default. Others only see that you’re in range, not how close.",
									onChange: (showDistance) => patchMe({ showDistance })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
									on: me.incognito,
									label: "Incognito",
									hint: "You can browse. You won’t be listed.",
									onChange: (incognito) => patchMe({ incognito })
								})
							]
						})
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex gap-2 pt-8",
					children: [step > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => setStep((value) => value - 1),
						children: "Back"
					}) : null, step < 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "flex-1",
						disabled: step === 0 ? me.name.trim().length < 1 : me.lookingFor.length < 1,
						onClick: () => setStep((value) => value + 1),
						children: "Next"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "flex-1",
						onClick: finish,
						disabled: me.name.trim().length < 1 || me.lookingFor.length < 1,
						children: "Enter the grid"
					})]
				})
			]
		})
	});
}
var ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function makeLoginCode() {
	const bytes = crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(16));
	let code = "";
	for (const byte of bytes) code += ALPHABET[byte % 32];
	return code;
}
function loginPayload(code) {
	return `MEAT1.${code}`;
}
function parseLoginCode(raw) {
	const text = raw.trim().toUpperCase().replace(/\s+/g, "");
	return text.startsWith("MEAT1.") ? text.slice(6) : text;
}
async function hashCode(code) {
	const data = new TextEncoder().encode(parseLoginCode(code));
	const digest = await crypto.subtle.digest("SHA-256", data);
	return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
function randomBytes(size) {
	return crypto.getRandomValues(new Uint8Array(size));
}
function toBase64Url(buffer) {
	const bytes = new Uint8Array(buffer);
	let text = "";
	for (const byte of bytes) text += String.fromCharCode(byte);
	return btoa(text).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
function fromBase64Url(value) {
	const padded = value.replace(/-/g, "+").replace(/_/g, "/");
	const text = atob(padded);
	const bytes = new Uint8Array(text.length);
	for (let index = 0; index < text.length; index += 1) bytes[index] = text.charCodeAt(index);
	return bytes;
}
function passkeySupported() {
	return typeof window !== "undefined" && typeof PublicKeyCredential !== "undefined" && !!navigator.credentials;
}
async function createPasskey(name) {
	const credential = await navigator.credentials.create({ publicKey: {
		challenge: randomBytes(32),
		rp: {
			name: "MEAT",
			id: location.hostname
		},
		user: {
			id: randomBytes(16),
			name: name || "you",
			displayName: name || "You"
		},
		pubKeyCredParams: [{
			type: "public-key",
			alg: -7
		}, {
			type: "public-key",
			alg: -257
		}],
		authenticatorSelection: {
			authenticatorAttachment: "platform",
			residentKey: "preferred",
			userVerification: "required"
		},
		timeout: 6e4,
		attestation: "none"
	} });
	if (!credential) throw new Error("cancelled");
	return toBase64Url(credential.rawId);
}
async function unlockPasskey(credentialId) {
	const credential = await navigator.credentials.get({ publicKey: {
		challenge: randomBytes(32),
		rpId: location.hostname,
		allowCredentials: [{
			type: "public-key",
			id: fromBase64Url(credentialId)
		}],
		userVerification: "required",
		timeout: 6e4
	} });
	return Boolean(credential);
}
function QrCard({ code }) {
	const svg = renderSVG(loginPayload(code), {
		pixelSize: 8,
		whiteColor: "#f4f0e6",
		blackColor: "#14110e",
		ecc: "M"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-card bg-[#f4f0e6] p-4 text-[#14110e]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto w-56 [&_svg]:h-auto [&_svg]:w-full",
				dangerouslySetInnerHTML: { __html: svg }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 break-all text-center font-mono text-sm tracking-wide",
				children: code
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-center text-xs",
				children: "Save this. It is shown once. The next visit can scan it or type it."
			})
		]
	});
}
function LockScreen() {
	const hydrated = useGrid((s) => s.hydrated);
	const onboarded = useGrid((s) => s.onboarded);
	const birthYear = useGrid((s) => s.gate.birthYear);
	const lock = useGrid((s) => s.lock);
	const sessionOpen = useGrid((s) => s.sessionOpen);
	const openSession = useGrid((s) => s.openSession);
	const erase = useGrid((s) => s.erase);
	const [code, setCode] = (0, import_react.useState)("");
	const [scan, setScan] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [wiping, setWiping] = (0, import_react.useState)(false);
	const locked = Boolean(lock.credentialId || lock.codeHash);
	if (!hydrated || !onboarded || !isAdultYear(birthYear) || !locked || sessionOpen) return null;
	async function tryCode(raw) {
		if (!lock.codeHash) return;
		if (await hashCode(raw) === lock.codeHash) {
			openSession();
			return;
		}
		setError("That code doesn’t match.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 overflow-y-auto bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex min-h-dvh max-w-md flex-col px-5 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-8 font-display text-4xl font-extrabold",
					children: "Unlock MEAT"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "This browser already has your list. A passkey or your spare QR opens it. Nothing is sent to a server."
				}),
				lock.credentialId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "press mt-6 min-h-11 rounded-2xl bg-ember text-sm font-semibold text-ember-ink disabled:opacity-40",
					disabled: busy || !passkeySupported(),
					onClick: () => {
						setBusy(true);
						setError("");
						unlockPasskey(lock.credentialId).then((ok) => {
							if (ok) openSession();
							else setError("Passkey was cancelled.");
						}).catch(() => setError("This browser couldn’t use the passkey.")).finally(() => setBusy(false));
					},
					children: "Unlock with passkey"
				}) : null,
				lock.codeHash ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-4 space-y-3",
					onSubmit: (event) => {
						event.preventDefault();
						tryCode(code);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-sm text-muted",
								children: "Spare key"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field font-mono uppercase",
								autoCapitalize: "characters",
								autoComplete: "off",
								value: code,
								onChange: (event) => setCode(parseLoginCode(event.target.value))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "press min-h-11 w-full rounded-2xl border border-line bg-raised text-sm font-semibold",
							children: "Unlock with code"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "press min-h-11 w-full text-sm font-semibold text-ember",
							onClick: () => setScan((open) => !open),
							children: scan ? "Close camera" : "Scan QR"
						}),
						scan ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrScanner, { onCode: (value) => void tryCode(value) }) : null
					]
				}) : null,
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-ember",
					children: error
				}) : null,
				!passkeySupported() && lock.credentialId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: "This browser has no passkey. Use the spare key."
				}) : null,
				wiping ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto pt-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "This removes the profile, chats, and saved people on this browser. It cannot be undone."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "press mt-3 min-h-11 w-full rounded-2xl bg-ember text-sm font-semibold text-ember-ink",
							onClick: () => erase(),
							children: "Erase this device"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "press mt-2 min-h-11 w-full text-sm font-semibold",
							onClick: () => setWiping(false),
							children: "Cancel"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "press mt-auto min-h-11 text-sm text-faint",
					onClick: () => setWiping(true),
					children: "Lost both? Erase this device"
				})
			]
		})
	});
}
function QrScanner({ onCode }) {
	const videoRef = (0, import_react.useRef)(null);
	const onCodeRef = (0, import_react.useRef)(onCode);
	onCodeRef.current = onCode;
	const [failed, setFailed] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const Detector = window.BarcodeDetector;
		if (!Detector || !navigator.mediaDevices?.getUserMedia) {
			setFailed(true);
			return;
		}
		let stop = false;
		let stream = null;
		const detector = new Detector({ formats: ["qr_code"] });
		navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then((next) => {
			stream = next;
			const video = videoRef.current;
			if (!video) return;
			video.srcObject = next;
			video.play();
			const tick = () => {
				if (stop) return;
				detector.detect(video).then((codes) => {
					const raw = codes[0]?.rawValue;
					if (raw) onCodeRef.current(raw);
				}).catch(() => void 0).finally(() => {
					if (!stop) window.setTimeout(tick, 250);
				});
			};
			tick();
		}).catch(() => setFailed(true));
		return () => {
			stop = true;
			stream?.getTracks().forEach((track) => track.stop());
		};
	}, []);
	if (failed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "This browser can’t scan. Type the spare key instead."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
		ref: videoRef,
		className: "aspect-square w-full rounded-card bg-black object-cover",
		muted: true,
		playsInline: true
	});
}
var styles_default = "/assets/styles-D-_qrX88.css";
var APP_NAME = "MEAT";
var Route$11 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "MEAT is nearby discovery for men seeking men. Private by default."
			},
			{
				name: "theme-color",
				content: "#0c1018"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=DM+Mono:wght@500&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gate, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockScreen, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$10 = () => import("./routes-C2wt94j7.mjs");
var Route$10 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./explore-B2yHfcvg.mjs");
var Route$9 = createFileRoute("/explore")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./help-Bd1mJjPH.mjs");
var Route$8 = createFileRoute("/help")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./inbox-DDfxMjsG.mjs");
var Route$7 = createFileRoute("/inbox")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./info-DMS-VrVJ.mjs");
var Route$6 = createFileRoute("/info")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./safety-gQT-dUkU.mjs");
var Route$5 = createFileRoute("/safety")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./you-BG45O37J.mjs");
var Route$4 = createFileRoute("/you")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("../_id-D1hYEhar.mjs");
var Route$3 = createFileRoute("/c/$id")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("../_id-D4NczZHJ.mjs");
var Route$2 = createFileRoute("/call/$id")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("../_id-DSE2s4e6.mjs");
var Route$1 = createFileRoute("/p/$id")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("../_id-CjfyrKPz.mjs");
var Route = createFileRoute("/plan/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$10.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$11
	}),
	ExploreRoute: Route$9.update({
		id: "/explore",
		path: "/explore",
		getParentRoute: () => Route$11
	}),
	HelpRoute: Route$8.update({
		id: "/help",
		path: "/help",
		getParentRoute: () => Route$11
	}),
	InboxRoute: Route$7.update({
		id: "/inbox",
		path: "/inbox",
		getParentRoute: () => Route$11
	}),
	InfoRoute: Route$6.update({
		id: "/info",
		path: "/info",
		getParentRoute: () => Route$11
	}),
	SafetyRoute: Route$5.update({
		id: "/safety",
		path: "/safety",
		getParentRoute: () => Route$11
	}),
	YouRoute: Route$4.update({
		id: "/you",
		path: "/you",
		getParentRoute: () => Route$11
	}),
	CIdRoute: Route$3.update({
		id: "/c/$id",
		path: "/c/$id",
		getParentRoute: () => Route$11
	}),
	CallIdRoute: Route$2.update({
		id: "/call/$id",
		path: "/call/$id",
		getParentRoute: () => Route$11
	}),
	PIdRoute: Route$1.update({
		id: "/p/$id",
		path: "/p/$id",
		getParentRoute: () => Route$11
	}),
	PlanIdRoute: Route.update({
		id: "/plan/$id",
		path: "/plan/$id",
		getParentRoute: () => Route$11
	})
};
var routeTree = Route$11._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultNotFoundComponent: AppNotFound
	});
}
//#endregion
export { Route$3 as a, hashCode as c, Route$2 as i, makeLoginCode as l, Route as n, QrCard as o, Route$1 as r, createPasskey as s, router_exports as t, passkeySupported as u };
