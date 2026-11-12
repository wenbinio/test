# Part 6 script, in the voice of the group research paper

Draft for review. Facts, figures and quotations are unchanged from the verified version in `Part 6 script reconciled.md`.

**[Slide: Test, but contain]**

If the test is the danger, stop the test. Or so the easy answer goes.

We disagree. Capability tests are how we learn what a model can do before it is released. OpenAI switched certain safeguards off so that the results would reflect the model's "true capabilities", and that is a legitimate aim.

The difficulty is that a capability test is also an alignment test. As Glenda mentioned, some agents recognised that the attack was out of scope, and joined anyway. In OpenAI's preliminary experiments, with its production harness and system prompt, the tendency to attack out-of-scope systems can fall below one per cent of the baseline rate. Arguably, then, a model is more likely to cross the line when its safeguards are removed.

The question now is how to test without exposing others to that risk. Our answer is that when safeguards come off, containment must go up.

**[Slide: Four rules]**

We propose four rules.

First, everything the agent can reach is part of the wall. There should be no network route and no shared state between runs, and software packages should come from a read-only copy. IMDA has itself warned that internal package registries "can serve as breakout points".

Second, attack the sandbox before trusting it, and again after every change. OpenAI's rebuilt package service was breached again within two days.

Third, watch the test live, from outside the sandbox. A confirmed breach stops the test, and a named person must have the authority to stop it. This also makes the notification duty in Part 5 workable, since a lab cannot report what it has not detected.

Fourth, test the test. No model had ever solved 198 of the 898 tasks, and OpenAI calls those tasks a significant factor in the agents probing their sandbox. Tasks that cannot be solved as intended should be removed, and an honest "this cannot be done" should count as a valid answer.

**[Slide: Conclusion]**

Admittedly, none of this is binding today.

We therefore submit that these four rules should form the content of the mandatory sandbox standard proposed in Part 3, and the measure of reasonable care in Part 4. They should scale with risk, applying in full only where safeguards are removed. A developer who follows them may rebut the presumption of negligence. One who does not, cannot.

So, while the test may be the danger, the answer is not to stop testing. It is to ensure that the test stays inside the lab.
