import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as Search, s as SlidersHorizontal, t as X, v as BadgeCheck } from "../_libs/lucide-react.mjs";
import { D as lookingLabel, M as useGrid, _ as Toggle, a as DEFAULT_FILTERS, f as Portrait, g as TAGS, h as Sheet, i as Chip, l as NoticesButton, o as Frame, p as RADII, r as Button, s as LOOKING, x as areaById, y as Wordmark } from "./ui-DkqkjVF3.mjs";
import { n as useRanked } from "./use-ranked-z5mYGiQc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C2wt94j7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FilterSheet({ open, onOpenChange }) {
	const filters = useGrid((s) => s.filters);
	const setFilters = useGrid((s) => s.setFilters);
	const resetFilters = useGrid((s) => s.resetFilters);
	const saved = useGrid((s) => s.saved);
	const saveFilter = useGrid((s) => s.saveFilter);
	const applySaved = useGrid((s) => s.applySaved);
	const deleteSaved = useGrid((s) => s.deleteSaved);
	const density = useGrid((s) => s.density);
	const setDensity = useGrid((s) => s.setDensity);
	const [name, setName] = (0, import_react.useState)("");
	function patch(next) {
		setFilters(next);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		open,
		onOpenChange,
		title: "Filters",
		description: "Active filters stay visible as chips. Nothing here is a hidden paywall.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold",
				children: "Radius"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex flex-wrap gap-2",
				children: RADII.map((radius) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
					on: filters.radiusKm === radius,
					onClick: () => patch({ radiusKm: radius }),
					children: [radius, " km"]
				}, radius))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-5 block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm font-semibold",
					children: ["Minimum age ", filters.minAge]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "mt-2 w-full",
					type: "range",
					min: 18,
					max: 80,
					value: filters.minAge,
					onChange: (event) => patch({ minAge: Math.min(Number(event.target.value), filters.maxAge) })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-3 block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm font-semibold",
					children: ["Maximum age ", filters.maxAge]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "mt-2 w-full",
					type: "range",
					min: 18,
					max: 80,
					value: filters.maxAge,
					onChange: (event) => patch({ maxAge: Math.max(Number(event.target.value), filters.minAge) })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 divide-y divide-line border-y border-line",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						on: filters.onlineOnly,
						label: "Live only",
						hint: "Men who show that they’re around.",
						onChange: (onlineOnly) => patch({ onlineOnly })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						on: filters.verifiedOnly,
						label: "Verified only",
						hint: "A check that the profile belongs to an adult. Not a character reference.",
						onChange: (verifiedOnly) => patch({ verifiedOnly })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						on: filters.favouritesOnly,
						label: "Favourites",
						hint: "Only people you’ve saved.",
						onChange: (favouritesOnly) => patch({ favouritesOnly })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-sm font-semibold",
				children: "Intent"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Matches any you pick."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex flex-wrap gap-2",
				children: LOOKING.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					on: filters.lookingFor.includes(item.id),
					onClick: () => patch({ lookingFor: filters.lookingFor.includes(item.id) ? filters.lookingFor.filter((id) => id !== item.id) : [...filters.lookingFor, item.id] }),
					children: item.label
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-sm font-semibold",
				children: "Interests"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Matches all you pick."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex flex-wrap gap-2",
				children: TAGS.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					on: filters.tags.includes(tag),
					onClick: () => patch({ tags: filters.tags.includes(tag) ? filters.tags.filter((item) => item !== tag) : [...filters.tags, tag] }),
					children: tag
				}, tag))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-sm font-semibold",
				children: "Order"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex flex-wrap gap-2",
				children: [
					["smart", "Smart"],
					["near", "Nearest"],
					["active", "Live first"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					on: filters.sort === id,
					onClick: () => patch({ sort: id }),
					children: label
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-sm font-semibold",
				children: "Layout"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					on: density === "cozy",
					onClick: () => setDensity("cozy"),
					children: "Cozy"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					on: density === "dense",
					onClick: () => setDensity("dense"),
					children: "Dense"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-6 flex gap-2",
				onSubmit: (event) => {
					event.preventDefault();
					if (!name.trim()) return;
					saveFilter(name);
					setName("");
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: "Name this filter set"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field",
						maxLength: 24,
						value: name,
						placeholder: "Name this set",
						onChange: (event) => setName(event.target.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					variant: "ghost",
					disabled: !name.trim(),
					children: "Save"
				})]
			}),
			saved.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: saved.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "press min-h-11 flex-1 rounded-2xl bg-raised px-3 text-left text-sm font-semibold",
						onClick: () => applySaved(item.id),
						children: item.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "press min-h-11 px-2 text-sm text-muted",
						onClick: () => deleteSaved(item.id),
						children: "Remove"
					})]
				}, item.id))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-6 w-full",
				variant: "ghost",
				onClick: resetFilters,
				children: "Reset filters"
			})
		]
	});
}
function NearbyPage() {
	const rows = useRanked();
	const filters = useGrid((s) => s.filters);
	const setFilters = useGrid((s) => s.setFilters);
	const resetFilters = useGrid((s) => s.resetFilters);
	const density = useGrid((s) => s.density);
	const browse = areaById(useGrid((s) => s.browseAreaId));
	const home = areaById(useGrid((s) => s.me.areaId));
	const incognito = useGrid((s) => s.me.incognito);
	const waves = useGrid((s) => s.waves);
	const lock = useGrid((s) => s.lock);
	const loginHint = useGrid((s) => s.loginHint);
	const dismissLoginHint = useGrid((s) => s.dismissLoginHint);
	useGrid((s) => s.favourites);
	const wave = useGrid((s) => s.wave);
	const setBrowse = useGrid((s) => s.setBrowse);
	const [filtersOpen, setFiltersOpen] = (0, import_react.useState)(false);
	const [whyOpen, setWhyOpen] = (0, import_react.useState)(false);
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const showSearch = searchOpen || filters.query.length > 0;
	const chips = [];
	if (filters.radiusKm !== DEFAULT_FILTERS.radiusKm) chips.push({
		key: "radius",
		label: `${filters.radiusKm} km`,
		clear: () => setFilters({ radiusKm: 25 })
	});
	if (filters.minAge !== 18 || filters.maxAge !== 70) chips.push({
		key: "age",
		label: `${filters.minAge}–${filters.maxAge}`,
		clear: () => setFilters({
			minAge: 18,
			maxAge: 70
		})
	});
	if (filters.onlineOnly) chips.push({
		key: "live",
		label: "Live",
		clear: () => setFilters({ onlineOnly: false })
	});
	if (filters.verifiedOnly) chips.push({
		key: "ver",
		label: "Verified",
		clear: () => setFilters({ verifiedOnly: false })
	});
	if (filters.favouritesOnly) chips.push({
		key: "fav",
		label: "Favourites",
		clear: () => setFilters({ favouritesOnly: false })
	});
	if (filters.sort !== "smart") chips.push({
		key: "sort",
		label: filters.sort === "near" ? "Nearest" : "Live first",
		clear: () => setFilters({ sort: "smart" })
	});
	for (const tag of filters.tags) chips.push({
		key: tag,
		label: tag,
		clear: () => setFilters({ tags: filters.tags.filter((item) => item !== tag) })
	});
	for (const intent of filters.lookingFor) chips.push({
		key: intent,
		label: lookingLabel(intent),
		clear: () => setFilters({ lookingFor: filters.lookingFor.filter((item) => item !== intent) })
	});
	if (filters.query) chips.push({
		key: "q",
		label: `“${filters.query}”`,
		clear: () => setFilters({ query: "" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "safe-top sticky top-0 z-20 border-b border-line bg-bg/90 px-3 pb-3 backdrop-blur-md lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "lg:hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden font-display text-2xl font-extrabold lg:inline",
							children: "Nearby"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "truncate font-mono text-xs uppercase tracking-wide text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/explore",
							className: "underline-offset-2 hover:underline",
							children: browse.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [" · ", rows.length] })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "press grid size-11 place-items-center rounded-full bg-raised",
							"aria-label": showSearch ? "Close search" : "Search",
							"aria-expanded": showSearch,
							onClick: () => setSearchOpen((open) => !open),
							children: showSearch ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "press inline-flex min-h-11 items-center gap-2 rounded-full bg-raised px-3 text-sm font-semibold",
							onClick: () => setFiltersOpen(true),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, {
									className: "size-4",
									"aria-hidden": "true"
								}),
								"Filters",
								chips.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs text-ember",
									children: chips.length
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoticesButton, {})
					]
				})]
			}), showSearch ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto mt-3 max-w-6xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "sr-only",
					htmlFor: "grid-search",
					children: "Search people"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "grid-search",
					className: "field",
					value: filters.query,
					placeholder: "Name, interest, suburb",
					onChange: (event) => setFilters({ query: event.target.value })
				})]
			}) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-3 py-3 lg:px-8",
			children: [
				incognito ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 rounded-2xl border border-line bg-raised px-3 py-3 text-sm",
					children: "Incognito is on. You can browse. You are not listed."
				}) : null,
				browse.id !== home.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-3 flex flex-wrap items-center gap-2 rounded-2xl border border-line bg-raised px-3 py-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Travel is on. Browsing ",
						browse.name,
						". Home is ",
						home.name,
						"."
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "press min-h-11 font-semibold text-ember",
						onClick: () => setBrowse(home.id),
						children: "Back to home"
					})]
				}) : null,
				chips.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "strip mb-3",
					children: chips.map((chip) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "press inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-line bg-raised px-3 text-sm",
						onClick: chip.clear,
						children: [
							chip.label,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
								className: "size-3.5",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "sr-only",
								children: ["Remove ", chip.label]
							})
						]
					}, chip.key))
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: rows.length === 1 ? "1 man nearby" : `${rows.length} men nearby`
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "press min-h-11 text-sm font-semibold text-ember",
						onClick: () => setWhyOpen(true),
						children: "Why this order"
					})]
				}),
				rows.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between gap-3 rounded-card border border-line bg-surface px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: "Someone live. One hello."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "press min-h-11 shrink-0 rounded-full bg-ember px-3 text-sm font-semibold text-ember-ink",
						onClick: () => {
							const live = rows.filter((row) => row.online);
							const pool = live.length ? live : rows;
							const pick = pool[Math.floor(Math.random() * pool.length)];
							navigate({
								to: "/p/$id",
								params: { id: pick.person.id }
							});
						},
						children: "Surprise me"
					})]
				}) : null,
				!lock.credentialId && !lock.codeHash && loginHint ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-3 flex items-center justify-between gap-3 text-sm text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"No login on this device.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/you",
							hash: "lock",
							className: "font-semibold text-ember",
							children: "Add a passkey or a QR"
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "press min-h-11 shrink-0 text-sm font-semibold",
						onClick: dismissLoginHint,
						children: "Dismiss"
					})]
				}) : null,
				rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-card border border-line bg-surface px-4 py-10 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-bold",
							children: "No one fits this view."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-2 max-w-sm text-sm text-muted",
							children: "Widen the radius, clear a filter, or browse another suburb. Hidden-distance profiles still have to fall inside the radius."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "press mt-4 min-h-11 font-semibold text-ember",
							onClick: resetFilters,
							children: "Reset filters"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: density === "dense" ? "grid grid-cols-3 gap-1.5 sm:grid-cols-4 lg:grid-cols-5" : "grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4",
					children: rows.map((row, index) => {
						const person = row.person;
						const area = areaById(person.areaId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "overflow-hidden rounded-card bg-surface",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/p/$id",
								params: { id: person.id },
								"aria-label": `${person.name}, ${person.pronouns}, ${person.age}, ${area.name}, ${row.band}${person.verified ? ", verified" : ""}. ${row.reasons.join(", ")}`,
								className: "relative block aspect-portrait bg-raised",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
									id: person.id,
									name: person.name,
									eager: index < 4
								}), row.online ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "live-dot absolute left-2 top-2",
									"aria-hidden": "true"
								}) : null]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "px-2.5 pb-2.5 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/p/$id",
									params: { id: person.id },
									className: "block min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "truncate text-sm font-semibold",
												children: person.name.split(" ")[0]
											}), person.verified ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
												className: "size-3.5 shrink-0",
												"aria-hidden": "true"
											}) : null]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-mono text-xs uppercase tracking-wide text-muted",
											children: [
												person.age,
												" · ",
												row.band
											]
										}),
										density === "cozy" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-0.5 line-clamp-2 text-xs leading-snug text-fg/80",
											children: person.bio.split(". ")[0]
										}) : null
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: waves[person.id] ? "press mt-2 min-h-11 w-full rounded-full bg-ember text-xs font-semibold text-ember-ink" : "press mt-2 min-h-11 w-full rounded-full border border-ember/50 bg-raised text-xs font-semibold text-ember",
									"aria-pressed": Boolean(waves[person.id]),
									onClick: () => wave(person.id),
									children: waves[person.id] ? "Waved" : "Wave"
								})]
							})]
						}) }, person.id);
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSheet, {
			open: filtersOpen,
			onOpenChange: setFiltersOpen
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
			open: whyOpen,
			onOpenChange: setWhyOpen,
			title: "Why this order",
			description: "The score is readable. Popularity and payment do not move it.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "space-y-3 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Closer areas rank higher. You see a band, never a pin or an exact kilometre." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A live mark counts only if that person chooses to show it." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Shared interests and the same intent add weight. Your own tags change this." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "People who often reply get a small boost. Follower counts do not exist here." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Hidden-distance profiles can still appear inside your radius. The card says “Distance hidden”." })
				]
			})
		})
	] });
}
//#endregion
export { NearbyPage as component };
