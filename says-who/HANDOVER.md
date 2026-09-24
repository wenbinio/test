# Handover: It's the Law (Says Who?)

Written on 2026-09-24 by the cloud Claude Code session that planned this project. You're picking it up on the user's own machine, which has a GPU. Nothing below assumes you've seen that session.

## Start here

Read these in order before doing anything:

1. This file.
2. [`STORYBOARD.md`](STORYBOARD.md): the shot plan, one row per sung line.
3. [`SUNO.md`](SUNO.md): the lyrics as sent to Suno.
4. [`REFERENCES.md`](REFERENCES.md): what every reference means, with its source.
5. ClaudeAnimationBase's `ANIMATION_GUIDE.md`, all of it, before drawing anything (step 1 below brings it in).

## The goal

A hand-painted animated music video for an original song about legal theory and philosophy. It's made the way the P(doom) video in this branch's root was: the user generates the song in Suno; you time the lyrics to the track, build the animation shot by shot and render it. It must be accessible: every sung line is captioned, every thinker is named on screen, and a plain-English reference sheet goes with it.

## Where things stand

Done:
- **`SUNO.md`:** title, style prompt and lyrics (55 sung lines, 2,234 characters), plus pronunciation respellings. It hasn't been tried in Suno yet.
- **`REFERENCES.md`:** a source and plain-English meaning for every line. The citations were written from memory and haven't been verified.
- **`STORYBOARD.md`:** premise, cast, motifs, palette arc, and a shot and transition for all 55 lines, in order. There are no times yet.
- **`README.md`:** an overview and the pipeline.

Not started:
- the Suno track (the user makes it);
- the engine in `says-who/`: ClaudeAnimationBase hasn't been copied in yet;
- lyric timing, captions, name tags, any scene code, any render.

## Decisions already made

Don't reopen these without asking the user.

- **Everything lives in `says-who/`.** The branch root is a mirror of [JohnHeibel/PDoomVideo](https://github.com/JohnHeibel/PDoomVideo), cloned at the user's request. Don't edit it. That repo has no licence file, so read its code for ideas but never copy it into this project. That includes its karaoke code in `src/timeline.js`: write your own.
- **The engine is [ClaudeAnimationBase](https://github.com/JohnHeibel/ClaudeAnimationBase), MIT-licensed.** It's the P(doom) author's generalised version of that engine, it picks the right GPU flags on Windows, macOS and Linux, and its licence allows reuse. Keep its licence notice.
- **The song comes from Suno, through the user's own account.** Rights depend on their plan when they download it. Since 3 September 2026, free accounts get at most 7 trial downloads, which can't be used commercially; Pro and Premier downloads can be.
- **Clawd is the "I" of the song.** Thinkers are Clawds in costume with one identifying prop each, like P(doom)'s Sydney-Clawd and Gato-Clawd. Martin Luther King Jr. is never drawn as a character: his line plays over a lit cell window and a letter in newspaper margins.
- **The park sign is a pictogram,** a car in a red circle with a slash, with no words on it.
- **Every chorus opens the same way:** the Keeper's whistle, a point at the sign, and Clawd's "?" pops. The "?" is bigger each time (pea, head, Clawd, building), and in the final line Clawd hangs it on the sign. This replaces P(doom)'s rising P(doom) meter.
- **On-screen text is limited to the karaoke captions and one-word name tags.** This is a deliberate exception to the kit's "no text" rule, for accessibility, and the user hasn't confirmed the name tags yet (see Open questions).
- **Captions also ship as a separate `.srt` file,** and `REFERENCES.md` serves as the video description.

## Next steps

You can do 1 before the song exists; everything from 2 on needs the track.

**1. Set up the engine and prove the GPU works.** Adapt the paths for Windows if needed.

```bash
# run from the repository root
git clone --depth 1 https://github.com/JohnHeibel/ClaudeAnimationBase ../cab
cd says-who
cp -R ../../cab/{ANIMATION_GUIDE.md,docs,gpu_probe.mjs,package.json,package-lock.json,render.mjs,src,studio.html} .
cp ../../cab/LICENSE LICENSE-ClaudeAnimationBase
npm install
node render.mjs --sheet=1,3,5,7,9,10.5 --cols=3 --out=out/check/demo.jpg   # prints ms per frame
```

The guide's budget is 1.5 s per frame. If the demo is far above that, Chrome probably isn't using the GPU: `node gpu_probe.mjs <chrome path>` shows which flags reach it. After this works, remove `src/scenes/demo.js` and its script tag in `studio.html`: the guide says not to reuse the demo.

**2. Bring in the audio.** Save it as `says-who/assets/song.mp3` (or `.wav`). Ask the user before committing it: the repository is public, so committing it publishes it.

**3. Time the lyrics.**
- Run Whisper with word timestamps (`pip install faster-whisper`, then `transcribe(..., word_timestamps=True)`). If the vocals are hard to hear under the music, separating them first with Demucs usually helps.
- Treat the `SUNO.md` lyrics as the truth and Whisper as the clock. Align the two word sequences (for example with `difflib.SequenceMatcher` on lowercased words). Each line then starts at its first matched word and ends at its last.
- Suno may have dropped, repeated or reworded lines. List any differences for the user; don't fix them silently.
- Write `src/lyrics.js` as `[start, end, text]` rows, and export the `.srt` from the same data.
- Measure the tempo and the first downbeat (for example with `librosa.beat.beat_track`) and set `PROJECT = { duration, bpm, offset, audio: 'assets/song.mp3' }` in `src/config.js`.
- Check the sync by rendering a short clip with sound: `node render.mjs --clip --range=20:35 --out=out/check/sync.mp4`.

**4. Put times on the storyboard and prune it.** Apply the guide's timing rule (one read at a time) against each line's real length. Several rows pack two to four reads into a line that will last about 2–3 seconds; cut gags rather than squeeze them (see Risks).

**5. Build.**
- **Shared pieces first:** the karaoke bar (bottom band around y 975–1070, with action kept above y ≈ 960), name tags, the Keeper, the sign, Clawd's helmet and bike, and the "?" motif.
- **Then the sections, 0 to 9, in order.** Review every shot with a contact sheet, a strip for each key motion and transition, and a crop for faces, as the guide's review loop describes.
- **Costume inventory.** Existing Clawd hats and face pieces cover several guests: crown (Sovereign, Rex, Creon), hood (Aquinas), fedora (Holmes), mask (Mugger), halo (the "ought" half of Austin's sign). New pieces are needed for:
  - the bike helmet;
  - the ranger hat;
  - Lady Justice's blindfold;
  - Hercules's lion skin;
  - wigs (the judge and Hume);
  - togas and a chiton;
  - beards and moustaches;
  - headlamps.
- **Subagents are an option,** if the user wants them: P(doom) was built by parallel subagents, one per chapter, each briefed by a written guide.

**6. Render.** Ask the user before starting the full render: it ties up their GPU for a long time.

```bash
node render.mjs --frames --workers=4                                  # resumable
node render.mjs --encode --audio=assets/song.mp3 --out=out/says-who.mp4
```

**7. Deliver** the MP4, the `.srt` and the `REFERENCES.md` text.

## Open questions for the user

Raise each when it becomes relevant, not all at once.

- **The Suno track.** The next action is theirs.
- **Name tags on screen.** Yes, or captions only?
- **Which lyrics.** `SUNO.md` holds a rewrite in P(doom)'s format. The user asked for the lyrics "in the same format", which the planning session took to mean P(doom)'s (see Risks). They haven't explicitly approved the result over the first draft, which is in the appendix below.
- **Citations.** Verify `REFERENCES.md` before anything is published. The user knows the field, so they may want to check it themselves.
- **The public P(doom) mirror.** The branch root republishes PDoomVideo, which has no licence file and includes the song `assets/pdoom.mp3`, whose authorship is unclear. Keep it, remove the mp3, or make the repository private: that's the user's call.
- **Commercial plans.** If the video might be monetised, the song must be downloaded on a paid Suno plan.

## Risks in the planning work

The planning session wrote this section about its own weak spots. Check these rather than trusting them.

- **"Same format" was interpreted, not confirmed.** The session read it as P(doom)'s shape: a fixed hook opening each chorus with new lines, verses ending in a plea, and a reference in every line. It also read "pack references" as that density plus layered explanation. The user didn't object, but didn't confirm either.
- **The song may be too dense to be accessible.** P(doom)'s density works because its audience already knows the memes. Here the audience is meant to be lay people, and 55 reference-packed lines at about 2–3 seconds each may overwhelm them. Captions, name tags and the reference sheet help, but the lyric itself may need trimming. The likeliest cuts are one or two bridge couplets (the cave and Rawls, or Socrates and Thrasymachus) and the Llewellyn/"hard cases" couplet. Keep the bridge's last line: the finale depends on the sky falling.
- **The storyboard is overpacked.** Examples: Rex's failures run three to a line; Antigone, Creon and the constellation share one line; Holmes bets and swats a halo in one. Expect to cut after timing.
- **Accuracy compressions:**
  - "right reason" is Cicero's phrase; Aquinas's is "ordinance of reason";
  - Rawls's parties choose principles, not Rawls himself choosing "rules";
  - Socrates was sentenced by a jury; the Laws in *Crito* argue he mustn't escape;
  - Hart's rule of recognition rests on officials' acceptance, not everyone's ("the folks who follow it through");
  - Hart's example is a gunman, not a mugger with a sword;
  - Hobbes's line is paraphrased;
  - the "walk the bike" ending is an interpretive gloss.
- **Untested.** The style prompt, how singable the lines are, and the length: about three minutes, estimated only by comparing line counts with P(doom), which has 46 lines in 2:36.
- **Scope is large.** About 20 guest designs and a dozen or more sets. For scale, P(doom)'s nine chapter files total about 6,600 lines.

## Technical notes

- **Benchmarks from the cloud container.** No GPU, SwiftShader software WebGL, 4 CPUs:
  - most single primitives drew in 2–100 ms;
  - a `brushWipe` took about 0.3 s;
  - full frames of the base demo took 39–53 s, except the first (at t = 1 s), which took 0.3 s;
  - one frame of a lone Clawd (the `happy` emotion at t = 1.1 s) took 24.5 s, while the other two test frames took about 0.14 s. The cause wasn't found.
- **On a GPU none of that should matter.** If a frame spikes anyway, wrap the engine's `paintAt` to time each `paint()` call and find the shape responsible.
- **Ignore PDoomVideo's own `render.mjs`.** It hardcodes Windows settings (`--use-angle=d3d11` and a Windows Chrome path). It failed in the cloud container, and a fork has a pull request titled as fixing it for macOS. Use the base's `render.mjs`.
- **Fonts load from Google Fonts at render time.** For fully reproducible renders, consider bundling them locally (Permanent Marker is Apache-2.0).

## Didn't work in the cloud (no need to retry)

- **Rendering there at all.** PDoomVideo's renderer failed: Chrome refused to run as root without `--no-sandbox`, then WebGL wouldn't start under the d3d11 flag. The base renderer with `--soft-gl` works but is far too slow for a full video. That's why rendering moved to this machine.

## Working with the user

- **Never present simulated or estimated data as real.** If you don't have real data, say so, and keep what you verified separate from what you assumed.
- **Answer the need behind the question,** not just its literal wording.
- **No compliments.** Engage with the content.
- **They steer with short messages, often mid-task.** Make sensible defaults and state them. Ask only when a decision is genuinely theirs, and stop immediately when told to stop.

## Background

The P(doom) video is the model for this project:
- **The song** was traced by the video's author, "as far as I could find", to a 2024 YouTube upload titled "P(doom)" by osmarks. The user checked, and it was made with Suno.
- **The video** is John Heibel's. Per his README, Claude Opus 5.5 generated all the code in Claude Code.
- **The lyric timings** came from subtitles burned into the source video.

This project follows the same pipeline, except that the timings come from Whisper instead of subtitles.

## Appendix: first lyric draft (superseded)

This was the first version, titled "No Vehicles in the Park". It's more explanatory, with fewer references, and the storyboard doesn't match it. It's kept in case the user prefers it.

<details>
<summary>Show the draft</summary>

```
[Intro]
Four little words on a sign by the gate...

[Verse 1]
First day on the job as the keeper of the green,
got a whistle and a badge and the neatest sign you've seen.
Four little words, and they couldn't be more clear:
"No vehicles in the park." So why's that bike in here?

[Chorus]
No vehicles in the park! (No vehicles!)
A car? That's easy, that's out. (That's the core!)
A bike? Roller skates? A toy car? Now I doubt. (Penumbra!)
The middle is clear, but the edges are dark,
so who decides what's a vehicle in the park?

[Verse 2]
So I asked John Austin, "What makes a rule a law?"
He said, "A command from the boss, with a threat behind it all.
The sovereign speaks and the people obey.
You break it, you pay (That's a sanction!), that's the way."
Then Hart said, "Hold on, a gunman does the same:
'Your wallet or your life!' That's not law, that's a stick-up game.
You're obliged when you're scared, but that's not obligation.
Law is rules about rules (Rule of recognition!), not intimidation."

[Chorus]
No vehicles in the park! (No vehicles!)
A car? That's easy, that's out. (That's the core!)
A bike? Roller skates? A toy car? Now I doubt. (Penumbra!)
The middle is clear, but the edges are dark,
so who decides what's a vehicle in the park?

[Verse 3]
Then Fuller pointed at an old army truck,
a war memorial, up on a pedestal, stuck.
"It still runs," he said, "so is it banned from the park?
Ask what the rule is for (Purpose!), or you're lost in the dark."
Secret rules, fuzzy rules, rules that reach into the past,
rules that clash, impossible rules, rules that never last,
no rules at all, or a king who breaks his own (Eight ways to fail!):
fail at one completely, and your law's a fairytale.

[Bridge]
Augustine wrote it, and King quoted it from a cell:
"An unjust law is no law at all." (Natural law!)
But Austin said, "Whether it exists is one thing,
whether it's good is another." (Positivism!)
So is a wicked law a law?
We're still arguing that one in the park.

[Verse 4]
Holmes said, "Want the law? Think like a bad man would:
just predict what the courts will do, never mind what's good."
But Dworkin told of Elmer, who poisoned his granddad
so he'd inherit every penny that the old man had.
The court said, "No one profits from their own wrong." (A principle!)
So law's more than rules: the principles were there all along.
Judge like Hercules, read the whole story through (Law as integrity!),
then write the next chapter so the whole book holds true.

[Final Chorus]
No vehicles in the park! (No vehicles!)
A car? Still out. (Still the core!)
The truck stays a memorial, the kid keeps the toy car,
the bike gets walked through, 'cause I asked what the rule is for. (Purpose!)
The middle is clear, but the edges are dark,
and that's where the judging starts in the park.

[Outro]
Four little words on a sign by the gate,
and all the great thinkers lined up to debate.
So what is law? (What is law?)
Keep asking, keeper. Keep the park.
```

</details>
