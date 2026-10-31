import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as Bell, a as UserRound, g as Compass, h as LayoutGrid, p as MessageCircle, t as X } from "../_libs/lucide-react.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-DkqkjVF3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEFAULT_FILTERS = {
	radiusKm: 25,
	minAge: 18,
	maxAge: 70,
	onlineOnly: false,
	verifiedOnly: false,
	lookingFor: [],
	tags: [],
	favouritesOnly: false,
	query: "",
	sort: "smart"
};
var RADII = [
	.5,
	1,
	5,
	10,
	25,
	50,
	100
];
var TAGS = [
	"photography",
	"coffee",
	"ocean",
	"design",
	"food",
	"books",
	"film",
	"fitness",
	"dogs",
	"music",
	"art",
	"night walks",
	"cooking",
	"gardens",
	"dancing",
	"local history"
];
var LOOKING = [
	{
		id: "chat",
		label: "Chat",
		hint: "Low-pressure conversation"
	},
	{
		id: "friends",
		label: "Friends",
		hint: "People around the city"
	},
	{
		id: "dates",
		label: "Dates",
		hint: "One-to-one plans"
	},
	{
		id: "relationship",
		label: "Relationship",
		hint: "Something ongoing"
	},
	{
		id: "community",
		label: "Community",
		hint: "Scenes, groups, local life"
	}
];
var AVAILABILITY = [
	"Mornings",
	"Afternoons",
	"Evenings",
	"Weekends",
	"Variable shifts"
];
var REPORT_REASONS = [
	"Unwanted contact",
	"Harassment",
	"Hate or a threat",
	"Spam",
	"Someone under 18",
	"Something else"
];
var PRONOUNS = ["he/him", "he/they"];
var AREAS = [
	{
		id: "scarborough",
		name: "Scarborough",
		lat: -31.894,
		lng: 115.758,
		x: 18,
		y: 16,
		note: "Beach terrace and the long sunset"
	},
	{
		id: "cottesloe",
		name: "Cottesloe",
		lat: -31.994,
		lng: 115.757,
		x: 16,
		y: 42,
		note: "Pines and early swims"
	},
	{
		id: "fremantle",
		name: "Fremantle",
		lat: -32.056,
		lng: 115.748,
		x: 24,
		y: 80,
		note: "Port, markets, live rooms"
	},
	{
		id: "subiaco",
		name: "Subiaco",
		lat: -31.949,
		lng: 115.824,
		x: 36,
		y: 46,
		note: "Leafy streets, long lunches"
	},
	{
		id: "leederville",
		name: "Leederville",
		lat: -31.932,
		lng: 115.841,
		x: 44,
		y: 34,
		note: "Oxford Street after dark"
	},
	{
		id: "northbridge",
		name: "Northbridge",
		lat: -31.947,
		lng: 115.857,
		x: 52,
		y: 36,
		note: "Lanes and late rooms"
	},
	{
		id: "cbd",
		name: "Perth CBD",
		lat: -31.953,
		lng: 115.86,
		x: 55,
		y: 48,
		note: "River edge and the city grid"
	},
	{
		id: "lawley",
		name: "Mount Lawley",
		lat: -31.928,
		lng: 115.872,
		x: 66,
		y: 28,
		note: "Beaufort cafes"
	},
	{
		id: "maylands",
		name: "Maylands",
		lat: -31.927,
		lng: 115.894,
		x: 78,
		y: 34,
		note: "Peninsula and warehouses"
	},
	{
		id: "southperth",
		name: "South Perth",
		lat: -31.974,
		lng: 115.862,
		x: 54,
		y: 66,
		note: "Foreshore loop"
	},
	{
		id: "vicpark",
		name: "Victoria Park",
		lat: -31.976,
		lng: 115.903,
		x: 74,
		y: 64,
		note: "Albany Highway"
	}
];
var VENUES = [
	{
		id: "eq",
		name: "Elizabeth Quay lawn",
		areaId: "cbd",
		detail: "Open grass by the river steps"
	},
	{
		id: "pcc",
		name: "Perth Cultural Centre",
		areaId: "northbridge",
		detail: "Gallery steps, public and lit"
	},
	{
		id: "hyde",
		name: "Hyde Park, west end",
		areaId: "northbridge",
		detail: "The big trees, street side"
	},
	{
		id: "ox",
		name: "Oxford Street corner",
		areaId: "leederville",
		detail: "Outside, plenty of people around"
	},
	{
		id: "sub",
		name: "Subiaco theatre garden",
		areaId: "subiaco",
		detail: "Front garden, facing the street"
	},
	{
		id: "cott",
		name: "Cottesloe pine lawn",
		areaId: "cottesloe",
		detail: "Grass above the beach"
	},
	{
		id: "freo",
		name: "Fremantle Markets front",
		areaId: "fremantle",
		detail: "Public doors on South Terrace"
	},
	{
		id: "scar",
		name: "Scarborough clock tower",
		areaId: "scarborough",
		detail: "The plaza, not the sand"
	},
	{
		id: "vic",
		name: "Vic Park station steps",
		areaId: "vicpark",
		detail: "Busy and well lit"
	},
	{
		id: "may",
		name: "Maylands peninsula path",
		areaId: "maylands",
		detail: "Shared path by the water"
	},
	{
		id: "south",
		name: "South Perth foreshore",
		areaId: "southperth",
		detail: "River path, public benches"
	}
];
var PEOPLE = [
	{
		id: "rowan",
		name: "Rowan Hale",
		pronouns: "he/him",
		age: 29,
		areaId: "leederville",
		bio: "Shoots night markets and river light. Usually a quiet table, a camera, and too many bookmarks.",
		tags: [
			"photography",
			"coffee",
			"night walks",
			"film"
		],
		lookingFor: ["friends", "dates"],
		availability: "Evenings",
		boundaries: "Happy to chat first. Ask before sending photos.",
		verified: false,
		showDistance: true,
		showOnline: true,
		usuallyOnline: true,
		recency: "today",
		repliesFast: true,
		wavesBack: true,
		waveReply: "Wave received. I'm around if you want an actual sentence.",
		replies: [
			"Hey. I'm between rolls of film and a mediocre coffee. What's your night doing?",
			"Leederville is loud. I can do a quieter table if you want to say hi properly.",
			"Tell me a picture you still think about. I'll go first if that's easier."
		],
		shelf: null,
		shelfPolicy: null
	},
	{
		id: "mateo",
		name: "Mateo Ruiz",
		pronouns: "he/him",
		age: 32,
		areaId: "northbridge",
		bio: "Bar lead on William Street. Off nights I'm hunting a good dumpling or a terrible dance floor.",
		tags: [
			"food",
			"dancing",
			"music",
			"night walks"
		],
		lookingFor: ["dates", "chat"],
		availability: "Variable shifts",
		boundaries: "Easy conversation is fine. Pressure is not. No photos unless I ask.",
		verified: false,
		showDistance: true,
		showOnline: true,
		usuallyOnline: true,
		recency: "today",
		repliesFast: true,
		wavesBack: true,
		waveReply: "Waved back. Service is about to start, but I'm here.",
		replies: [
			"You caught me before service. I have ten minutes and strong opinions about noodles.",
			"If you're in Northbridge later I'll be the one pretending not to watch the door.",
			"A wave is cute. A real sentence is better. How's your week actually going?"
		],
		shelf: null,
		shelfPolicy: null
	},
	{
		id: "amira",
		name: "Amir Shah",
		pronouns: "he/him",
		age: 27,
		areaId: "lawley",
		bio: "Brand designer. Mount Lawley cafes, gallery Saturdays, playlists that run too long.",
		tags: [
			"design",
			"art",
			"coffee",
			"books"
		],
		lookingFor: ["relationship", "friends"],
		availability: "Weekends",
		boundaries: "I like a slow start. Please don't open with a comment about how I look.",
		verified: false,
		showDistance: true,
		showOnline: true,
		usuallyOnline: false,
		recency: "today",
		repliesFast: false,
		wavesBack: false,
		waveReply: "",
		replies: [
			"Hi. I'm probably in a cafe with a laptop I am not using. What are you into this week?",
			"Gallery Saturday is a standing plan. Company is optional and welcome.",
			"Tell me what you're reading, or what you abandoned. Both count."
		],
		shelf: null,
		shelfPolicy: null
	},
	{
		id: "jules",
		name: "Jules Okonkwo",
		pronouns: "he/him",
		age: 34,
		areaId: "fremantle",
		bio: "High school science, weekend swells at South Beach. The dog is the real personality.",
		tags: [
			"ocean",
			"fitness",
			"dogs",
			"cooking"
		],
		lookingFor: ["dates", "friends"],
		availability: "Mornings",
		boundaries: "Kind, direct, and no pressure to meet until we've actually talked.",
		verified: false,
		showDistance: true,
		showOnline: true,
		usuallyOnline: true,
		recency: "today",
		repliesFast: false,
		wavesBack: false,
		waveReply: "",
		replies: [
			"Morning. I teach, then I chase a small wave if the wind behaves.",
			"The dog has already approved this conversation. I still get a vote.",
			"Freo is a trip from the CBD, so I'm better in messages than in last-minute plans."
		],
		shelf: [{
			title: "South Beach",
			body: "Dawn patrol. The dog thinks everyone is already a friend."
		}, {
			title: "Off days",
			body: "Tuesdays. I'm useless before coffee and honest about it."
		}],
		shelfPolicy: "decline"
	},
	{
		id: "sable",
		name: "Sable Quinn",
		pronouns: "he/him",
		age: 26,
		areaId: "cbd",
		bio: "Writes songs in a CBD walk-up. Looking for people who stay for the second set.",
		tags: [
			"music",
			"film",
			"night walks",
			"dancing"
		],
		lookingFor: ["chat", "community"],
		availability: "Evenings",
		boundaries: "Ask before you photograph or share anything I send.",
		verified: false,
		showDistance: false,
		showOnline: true,
		usuallyOnline: true,
		recency: "today",
		repliesFast: true,
		wavesBack: true,
		waveReply: "Hey. Wave seen. I'm in the middle of a verse but I'll write back.",
		replies: [
			"Hi. I'm in the CBD and the building is loud. What's the last song that actually got you?",
			"Second set is the real one. First set is just manners.",
			"I keep distance hidden on purpose. If we meet, we pick a public room."
		],
		shelf: null,
		shelfPolicy: null
	},
	{
		id: "noah",
		name: "Noah Park",
		pronouns: "he/him",
		age: 31,
		areaId: "subiaco",
		bio: "Architect. Serious about shade trees and unserious about losing at board games.",
		tags: [
			"design",
			"coffee",
			"books",
			"gardens"
		],
		lookingFor: ["relationship"],
		availability: "Weekends",
		boundaries: "I prefer names and full sentences. Photos can wait.",
		verified: true,
		showDistance: true,
		showOnline: true,
		usuallyOnline: false,
		recency: "week",
		repliesFast: false,
		wavesBack: false,
		waveReply: "",
		replies: [
			"Hello. I'm slower than the grid wants me to be. That's on purpose.",
			"Subiaco on a Saturday, somewhere with a table big enough for a game.",
			"If you're looking for something ongoing, say so. I am too."
		],
		shelf: [{
			title: "Courtyard",
			body: "A shaded Subiaco courtyard I'm designing. The fig tree stays."
		}, {
			title: "Saturday",
			body: "Hyde Park, north side. Bad coffee, decent book."
		}],
		shelfPolicy: "accept"
	},
	{
		id: "indigo",
		name: "Indigo Voss",
		pronouns: "he/him",
		age: 28,
		areaId: "vicpark",
		bio: "Florist and local-history nerd. Vic Park markets, then somewhere with cake.",
		tags: [
			"gardens",
			"art",
			"coffee",
			"local history"
		],
		lookingFor: ["friends", "community"],
		availability: "Afternoons",
		boundaries: "Friendship is a complete outcome. Please don't treat it as a waiting room.",
		verified: false,
		showDistance: false,
		showOnline: true,
		usuallyOnline: true,
		recency: "today",
		repliesFast: true,
		wavesBack: false,
		waveReply: "",
		replies: [
			"Hi. I was reading about a dance that used to happen two streets from here.",
			"Markets, then cake. That's the whole personality and I'm at peace with it.",
			"I hide my distance. If we meet it's a public bench, not a pin."
		],
		shelf: null,
		shelfPolicy: null
	},
	{
		id: "harper",
		name: "Harper Lin",
		pronouns: "he/him",
		age: 36,
		areaId: "cottesloe",
		bio: "Physio. Early swims, late dinners. I will talk about shoulders if you let me.",
		tags: [
			"fitness",
			"ocean",
			"cooking",
			"dogs"
		],
		lookingFor: ["dates", "relationship"],
		availability: "Mornings",
		boundaries: "Be direct about what you want. No photos unless I ask.",
		verified: true,
		showDistance: true,
		showOnline: true,
		usuallyOnline: false,
		recency: "today",
		repliesFast: false,
		wavesBack: false,
		waveReply: "",
		replies: [
			"Hello. I was in the water at six. I'm more articulate now.",
			"Cottesloe is a ride from the city. I'm worth a plan, not a maybe.",
			"Tell me how you actually like to spend a Sunday. I'll go first: swim, market, long lunch."
		],
		shelf: [
			{
				title: "Swim",
				body: "The pylon end at Cottesloe, early. Not the busy stairs."
			},
			{
				title: "On repeat",
				body: "Late-70s city pop. I'll name the record if we actually talk."
			},
			{
				title: "Window",
				body: "Free most Sundays after nine."
			}
		],
		shelfPolicy: "accept"
	},
	{
		id: "kai",
		name: "Kai Nakamura",
		pronouns: "he/him",
		age: 30,
		areaId: "scarborough",
		bio: "Dive instructor between seasons. Scarborough sunsets are a personality trait, unfortunately.",
		tags: [
			"ocean",
			"photography",
			"fitness",
			"film"
		],
		lookingFor: ["friends", "dates"],
		availability: "Afternoons",
		boundaries: "Outdoor plans only until we've met once. Tell me if you can't swim; that's fine.",
		verified: false,
		showDistance: true,
		showOnline: true,
		usuallyOnline: true,
		recency: "today",
		repliesFast: true,
		wavesBack: true,
		waveReply: "Waved back from the beach path. Wind is rude today.",
		replies: [
			"Hey. I'm between dives and sandwiches. What are you doing near the water, if anything?",
			"Scarborough is a trip from the CBD. Say if that's annoying and we'll just talk.",
			"I take photos of horizons and pretend it's a job. Sometimes it is."
		],
		shelf: null,
		shelfPolicy: null
	},
	{
		id: "remy",
		name: "Remy Laurent",
		pronouns: "he/him",
		age: 38,
		areaId: "fremantle",
		bio: "Wine buyer who still gets excited about a perfect roast chicken. Slow replies. Real ones.",
		tags: [
			"food",
			"books",
			"film",
			"cooking"
		],
		lookingFor: ["relationship", "dates"],
		availability: "Evenings",
		boundaries: "No rush, and no tests. I answer when I mean it.",
		verified: true,
		showDistance: true,
		showOnline: false,
		usuallyOnline: false,
		recency: "week",
		repliesFast: false,
		wavesBack: false,
		waveReply: "",
		replies: [
			"Hello. I don't show online, so if you're reading this, I chose to write.",
			"Freo in the evening, a table, not a club. That's my whole speed.",
			"Tell me a meal you can cook without a recipe. I'll judge it kindly."
		],
		shelf: [{
			title: "Table",
			body: "A corner in a Freo wine bar. I'll name it only if I say yes."
		}, {
			title: "Cook",
			body: "Roast chicken, properly. Happy to trade recipes before anything else."
		}],
		shelfPolicy: "pending"
	},
	{
		id: "tess",
		name: "Theo Adeyemi",
		pronouns: "he/him",
		age: 29,
		areaId: "leederville",
		bio: "Nurse on rotating shifts. If I'm here, I have twenty minutes and opinions about noodles.",
		tags: [
			"fitness",
			"coffee",
			"dogs",
			"cooking"
		],
		lookingFor: ["friends", "chat"],
		availability: "Variable shifts",
		boundaries: "Please be normal about shift work. I disappear, then I come back.",
		verified: false,
		showDistance: true,
		showOnline: true,
		usuallyOnline: true,
		recency: "today",
		repliesFast: true,
		wavesBack: true,
		waveReply: "Wave got me between notes. Hi.",
		replies: [
			"Hi. I've got a short window and I'm using it on you. What's good near you food-wise?",
			"Leederville noodles are a serious topic. I will not be brief.",
			"Friends and chat are the brief. Dates can be a later conversation, not an assumption."
		],
		shelf: null,
		shelfPolicy: null
	},
	{
		id: "orion",
		name: "Orion Blake",
		pronouns: "he/him",
		age: 33,
		areaId: "northbridge",
		bio: "Plays records, not a brand. Northbridge after midnight. Quiet walks before noon.",
		tags: [
			"music",
			"dancing",
			"art",
			"night walks"
		],
		lookingFor: ["chat", "community"],
		availability: "Evenings",
		boundaries: "No unsolicited pictures. If I share a shelf, I can close it.",
		verified: false,
		showDistance: false,
		showOnline: true,
		usuallyOnline: true,
		recency: "today",
		repliesFast: false,
		wavesBack: false,
		waveReply: "",
		replies: [
			"Hey. I'm not a brand account. If you want music talk, I have time.",
			"I keep my distance hidden. Northbridge is enough location for strangers.",
			"Noon walks are the honest version of me. Midnight is just the job."
		],
		shelf: null,
		shelfPolicy: null
	}
];
var BLANK_ME = {
	name: "",
	pronouns: "",
	bio: "",
	tags: [],
	lookingFor: [],
	areaId: "cbd",
	availability: "Evenings",
	boundaries: "Ask before sending photos.",
	showDistance: false,
	showOnline: true,
	incognito: false,
	softDistance: true,
	photo: null,
	email: ""
};
function hash(value) {
	let h = 0;
	for (let i = 0; i < value.length; i++) h = h * 31 + value.charCodeAt(i) >>> 0;
	return h;
}
function areaById(id) {
	return AREAS.find((area) => area.id === id) ?? AREAS[6];
}
function getPerson(id) {
	return PEOPLE.find((person) => person.id === id) ?? null;
}
function kmBetween(a, b) {
	const r = 6371;
	const dLat = (b.lat - a.lat) * Math.PI / 180;
	const dLng = (b.lng - a.lng) * Math.PI / 180;
	const s = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
	return 2 * r * Math.asin(Math.min(1, Math.sqrt(s)));
}
function distanceBand(km, showDistance, soft) {
	if (!showDistance) return {
		label: "Distance hidden",
		detail: "No distance band"
	};
	if (km < 1) return {
		label: "Very close",
		detail: "Under 1 km"
	};
	if (km < 3) return {
		label: "Nearby",
		detail: "1–3 km"
	};
	if (km < 8) return {
		label: "A short ride",
		detail: "3–8 km"
	};
	if (km < 16) return {
		label: "Across town",
		detail: "8–16 km"
	};
	const far = {
		label: "A trip",
		detail: "16 km or more"
	};
	if (soft) return {
		label: far.label,
		detail: far.detail
	};
	return far;
}
function bandText(km, showDistance, soft) {
	const band = distanceBand(km, showDistance, soft);
	if (!showDistance) return band.label;
	return soft ? band.label : band.detail;
}
function isAdultYear(year) {
	if (!year) return false;
	return year <= (/* @__PURE__ */ new Date()).getFullYear() - 18;
}
function adultCutoff() {
	return (/* @__PURE__ */ new Date()).getFullYear() - 18;
}
function toggleItem(list, value) {
	return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}
function presence(person, now) {
	if (!person.showOnline) return false;
	if (now == null) return person.usuallyOnline;
	const slot = Math.floor(now / 12e4);
	return (hash(person.id) + slot) % 7 === 0 ? !person.usuallyOnline : person.usuallyOnline;
}
function rankPeople(input) {
	const origin = areaById(input.browseAreaId);
	const query = input.filters.query.trim().toLowerCase();
	const rows = [];
	for (const person of PEOPLE) {
		if (input.hidden.includes(person.id) || input.blocked.includes(person.id)) continue;
		if (input.filters.favouritesOnly && !input.favourites.includes(person.id)) continue;
		if (person.age < input.filters.minAge || person.age > input.filters.maxAge) continue;
		if (input.filters.verifiedOnly && !person.verified) continue;
		const online = presence(person, input.now);
		if (input.filters.onlineOnly && !online) continue;
		if (input.filters.lookingFor.length && !person.lookingFor.some((item) => input.filters.lookingFor.includes(item))) continue;
		if (input.filters.tags.length && !input.filters.tags.every((tag) => person.tags.includes(tag))) continue;
		const area = areaById(person.areaId);
		if (query) {
			if (![
				person.name,
				person.pronouns,
				person.bio,
				area.name,
				...person.tags,
				...person.lookingFor
			].join(" ").toLowerCase().includes(query)) continue;
		}
		const km = kmBetween(origin, area);
		if (km > input.filters.radiusKm) continue;
		const shared = person.tags.filter((tag) => input.me.tags.includes(tag));
		const sameIntent = person.lookingFor.some((item) => input.me.lookingFor.includes(item));
		const reasons = [];
		if (person.showDistance && km < 8) reasons.push(km < 1 ? "Very close" : km < 3 ? "Nearby" : "Short ride");
		if (online) reasons.push("Live now");
		if (shared.length) reasons.push(shared.length === 1 ? "1 shared" : `${shared.length} shared`);
		if (sameIntent) reasons.push("Same intent");
		if (person.repliesFast) reasons.push("Replies often");
		const distanceWeight = Math.max(0, 36 - km * 1.4);
		const fresh = online ? 22 : person.recency === "today" ? 10 : 0;
		const overlap = Math.min(24, shared.length * 8);
		const intentFit = sameIntent ? 18 : 4;
		const activity = person.repliesFast ? 6 : 0;
		const score = Math.round(distanceWeight + fresh + overlap + intentFit + activity);
		rows.push({
			person,
			km,
			score,
			reasons: reasons.slice(0, 3),
			online,
			shared,
			band: bandText(km, person.showDistance, input.me.softDistance)
		});
	}
	rows.sort((a, b) => {
		if (input.filters.sort === "near") return a.km - b.km || b.score - a.score;
		if (input.filters.sort === "active") return Number(b.online) - Number(a.online) || (a.person.recency === b.person.recency ? 0 : a.person.recency === "today" ? -1 : 1) || b.score - a.score;
		return b.score - a.score || a.km - b.km;
	});
	return rows;
}
function shortTime(at, now = Date.now()) {
	const delta = Math.max(0, now - at);
	if (delta < 6e4) return "Now";
	if (delta < 36e5) return `${Math.floor(delta / 6e4)}m`;
	if (delta < 864e5) return `${Math.floor(delta / 36e5)}h`;
	return `${Math.floor(delta / 864e5)}d`;
}
function windowTarget(kind) {
	const now = /* @__PURE__ */ new Date();
	if (kind === "hour") return {
		label: "In about an hour",
		target: Date.now() + 36e5
	};
	if (kind === "evening") {
		const target = new Date(now);
		target.setHours(19, 0, 0, 0);
		if (target.getTime() < Date.now() + 18e5) target.setDate(target.getDate() + 1);
		return {
			label: "Evening, 7pm",
			target: target.getTime()
		};
	}
	const target = new Date(now);
	target.setDate(target.getDate() + 1);
	target.setHours(14, 0, 0, 0);
	return {
		label: "Tomorrow afternoon",
		target: target.getTime()
	};
}
function lookingLabel(id) {
	return LOOKING.find((item) => item.id === id)?.label ?? id;
}
var DB_NAME = "meat-device";
var STORE = "profiles";
function openDb() {
	return new Promise((resolve, reject) => {
		if (typeof indexedDB === "undefined") {
			reject(/* @__PURE__ */ new Error("no-db"));
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
function run(mode, fn) {
	return openDb().then((db) => new Promise((resolve, reject) => {
		const request = fn(db.transaction(STORE, mode).objectStore(STORE));
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	}));
}
function writeDeviceProfile(profile) {
	return run("readwrite", (store) => store.put(profile, profile.id)).then(() => void 0);
}
function deleteDeviceProfile(id) {
	return run("readwrite", (store) => store.delete(id)).then(() => void 0);
}
function listDeviceProfiles() {
	return run("readonly", (store) => store.getAll());
}
function clearDeviceProfiles() {
	return new Promise((resolve) => {
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
async function savePersonProfile(person) {
	let photo = null;
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
		self: false
	});
}
function dataUrlToBlob(value) {
	if (!value?.startsWith("data:")) return null;
	const [head, body] = value.split(",");
	if (!body) return null;
	const mime = /:(.*?);/.exec(head)?.[1] ?? "image/jpeg";
	const binary = atob(body);
	const bytes = new Uint8Array(binary.length);
	for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
	return new Blob([bytes], { type: mime });
}
function saveSelfProfile(me, age) {
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
		self: true
	});
}
var replyTimers = /* @__PURE__ */ new Map();
var sealTimers = /* @__PURE__ */ new Map();
var selfTimer = 0;
function scheduleSelfSave() {
	if (typeof window === "undefined") return;
	window.clearTimeout(selfTimer);
	selfTimer = window.setTimeout(() => {
		const { me, gate } = useGrid.getState();
		saveSelfProfile(me, gate.birthYear ? (/* @__PURE__ */ new Date()).getFullYear() - gate.birthYear : null).catch(() => void 0);
	}, 400);
}
function uid() {
	return crypto.randomUUID();
}
function fresh() {
	return {
		gate: { birthYear: null },
		onboarded: false,
		me: { ...BLANK_ME },
		filters: {
			...DEFAULT_FILTERS,
			lookingFor: [],
			tags: []
		},
		saved: [],
		browseAreaId: "cbd",
		density: "cozy",
		waves: {},
		favourites: [],
		hidden: [],
		blocked: [],
		muted: [],
		reports: [],
		album: {},
		threads: {},
		readAt: {},
		meetups: {},
		trusted: "",
		log: [],
		notifs: [],
		deviceAlerts: false,
		loginHint: true,
		lock: {
			credentialId: null,
			codeHash: null
		}
	};
}
var storage = {
	getItem: (key) => {
		if (typeof window === "undefined") return null;
		try {
			return window.localStorage.getItem(key);
		} catch {
			return null;
		}
	},
	setItem: (key, value) => {
		if (typeof window === "undefined") return;
		try {
			window.localStorage.setItem(key, value);
		} catch {
			try {
				const parsed = JSON.parse(value);
				if (parsed.state?.me) parsed.state.me.photo = null;
				window.localStorage.setItem(key, JSON.stringify(parsed));
			} catch {}
		}
	},
	removeItem: (key) => {
		if (typeof window === "undefined") return;
		window.localStorage.removeItem(key);
	}
};
function devicePing(title, body) {
	if (typeof window === "undefined" || typeof Notification === "undefined") return;
	if (!useGrid.getState().deviceAlerts || Notification.permission !== "granted") return;
	if (document.visibilityState === "visible") return;
	try {
		new Notification(title, { body });
	} catch {}
}
var useGrid = create()(persist((set, get) => ({
	...fresh(),
	hydrated: false,
	sessionOpen: false,
	devicePeople: [],
	devicePhotos: {},
	epoch: 0,
	typingId: null,
	toast: null,
	setHydrated: () => {
		set({ hydrated: true });
		get().refreshDevice();
	},
	setGateYear: (year) => set({ gate: { birthYear: year } }),
	clearGate: () => set({
		gate: { birthYear: null },
		onboarded: false
	}),
	patchMe: (patch) => {
		set((s) => ({ me: {
			...s.me,
			...patch
		} }));
		scheduleSelfSave();
	},
	finishOnboarding: () => set((s) => ({
		onboarded: true,
		browseAreaId: s.me.areaId,
		notifs: [{
			id: uid(),
			at: Date.now(),
			title: "Distance stays coarse",
			body: "People show a band such as Nearby or Across town. Never a pin.",
			read: false
		}, {
			id: uid(),
			at: Date.now(),
			title: "Safety stays free",
			body: "Block, report, hide, and meetup check-ins are never paywalled.",
			read: false
		}]
	})),
	setFilters: (patch) => set((s) => ({ filters: {
		...s.filters,
		...patch
	} })),
	resetFilters: () => set({ filters: {
		...DEFAULT_FILTERS,
		lookingFor: [],
		tags: []
	} }),
	saveFilter: (name) => set((s) => ({
		saved: [{
			id: uid(),
			name: name.trim().slice(0, 24),
			filters: s.filters
		}, ...s.saved].slice(0, 12),
		toast: { text: "Filter set saved on this device" }
	})),
	applySaved: (id) => {
		const found = get().saved.find((item) => item.id === id);
		if (!found) return;
		set({
			filters: { ...found.filters },
			toast: { text: `Applied “${found.name}”` }
		});
	},
	deleteSaved: (id) => set((s) => ({ saved: s.saved.filter((item) => item.id !== id) })),
	setBrowse: (id) => set({ browseAreaId: id }),
	setDensity: (density) => set({ density }),
	wave: (id) => {
		const person = getPerson(id);
		if (!person || get().waves[id] || get().blocked.includes(id)) return;
		const epoch = get().epoch;
		set((s) => ({
			waves: {
				...s.waves,
				[id]: Date.now()
			},
			toast: { text: `Waved at ${person.name.split(" ")[0]}` },
			log: [{
				id: uid(),
				at: Date.now(),
				label: `Waved at ${person.name}`
			}, ...s.log].slice(0, 50)
		}));
		if (!person.wavesBack || get().muted.includes(id)) return;
		window.setTimeout(() => {
			if (get().epoch !== epoch || get().blocked.includes(id)) return;
			get().appendThem(id, person.waveReply);
		}, 1400);
	},
	toggleFavourite: (id) => {
		const person = getPerson(id);
		const removing = get().favourites.includes(id);
		set((s) => ({
			favourites: removing ? s.favourites.filter((item) => item !== id) : [...s.favourites, id],
			toast: { text: removing ? "Removed from this device" : person ? `${person.name.split(" ")[0]} saved on this device` : "Saved on this device" }
		}));
		(removing || !person ? deleteDeviceProfile(id) : savePersonProfile(person)).then(() => get().refreshDevice()).catch(() => get().pushToast("Couldn’t write that profile"));
	},
	hide: (id) => {
		if (get().hidden.includes(id)) return;
		set((s) => ({
			hidden: [...s.hidden, id],
			toast: {
				text: "Hidden from your grid",
				undo: () => get().unhide(id)
			}
		}));
	},
	unhide: (id) => set((s) => ({
		hidden: s.hidden.filter((item) => item !== id),
		toast: { text: "Back on your grid" }
	})),
	mute: (id) => set((s) => ({
		muted: s.muted.includes(id) ? s.muted : [...s.muted, id],
		toast: {
			text: "Muted. They can still be messaged.",
			undo: () => get().unmute(id)
		}
	})),
	unmute: (id) => set((s) => ({ muted: s.muted.filter((item) => item !== id) })),
	block: (id) => {
		const person = getPerson(id);
		set((s) => ({
			blocked: s.blocked.includes(id) ? s.blocked : [...s.blocked, id],
			hidden: s.hidden.filter((item) => item !== id),
			toast: { text: person ? `${person.name.split(" ")[0]} is blocked` : "Blocked" },
			log: [{
				id: uid(),
				at: Date.now(),
				label: `Blocked ${person?.name ?? "a profile"}`
			}, ...s.log].slice(0, 50)
		}));
	},
	unblock: (id) => set((s) => ({
		blocked: s.blocked.filter((item) => item !== id),
		toast: { text: "Unblocked" }
	})),
	report: (personId, reason, note) => {
		const person = getPerson(personId);
		get().block(personId);
		set((s) => ({
			reports: [{
				id: uid(),
				personId,
				reason,
				note: note.trim(),
				at: Date.now()
			}, ...s.reports],
			notifs: [{
				id: uid(),
				at: Date.now(),
				title: "Report saved on this device",
				body: "Saved on this device. It is not shown to them.",
				read: false
			}, ...s.notifs].slice(0, 30),
			log: [{
				id: uid(),
				at: Date.now(),
				label: `Reported ${person?.name ?? "a profile"} · ${reason}`
			}, ...s.log].slice(0, 50)
		}));
	},
	requestShelf: (id) => {
		const person = getPerson(id);
		if (!person?.shelf || !person.shelfPolicy) return;
		const epoch = get().epoch;
		set((s) => ({ album: {
			...s.album,
			[id]: { status: "pending" }
		} }));
		if (person.shelfPolicy === "pending") return;
		window.setTimeout(() => {
			if (get().epoch !== epoch) return;
			if (person.shelfPolicy === "accept") {
				set((s) => ({
					album: {
						...s.album,
						[id]: {
							status: "open",
							until: Date.now() + 864e5
						}
					},
					toast: { text: `${person.name.split(" ")[0]} opened their shelf` }
				}));
				get().pushNotif(`${person.name.split(" ")[0]} opened a shelf`, "Access expires. You can close it from their profile.", id);
			} else {
				set((s) => ({
					album: {
						...s.album,
						[id]: { status: "declined" }
					},
					toast: { text: `${person.name.split(" ")[0]} kept their shelf closed` }
				}));
				get().pushNotif(`${person.name.split(" ")[0]} kept a shelf closed`, "The notes stay private.", id);
			}
		}, 700);
	},
	revokeShelf: (id) => {
		const person = getPerson(id);
		set((s) => ({
			album: {
				...s.album,
				[id]: { status: "revoked" }
			},
			toast: { text: "Shelf access revoked" },
			log: [{
				id: uid(),
				at: Date.now(),
				label: `Revoked shelf access · ${person?.name ?? id}`
			}, ...s.log].slice(0, 50)
		}));
	},
	appendThem: (personId, text) => {
		const person = getPerson(personId);
		set((s) => ({
			threads: {
				...s.threads,
				[personId]: [...s.threads[personId] ?? [], {
					id: uid(),
					from: "them",
					at: Date.now(),
					text
				}]
			},
			typingId: s.typingId === personId ? null : s.typingId
		}));
		const who = person?.name.split(" ")[0] ?? "Someone";
		get().pushNotif(`${who} replied`, text.slice(0, 140), personId);
	},
	send: (personId, text, seal) => {
		const trimmed = text.trim();
		if (!trimmed || get().blocked.includes(personId)) return;
		const person = getPerson(personId);
		const msg = {
			id: uid(),
			from: "me",
			at: Date.now(),
			text: trimmed.slice(0, 500),
			seal: seal ? "sealed" : void 0
		};
		set((s) => ({ threads: {
			...s.threads,
			[personId]: [...s.threads[personId] ?? [], msg]
		} }));
		if (!person || get().muted.includes(personId)) return;
		const epoch = get().epoch;
		const reply = seal ? "I'll only open that if I mean to. View-once notes shouldn't linger." : person.replies[(get().threads[personId]?.length ?? 1) % person.replies.length];
		set({ typingId: personId });
		const prev = replyTimers.get(personId);
		if (prev) window.clearTimeout(prev);
		const timer = window.setTimeout(() => {
			if (get().epoch !== epoch || get().blocked.includes(personId) || get().muted.includes(personId)) {
				if (get().typingId === personId) set({ typingId: null });
				return;
			}
			get().appendThem(personId, reply);
		}, 1100);
		replyTimers.set(personId, timer);
	},
	sendVoice: (personId, msgId) => {
		if (get().blocked.includes(personId)) return;
		const person = getPerson(personId);
		set((s) => ({ threads: {
			...s.threads,
			[personId]: [...s.threads[personId] ?? [], {
				id: msgId,
				from: "me",
				at: Date.now(),
				text: "Voice note",
				voice: true
			}]
		} }));
		if (!person || get().muted.includes(personId)) return;
		const epoch = get().epoch;
		set({ typingId: personId });
		window.setTimeout(() => {
			if (get().epoch !== epoch || get().blocked.includes(personId)) return;
			get().appendThem(personId, "Got the voice note. I'll listen properly, not on a loud street.");
		}, 1200);
	},
	openSeal: (personId, msgId) => {
		set((s) => ({ threads: {
			...s.threads,
			[personId]: (s.threads[personId] ?? []).map((msg) => msg.id === msgId && msg.seal === "sealed" ? {
				...msg,
				seal: "read"
			} : msg)
		} }));
		const key = `${personId}:${msgId}`;
		const prev = sealTimers.get(key);
		if (prev) window.clearTimeout(prev);
		const epoch = get().epoch;
		const timer = window.setTimeout(() => {
			if (get().epoch !== epoch) return;
			set((s) => ({ threads: {
				...s.threads,
				[personId]: (s.threads[personId] ?? []).map((msg) => msg.id === msgId ? {
					...msg,
					seal: "expired",
					text: ""
				} : msg)
			} }));
		}, 6e3);
		sealTimers.set(key, timer);
	},
	react: (personId, msgId, reaction) => set((s) => ({ threads: {
		...s.threads,
		[personId]: (s.threads[personId] ?? []).map((msg) => msg.id === msgId ? {
			...msg,
			reaction
		} : msg)
	} })),
	markRead: (personId) => set((s) => ({ readAt: {
		...s.readAt,
		[personId]: Date.now()
	} })),
	setTrusted: (name) => set({ trusted: name.slice(0, 40) }),
	startMeetup: (personId, meetup) => {
		const person = getPerson(personId);
		set((s) => ({
			meetups: {
				...s.meetups,
				[personId]: {
					...meetup,
					startedAt: Date.now(),
					checks: [],
					closed: false
				}
			},
			log: [{
				id: uid(),
				at: Date.now(),
				label: `Meetup plan with ${person?.name ?? "someone"}`
			}, ...s.log].slice(0, 50),
			toast: { text: "Plan saved on this device" }
		}));
		get().pushNotif("Meetup plan saved", `With ${person?.name.split(" ")[0] ?? "someone"}. Check in from the plan.`, personId);
	},
	checkMeetup: (personId, kind) => {
		const person = getPerson(personId);
		if (!get().meetups[personId]) return;
		const label = kind === "here" ? "Checked in: I'm here" : kind === "safe" ? "Checked in: I'm safe" : "Fast exit: leaving now";
		set((s) => {
			const current = s.meetups[personId];
			if (!current) return s;
			return {
				meetups: {
					...s.meetups,
					[personId]: {
						...current,
						closed: kind === "leave" ? true : current.closed,
						checks: [...current.checks, {
							at: Date.now(),
							kind
						}]
					}
				},
				log: [{
					id: uid(),
					at: Date.now(),
					label: `${label} · ${person?.name ?? personId}`
				}, ...s.log].slice(0, 50),
				toast: { text: label }
			};
		});
		get().pushNotif(label, person ? `With ${person.name.split(" ")[0]}. Kept on this device.` : "Kept on this device.", personId);
	},
	clearMeetup: (personId) => set((s) => {
		const next = { ...s.meetups };
		delete next[personId];
		return { meetups: next };
	}),
	pushNotif: (title, body, personId) => {
		set((s) => ({ notifs: [{
			id: uid(),
			at: Date.now(),
			title,
			body,
			read: false,
			personId
		}, ...s.notifs].slice(0, 30) }));
		devicePing(title, body);
	},
	setDeviceAlerts: (deviceAlerts) => set({ deviceAlerts }),
	setLock: (patch) => set((s) => ({
		lock: {
			...s.lock,
			...patch
		},
		sessionOpen: true
	})),
	clearLock: () => set({
		lock: {
			credentialId: null,
			codeHash: null
		},
		sessionOpen: true
	}),
	openSession: () => set({ sessionOpen: true }),
	refreshDevice: async () => {
		const { me, gate, favourites } = get();
		const age = gate.birthYear ? (/* @__PURE__ */ new Date()).getFullYear() - gate.birthYear : null;
		try {
			await saveSelfProfile(me, age);
			const current = await listDeviceProfiles();
			const have = new Set(current.map((row) => row.id));
			for (const id of favourites) {
				const person = getPerson(id);
				if (person && !have.has(id)) await savePersonProfile(person);
			}
			const rows = await listDeviceProfiles();
			const photos = {};
			for (const row of rows) {
				if (row.self || !row.photo) continue;
				photos[row.id] = URL.createObjectURL(row.photo);
			}
			const previous = get().devicePhotos;
			for (const url of Object.values(previous)) URL.revokeObjectURL(url);
			set({
				devicePeople: rows.filter((row) => !row.self).map((row) => ({
					id: row.id,
					name: row.name
				})),
				devicePhotos: photos
			});
		} catch {}
	},
	readNotifs: () => set((s) => ({ notifs: s.notifs.map((note) => ({
		...note,
		read: true
	})) })),
	pushToast: (text, undo) => set({ toast: {
		text,
		undo
	} }),
	clearToast: () => set({ toast: null }),
	dismissLoginHint: () => set({ loginHint: false }),
	erase: () => {
		const previous = get().devicePhotos;
		for (const url of Object.values(previous)) URL.revokeObjectURL(url);
		set({
			...fresh(),
			hydrated: true,
			epoch: get().epoch + 1,
			typingId: null,
			sessionOpen: false,
			devicePeople: [],
			devicePhotos: {},
			toast: { text: "MEAT data on this device was erased" }
		});
		useGrid.persist.clearStorage();
		clearDeviceProfiles();
	}
}), {
	name: "grid-state-v1",
	storage: createJSONStorage(() => storage),
	skipHydration: true,
	partialize: (state) => ({
		gate: state.gate,
		onboarded: state.onboarded,
		me: state.me,
		filters: state.filters,
		saved: state.saved,
		browseAreaId: state.browseAreaId,
		density: state.density,
		waves: state.waves,
		favourites: state.favourites,
		hidden: state.hidden,
		blocked: state.blocked,
		muted: state.muted,
		reports: state.reports,
		album: state.album,
		threads: state.threads,
		readAt: state.readAt,
		meetups: state.meetups,
		trusted: state.trusted,
		log: state.log,
		notifs: state.notifs,
		deviceAlerts: state.deviceAlerts,
		loginHint: state.loginHint,
		lock: state.lock
	}),
	onRehydrateStorage: () => () => {
		useGrid.setState({ hydrated: true });
	}
}));
function unreadCount(threads, readAt, muted, blocked) {
	let count = 0;
	for (const [id, msgs] of Object.entries(threads)) {
		if (muted.includes(id) || blocked.includes(id)) continue;
		const last = msgs[msgs.length - 1];
		if (last && last.from === "them" && last.at > (readAt[id] ?? 0)) count += 1;
	}
	return count;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var MONO = [
	"mono-a",
	"mono-b",
	"mono-c",
	"mono-d"
];
function Mark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 32 32",
		className: cn("size-4 shrink-0", className),
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: "32",
			height: "32",
			rx: "6",
			className: "fill-ember"
		})
	});
}
function Wordmark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-2 text-fg", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "wordmark font-display text-lg font-extrabold",
			children: "MEAT"
		})]
	});
}
function Monogram({ id, name, size = "lg" }) {
	const initials = name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mono", MONO[hash(id) % MONO.length]),
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("font-display font-extrabold", size === "sm" ? "text-xs" : "text-3xl"),
			children: initials || "G"
		})
	});
}
function Portrait({ id, name, eager = false, size = "lg" }) {
	const [failed, setFailed] = (0, import_react.useState)(false);
	const local = useGrid((s) => s.devicePhotos[id]);
	if (failed && !local) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monogram, {
		id,
		name,
		size
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: local ?? `/portraits/${id}.jpg?v=spark`,
		alt: "",
		className: "cover",
		loading: eager ? "eager" : "lazy",
		decoding: "async",
		fetchPriority: eager ? "high" : "auto",
		onError: () => setFailed(true)
	});
}
function Sheet({ open, onOpenChange, title, description, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "sheet-overlay fixed inset-0 z-50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sheet-panel fixed bottom-0 z-50 overflow-y-auto rounded-t-3xl border border-line bg-surface px-4 pt-3 outline-none",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mb-3 h-1 w-10 rounded-full bg-line",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "font-display text-xl font-bold",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "mt-1 text-sm text-muted",
						children: description
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
						className: "press grid size-11 shrink-0 place-items-center rounded-full bg-raised",
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children
				})
			]
		})] })
	});
}
function Button({ variant = "primary", className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		...props,
		className: cn("press inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40", variant === "primary" && "bg-ember text-ember-ink", variant === "solid" && "bg-fg text-bg", variant === "ghost" && "border border-line bg-raised text-fg", className)
	});
}
function Chip({ on, children, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		"aria-pressed": on,
		className: cn("press min-h-11 shrink-0 rounded-full border px-3 text-sm font-medium", on ? "border-ember bg-ember text-ember-ink" : "border-line bg-raised text-fg"),
		children
	});
}
function Toggle({ on, label, hint, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		role: "switch",
		"aria-checked": on,
		onClick: () => onChange(!on),
		className: "press flex w-full items-center gap-3 py-3 text-left",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-sm font-semibold",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-0.5 block text-sm text-muted",
				children: hint
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("relative h-7 w-12 shrink-0 rounded-full p-1", on ? "bg-ember" : "bg-line"),
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("block size-5 rounded-full transition-transform", on ? "translate-x-5 bg-ember-ink" : "bg-fg") })
		})]
	});
}
function NoticesButton() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [fresh, setFresh] = (0, import_react.useState)([]);
	const notifs = useGrid((s) => s.notifs);
	const unread = notifs.filter((note) => !note.read).length;
	const readNotifs = useGrid((s) => s.readNotifs);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: "press relative grid size-11 place-items-center rounded-full bg-raised",
		"aria-label": unread ? `Notices, ${unread} new` : "Notices",
		onClick: () => {
			setFresh(notifs.filter((note) => !note.read).map((note) => note.id));
			setOpen(true);
			readNotifs();
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-5" }), unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute -right-0.5 -top-0.5 grid min-h-4 min-w-4 place-items-center rounded-full bg-ember px-1 text-xs font-semibold text-ember-ink",
			children: unread > 9 ? "9+" : unread
		}) : null]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange: setOpen,
		title: "Notices",
		description: "Kept on this device. Nothing here is sent to a server.",
		children: notifs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Replies, shelf answers, plans, and check-ins show up here."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-3",
			children: notifs.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: cn("rounded-2xl border bg-raised px-3 py-3", fresh.includes(note.id) ? "border-ember" : "border-line"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold",
						children: note.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: note.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-mono text-xs text-faint",
						children: shortTime(note.at)
					}),
					note.personId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/c/$id",
						params: { id: note.personId },
						className: "mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-ember",
						onClick: () => setOpen(false),
						children: "Open chat"
					}) : null
				]
			}, note.id))
		})
	})] });
}
function Nav() {
	const threads = useGrid((s) => s.threads);
	const readAt = useGrid((s) => s.readAt);
	const muted = useGrid((s) => s.muted);
	const blocked = useGrid((s) => s.blocked);
	const incognito = useGrid((s) => s.me.incognito);
	const unread = unreadCount(threads, readAt, muted, blocked);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "safe-bottom fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-line bg-bg px-2 lg:inset-y-0 lg:left-0 lg:w-56 lg:flex-col lg:items-stretch lg:justify-start lg:gap-1 lg:border-t-0 lg:border-r lg:px-3 lg:pt-6",
		"aria-label": "Primary",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-6 hidden px-2 lg:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {})
			}),
			[
				{
					to: "/",
					label: "Nearby",
					icon: LayoutGrid,
					exact: true
				},
				{
					to: "/explore",
					label: "Explore",
					icon: Compass,
					exact: false
				},
				{
					to: "/inbox",
					label: "Inbox",
					icon: MessageCircle,
					exact: false,
					badge: unread
				},
				{
					to: "/you",
					label: "You",
					icon: UserRound,
					exact: false
				}
			].map((item) => {
				const Icon = item.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.to,
					activeOptions: { exact: item.exact },
					"aria-label": item.badge ? `${item.label}, ${item.badge} unread` : item.label,
					className: "press flex min-h-11 min-w-11 flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl px-1 text-xs font-medium lg:flex-none lg:flex-row lg:justify-start lg:gap-3 lg:px-3 lg:py-3 lg:text-sm",
					activeProps: { className: "text-ember lg:bg-raised" },
					inactiveProps: { className: "text-faint" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-5",
							"aria-hidden": "true"
						}), item.badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute -right-2 -top-2 grid min-h-4 min-w-4 place-items-center rounded-full bg-ember px-1 text-xs font-semibold text-ember-ink",
							children: item.badge
						}) : null]
					}), item.label]
				}, item.to);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-auto hidden px-3 pb-6 text-xs lg:block", incognito ? "text-ember" : "text-faint"),
				children: incognito ? "Not listed." : "Listed nearby."
			})
		]
	});
}
function ToastHost() {
	const toast = useGrid((s) => s.toast);
	const clearToast = useGrid((s) => s.clearToast);
	(0, import_react.useEffect)(() => {
		if (!toast) return;
		const id = window.setTimeout(clearToast, 3200);
		return () => window.clearTimeout(id);
	}, [toast, clearToast]);
	if (!toast) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "toast-host",
		role: "status",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3 rounded-full border border-line bg-raised px-4 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: toast.text
			}), toast.undo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "press min-h-11 shrink-0 font-semibold text-ember",
				onClick: () => {
					toast.undo?.();
					clearToast();
				},
				children: "Undo"
			}) : null]
		})
	});
}
function Frame({ children, immersive = false }) {
	const hydrated = useGrid((s) => s.hydrated);
	const birthYear = useGrid((s) => s.gate.birthYear);
	const onboarded = useGrid((s) => s.onboarded);
	const ready = hydrated && birthYear !== null && birthYear <= (/* @__PURE__ */ new Date()).getFullYear() - 18 && onboarded;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [ready ? immersive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-dvh",
		children
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh pb-32 lg:pb-10 lg:pl-56",
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {})]
	}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastHost, {})] });
}
//#endregion
export { shortTime as A, cn as C, lookingLabel as D, kmBetween as E, useGrid as M, windowTarget as N, presence as O, bandText as S, isAdultYear as T, Toggle as _, DEFAULT_FILTERS as a, adultCutoff as b, Monogram as c, PRONOUNS as d, Portrait as f, TAGS as g, Sheet as h, Chip as i, toggleItem as j, rankPeople as k, NoticesButton as l, REPORT_REASONS as m, AVAILABILITY as n, Frame as o, RADII as p, Button as r, LOOKING as s, AREAS as t, PEOPLE as u, VENUES as v, getPerson as w, areaById as x, Wordmark as y };
