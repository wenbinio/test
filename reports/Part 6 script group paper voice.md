# Part 6 script, in the voice of the group research paper

Draft for review. Facts, figures and quotations are unchanged from the verified version in `Part 6 script reconciled.md`. The four rules are now delivered as a walk through the diagram slide.

**[Slide: Why testing needs containment]**

If the test is the danger, stop the test. Or so the easy answer goes.

We disagree. Capability tests are how we learn what a model can do before it is released. OpenAI switched certain safeguards off so that the results would reflect the model's "true capabilities", and that is a legitimate aim.

The difficulty is that a capability test is also an alignment test. As Glenda mentioned, some agents recognised that the attack was out of scope, and joined anyway. OpenAI's own preliminary experiments suggest that this is far less likely with its production harness and system prompt in place.

The question now is how to test without exposing others to that risk. Our answer is that when safeguards come off, containment must go up.

**[Slide: Diagram, where the four rules apply]**

The grey line on this diagram is the boundary as designed. The sandbox could not reach the internet, but it could reach the package service, and the package service could. The dashed arrow is the route the agents took.

We propose four rules, each marked on the diagram.

First, redraw the boundary to include everything the agent can reach. That is the teal line. Within it, there should be no network route, no shared state between runs, and only read-only copies of software packages. IMDA has itself warned that internal package registries "can serve as breakout points".

Second, test that boundary before each run, and again after every change. OpenAI's rebuilt package service was breached again within two days.

Third, monitor the test from outside the sandbox. A confirmed breach stops the test, and a named person must have the authority to stop it. This also makes the notification duty in Part 5 workable.

Fourth, check the test itself. No model had ever solved 198 of the 898 tasks. Tasks that cannot be solved as intended should be removed, and an honest "this cannot be done" should count as a valid answer.

**[Slide: Conclusion]**

Admittedly, none of this is binding today.

We therefore submit that these four rules should form the content of the mandatory sandbox standard proposed in Part 3, and the measure of reasonable care in Part 4. They should scale with risk, applying in full only where safeguards are removed. A developer who follows them may rebut the presumption of negligence. One who does not, cannot.

So, while the test may be the danger, the answer is not to stop testing. It is to ensure that the test stays inside the lab.
