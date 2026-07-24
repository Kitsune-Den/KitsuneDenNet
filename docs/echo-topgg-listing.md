# Echo — Top.gg listing copy

Source of truth for the Top.gg bot page. If the site's claims change
(languages, privacy, features), update this file and the live listing together.

- Submit / edit at: https://top.gg/bot/new (log in with the Discord account
  that owns Echo, or a team member)
- Bot ID: `1520481710096122098`
- Prefix: `/` (slash commands)
- Tags: pick from Top.gg's fixed list — Utility, Social, plus any
  accessibility- or language-adjacent tag they offer
- Website: https://kitsuneden.net/echo/
- Support server: KitsuneDen Discord invite
- Invite link: same OAuth URL as the site's "Add to Discord" button
- Banner: echo-fox.png (the site's OG image) until we make a dedicated one
- Review usually takes a few days; they test-invite the bot, so production
  must be up when you submit.

---

## Short description (140-char limit)

Reads chat aloud with a voice per person, live-captions voice in 90+ languages, and records meetings. Nothing stored. Accessibility-first.

---

## Long description (markdown)

# Everyone gets a voice. No one left out.

Echo is a TTS and accessibility bot built to work **both directions**: it reads
text aloud for people who'd rather listen, and captions voice into text for
people who need to read along. Same conversation, everyone in it.

## 🔊 Reads chat aloud
- Auto-read mode reads a channel out loud in voice, hands-free
- **Every member gets their own voice**, so you can tell who said what
- Smart announcements for links, GIFs, and attachments instead of URL soup
- `/say`, custom pronunciations with `/pronounce`, profanity never read aloud

## ✍️ Captions & transcription, in 90+ languages
- `/accessibility transcribe` live-captions what people say in voice
- Language is **auto-detected sentence by sentence** — mixed-language servers just work
- When Echo isn't sure what it heard, it stays quiet instead of guessing.
  No invented quotes attributed to your members. Ever.
- Free on every server. Accessibility is never behind a paywall.

## 📝 Meeting transcripts
`/meeting start` records a voice conversation and hands back **one timestamped
transcript file** when you stop. It announces itself out loud when recording
starts — no silent listening. Want control over who can hit record? Gate it
behind a role with `/meeting role set`.

## 🫧 Nothing is stored
No conversation logs, no saved recordings, no transcript archive. Captions and
transcripts are built in memory, posted to *your* channel, and gone from our
side. Transcription runs on **our own hardware** — voice audio never goes to a
third party. There's no history on our side to leak.

## 💎 Free vs Premium
Free gets natural voices, full accessibility, auto-read, and 50,000
characters/month. Premium unlocks ultra-realistic ElevenLabs voices.

**[Website](https://kitsuneden.net/echo/)** ·
**[Privacy](https://kitsuneden.net/echo/privacy/)** ·
**[Terms](https://kitsuneden.net/echo/terms/)**

---

## Later (optional)

- **Vote webhook**: Top.gg can POST on each vote (users vote every 12h, votes
  drive ranking). Wire it into the bot to reward `/vote`.
- **Widget**: Top.gg offers an embeddable rank/vote widget for the site page.
