import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { M as useGrid, T as isAdultYear, b as adultCutoff, f as Portrait, j as toggleItem, s as LOOKING, t as AREAS, u as PEOPLE, y as Wordmark } from "./ui-DkqkjVF3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/info-DMS-VrVJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STEPS = [
	{
		n: "01",
		title: "Join on this device",
		body: "A display name and a birth year. No legal name, and nothing is uploaded."
	},
	{
		n: "02",
		title: "See men nearby",
		body: "A list in distance bands. Nearby, a short ride, or across town. Never a pin."
	},
	{
		n: "03",
		title: "Wave, then decide",
		body: "Chat if you both want to. Plans name a public place. You can leave the list any time."
	}
];
var OFFER = [
	{
		title: "Men seeking men",
		body: "The list is men near you. That is the whole brief."
	},
	{
		title: "Private by default",
		body: "Photo, chats, and profile stay in this browser. Clear the site data and they go."
	},
	{
		title: "Safety is included",
		body: "Block, report, hide, and a check-in when you head out. None of that is locked."
	}
];
function InfoPage() {
	const navigate = useNavigate();
	const onboarded = useGrid((s) => s.onboarded);
	const birthYear = useGrid((s) => s.gate.birthYear);
	const alreadyIn = onboarded && isAdultYear(birthYear);
	const patchMe = useGrid((s) => s.patchMe);
	const setGateYear = useGrid((s) => s.setGateYear);
	const finish = useGrid((s) => s.finishOnboarding);
	const cutoff = adultCutoff();
	const years = Array.from({ length: cutoff - 1940 + 1 }, (_, index) => cutoff - index);
	const [name, setName] = (0, import_react.useState)("");
	const [year, setYear] = (0, import_react.useState)("");
	const [looking, setLooking] = (0, import_react.useState)([]);
	const [areaId, setAreaId] = (0, import_react.useState)("cbd");
	const [checked, setChecked] = (0, import_react.useState)(false);
	const [blocked, setBlocked] = (0, import_react.useState)(false);
	const [email, setEmail] = (0, import_react.useState)("");
	const [copied, setCopied] = (0, import_react.useState)(false);
	const emailOk = email.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
	const ready = name.trim().length > 0 && year !== "" && looking.length > 0 && checked && emailOk;
	function join(event) {
		event.preventDefault();
		const born = Number(year);
		if (!isAdultYear(born)) {
			setBlocked(true);
			return;
		}
		if (!ready) return;
		patchMe({
			name: name.trim(),
			lookingFor: looking,
			areaId,
			email: email.trim()
		});
		setGateYear(born);
		finish();
		navigate({ to: "/" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "safe-top sticky top-0 z-10 border-b border-line bg-bg/90 backdrop-blur",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-3xl items-center justify-between px-5 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}), alreadyIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "press inline-flex min-h-11 items-center rounded-2xl bg-ember px-4 text-sm font-semibold text-ember-ink",
					children: "Open MEAT"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#join",
					className: "press inline-flex min-h-11 items-center rounded-2xl bg-ember px-4 text-sm font-semibold text-ember-ink",
					children: "Sign up"
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-3xl px-5 pb-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "pt-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs uppercase tracking-wide text-ember",
							children: "Perth · men seeking men"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 max-w-xl font-display text-5xl font-extrabold leading-none",
							children: "Nearby, without the pin."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-lg text-muted",
							children: "MEAT is a private list of men near you. Join on this device, see who is in range, and decide what happens next."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap gap-3",
							children: [
								alreadyIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									className: "press inline-flex min-h-11 items-center rounded-2xl bg-ember px-4 text-sm font-semibold text-ember-ink",
									children: "Open MEAT"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#join",
									className: "press inline-flex min-h-11 items-center rounded-2xl bg-ember px-4 text-sm font-semibold text-ember-ink",
									children: "Sign up free"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "press inline-flex min-h-11 items-center rounded-2xl border border-line bg-raised px-4 text-sm font-semibold",
									onClick: () => {
										const url = `${location.origin}/info`;
										const done = () => setCopied(true);
										if (navigator.share) {
											navigator.share({
												title: "MEAT",
												text: "Men nearby, without the pin.",
												url
											}).catch(() => void 0);
											return;
										}
										navigator.clipboard.writeText(url).then(done).catch(() => void 0);
									},
									children: copied ? "Link copied" : "Invite someone"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#how",
									className: "press inline-flex min-h-11 items-center rounded-2xl border border-line bg-raised px-4 text-sm font-semibold",
									children: "How it works"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 flex",
							children: PEOPLE.slice(0, 6).map((person) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "relative -ml-3 size-14 overflow-hidden rounded-full border-2 border-bg first:ml-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
									id: person.id,
									name: person.name,
									size: "sm",
									eager: true
								})
							}, person.id))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mt-12 grid gap-3 sm:grid-cols-3",
					children: OFFER.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-card border border-line bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl font-bold",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: item.body
						})]
					}, item.title))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: "how",
					className: "mt-14 scroll-mt-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-extrabold",
						children: "How it works"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-5 grid gap-3",
						children: STEPS.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-4 rounded-card border border-line bg-surface p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-sm text-ember",
								children: step.n
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl font-bold",
								children: step.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: step.body
							})] })]
						}, step.n))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Install, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					id: "join",
					className: "mt-14 scroll-mt-24 rounded-card border border-line bg-raised p-5",
					children: alreadyIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl font-extrabold",
							children: "You’re already in."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "Your profile is on this device. Open the list, or read Help from You."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "press mt-5 inline-flex min-h-11 items-center rounded-2xl bg-ember px-4 text-sm font-semibold text-ember-ink",
							children: "Open MEAT"
						})
					] }) : blocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl font-extrabold",
							children: "You can’t join yet."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "MEAT is for people who are already 18. A birth year is a check, not an identity proof."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "press mt-5 min-h-11 text-sm font-semibold text-ember",
							onClick: () => setBlocked(false),
							children: "Entered the wrong year"
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs uppercase tracking-wide text-ember",
							children: "Sign up"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-3xl font-extrabold",
							children: "Create your profile."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "Optional, and free. Stored on this device. Skip it and you can still read this page. You can change any of it later under You."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "mt-5 space-y-4",
							onSubmit: join,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mb-1 block text-sm text-muted",
										children: "Display name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "field",
										maxLength: 40,
										value: name,
										placeholder: "What people call you",
										onChange: (event) => setName(event.target.value),
										required: true
									})]
								}),
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
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
									className: "mb-2 text-sm text-muted",
									children: "Open to"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-2",
									children: LOOKING.map((item) => {
										const on = looking.includes(item.id);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-pressed": on,
											className: on ? "press min-h-11 rounded-full bg-ember px-3 text-sm font-medium text-ember-ink" : "press min-h-11 rounded-full border border-line bg-surface px-3 text-sm font-medium",
											onClick: () => setLooking((current) => toggleItem(current, item.id)),
											children: item.label
										}, item.id);
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mb-1 block text-sm text-muted",
											children: "Email, if you want one"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: "field",
											type: "email",
											autoComplete: "email",
											inputMode: "email",
											maxLength: 80,
											value: email,
											placeholder: "Stays on this device",
											onChange: (event) => setEmail(event.target.value)
										}),
										email.trim() && !emailOk ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-1 block text-xs text-ember",
											children: "That doesn’t look like an email."
										}) : null
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mb-1 block text-sm text-muted",
										children: "Home area"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										className: "field",
										value: areaId,
										onChange: (event) => setAreaId(event.target.value),
										children: AREAS.map((area) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: area.id,
											children: area.name
										}, area.id))
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
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "press min-h-11 w-full rounded-2xl bg-ember text-sm font-semibold text-ember-ink disabled:opacity-40",
									disabled: !ready,
									children: "Sign up and open the list"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-faint",
									children: "Your birth year stays in this browser. It is not uploaded. After you join, add a passkey or a QR under You so the next visit locks."
								})
							]
						})
					] })
				})
			]
		})]
	});
}
function Install() {
	const [here, setHere] = (0, import_react.useState)("desktop");
	(0, import_react.useEffect)(() => {
		const ua = navigator.userAgent;
		if (/iPad|iPhone|iPod/.test(ua)) setHere("ios");
		else if (/Android/.test(ua)) setHere("android");
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-14",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-3xl font-extrabold",
			children: "Keep it on your phone"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 max-w-lg text-sm text-muted",
			children: ["There is no store download. MEAT is this site. Adding it to your home screen is the install. ", here === "ios" ? "On iPhone, open this page in Safari, tap Share, then Add to Home Screen." : here === "android" ? "On Android, open the browser menu and choose Install app or Add to Home screen." : "On a computer, bookmark this page or use the install icon in the address bar if you see one."]
		})]
	});
}
//#endregion
export { InfoPage as component };
