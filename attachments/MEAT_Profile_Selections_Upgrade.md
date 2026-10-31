# MEAT — Profile Selections Upgrade

**Version:** 1.0  
**Prepared:** 17 October 2026  
**Target:** MEAT, https://meatapp.grok.me/  
**Deliverable:** Developer implementation brief and proposed selection catalogue  
**Status:** Proposed upgrade. No live application changes have been made.

## 1. Upgrade objective

Expand MEAT's profile selections so adult members can say plainly why they are here, what kind of sexual or romantic connection they want, what interests them, and where their boundaries sit.

The tone should be confident, sex-positive, respectful and direct. Use recognisable language such as **casual sex**, **hookups**, **friends with benefits**, **oral sex**, **kink** and **sexting**. Keep labels short and descriptions factual.

Treat this as an enhancement to the existing MEAT experience. Retain its current audience of men seeking men, including trans men, and its existing visual identity. Do not infer anyone's anatomy, sexual role or interests from their gender.

### Verified starting point

The public signup at [MEAT's information page](https://meatapp.grok.me/info), inspected on 17 October 2026, currently offers five **Open to** selections: **Chat, Friends, Dates, Relationship, Community**.

The public pages describe browser-local profile storage and approximate distance bands. These are observed product claims; the underlying storage, networking and security implementation have not been audited. The post-signup **You** editor was not inspected, and no account was created.

Build against the actual repository. Locate the existing profile schema, selectors, storage adapter and profile renderer before making changes. The identifiers, component names and schema below are proposed contracts, not assertions about existing code.

### Desired result

A member should be able to express something like:

> Here for casual sex and sexual chemistry. Looking for friends with benefits or a regular play partner. Versatile. Into kissing and oral sex; curious about bondage. Ask before explicit photos. Chat first, then decide.

This is example product copy for a fictional adult profile, not a default profile or a statement about any real person.

## 2. Profile structure and field rules

Replace the broad Open to control with the following structure under an optional **Desire & connection** profile section.

| Field | Key | Control and limit | Initial visibility |
|---|---|---|---|
| Why I'm here | `intentions` | Multi-select, up to 4 | Only me until explicitly shared |
| What I'm looking for | `connection_types` | Multi-select, up to 5 | Only me until explicitly shared |
| Who I'd like to meet | `partner_configuration` | Multi-select, up to 3 | Only me |
| My sexual role | `sexual_role` | Optional single-select | Only me |
| Roles I'm interested in | `preferred_partner_roles` | Multi-select, up to 8; optional | Only me |
| My kink dynamic | `kink_dynamic` | Optional single-select | Only me |
| What I'm into | `interests` | Searchable catalogue; up to 16 positive or exploratory selections | Only me |
| My experience | `experience` | Optional single-select | Only me |
| How to approach me | `approach_preferences` | Multi-select, up to 4 | Only me until explicitly shared |
| My boundaries | `boundaries` | Multi-select; allow every applicable choice | Only me until explicitly shared |
| Relationship situation | `relationship_status` | Optional single-select | Only me |
| Relationship style | `relationship_structure` | Optional single-select | Only me |
| How I like to meet | `meeting_preferences` | Multi-select, up to 4 | Only me |
| Hosting and travel | `logistics` | Multi-select, up to 2 | Only me |
| Right now | `availability` | Optional single status with expiry | Only me until explicitly shared |

All fields are optional. Skipping a field produces an unspecified value, not a negative preference or permission.

**Why I'm here** describes motivation. **What I'm looking for** describes the arrangement or connection. Keep them separate even where users choose related answers.

The selection limits are proposed UX defaults, not market research findings. Do not cap safety boundaries or the number of interests a member marks **Not for me**.

## 3. Exact selection catalogue

Use these stable IDs for new options. Render the display labels from a shared configuration file so wording can change without breaking saved profiles.

### 3.1 Why I'm here

Helper text: **"Tell people what brings you here. Choose up to 4."**

| ID | Display label |
|---|---|
| `chat_flirt` | Chat & flirt |
| `sexual_chemistry` | Find sexual chemistry |
| `casual_sex` | Casual sex |
| `regular_connection` | Build a regular connection |
| `explore_sexuality` | Explore my sexuality |
| `explore_kink` | Explore kink |
| `dating` | Go on dates |
| `relationship` | Find a relationship |
| `friends` | Make friends |
| `community` | Find my community |
| `meet_while_visiting` | Meet while visiting |
| `see_what_happens` | See what happens |

Do not require users to choose between sex and romance. Both can be selected.

### 3.2 What I'm looking for

Helper text: **"What kind of connection would suit you? Choose up to 5."**

| ID | Display label |
|---|---|
| `one_off_hookup` | One-off hookup |
| `regular_hookups` | Regular hookups |
| `friends_with_benefits` | Friends with benefits |
| `sex_only_connection` | Sex-only connection |
| `play_partner` | Play partner |
| `kink_partner` | Kink partner |
| `casual_dates` | Casual dates |
| `relationship_potential` | Relationship potential |
| `long_term_partner` | Long-term partner |
| `friendship` | Friendship |
| `chat_only` | Chat only |
| `online_flirting` | Online flirting |
| `sexting` | Sexting |
| `video_intimacy` | Consensual video intimacy |
| `event_companion` | Someone to go to events with |

Selecting an online connection expresses an interest. It does not enable unsolicited sexual messages, images or calls.

Allow users to describe different possibilities without forcing artificial consistency. If someone selects Chat only and a meeting-based connection, show an optional clarification prompt; do not silently remove either choice.

### 3.3 Who I'd like to meet

Helper text: **"Choose the kinds of connection you're open to."**

| ID | Display label |
|---|---|
| `one_to_one` | One-to-one |
| `connect_with_couple` | Connect with a couple |
| `threesome` | Threesome |
| `small_group` | Small group |
| `group_event` | Group event |

These describe an individual's interests. They do not introduce shared accounts or let one member speak for other participants. No group activity is agreed merely because profiles share a selection.

### 3.4 My sexual role

Helper text: **"Choose a label if it helps. You can leave this blank."**

| ID | Display label |
|---|---|
| `top` | Top |
| `mostly_top` | Mostly top |
| `versatile` | Versatile |
| `mostly_bottom` | Mostly bottom |
| `bottom` | Bottom |
| `side` | Side |
| `no_fixed_role` | No fixed role |
| `exploring` | Exploring |
| `prefer_to_discuss` | Prefer to discuss |

Add short, neutral explanations behind an optional information control if needed. Do not infer anatomy, gender, sexual activities or a kink dynamic from a role.

**Roles I'm interested in** uses the same catalogue except `prefer_to_discuss`. It is a separate, optional multi-select. Leaving it empty means no role preference has been supplied.

Do not automatically choose a desired partner role from the member's own role. Do not mark two people incompatible solely because of role labels.

### 3.5 My kink dynamic

Helper text: **"If you enjoy a particular dynamic, you can add it here."**

| ID | Display label |
|---|---|
| `dominant` | Dominant |
| `submissive` | Submissive |
| `switch` | Switch |
| `exploring` | Exploring |
| `no_particular_dynamic` | No particular dynamic |
| `prefer_to_discuss` | Prefer to discuss |

Keep this independent of sexual role. For example, selecting Bottom must not select Submissive.

### 3.6 What I'm into

Helper text: **"Add what interests you, what you're curious about, or what isn't for you. Sharing is your choice."**

Each selected interest has one explicit stance:

| Value | Display label | Meaning in the product |
|---|---|---|
| `into` | Into it | A current stated interest |
| `curious` | Curious | Something the member may want to explore |
| `discuss` | Discuss first | Context and conversation are needed |
| `not_for_me` | Not for me | A stated current limit |

An unselected interest remains unspecified. Do not convert missing interests into Not for me, and do not present Curious as Into it.

**Touch & intimacy**

| ID | Display label |
|---|---|
| `kissing` | Kissing |
| `cuddling` | Cuddling |
| `sensual_massage` | Sensual massage |
| `mutual_touch` | Mutual touch |
| `taking_it_slow` | Taking it slow |

**Sex & play**

| ID | Display label |
|---|---|
| `oral_sex` | Oral sex |
| `anal_sex` | Anal sex |
| `vaginal_front_hole_sex` | Vaginal / front-hole sex |
| `mutual_masturbation` | Mutual masturbation |
| `non_penetrative_sex` | Non-penetrative sex |
| `sex_toys` | Sex toys |
| `strap_on_play` | Strap-on play |
| `dirty_talk` | Dirty talk |

The anatomy-related choice is optional and available without assumptions about gender. Do not ask for anatomy, transition history or medical information to select it.

**Kink & style**

| ID | Display label |
|---|---|
| `bdsm` | BDSM |
| `bondage` | Bondage |
| `adult_roleplay` | Adult roleplay |
| `sensation_play` | Sensation play |
| `spanking` | Spanking |
| `power_exchange` | Power exchange |
| `praise` | Praise |
| `leather` | Leather |
| `latex` | Latex |
| `harnesses` | Harnesses |
| `lingerie` | Lingerie |
| `foot_play` | Foot play |

These are discovery labels, not instructions or claims that an activity is safe for every person. Keep descriptions non-graphic and limited to consensual adult contexts.

**Shared experiences**

| ID | Display label |
|---|---|
| `threesomes` | Threesomes |
| `group_play` | Group play |
| `watching_by_agreement` | Watching, by agreement |
| `being_watched_by_agreement` | Being watched, by agreement |

The watching options refer to private or designated adult settings where all participants have agreed. They must not suggest covert observation, recording, or involving unaware bystanders.

**Digital intimacy**

| ID | Display label |
|---|---|
| `sexting` | Sexting |
| `private_photo_sharing` | Private photo sharing |
| `consensual_video_intimacy` | Consensual video intimacy |

If the current product does not support sexual media or calls, these remain preferences for discussion. Do not add a broken action button or imply that selecting a tag creates a working media feature.

**Optional detail for applicable interests**

For `sensual_massage`, `oral_sex`, `anal_sex`, `vaginal_front_hole_sex`, `strap_on_play`, `bondage` and `spanking`, allow a secondary detail:

- Giving
- Receiving
- Both
- Prefer to discuss

Store it on the interest as `direction`; keep it unset unless the user chooses. Hide this control for other interests and for Not for me. Never generate it from sexual role. Direction does not describe consent in any particular encounter.

Use the stable key `vaginal_front_hole_sex` even if later language settings allow members to choose the wording they prefer.

### 3.7 My experience

Helper text: **"Share only what makes meeting someone easier."**

| ID | Display label |
|---|---|
| `new_to_this` | New to this |
| `exploring` | Exploring |
| `some_experience` | Some experience |
| `experienced` | Experienced |
| `prefer_to_discuss` | Prefer to discuss |

Do not use this field to score attractiveness, pressure disclosure or rank members.

### 3.8 How to approach me

Helper text: **"Help someone start the conversation well."**

| ID | Display label |
|---|---|
| `say_hello_first` | Say hello first |
| `tell_me_your_intent` | Tell me what you're looking for |
| `be_direct` | Be direct |
| `flirt_first` | Flirt first |
| `build_chemistry` | Build chemistry first |
| `patient_conversation` | Give me time to warm up |
| `discuss_interests` | Let's talk about what we're into |

Being direct or flirtatious never overrides a boundary or an in-conversation refusal.

### 3.9 My boundaries

Helper text: **"Be clear about what works for you. You can change this at any time."**

| ID | Display label |
|---|---|
| `ask_before_sexual_messages` | Ask before sexual messages |
| `ask_before_explicit_photos` | Ask before explicit photos |
| `ask_before_sexual_video_calls` | Ask before sexual video calls |
| `no_explicit_photos` | No explicit photos |
| `no_recording` | No recording |
| `no_resharing` | Do not share my photos or messages |
| `no_extra_people_without_agreement` | No extra people without agreement |
| `discuss_boundaries_first` | Discuss boundaries first |
| `discuss_testing_and_protection` | Discuss testing and protection |
| `barriers_required` | Barriers required |
| `sober_meetups` | Sober meetups |
| `keep_identifying_details_private` | Keep identifying details private |
| `time_to_decide` | Give me time to decide |
| `no_rough_play` | No rough play |
| `no_group_play` | No group play |

For specific activity limits, also support the Not for me stance in the interest catalogue.

An unchecked boundary never grants permission. Consent, permission to record, and permission to redistribute are not inferred from profiles. Do not provide a No limits or Blanket consent setting.

If a user selects both No explicit photos and Ask before explicit photos, retain the saved choices but present the stricter preference first; do not imply that asking overrides No explicit photos. A genuine media permission system must evaluate the current conversation state separately.

### 3.10 Relationship situation and style

Keep the two questions separate and optional.

| Field | ID | Display label |
|---|---|---|
| Relationship situation | `single` | Single |
| Relationship situation | `dating` | Dating |
| Relationship situation | `partnered` | Partnered |
| Relationship situation | `married` | Married |
| Relationship situation | `prefer_to_discuss` | Prefer to discuss |
| Relationship style | `monogamous` | Monogamous |
| Relationship style | `consensually_open` | Consensually open |
| Relationship style | `polyamorous` | Polyamorous |
| Relationship style | `exploring_cnm` | Exploring consensual non-monogamy |
| Relationship style | `prefer_to_discuss` | Prefer to discuss |

These are self-described values. Do not label relationship arrangements as verified or claim that the app has established another person's agreement.

### 3.11 How I like to meet

| ID | Display label |
|---|---|
| `chat_first` | Chat first |
| `video_chat_first` | Video chat first |
| `public_meet_first` | Meet in public first |
| `plan_ahead` | Plan ahead |
| `spontaneous_plans` | Spontaneous plans |
| `meet_at_event` | Meet at an event |
| `discuss_location` | Discuss the location together |

**Hosting and travel** is a separate, more restricted field.

| ID | Display label |
|---|---|
| `can_host` | Can host |
| `can_travel` | Can travel |
| `depends_on_day` | Depends on the day |
| `discuss_privately` | Discuss privately |

A hosting selection must not reveal an address, precise map position or that someone is currently alone. Preserve the existing approximate-distance approach.

### 3.12 Right now

Helper text: **"Set a temporary status. Choose when it disappears."**

| ID | Display label |
|---|---|
| `chat_now` | Chat now |
| `flirting_now` | Flirting now |
| `open_to_meet` | Open to meeting |
| `looking_tonight` | Looking tonight |
| `weekend_plans` | Making weekend plans |
| `planning_ahead` | Planning ahead |
| `just_browsing` | Just browsing |

Require a clear expiry whenever the member activates a status:

- Default to 2 hours.
- Offer 1 hour, 2 hours, 4 hours, or an explicit end date and time within the next 7 days.
- Display the actual local end date, time and timezone before saving.
- Do not assume Tonight ends at midnight or automatically repeat a status.
- Store an absolute `expires_at` timestamp, not only a label.
- Clear expired statuses on read, app resume, profile rendering and any server query.
- Provide a one-tap **Clear status** action.
- Do not infer availability from app activity, online presence or an old profile selection.

An availability status does not imply consent or a commitment to meet.

## 4. Interaction and visual design

### Progressive disclosure

Use three compact steps:

1. **Intent:** Why I'm here and What I'm looking for.
2. **Desire:** Role, dynamic and interests; expandable, with a visible Skip action.
3. **Comfort:** Approach, boundaries, meeting preferences and sharing.

Relationship details and temporary availability can remain separate sections in the profile editor. Do not force the entire catalogue into signup.

Retain the existing charcoal background, pink accent and typography conventions after checking the actual project tokens. Use compact selectable chips with text and a selected indicator. Group interests under the catalogue headings and provide search.

Make selection counts visible. At the cap, keep selected chips removable and explain the limit beside the field. Do not discard previous choices automatically.

### Interest interaction

Opening an interest presents its four stance choices. Do not preselect Into it. After a stance is chosen, display the interest and stance together, for example **Bondage · Curious**.

Provide Remove separately from Not for me. Removing returns the interest to unspecified; Not for me records a boundary.

For signed-out visitors, render only neutral marketing or catalogue explanations. Do not expose real members' sexual selections.

### Profile display

For an eligible viewer:

- Show at most 3 visible intention or connection chips on a compact card.
- In a full profile, group connection preferences, interests and boundaries under separate headings.
- Present Curious and Discuss first distinctly from established interests.
- Put a shared boundary near the relevant conversation action when possible.
- Keep role, kink details, hosting and sexual activity tags off discovery cards by default.
- Never reveal that a hidden field exists through a count, placeholder or "hidden kink" badge.

Provide **Preview as another member** and, only where technically supported, **Preview as an approved connection**.

### Accessibility and states

Use real checkboxes or toggle buttons with accessible names and selected states. Single-choice controls must behave as a radio group. Include keyboard navigation, visible focus, textual stance labels, and touch targets at least 44 by 44 pixels as a design target.

Show empty, selected, limit-reached, saving, saved and failed-save states. Keep edits intact when saving fails. Respect reduced-motion preferences and avoid colour-only communication.

These are implementation requirements; no accessibility certification is being claimed.

## 5. Sharing and privacy behaviour

### Audience controls

| Stored value | User-facing label | Required behaviour |
|---|---|---|
| `only_me` | Only me | Owner access only; excluded from all other-member responses and discovery |
| `approved_connections` | Approved connections | Visible only under a real, current, revocable connection permission |
| `adult_members` | Adult members | Visible only to members eligible under the platform's adult-access controls |

An accepted connection must be a defined relationship in the application. A wave, profile visit or saved favourite does not grant this audience.

All new fields start as Only me. At save time, offer an explicit choice to share selected broad fields, with a preview of exactly what will be shown. Do not silently switch the entire section to a wider audience.

**Hosting and travel may use Only me or Approved connections only.** Do not offer Adult members for that field.

Showing a profile setting and using it in discovery are separate decisions. For this version, a field may influence member-facing search or recommendations only when:

1. Its audience is Adult members.
2. The owner separately enabled discovery use for that field.
3. The querying viewer passes all relevant access, block and visibility checks.

Never use Only me or Approved connections fields in general discovery, even when a client sends a crafted filter request. A member's appearance in a narrow search can reveal the searched attribute.

When visibility narrows from Adult members, reset that field's discovery opt-in to false. Widening visibility again must not restore discovery use automatically; require a fresh explicit choice.

Keep sexual choices out of notification text, public metadata, URLs, referral links, analytics properties and ordinary application logs. Record generic interaction events if needed, without selected values.

### Respect the current storage promise

If MEAT is still a browser-local prototype, implement this upgrade through its existing local storage adapter and be truthful about the result:

- Saved choices are local until an actual sharing system exists.
- Other-member audience previews are previews; they must not claim to enforce a multi-user access rule that does not exist.
- Do not upload existing data or introduce remote profile syncing as an incidental part of this upgrade.
- Do not call browser-local storage encrypted, cross-device, or authenticated unless that is implemented and verified.

If the repository already has a real multi-user backend, apply these permissions at the backend response, query and cache layers. Hiding chips in the interface is insufficient.

When a field is hidden or deleted, update eligible search indexes and caches. Revoking connection access must stop subsequent authorised retrieval. Do not promise to erase screenshots or copies another person has already made.

## 6. Proposed data contract

Use a namespaced `desire_connection` object so existing profile fields remain compatible.

~~~ts
type Audience = "only_me" | "approved_connections" | "adult_members";
type Stance = "into" | "curious" | "discuss" | "not_for_me";
type Direction = "giving" | "receiving" | "both" | "prefer_to_discuss";

type DesireField =
  | "intentions" | "connection_types" | "partner_configuration"
  | "sexual_role" | "preferred_partner_roles" | "kink_dynamic"
  | "interests" | "experience" | "approach_preferences" | "boundaries"
  | "relationship_status" | "relationship_structure"
  | "meeting_preferences" | "logistics" | "availability";

interface InterestSelection {
  id: string; // Validate against the interest catalogue.
  stance: Stance;
  direction: Direction | null;
}

interface DesireConnectionProfile {
  schema_version: 1;
  taxonomy_version: 1;
  intentions: string[];
  connection_types: string[];
  partner_configuration: string[];
  sexual_role: string | null;
  preferred_partner_roles: string[];
  kink_dynamic: string | null;
  interests: InterestSelection[];
  experience: string | null;
  approach_preferences: string[];
  boundaries: string[];
  relationship_status: string | null;
  relationship_structure: string | null;
  meeting_preferences: string[];
  logistics: string[];
  availability: {
    status: string;
    expires_at: string; // Absolute ISO 8601 timestamp.
    timezone: string;   // Explicit IANA timezone for display.
  } | null;
  visibility: Record<DesireField, Audience>;
  discovery_opt_in: Record<DesireField, boolean>;
  updated_at: string;
}
~~~

This is a framework-neutral contract. Generate narrower ID unions from the catalogue where practical. Validate all IDs at runtime as well as in the UI.

Required validation:

- Enforce field-specific IDs, counts and uniqueness.
- Keep omitted scalar values null and omitted selections empty.
- Require complete default visibility and discovery maps.
- Reject unknown fields and IDs in new writes; keep legacy data intact for review.
- Reject unsupported direction values and clear direction when an interest becomes Not for me.
- Restrict direction to the applicable interest IDs listed in section 3.6.
- Count only Into it, Curious and Discuss first toward the 16-interest limit.
- Default every discovery flag to false.
- Reject Adult members visibility for logistics.
- A discovery flag is ineffective unless its field is currently Adult members; narrowing visibility also resets the flag to false.
- Reject expired or overly distant availability timestamps on activation.
- Preserve the most recent confirmed save on a storage failure.
- If storage is remote, use the project's existing authenticated update and conflict-handling patterns.

### Example record

The abbreviated maps below illustrate individual values; production records must include every field with the defaults above.

~~~json
{
  "schema_version": 1,
  "taxonomy_version": 1,
  "intentions": ["casual_sex", "sexual_chemistry"],
  "connection_types": ["friends_with_benefits", "play_partner"],
  "partner_configuration": ["one_to_one"],
  "sexual_role": "versatile",
  "preferred_partner_roles": [],
  "kink_dynamic": "exploring",
  "interests": [
    {"id": "kissing", "stance": "into", "direction": null},
    {"id": "oral_sex", "stance": "into", "direction": "both"},
    {"id": "bondage", "stance": "curious", "direction": null},
    {"id": "group_play", "stance": "not_for_me", "direction": null}
  ],
  "experience": null,
  "approach_preferences": ["say_hello_first", "tell_me_your_intent"],
  "boundaries": ["ask_before_explicit_photos", "no_recording"],
  "relationship_status": null,
  "relationship_structure": null,
  "meeting_preferences": ["chat_first", "public_meet_first"],
  "logistics": [],
  "availability": null,
  "visibility": {
    "intentions": "adult_members",
    "connection_types": "adult_members",
    "sexual_role": "only_me",
    "interests": "approved_connections"
  },
  "discovery_opt_in": {
    "intentions": true,
    "connection_types": true,
    "sexual_role": false,
    "interests": false
  },
  "updated_at": "2026-10-17T14:00:00Z"
}
~~~

The example's sharing choices represent deliberate actions by a fictional adult user, not defaults to apply to new members.

## 7. Existing-data migration

The observed labels are known; their stored IDs are not. Confirm the actual stored representation before mapping anything.

| Existing display label | Proposed migrated intention | Handling |
|---|---|---|
| Chat | `chat_flirt` | Offer for confirmation because the new wording includes flirting |
| Friends | `friends` | Equivalent broad intention |
| Dates | `dating` | Equivalent broad intention |
| Relationship | `relationship` | Equivalent broad intention |
| Community | `community` | Equivalent broad intention |

Do not derive sexual interests, roles, relationship status, hookups, availability, or connection arrangements from any legacy choice.

Because a member could previously select all five choices, migration must not silently trim to the new four-intention limit. Preserve the legacy values unchanged. If more than four would migrate, show the existing values and let the owner choose up to four before committing the new version.

Keep the original record until the member reviews and saves the upgraded selection. Do not widen visibility during migration. New fields remain unset and private.

If exact equivalent storage is preferable, retain the legacy Chat label until the member explicitly chooses Chat & flirt. Do not convert the added meaning automatically.

Migration must be idempotent: reopening the profile or refreshing cannot duplicate selections or overwrite edits made in the new schema.

## 8. Discovery and matching

Extend existing filters only after storage and permissions work.

Start with broad **Why I'm here**, **What I'm looking for**, and active **Right now** selections. Additional role, dynamic or interest filters can follow using the same opt-in and audience rules.

Define query behaviour clearly:

- Multiple values within one filter use OR by default.
- Different filter groups use AND.
- An optional Match all control may switch one group to AND.
- An interest filter defaults to Into it only.
- Include Curious or Discuss first only when the searcher explicitly requests those stances.
- Not for me never matches a positive interest query.
- Unknown or hidden values never count as a positive match.
- Unspecified profiles remain eligible when that field has no active filter. An active value filter matches only explicit, eligible values and excludes unspecified or hidden values.
- Apply blocks, account access and field visibility before returning results.
- Do not return counts, explanations or ordering that reveal restricted fields.

For recommendation explanations, use visible facts such as **"You both selected friends with benefits."** Avoid sexual compatibility scores or claims that shared interests establish consent.

If a shared, visible boundary conflicts with a shared interest, do not present that activity as a recommendation. Hidden boundaries remain protected and must not generate revealing match explanations.

Do not add precise-location filtering, public hosting filters, or health-status filters in this upgrade.

## 9. Product copy

| Location | Proposed text |
|---|---|
| Section heading | Desire & connection |
| Section introduction | Say what you're here for, what you're into, and what works for you. Share only what you choose. |
| Interest reminder | Interests start a conversation. Consent is specific and can change. |
| Empty profile section | Add a little more about what you're looking for. |
| Skip action | Skip for now |
| Private field helper | Only you can see this. |
| Member audience helper | Eligible adult members can see these selections. |
| Connection audience helper | Only connections you've approved can see these selections. |
| Discovery toggle | Use this field in discovery |
| Discovery helper | This lets eligible members find you using these selections. |
| Preview action | Preview what others see |
| Save action | Save preferences |
| Local save success | Saved on this device. |
| Local save failure | We couldn't save that. Your edits are still here—try again. |
| Selection cap | Choose up to {limit}. Remove a selection to add another. |
| Clear availability | Clear status |

Use the connection and member audience copy only when the application actually implements those access rules. For a local prototype, label corresponding views as previews.

Do not use profile-completion pressure, sexual popularity rankings, health labels such as clean, or a badge implying that someone's consent or preferences have been verified.

## 10. Implementation sequence

### Release A — Core profile upgrade

1. Inspect the actual profile schema, storage, existing editor and rendering paths.
2. Create one versioned selection catalogue from section 3.
3. Implement intentions, connection types, sexual role, interests, approach and boundaries.
4. Add explicit privacy defaults and truthful local-storage behaviour.
5. Add review-based migration for the five existing selections.
6. Render owner previews and handle save, clear and error states.

### Release B — Additional context

1. Add partner configuration, desired roles, kink dynamic and experience.
2. Add relationship situation and structure.
3. Add meeting preferences, restricted logistics and expiring availability.
4. Add search within the interest catalogue and optional direction details.

### Release C — Discovery integration where supported

1. Confirm actual multi-user access rules and storage before enabling sharing.
2. Implement audience enforcement and separately opted-in discovery use.
3. Add broad filters, followed by optional advanced filters.
4. Verify expiry, revocation, block handling and cache invalidation.

These are implementation increments within the requested upgrade, not a direction to rebuild MEAT's backend. If real networking or sharing is absent, deliver the working local upgrade and identify discovery integration as a separate dependency.

## 11. Acceptance criteria

The developer should verify the behaviours that can materially fail. These are requirements for later implementation; they have not been executed against the live app.

- [ ] Existing profiles load without data loss.
- [ ] Every catalogue field can be skipped, saved, edited and cleared.
- [ ] No sexual interest, role or direction is preselected.
- [ ] No wider sharing audience is preselected; every new field defaults to Only me.
- [ ] Selecting an interest requires an explicit stance.
- [ ] Into it, Curious, Discuss first and Not for me persist and render distinctly.
- [ ] Removing an interest clears its direction and discovery effect.
- [ ] The positive-interest cap does not prevent adding boundaries.
- [ ] My sexual role and My kink dynamic never populate each other.
- [ ] Role and anatomy are not inferred from gender.
- [ ] Legacy Chat is not silently reinterpreted as flirting.
- [ ] A legacy profile containing all five choices is preserved until review.
- [ ] Migration can run again without duplicating values or reverting new edits.
- [ ] Selection limits are enforced at the storage or API boundary.
- [ ] Crafted writes cannot set logistics to Adult members.
- [ ] A failed save retains the edit and reports the failure truthfully.
- [ ] Expired availability disappears after a refresh and after app resume.
- [ ] Local-time expiry remains correct across midnight and supported timezone changes.
- [ ] General discovery ignores Only me and Approved connections data.
- [ ] Adult members fields with discovery disabled do not affect search or ranking.
- [ ] Narrowing visibility resets discovery opt-in; widening it again does not silently restore discovery use.
- [ ] Where a backend exists, unauthorised requests cannot retrieve hidden values or revealing counts.
- [ ] Connection revocation, blocking and privacy changes take effect in subsequent responses and caches.
- [ ] Sexual choices are absent from public metadata, notification text, URLs and analytics payloads.
- [ ] Keyboard and screen-reader users can operate chips, stance controls and audience selectors.
- [ ] Mobile layouts remain usable at narrow widths and enlarged text.
- [ ] The application does not claim actual sharing, verification or security that the implementation lacks.

## 12. Builder handoff

Implement this specification in MEAT's existing codebase and design system. Reuse the actual profile and storage architecture. Start with the selection catalogue and core editor, then connect display, migration and discovery in the order above.

Deliver the changed files, any schema or migration changes, a working preview, and a concise account of which acceptance criteria were verified. Explicitly identify features dependent on an unavailable backend rather than presenting mock behaviour as live functionality.

**Definition of done:** Adults can express more specific sexual, romantic and social preferences; those preferences save correctly; the owner controls their audience; existing data is preserved; and the interface never treats a profile selection as consent.

## Source and evidence note

- [MEAT public information and signup](https://meatapp.grok.me/info) — directly inspected through the browser on 17 October 2026. Source for the five existing signup options, public audience positioning, visible visual direction, and stated local-storage and distance approach.
- [MEAT entry page](https://meatapp.grok.me/) — directly inspected on 17 October 2026. Source for the visible age gate.
- All proposed selections, limits, component behaviours, schema, migration rules and implementation stages in this document are design recommendations. They are not claims about features already implemented, a legal compliance assessment, or results of user research.

