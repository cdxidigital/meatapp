import { i as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { m as Lock, v as BadgeCheck } from "./_libs/lucide-react.mjs";
import { D as lookingLabel, E as kmBetween, M as useGrid, O as presence, S as bandText, f as Portrait, h as Sheet, o as Frame, r as Button, w as getPerson, x as areaById } from "./_ssr/ui-DkqkjVF3.mjs";
import { r as Route$1 } from "./_ssr/router-CCdndJ4K.mjs";
import { t as ReportForm } from "./_ssr/report-form-YgD8lpIJ.mjs";
import { t as useNow } from "./_ssr/use-ranked-z5mYGiQc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-DSE2s4e6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PersonPage() {
	const { id } = Route$1.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
		immersive: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonView, { id })
	});
}
function PersonView({ id }) {
	const person = getPerson(id);
	const now = useNow();
	const me = useGrid((s) => s.me);
	const browseId = useGrid((s) => s.browseAreaId);
	const blocked = useGrid((s) => s.blocked);
	const hidden = useGrid((s) => s.hidden);
	const muted = useGrid((s) => s.muted);
	const waves = useGrid((s) => s.waves);
	const favourites = useGrid((s) => s.favourites);
	const album = useGrid((s) => s.album[id]);
	const wave = useGrid((s) => s.wave);
	const toggleFavourite = useGrid((s) => s.toggleFavourite);
	const hide = useGrid((s) => s.hide);
	const unhide = useGrid((s) => s.unhide);
	const mute = useGrid((s) => s.mute);
	const unmute = useGrid((s) => s.unmute);
	const block = useGrid((s) => s.block);
	const requestShelf = useGrid((s) => s.requestShelf);
	const revokeShelf = useGrid((s) => s.revokeShelf);
	const [verify, setVerify] = (0, import_react.useState)(false);
	const [safety, setSafety] = (0, import_react.useState)(null);
	const view = (0, import_react.useMemo)(() => {
		if (!person) return null;
		const km = kmBetween(areaById(browseId), areaById(person.areaId));
		const shared = person.tags.filter((tag) => me.tags.includes(tag));
		const same = person.lookingFor.some((item) => me.lookingFor.includes(item));
		const online = presence(person, now);
		const reasons = [];
		if (person.showDistance && km < 8) reasons.push(km < 1 ? "Very close" : km < 3 ? "Nearby" : "A short ride");
		if (online) reasons.push("Live now");
		if (shared.length) reasons.push(shared.length === 1 ? "1 shared interest" : `${shared.length} shared interests`);
		if (same) reasons.push("Same intent");
		return {
			km,
			shared,
			online,
			reasons,
			band: bandText(km, person.showDistance, me.softDistance)
		};
	}, [
		person,
		browseId,
		me.tags,
		me.lookingFor,
		me.softDistance,
		now
	]);
	if (!person || !view) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center px-6 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-extrabold",
			children: "This profile isn’t here."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "mt-4 inline-flex min-h-11 items-center font-semibold text-ember",
			children: "Back to nearby"
		})] })
	});
	if (blocked.includes(person.id)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center px-6 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display text-3xl font-extrabold",
					children: [person.name.split(" ")[0], " is blocked."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "They stay out of your grid and inbox until you undo it."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "press mt-4 min-h-11 font-semibold text-ember",
					onClick: () => useGrid.getState().unblock(person.id),
					children: "Unblock"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-2 inline-flex min-h-11 items-center text-sm text-muted",
					children: "Back to nearby"
				}) })
			]
		})
	});
	const shelf = album?.status === "open" && album.until && album.until < Date.now() ? { status: "expired" } : album;
	const hoursLeft = album?.until ? Math.max(1, Math.round((album.until - Date.now()) / 36e5)) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hero relative bg-raised",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
				id: person.id,
				name: person.name,
				eager: true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "safe-top absolute inset-x-0 top-0 flex items-center justify-between px-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					"aria-label": "Back to nearby",
					className: "press inline-flex min-h-11 items-center rounded-full bg-bg/80 px-3 text-sm font-semibold",
					children: "Back"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "press inline-flex min-h-11 items-center rounded-full bg-bg/80 px-3 text-sm font-semibold",
					onClick: () => setSafety("block"),
					children: "Block"
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-xl px-4 pb-36 pt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl font-extrabold leading-none",
						children: person.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted",
						children: [
							person.pronouns,
							" · ",
							person.age,
							" · ",
							areaById(person.areaId).name
						]
					})] }), person.verified ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "press inline-flex min-h-11 items-center gap-1 text-sm font-semibold",
						onClick: () => setVerify(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
							className: "size-4",
							"aria-hidden": "true"
						}), " Verified"]
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 font-mono text-xs uppercase tracking-wide text-muted",
					children: [
						view.band,
						view.online ? " · Live" : person.recency === "today" ? " · Active today" : " · Active this week",
						" · ",
						person.availability
					]
				}),
				view.reasons.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 flex flex-wrap gap-2",
					children: view.reasons.map((reason) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-full border border-line bg-raised px-3 py-1 text-sm",
						children: reason
					}, reason))
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-base",
					children: person.bio
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-6 text-sm font-semibold",
					children: "Open to"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: person.lookingFor.map(lookingLabel).join(" · ")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-5 text-sm font-semibold",
					children: "Interests"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 flex flex-wrap gap-2",
					children: person.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: view.shared.includes(tag) ? "rounded-full border border-ember px-3 py-1 text-sm" : "rounded-full border border-line px-3 py-1 text-sm text-muted",
						children: tag
					}, tag))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-6 text-sm font-semibold",
					children: "Boundaries"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: person.boundaries
				}),
				person.shelf ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6 rounded-card border border-line bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
								className: "size-4",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-semibold",
								children: "Private shelf"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "Notes, songs, and places. Not public. Access expires, and either of you can close it."
						}),
						shelf?.status === "open" && person.shelf ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 space-y-2",
							children: [
								person.shelf.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "rounded-2xl bg-raised px-3 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-semibold",
										children: note.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted",
										children: note.body
									})]
								}, note.title)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-xs text-faint tabular-nums",
									children: hoursLeft ? `${hoursLeft}h left` : "Open"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "press min-h-11 text-sm font-semibold text-ember",
									onClick: () => revokeShelf(person.id),
									children: "Revoke access"
								})
							]
						}) : null,
						shelf?.status === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm",
							children: person.shelfPolicy === "pending" ? "Request waiting." : "Asked. Nothing opens until they say yes."
						}) : null,
						shelf?.status === "declined" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm",
							children: "The shelf stayed closed."
						}) : null,
						shelf?.status === "expired" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm",
							children: "Access expired."
						}) : null,
						!shelf || shelf.status === "revoked" || shelf.status === "expired" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "press mt-3 min-h-11 rounded-2xl bg-fg px-4 text-sm font-semibold text-bg",
							onClick: () => requestShelf(person.id),
							children: "Request access"
						}) : null
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "press min-h-11 rounded-full border border-line px-4 text-sm",
							onClick: () => hidden.includes(person.id) ? unhide(person.id) : hide(person.id),
							children: hidden.includes(person.id) ? "Unhide" : "Hide"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "press min-h-11 rounded-full border border-line px-4 text-sm",
							onClick: () => muted.includes(person.id) ? unmute(person.id) : mute(person.id),
							children: muted.includes(person.id) ? "Unmute" : "Mute"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/plan/$id",
							params: { id: person.id },
							className: "press inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm",
							children: "Plan a meetup"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "press min-h-11 rounded-full border border-line px-4 text-sm",
							onClick: () => setSafety("report"),
							children: "Report"
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "safe-bottom fixed inset-x-0 bottom-0 z-20 border-t border-line bg-bg px-3 py-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-xl gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						className: "flex-1",
						"aria-pressed": Boolean(waves[person.id]),
						onClick: () => wave(person.id),
						children: waves[person.id] ? "Waved" : "Wave"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						className: "flex-1",
						"aria-pressed": favourites.includes(person.id),
						onClick: () => toggleFavourite(person.id),
						children: favourites.includes(person.id) ? "Saved" : "Save"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/c/$id",
						params: { id: person.id },
						className: "press inline-flex min-h-11 flex-1 items-center justify-center rounded-2xl bg-ember px-4 text-sm font-semibold text-ember-ink",
						children: "Message"
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
			open: verify,
			onOpenChange: setVerify,
			title: "Verified",
			description: "What the badge does, and what it doesn’t.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "A verified badge means an independent check matched this profile to a real adult. It is not a character reference and it is not a promise. If something feels off, block or report. Those stay free."
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
			open: safety === "block",
			onOpenChange: (open) => setSafety(open ? "block" : null),
			title: `Block ${person.name.split(" ")[0]}?`,
			description: "They leave your grid and chats. You can undo this later.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "w-full",
				onClick: () => {
					block(person.id);
					setSafety(null);
				},
				children: "Block"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
			open: safety === "report",
			onOpenChange: (open) => setSafety(open ? "report" : null),
			title: "Report",
			description: "Tell us what happened. This also blocks them.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportForm, {
				personId: person.id,
				onDone: () => setSafety(null)
			})
		})
	] });
}
//#endregion
export { PersonPage as component };
