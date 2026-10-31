import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { M as useGrid, m as REPORT_REASONS, r as Button, w as getPerson } from "./ui-DkqkjVF3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/report-form-YgD8lpIJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReportForm({ personId, onDone }) {
	const person = getPerson(personId);
	const report = useGrid((s) => s.report);
	const [reason, setReason] = (0, import_react.useState)(REPORT_REASONS[0]);
	const [note, setNote] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: (event) => {
			event.preventDefault();
			report(personId, reason, note);
			onDone();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
				className: "sr-only",
				children: "Reason"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: REPORT_REASONS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex min-h-11 items-center gap-3 rounded-2xl border border-line bg-raised px-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "radio",
						name: "reason",
						checked: reason === item,
						onChange: () => setReason(item)
					}), item]
				}, item))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-4 block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1 block text-sm text-muted",
					children: "Note, optional"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: "field min-h-24 resize-none",
					maxLength: 400,
					value: note,
					onChange: (event) => setNote(event.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-muted",
				children: [
					"Filing this also blocks ",
					person?.name.split(" ")[0] ?? "them",
					". The report stays on this device and is not shown to them."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				className: "mt-4 w-full",
				children: "File report and block"
			})
		]
	});
}
//#endregion
export { ReportForm as t };
