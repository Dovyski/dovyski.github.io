---
title: 'Past the Event Horizon: Why "AI Replacing Developers" Is the Wrong Frame'
author: Fernando Bevilacqua
layout: post
categories:
  - blog
tags:
  - thoughts
  - ai
---

In June 2025, Sam Altman published a short essay titled [*"The Gentle Singularity,"*](https://blog.samaltman.com/the-gentle-singularity) opening with a line that would have sounded absurd just a few years ago: *"We are past the event horizon; the takeoff has started"*. For most people, that kind of language conjures sci-fi visions of humanoid robots or overnight societal disruption. Yet, as Altman noted, everyday life carries on pretty much as usual. Commuters still sit in traffic, companies still track work in Jira, and the laws of physics haven't budged.

Inside software engineering, though, things feel far from business-as-usual. Depending on who you talk to, you'll hear three completely conflicting storylines:

1. **Barriers to entry have collapsed**, giving rise to "vibe coding," where natural language replaces manual syntax.
2. **Hiring has cooled dramatically**, with tech job postings dropping to pre-pandemic lows.
3. **The global developer population is exploding**, growing faster than ever as more people start building software.

To make sense of these contradictory signals, we need to look past the headlines at labor data, developer demographics, and the factor that actually determines whether software succeeds: **verification cost**. When verifying generated output is expensive or neglected, generative AI projects stall before reaching production.

---

## 1) Abstraction doesn't eliminate developers, it redefines their work

A helpful historical comparison is the compiler. Before compilers became widespread, writing software meant working directly in assembly or punch cards at the machine level. As higher-level languages took hold, programmers stopped inspecting every instruction emitted by the compiler. We raised our layer of abstraction, and looking down the stack became the exception rather than the rule.

Hardly anyone today debates handwritten assembly versus compiled code for typical backend or application development. When writing modern Java, Python, or Go, you rarely inspect bytecode or assembly instructions unless you're chasing an extreme edge-case performance bottleneck. The higher level of abstraction simply became the standard way to build.

Compilers and interpreters never eliminated developers; they drastically lowered the marginal cost of creating software. Lower costs unlocked vastly more use cases, which in turn drove up demand for people who build software. Every major shift in abstraction over the past fifty years has followed this exact playbook.

### The developer pool keeps growing

If AI were already replacing engineers en masse, you would expect the total developer head count to shrink. The numbers show the exact opposite. According to [SlashData's *Developer Nation* surveys](https://www.slashdata.co/research/developer-population), the global developer population has nearly doubled in four years:

* **Q3 2021:** 28.8 million
* **Q3 2023:** 38.9 million
* **Q3 2025:** [**48.4 million**](https://www.developernation.net/developer-reports/dn23/)

![Developer Population Growth](/public/img/posts/slashdata-developer-nation-growth.png)
*[Source: SlashData](https://www.slashdata.co/research/developer-population)*

When technology makes producing a good cheaper, total consumption usually surges rather than drops. Economists call this [Jevons Paradox](https://uberty.org/wp-content/uploads/2015/08/John_M._Polimeni_Kozo_Mayumi_Mario_Giampietro.pdf). Making code easier to generate leads to *more* software being built, not less. And all of that new software still has to be architected, tested, integrated, secured, operated, and maintained over time. The mechanical act of typing syntax was only ever a fraction of what engineering involves.

---

## 2) How the pandemic hiring spike distorts the labor chart

The [FRED / Indeed job postings index](https://fred.stlouisfed.org/series/IHLIDXUSTPSOFTDEVE) is frequently cited as proof that AI is gutting the tech industry. But looking at that chart without historical context leads to the wrong conclusions.

![Software Development Job Postings on Indeed in the United States (IHLIDXUSTPSOFTDEVE)](/public/img/posts/fredgraph.png)
*[Source: FRED/Indeed](https://fred.stlouisfed.org/series/IHLIDXUSTPSOFTDEVE)*

Here is what that curve actually tracks:

* **The 2021–2022 outlier:** A massive [hiring bubble during the pandemic boom](https://fredblog.stlouisfed.org/2023/03/was-there-a-tech-hiring-bubble/), driven by zero interest rates and over-hiring across the industry.
* **The correction:** A sharp pullback as capital became expensive and companies shifted focus from headcount growth to cost efficiency.
* **The new baseline:** Starting around 2024, the curve flattened out into stabilization, showing a modest rebound by late 2025 (reaching [**68.30 in December 2025**](https://data.indeed.com/#/)).

If you benchmark the present against the height of that 2021 bubble, it looks like a collapse. But if you recognize that peak as a historical anomaly, the data looks much more like a market establishing a sustainable post-bubble baseline.

At the same time, this normalization hides a deeper structural change: writing software is decoupling from traditional corporate software jobs. While US corporate hiring pulled back from its all-time peak, the global community of people actively writing, shipping, and maintaining software has grown faster than ever.

---

## 3) The Rise of "Vibe Coding" and Theory Loss

Beyond the numbers, the way we build software has fundamentally changed. We've entered the era of what Andrej Karpathy coined **"vibe coding."**

In this workflow, the developer acts more like a creative director than a stonemason. You don't handcraft every loop or boilerplate class; you prompt the LLM, paste screenshots, describe what behavior you want, and guide the iteration. You express intent, and the model turns it into code.

State-of-the-art closed models have made this surprisingly accessible, but proprietary APIs are not the whole story. Open-source models have advanced at breakneck speed. Early milestones like [**Vicuna-13B** reaching over 90% of ChatGPT's quality](https://lmsys.org/blog/2023-03-30-vicuna/) showed early on that the moat between closed and open tools was thinner than many assumed:

![Vicuna: An Open-Source Chatbot Impressing GPT-4 with 90%* ChatGPT Quality](/public/img/posts/open-source-ai-models-evolution.webp)
*[Source: Vicuna](https://lmsys.org/blog/2023-03-30-vicuna/)*

The rapid rise of open models confirms what the leaked [Google "No Moat" memo](https://www.supervised.news/p/revisiting-that-old-google-ai-memo) predicted early on. Open-weight architectures like [DeepSeek-V3](https://github.com/deepseek-ai/DeepSeek-V3) rival frontier closed models at a fraction of the training cost, proving how rapidly open-source engineering commoditizes raw model capabilities.

Whether you run local open weights or use hosted frontier APIs, integrating AI into the coding loop is becoming frictionless. Working completely without AI assistance already feels needlessly slow.

### The hidden trap: Theory Loss

Yet generating code at the push of a button comes with a serious hidden risk: **Theory Loss**.

In his 1985 paper [*Programming as Theory Building*](https://pages.cs.wisc.edu/~remzi/Naur.pdf), Peter Naur argued that a program isn't just the code written to disk. The real software is the mental construct, the shared understanding of how the system solves problems and responds to change held by the engineers who built it.

Historically, you built that theory as you wrestled with the problem, wrote the implementation, and reasoned through edge cases. With pure vibe coding, you skip that struggle. If you accept generated code without deeply understanding how it fits together, that mental model never forms.

You end up with a codebase that runs, but which nobody truly understands. Making changes, diagnosing subtle production bugs, or refactoring becomes an unpredictable gamble.

---

## 4) Why 95% of GenAI pilots fail: the cost of verification

Reporting on recent MIT research, a [Forbes analysis](https://www.forbes.com/sites/jasonsnyder/2025/08/26/mit-finds-95-of-genai-pilots-fail-because-companies-avoid-friction/) noted a striking figure: roughly **95% of enterprise generative AI pilots fail to make it into reliable production**.

The primary bottleneck is not generation speed, but **the cost of verification**.

LLMs produce plausible, confidently stated output. If a model generates code that is 95% correct, you still have to review 100% of it to catch the 5% of hallucinations, security flaws, or edge-case oversights. If reviewing generated code takes as much cognitive effort as writing it yourself, or turns into an exhausting hunt for subtle bugs, any productivity advantage quickly evaporates.

### Why TypeScript took the top spot

This verification challenge directly influenced the language trends in [GitHub's *Octoverse 2025*](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/): in 2025, **TypeScript surpassed Python** as the most popular language on GitHub.

That shift is not an accident. Static types provide immediate, automated verification.

When an AI assistant produces code, you don't want to rely solely on manual code review to spot invalid assumptions or nonexistent method calls. A strong type system catches hallucinations before the code ever runs. Clear types, schemas, and interfaces turn vague prompts into verifiable contracts. Defining explicit boundaries and types was always good engineering practice; in an AI-assisted workflow, it has become essential.

---

## 5) Why pairing humans and AI creates real ROI

If unsupervised AI generation leads to high failure rates, the solution is not to abandon the tools, but to pair them with experienced engineers.

Productivity research, including [OpenAI's findings on economic impacts (GDPval)](https://arxiv.org/abs/2510.04374), consistently demonstrates that **meaningful gains happen when AI assists experienced practitioners**, not when companies attempt to replace humans outright.

As Pete Johnson (Field CTO, AI at MongoDB) pointed out on the [Stack Overflow podcast](https://stackoverflow.blog/2026/01/07/you-need-quality-engineers-to-turn-ai-into-roi/), the idea that AI simply removes the need for engineers falls apart the moment software hits production:

> "You still own it. You're still responsible for it running in production."

The realistic productivity equation looks like this:

1. **Accelerate drafting:** Use AI to eliminate boilerplate, spin up prototypes, and draft initial implementations quickly.
2. **Keep engineers accountable:** Rely on human expertise to verify correctness, maintain system coherence, and evaluate architectural trade-offs.
3. **Reinvest the time saved:** Build higher quality software, tackle backlogged improvements, and improve operational reliability.

Production software is much more than text in a repository. It involves real stakeholders, customer feedback loops, operational support, trade-offs, and legal liability. When a bug causes data corruption, downtime, or direct financial loss, no executive can simply tell a client or board:

> *"Our AI made a mistake. Sorry, we've asked it to fix it."*

Someone has to be accountable for the system. Leadership isn't about to eliminate their engineering teams only to shoulder personal liability for every automated hallucination in production.

---

## 6) Shifting engineering roles: what shrinks and what expands

Data from [JetBrains' Developer Ecosystem survey](https://devecosystem-2025.jetbrains.com/) shows a global workforce of roughly 20.8 million professional developers. What is changing isn't the need for engineers, but the distribution of their day-to-day work.

As routine tasks become automated, effort naturally shifts:

* **Less time on mechanical boilerplate:** Writing basic CRUD endpoints, boilerplate glue code, and repetitive docstrings.
* **More focus on areas where scale, verification, and risk matter:**
  * **Automated testing and evaluation:** Building robust test suites and verification pipelines to catch regressions automatically.
  * **Platform and infrastructure engineering:** Keeping systems reliable as organizations ship more services and features faster.
  * **Security and compliance:** Understanding system vulnerabilities and auditing generated logic before it reaches production.
  * **Domain architecture and product design:** The deeper work of understanding user requirements and business rules to build systems that hold up over time.

This follows the same pattern as past abstraction shifts. The only difference is that our new abstraction is probabilistic, which makes automated verification and architecture all the more critical.

---

## 7) If software eats the world, AI makes it hungrier

Software engineering has always been about coordination: translating messy requirements between stakeholders, product teams, operations, and users into reliable systems. As AI helps draft specifications, generate code, and produce operational runbooks, organizations don't become less dependent on engineers.

They become **more dependent on people who understand systems end-to-end**, who can connect the pieces securely, and who take responsibility for the outcome.

> The most valuable engineers going forward won't be those who prompt the fastest, but those who can architect, verify, and reason through systems the most thoroughly.

---

## Practical takeaways for engineering leaders

A few pragmatic principles for teams navigating this transition:

1. **Treat AI as part of a system, not a magic fix.** Invest in evaluation, monitoring, and workflow integration rather than just handing out licenses.
2. **Design for verification upfront.** Assume generated code contains subtle flaws. Invest in automated testing, static analysis, and fast feedback loops.
3. **Rely on strong types and explicit contracts.** Tooling like TypeScript makes boundaries clear and prevents hallucinations from silently creeping into production.
4. **Pair AI with experienced engineers.** The highest returns come from multiplying the output of people who already understand the system architecture, not from removing them.
5. **Measure workflow outcomes, not adoption metrics.** A pilot's success shouldn't be judged by how many chat prompts were sent, but by whether real delivery cycles improved without sacrificing quality.

---

### Additional Resources

- [GitHub, *The State of the Octoverse 2022: Global Tech Talent*](https://octoverse.github.com/2022/global-tech-talent)
- [MIT Media Lab (Project NANDA), *The GenAI Divide: State of AI in Business 2025*](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf)
- [HackerRank Blog, *The Productivity Paradox of AI*, 2025](https://www.hackerrank.com/blog/the-productivity-paradox-of-ai/)
- [Microsoft Research, *The Impact of AI on Developer Productivity*, 2024](https://www.microsoft.com/en-us/research/publication/the-impact-of-ai-on-developer-productivity-evidence-from-github-copilot/)

### Note

This post is based on my own research, notes, and curated sources, developed through iterative collaboration with AI tools. I outlined the core arguments, supplied the references, wrote several sections directly, and refined the text to reflect my perspective as a practicing engineer and leader.