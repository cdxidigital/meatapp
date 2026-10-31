import { i as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link, x as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { d as Mic, f as MicOff, i as VideoOff, n as Volume2, r as Video } from "./_libs/lucide-react.mjs";
import { M as useGrid, f as Portrait, h as Sheet, o as Frame, r as Button, w as getPerson } from "./_ssr/ui-DkqkjVF3.mjs";
import { i as Route$2 } from "./_ssr/router-CCdndJ4K.mjs";
import { t as ReportForm } from "./_ssr/report-form-YgD8lpIJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-D4NczZHJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CallPage() {
	const { id } = Route$2.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
		immersive: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CallView, { id })
	});
}
function CallView({ id }) {
	const person = getPerson(id);
	const block = useGrid((s) => s.block);
	const navigate = useNavigate();
	const videoRef = (0, import_react.useRef)(null);
	const [phase, setPhase] = (0, import_react.useState)("idle");
	const [level, setLevel] = (0, import_react.useState)(0);
	const [micOn, setMicOn] = (0, import_react.useState)(true);
	const [camOn, setCamOn] = (0, import_react.useState)(true);
	const [reportOpen, setReportOpen] = (0, import_react.useState)(false);
	const streamRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		return () => {
			streamRef.current?.getTracks().forEach((track) => track.stop());
			streamRef.current = null;
		};
	}, []);
	if (!person) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "font-semibold text-ember",
			children: "Back"
		})
	});
	async function start() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: true
			});
			streamRef.current = stream;
			if (videoRef.current) videoRef.current.srcObject = stream;
			const audio = stream.getAudioTracks()[0];
			const context = new AudioContext();
			await context.resume();
			const source = context.createMediaStreamSource(stream);
			const analyser = context.createAnalyser();
			analyser.fftSize = 256;
			source.connect(analyser);
			const data = new Uint8Array(analyser.fftSize);
			let frame = 0;
			const tick = () => {
				analyser.getByteTimeDomainData(data);
				let sum = 0;
				for (const value of data) {
					const sample = (value - 128) / 128;
					sum += sample * sample;
				}
				setLevel(Math.min(1, Math.sqrt(sum / data.length) * 4));
				if (streamRef.current) frame = window.requestAnimationFrame(tick);
				else context.close();
			};
			frame = window.requestAnimationFrame(tick);
			stream.getAudioTracks()[0]?.addEventListener("ended", () => window.cancelAnimationFrame(frame));
			setMicOn(audio?.enabled ?? true);
			setPhase("live");
		} catch {
			setPhase("denied");
		}
	}
	function toggleMic() {
		const track = streamRef.current?.getAudioTracks()[0];
		if (!track) return;
		track.enabled = !track.enabled;
		setMicOn(track.enabled);
	}
	function toggleCam() {
		const track = streamRef.current?.getVideoTracks()[0];
		if (!track) return;
		track.enabled = !track.enabled;
		setCamOn(track.enabled);
	}
	function beep() {
		const context = new AudioContext();
		const osc = context.createOscillator();
		const gain = context.createGain();
		osc.frequency.value = 660;
		gain.gain.value = .05;
		osc.connect(gain);
		gain.connect(context.destination);
		osc.start();
		gain.gain.exponentialRampToValueAtTime(1e-4, context.currentTime + .22);
		osc.stop(context.currentTime + .24);
		window.setTimeout(() => void context.close(), 400);
	}
	function end() {
		streamRef.current?.getTracks().forEach((track) => track.stop());
		streamRef.current = null;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
					id: person.id,
					name: person.name,
					eager: true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-bg/70" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "safe-top relative z-10 flex min-h-dvh flex-col px-4 pb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/c/$id",
							params: { id },
							"aria-label": "Back to chat",
							className: "press inline-flex min-h-11 items-center rounded-full bg-bg/80 px-3 text-sm font-semibold",
							onClick: end,
							children: "Back"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "press min-h-11 rounded-full bg-bg/80 px-3 text-sm font-semibold",
							onClick: () => setReportOpen(true),
							children: "Report"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto mt-8 w-full max-w-md text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs uppercase tracking-wide text-ember",
								children: "Device check"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 font-display text-4xl font-extrabold",
								children: person.name.split(" ")[0]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted",
								children: "Nothing is sent. This only checks the camera and microphone on your phone."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto mt-6 aspect-portrait w-full max-w-xs overflow-hidden rounded-card border border-line bg-raised",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
							ref: videoRef,
							autoPlay: true,
							playsInline: true,
							muted: true,
							className: phase === "live" && camOn ? "cover" : "hidden"
						}), phase !== "live" || !camOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 grid place-items-center px-6 text-center text-sm text-muted",
							children: phase === "denied" ? "Camera stayed off. You can still use messages." : camOn ? "Camera preview appears after you start the check." : "Camera paused."
						}) : null]
					}),
					phase === "live" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto mt-4 w-full max-w-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							role: "meter",
							"aria-valuemin": 0,
							"aria-valuemax": 100,
							"aria-valuenow": Math.round(level * 100),
							"aria-label": "Microphone level",
							className: "h-1.5 overflow-hidden rounded-full bg-line",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-signal",
								style: { width: `${Math.round(level * 100)}%` }
							})
						})
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto mt-auto flex w-full max-w-md flex-col gap-3 pt-6",
						children: [phase === "idle" || phase === "denied" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => void start(),
							children: "Check camera and mic"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "press grid size-14 place-items-center rounded-full bg-raised",
									"aria-pressed": micOn,
									"aria-label": micOn ? "Mute microphone" : "Unmute microphone",
									onClick: toggleMic,
									children: micOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "size-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "press grid size-14 place-items-center rounded-full bg-raised",
									"aria-pressed": camOn,
									"aria-label": camOn ? "Turn camera off" : "Turn camera on",
									onClick: toggleCam,
									children: camOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoOff, { className: "size-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "press grid size-14 place-items-center rounded-full bg-raised",
									"aria-label": "Play a short speaker test",
									onClick: beep,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-5" })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "press min-h-11 text-sm text-muted",
							onClick: () => {
								end();
								block(person.id);
								navigate({ to: "/" });
							},
							children: ["Block ", person.name.split(" ")[0]]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: reportOpen,
				onOpenChange: setReportOpen,
				title: "Report",
				description: "Available before, during, and after a call.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportForm, {
					personId: person.id,
					onDone: () => setReportOpen(false)
				})
			})
		]
	});
}
//#endregion
export { CallPage as component };
