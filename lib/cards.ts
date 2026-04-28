export type Card = {
  id: string;
  type: "vocab" | "essay";
  front: string;
  frontSub?: string;
  // Short version used for matching games and multiple-choice answer chips
  shortAnswer: string;
  // Full back used for flashcard mode and learn-mode explanations
  fullAnswer: string;
};

export const cards: Card[] = [
  // ---------- VOCAB CARDS ----------
  {
    id: "v1",
    type: "vocab",
    front: "Determinism",
    shortAnswer: "Initial state + laws of physics → all future states. The complete condition of the universe at any time, plus the physical laws, logically entail the complete future.",
    fullAnswer:
      "The thesis that the **physical laws are deterministic**: (i) the complete condition of the universe at any time, plus (ii) the physical laws, together **logically entail (iii)** the complete future course of the physical world.\n\nShorthand: *initial state + laws → all future states.* Applies to humans — if true, you're essentially a robot whose entire future is fixed.",
  },
  {
    id: "v2",
    type: "vocab",
    front: "Classical compatibilism",
    frontSub: "(Hobart)",
    shortAnswer: "Free action = (i) caused by your desire, AND (ii) you could have done otherwise — meaning if you had desired otherwise, you would have done otherwise.",
    fullAnswer:
      "Two clauses:\n\n> A person performed an action freely = (i) the action was caused by her desire, AND (ii) she could have done otherwise — meaning: *if she had desired otherwise, she would have done otherwise.*\n\nClause (ii) commits to Alternative Possibilities via a conditional analysis. Compatible with determinism.",
  },
  {
    id: "v3",
    type: "vocab",
    front: "Neo-compatibilism",
    frontSub: "(Frankfurt)",
    shortAnswer: "Free action = (i) caused by your desire, AND (ii) you desire that this desire cause your action (a second-order desire). Drops Alternative Possibilities.",
    fullAnswer:
      "Two clauses:\n\n> A did X of A's own free will = (i) A did X because she desired to do X, AND (ii) A desired that her desire to do X cause her to do X (a second-order desire).\n\nClause (i) same as classical. Clause (ii) **drops Alternative Possibilities**, replaces with second-order desire. Still compatibilist.",
  },
  {
    id: "v4",
    type: "vocab",
    front: "Event-causation",
    frontSub: "(transuent causation)",
    shortAnswer: "The standard kind of causation: events cause other events. The only kind of causation in the scientific image.",
    fullAnswer:
      "The standard kind of causation: **events cause other events.**\n\nExample: the *event* of the rock hitting the window caused the *event* of the window breaking.\n\nIn the non-mental world, individuals never cause — events do. The only kind of causation in the scientific image.",
  },
  {
    id: "v5",
    type: "vocab",
    front: "Agent-causation",
    frontSub: "(immanent causation)",
    shortAnswer: "A special causation unique to conscious agents: the agent (a substance) directly causes an event, not reducible to events causing it.",
    fullAnswer:
      "A special kind of causation unique to conscious agents: **the agent (a substance) directly causes an event**, not reducible to events causing it.\n\nExample: choosing Coke over Pepsi — no prior event caused this; *I, the agent,* did. \"I did it.\"\n\n**vs. event-causation:** event→event vs. substance→event. Spooky, not in the scientific image. Trees don't agent-cause.",
  },
  {
    id: "v6",
    type: "vocab",
    front: "Fine-tuning",
    shortAnswer: "Given the laws of nature, only a very narrow range of possible initial conditions would have led to life and consciousness — and one of them actually obtained.",
    fullAnswer:
      "Given the laws of nature, only a **very narrow range of possible initial conditions** (and constants) would have led to life, consciousness, and order — and one of them actually obtained.\n\nExamples: initial energy density; constants of nature (particle masses, force strengths) in precise narrow windows.\n\n**Important:** fine-tuning doesn't by itself imply a tuner.",
  },
  {
    id: "v7",
    type: "vocab",
    front: "Stringent laws",
    shortAnswer: "Given the laws, only a very limited set of initial conditions would lead to life, consciousness, and order. The laws sharply constrain which conditions are life-permitting.",
    fullAnswer:
      "The fundamental laws are **stringent** means:\n\n> Given the laws, only a very limited set of possible initial conditions would lead to life, consciousness, and order.\n\nThe laws sharply constrain which initial conditions produce a life-permitting universe.",
  },
  {
    id: "v8",
    type: "vocab",
    front: "Likelihood Principle",
    shortAnswer: "If Pr(E|H1) > Pr(E|H2), then E favors H1 over H2 — it's rational to be more confident in H1 than H2.",
    fullAnswer:
      "**If** evidence E is more likely given H1 than given H2, **then** E **favors** H1 over H2 — i.e., rational to be more confident in H1.\n\nSymbols: if Pr(E | H1) > Pr(E | H2), then E favors H1 over H2.\n\n**Example:** E = wet sidewalk. H1 = rained. H2 = didn't rain. Pr(wet|rained) > Pr(wet|no rain) → E favors the rain hypothesis.",
  },
  {
    id: "v9",
    type: "vocab",
    front: "Incompatibilism",
    shortAnswer: "Free will and determinism are NOT compatible — if determinism is true, we never act freely. Splits into libertarianism (FW real, determinism false) and eliminativism (no FW).",
    fullAnswer:
      "The view that **free will and determinism are NOT compatible** — if determinism is true, we never act freely.\n\nSplits into two camps:\n- **Libertarianism:** we have free will → determinism is false.\n- **Eliminativism:** determinism is (likely) true → we don't have free will.",
  },
  {
    id: "v10",
    type: "vocab",
    front: "Alternative Possibilities (AP)",
    shortAnswer: "The requirement that a person acts freely only if she could have done otherwise. Classical compatibilism keeps it; neo-compatibilism drops it.",
    fullAnswer:
      "The requirement that **a person acts freely only if she could have done otherwise.**\n\nClassical compatibilism endorses AP (analyzed conditionally). Neo-compatibilism drops AP (replaced with second-order desires). Frankfurt's Dr. Black case is supposed to show AP isn't necessary for free will.",
  },
  {
    id: "v11",
    type: "vocab",
    front: "Fluke",
    shortAnswer: "An event not deterministically caused by prior events (≠ uncaused). The fluke problem: if actions are mere flukes, that's randomness, not freedom.",
    fullAnswer:
      "An event **not deterministically caused by prior events** (note: ≠ uncaused).\n\nUsed in the **fluke problem**: if our actions are merely flukes (undetermined), that's not enough to make them free — they'd be random, like an indeterministic seizure. Merely dropping determinism doesn't secure freedom.",
  },
  {
    id: "v12",
    type: "vocab",
    front: "Nonreductive Moral Realism",
    shortAnswer: "Moral facts (right, wrong, good, bad) are real but cannot be reduced to scientific/natural facts. Moral properties are primitive and irreducible.",
    fullAnswer:
      "There really are moral facts (right, wrong, good, bad) — **BUT they cannot be reduced to scientific/natural facts.**\n\nMoral properties like wrongness are *primitive, irreducible,* not part of the scientific image.\n\nAnalogous to soul view + agent-causation: adds something non-scientific. \"OUGHT-NOT-ness\" is grounded in (but not reducible to) natural facts.",
  },
  {
    id: "v13",
    type: "vocab",
    front: "IBE Premise",
    frontSub: "(Access Argument, P3)",
    shortAnswer: "If we know moral truths, it can only be by observation and inference to the best explanation. The ethical-principles response rejects this premise as a priori knowledge isn't IBE.",
    fullAnswer:
      "The crucial premise of the Access Argument:\n\n> If we know moral truths, it can only be by **observation and inference to the best explanation (IBE)**.\n\nWe know about electrons by IBE — they best explain observations. The empiricist says the same model must apply to moral knowledge.\n\nThe **ethical principles response rejects this premise** — moral knowledge is a priori / principle-based.",
  },
  {
    id: "v14",
    type: "vocab",
    front: "ID hypothesis",
    frontSub: "(Intelligent Design)",
    shortAnswer: "An intelligent designer (God) explains why initial conditions and laws are as they are. More specified version: 'Good and Able' — designer wants and can create life.",
    fullAnswer:
      "The hypothesis that **an intelligent designer** (God) explains why initial conditions and laws are as they are.\n\nMore specified: **Good and Able** — the designer has beliefs, desires good things (life, consciousness), has the power to set initial conditions.\n\nCompetes with **Atheism**: no designer; physical universe is all there is.",
  },
  {
    id: "v15",
    type: "vocab",
    front: "Prior probability",
    shortAnswer: "How confident we should be in H before any evidence — its intrinsic plausibility. Even strong evidence × tiny prior = tiny posterior, so belief isn't justified.",
    fullAnswer:
      "How confident we should be in H **before getting any evidence** — its intrinsic plausibility.\n\nKey role: even if evidence strongly supports H, a very low prior may leave the **posterior** too low for belief.\n\nBayes: Pr(H|E) = Pr(H) × [boost from E]. Tiny prior × big boost = still tiny.",
  },

  // ---------- ESSAY CARDS ----------
  {
    id: "e1",
    type: "essay",
    front: "Problematic desires counterexample to classical compatibilism",
    shortAnswer: "The Unwilling Addict: takes heroin from irresistible desire but wishes the desire were inoperative. Classical: FREE. Intuition: NOT FREE. Theory fails.",
    fullAnswer:
      "**The Unwilling Addict:** addict takes heroin from irresistible desire, but *wishes this desire were inoperative.*\n\n**Classical compatibilism says:** FREE (desire caused action; if he'd desired otherwise, he'd have done otherwise).\n\n**Intuition says:** NOT FREE (internal coercion — like a phobia).\n\nMismatch refutes the theory. Related: hypnotist, neurosurgeon-implant cases.",
  },
  {
    id: "e2",
    type: "essay",
    front: "Dr. Black counterexample to classical compatibilism",
    shortAnswer: "Dr. Black would intervene if I chose otherwise, but I freely choose the brownie on my own. Intuition: FREE. Classical: NOT FREE (AP fails). Shows AP isn't necessary.",
    fullAnswer:
      "**Setup:** Dr. Black watches me in line, wants me to pick the brownie. He monitors my brain, would intervene if I chose differently. I choose the brownie on my own.\n\n**Intuition:** FREE (he never actually interfered).\n\n**Could I have done otherwise?** NO (he'd have intervened).\n\n**Classical compat says:** NOT FREE (AP fails).\n\nShows Alternative Possibilities isn't necessary for free will.",
  },
  {
    id: "e3",
    type: "essay",
    front: "How does neo-compatibilism avoid these two counterexamples?",
    shortAnswer: "Unwilling Addict: lacks 2nd-order desire endorsing his addiction → NOT FREE ✓. Dr. Black: I endorse my brownie-desire, AP not required → FREE ✓.",
    fullAnswer:
      "**Unwilling Addict:** he does NOT have the second-order desire that his addictive desire be operative — he wishes it weren't. Clause (ii) fails. **Verdict: NOT FREE ✓** (matches intuition).\n\n**Dr. Black:** I desire the brownie AND endorse that desire (want it to move me). Both clauses met. AP not required. **Verdict: FREE ✓** (matches intuition).\n\n*Caveat:* extreme manipulation cases (implant both 1st- and 2nd-order desires) still trouble it. Frankfurt bites the bullet.",
  },
  {
    id: "e4",
    type: "essay",
    front: "Why do libertarians reject determinism?",
    shortAnswer: "Modus tollens: (1) FW & determinism are incompatible, (2) we obviously have FW, (3) ∴ determinism is false.",
    fullAnswer:
      "**Simple modus tollens:**\n\n1. **Incompatibilism:** free will and determinism are incompatible (law-breaking argument: free action requires doing otherwise; determinism + laws make that impossible).\n2. **We obviously have free will** (as evident as 2+2=4).\n3. Therefore, determinism is false.\n\nIn short: free will is evident and incompatible with determinism, so determinism goes.",
  },
  {
    id: "e5",
    type: "essay",
    front: "What is the fluke problem?",
    shortAnswer: "Merely dropping determinism doesn't secure freedom. If actions are flukes, they're random — like an indeterministic seizure. What distinguishes a free fluke from an unfree one?",
    fullAnswer:
      "**Problem:** merely giving up determinism is NOT enough to secure free will.\n\nA fluke = event not deterministically caused by prior events. If our actions are just flukes, they're *random*, not free.\n\n**Illustration:** an indeterministic seizure is still not free. A coin flip deciding your choice isn't freedom.\n\n**Challenge to libertarian:** what distinguishes a free fluke from an unfree fluke (like a random seizure)? Sider: the \"randomness problem\" (pp. 121–122).",
  },
  {
    id: "e6",
    type: "essay",
    front: "Agent-causation theory + response to fluke problem",
    shortAnswer: "Theory: action is free iff agent-caused by the agent. Fluke response: my Coke choice is a fluke but caused by ME (the agent), not a prior event — that's what makes it free, unlike a seizure.",
    fullAnswer:
      "**Theory:**\n\n1. Action is free iff agent-caused by the agent.\n2. Agent-causation really happens — primitive causation by a substance, not an event.\n\n**Fluke response:** my choice is a fluke (no prior event caused it) BUT it WAS caused — by ME, the agent. That's what makes it free.\n\n- Seizure: fluke + not agent-caused → unfree.\n- My Coke choice: fluke + agent-caused → free.\n\n**Leibniz:** desires incline without necessitating.",
  },
  {
    id: "e7",
    type: "essay",
    front: "Problem for the agent-causation theory",
    shortAnswer: "Pereboom: incompatible with both deterministic AND indeterministic laws. If QM says I take Coke 60% of the time, independent agent-causation matching that 60% would be an unexplained coincidence.",
    fullAnswer:
      "**Pick one:**\n\n**1. Breaks scientific completeness:** posits a new, extra-scientific form of causation only souls can perform. Heavy metaphysical cost.\n\n**2. Out-of-whack problem:** Mr. Rogers agent-causes himself to slap everyone — random w.r.t. his personality. Theory: FREE. Intuition: NOT FREE.\n\n**3. Pereboom:** if laws are deterministic, rules out agent-causation. If indeterministic (say Coke 60%), independent agent-causation matching that 60% is an unexplained coincidence.",
  },
  {
    id: "e8",
    type: "essay",
    front: "Nonreductive Moral Realism + Access Argument + ethical-principles response",
    shortAnswer: "Realism: moral facts are real but irreducible. Access Arg: moral facts can't be known via IBE since they don't explain observations. Response: reject IBE premise — moral knowledge is a priori, like math or grue.",
    fullAnswer:
      "**Nonreductive realism:** moral facts are real but irreducible to science.\n\n**Access Argument:**\n\n1. If nonreductive realism is true, moral truths exist.\n2. We should be able to know them.\n3. **IBE Premise:** we know only via observation + IBE.\n4. But moral facts play no causal-explanatory role (Harman) — can't be known by IBE.\n5. Therefore nonreductive realism is false.\n\n**Response (reject P3):** moral knowledge is a priori / principle-based, like math or grue. Know (i) \"this is causing pain for fun\" + (ii) a priori principle \"causing pain for fun is wrong\" → moral knowledge without IBE.",
  },
  {
    id: "e9",
    type: "essay",
    front: "The fine-tuning argument + case for Pr(E|ID) > Pr(E|Atheism)",
    shortAnswer: "Argument: Pr(E|ID) > Pr(E|Atheism), so by Likelihood Principle, E favors ID. Pr(E|Atheism) is low (life-permitting region tiny). Pr(E|ID) is higher (Good and Able designer would want this).",
    fullAnswer:
      "**Argument:**\n\n1. Pr(E|ID) > Pr(E|Atheism).\n2. Likelihood Principle.\n3. Therefore E favors ID over Atheism.\n4. So we should accept ID.\n\n**Why Pr(E|Atheism) is low:** life-permitting conditions are a tiny region of possibility-space. Given atheism, where the \"dart\" lands is random → tiny chance of hitting life-permitting.\n\n**Why Pr(E|ID) is higher:** a Good and Able designer would *want* to create life/consciousness and has the power to set conditions accordingly. Analogies: intelligent typist vs. monkey; rigged coin flip vs. chance.",
  },
  {
    id: "e10",
    type: "essay",
    front: "Problem of prior probability + example + the two claims",
    shortAnswer: "Even if E favors H, low prior can keep posterior tiny. (i) E favors H ≠ (ii) we should believe H. Demon-teacher example: H = demon wants me to start at 10:31:33, E supports it slightly, but tiny prior means don't believe H.",
    fullAnswer:
      "**Problem:** even if E favors ID over Atheism, it doesn't follow we should BELIEVE ID. Belief depends on prior probability too. Low prior × evidential boost can still = tiny posterior.\n\n**The two claims (must distinguish!):**\n\n- **(i) E favors H1 over H2** = confidence should rise relative to H2 (Likelihood Principle).\n- **(ii) Given E, we should believe H1** = posterior high enough for belief (depends on prior).\n\n**Example (non-fine-tuning):** H = a demon controls my brain and wants me to start class at exactly 10:31:33. E = I always start at 10:31:33. Pr(E|H) high → E favors H. BUT prior is ~0.00000001 → posterior still tiny → don't believe H.\n\nSame logic applies to fine-tuning: prior of Good and Able ID may be so low that even strong evidential boost can't justify belief.",
  },
];
