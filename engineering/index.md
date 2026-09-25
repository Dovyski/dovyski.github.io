---
layout: page
title: Engineering
description: Case studies from Fernando Bevilacqua's work in enterprise SaaS, engineering productivity, healthcare software, developer tooling and AI research.
---

<div class="engineering-intro"><span class="eyebrow">Mission records / Selected engineering work</span><p>The work I would discuss in a Staff or Principal engineering interview: what the problem was, the scope I owned, the decisions that mattered, and what changed. Some commercial implementation details are private, so these accounts stay at the level I can share publicly.</p></div>

<section class="case-study" id="collaboration-platform">
  <div class="case-index">01 / Enterprise SaaS · Optidata</div>
  <h2>Building a collaboration platform with many products inside it</h2>
  <p class="case-lead">I architected and led development of an enterprise collaboration SaaS with drive, office, chat, video, social, calendar and email. It became Optidata’s second-highest grossing product.</p>
  <div class="case-grid"><div><h3>The constraint</h3><p>Enterprises needed separation across services and, in some cases, dedicated infrastructure or data stored in a particular country. That requirement applied to WebSockets, databases, media, email and calendar services, not just the primary application.</p></div><div><h3>The architectural decision</h3><p>I made the tenant the shard boundary from day one. A central API operated by Optidata holds the tenant definitions; the service stack is separated by tenant. The same federation model supports a company on dedicated infrastructure and, for example, a US company storing its data in a US datacenter.</p></div><div><h3>My scope and the team</h3><p>I started the platform alone. The team grew to five including me, then 13, and later nine. As CTO / Head of Software I owned technical direction and architecture alongside engineering practices, tooling and delivery strategy.</p></div><div><h3>Implementation and outcome</h3><p>The platform used PHP/Laravel, Go, PostgreSQL, Redis, Ceph, Docker and Kubernetes. Tenant-level service separation shaped the system from the start; the resulting product became Optidata’s second-highest grossing.</p></div></div>
  <p><strong>The lesson:</strong> tenancy was an architectural boundary, not an account field added later. Applying it consistently across the service stack gave the product room to meet different customer infrastructure and data-location requirements.</p>
</section>

<section class="case-study" id="engineering-productivity">
  <div class="case-index">02 / Engineering productivity · Optidata</div>
  <h2>Changing how the team builds software</h2>
  <p class="case-lead">Together with Jean Bianchi and the development team, I improved the system around delivery: how engineers learn, plan, review, test and use AI. <a href="https://pt.linkedin.com/posts/jeanjose-bianchi_desenvolvimento-produtividade-gest%C3%A3odetimes-activity-7497762763654721536-gYhF">Jean’s published account ↗</a></p>
  <div class="case-grid"><div><h3>People and process</h3><p>We acted on retrospective feedback, trained engineers across disciplines, redistributed responsibilities and adapted the process to the product’s needs, switching between continuous Kanban flow and monthly Scrumban sprints.</p></div><div><h3>Automation and AI</h3><p>We automated deployments, code review and tests, and planned internal improvements as sprint work. We trained the team on AI, encouraged experimentation and removed barriers to using it. The published account says roughly 90% of output now passes through AI at some stage, from requirements and documentation to code, review, tests and monitoring.</p></div><div><h3>January to July 2026</h3><p>Completed tasks rose from 170 to 348 per month (+105%). Effort points rose from 810 to 1,901 per month (+135%). Effort points per person rose from 68 to 211 per month (reported as +213%). These are month-to-month figures.</p></div><div><h3>Same-period year-over-year comparison</h3><p>For January–July 2026 versus January–July 2025, the development department averaged nine people instead of 17 and completed 32% more tasks. Tasks per person rose from 10 to 23.7 per month. This department-wide comparison has a different scope from the core platform team’s one-to-five-to-13-to-nine progression above.</p></div></div>
  <p><strong>What this demonstrates:</strong> this was a shared change in training, responsibility, process and tooling. The published account attributes the result to the combination, not to AI alone. Task counts and effort points are useful indicators of delivery, but they do not by themselves measure product value or software quality.</p>
</section>

<section class="case-study" id="healthcare">
  <div class="case-index">03 / Healthcare systems · Consulting</div>
  <h2>Building under clinical and operational constraints</h2>
  <p class="case-lead">Across three health technology companies, I worked on different parts of the software lifecycle: architecture and process, production medical imaging, and speech technology integration.</p>
  <div class="case-grid"><div><h3>Amplimed · 2022–2025</h3><p>As a technology consultant, I helped engineering teams address technical debt and architecture and process problems.</p></div><div><h3>Animati · 2021–2022</h3><p>Worked on a production radiology information system. Earlier research I co-authored on image transfer and visualization was used in the Animati medical image viewer. <a href="/academic/publications/">Read the research ↗</a></p></div><div><h3>Iara Health · 2019–2021</h3><p>Designed APIs, SDKs and pipelines for speech-recognition technology in medical environments.</p></div></div>
  <p><strong>The common thread:</strong> useful architecture depends on the environment in which software operates. In healthcare, integration and dependable workflows are as consequential as the model or feature at the center.</p>
</section>

<section class="case-study" id="developer-tools">
  <div class="case-index">04 / Developer experience · Open source</div>
  <h2>Building the tools I wanted other developers to have</h2>
  <div class="case-grid"><div><h3>Codebot</h3><p>Game development involves more than editing code: finding assets, making sounds, building levels and preparing releases. I built an IDE around that larger workflow, then made it web-based. The design question was which recurring tasks the tool could absorb so a developer could stay focused on making the game. <a href="https://github.com/Dovyski/Codebot">Explore Codebot ↗</a></p></div><div><h3>cvui</h3><p>OpenCV experiments needed fast, simple controls without requiring Qt or OpenGL. I created a UI library that renders with OpenCV drawing primitives, packaged it for straightforward adoption, documented it and maintained it in C++ and Python. <a href="https://github.com/Dovyski/cvui">Explore cvui ↗</a></p></div><div><h3>Flixel Studio and community work</h3><p>Flixel Studio brought an editor into the HaxeFlixel debugger. I have also co-maintained Flixel Community and contributed to HaxeFlixel. These projects taught me to design for other developers’ workflows and for maintenance beyond the initial release. <a href="https://github.com/Dovyski/flixel-studio">Explore Flixel Studio ↗</a></p></div></div>
</section>

<section class="case-study" id="research">
  <div class="case-index">05 / Research · PhD in Informatics</div>
  <h2>Studying emotion without wearable sensors</h2>
  <p class="case-lead">My HCI research explored remote detection of players’ stress and boredom using computer vision and neural networks trained on psychophysiological signals, including heart rate and facial expressions.</p>
  <div class="case-grid"><div><h3>Constraint</h3><p>Capturing useful signals without attaching sensors to the player. That made the measurement method part of the research challenge.</p></div><div><h3>Method and result</h3><p>I combined computer vision, machine learning and experimental methods to investigate player experience, then published the work. The research connects my present interest in AI to earlier hands-on work with models, signals and evaluation.</p></div></div>
  <p><a href="/academic/research/">Research projects ↗</a> &nbsp; <a href="/academic/publications/">Publications ↗</a> &nbsp; <a href="https://scholar.google.se/citations?user=GOWYhzwAAAAJ&hl=en">Google Scholar ↗</a></p>
</section>

<p class="engineering-outro">There is more to the story: <a href="/portfolio/">browse the project archive</a>, <a href="/blog/">read the writing archive</a>, or <a href="mailto:dovyski@gmail.com">get in touch</a>.</p>
