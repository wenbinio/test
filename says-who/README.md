# It's the Law (Says Who?)

An animated music video about legal theory, made the same way as the P(doom) video at the root of this branch: lyrics, then a Suno track, then a hand-painted animation cut to it.

| File | What it is |
|---|---|
| [`SUNO.md`](SUNO.md) | Title, style prompt and lyrics to paste into Suno, plus pronunciation fixes |
| [`REFERENCES.md`](REFERENCES.md) | Every reference in the song: its source, and what it means in plain English. It doubles as the video description. |
| [`STORYBOARD.md`](STORYBOARD.md) | The shot plan, one row per sung line |

## Pipeline

1. **Lyrics, references and shot plan.** Done.
2. **Suno track.** Generate it from `SUNO.md`, keep the take with the clearest words, and share the MP3 or WAV.
3. **Timing.** Whisper word timestamps give each line's start and end, and the song's tempo gets measured so movement and cuts land on the beat. The storyboard then gets its times.
4. **Build.** Scenes are written on [ClaudeAnimationBase](https://github.com/JohnHeibel/ClaudeAnimationBase) (MIT licence), with new code for the karaoke captions and name tags. PDoomVideo has no licence, so none of its code is copied here.
5. **Check.** Contact sheets and frame strips for every shot, reviewed against the storyboard.
6. **Render** on a machine with a GPU, with the song muxed in.
7. **Accessibility outputs.** Captions burned into the video, a separate `.srt` caption file, and `REFERENCES.md` as the description.
