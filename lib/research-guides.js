export const researchGuides = [
  {
    slug: "how-to-find-a-research-gap",
    title: "How to Find a Research Gap",
    description: "A practical way to read a body of literature, test what is missing, and turn evidence into a defensible research direction.",
    intro: "A research gap is not simply a topic that sounds interesting. It is a part of the evidence, population, method, setting, or explanation that the existing literature has not adequately addressed. This guide shows how to locate and justify one.",
    learn: ["Distinguish a gap from a problem or question", "Compare papers without losing their context", "Turn repeated evidence and limitations into a researchable direction"],
    sections: [
      {
        id: "what-is-a-research-gap",
        title: "What a research gap is",
        paragraphs: ["A research gap is a specific area where available studies are limited, inconsistent, absent, or not yet sufficient to answer an important question. The gap belongs to the literature, not to your imagination: you support it by showing what has been studied, how it has been studied, and what remains unresolved.", "A gap can be narrow. It might concern a population that has not been included, a measure that has not been compared, a setting in which a finding has not been tested, or a disagreement that existing methods have not explained."]
      },
      {
        id: "gap-problem-question",
        title: "Research gap vs research problem vs research question",
        paragraphs: ["These terms work together but are not interchangeable. The gap describes a limitation in knowledge. The research problem explains why that limitation matters in a real or scholarly context. The research question states what your study will investigate.", "For example, the gap might be that studies of a model use controlled image datasets but rarely test it on low-resource clinical settings. The problem is that performance in those settings remains uncertain. A question could ask how the model performs under a defined shift in data and what types of error change."]
      },
      {
        id: "why-gaps-matter",
        title: "Why research gaps matter",
        paragraphs: ["A well-supported gap gives a project a reason to exist. It helps you avoid repeating a study without a meaningful change, define a manageable scope, and explain the contribution you hope to make. It also gives readers a standard for judging whether your methods address the stated need.", "A gap is not a promise that a project will be novel or publishable. It is a reasoned account of what the current literature does not yet establish and why a focused investigation could help."]
      },
      {
        id: "types-of-gaps",
        title: "Common types of research gaps",
        intro: "Use these categories as prompts for comparison, not as a checklist that produces a gap automatically.",
        bullets: ["Evidence gap: important evidence is missing or too limited to support a conclusion.", "Population gap: a group, community, age range, or user group is absent or underrepresented.", "Context gap: an approach has been studied in one setting but not in another setting that may change the outcome.", "Method gap: the dominant methods leave a measurement, causal, qualitative, longitudinal, or validation question unresolved.", "Contradiction gap: credible studies report different findings and the reason for the difference is unclear.", "Theory or explanation gap: a pattern is observed, but the mechanism or boundary condition is poorly explained.", "Application or implementation gap: an approach works in principle, but its use in a real workflow has not been examined carefully."]
      },
      {
        id: "where-to-look",
        title: "Where to look for gaps in papers",
        paragraphs: ["Read beyond the abstract. The most useful evidence often appears in the introduction, methods, results, limitations, discussion, and conclusion. A limitation is a clue, not automatically a gap: assess whether it is important, repeated, and feasible to investigate.", "Search within papers for terms such as limitation, however, remains unclear, future work, not examined, underrepresented, inconsistent, and beyond the scope. Then read the surrounding paragraphs so that a sentence is not removed from its study design or authors' stated boundaries."],
        attribution: { text: "This close reading approach is consistent with university guidance that treats a literature review as a comparison and synthesis of sources rather than a list of summaries. See", label: "UNC Writing Center's literature-review guidance", url: "https://writingcenter.unc.edu/tips-and-tools/literature-reviews/" }
      },
      {
        id: "analyze-literature",
        title: "How to analyze the literature",
        steps: ["Start with a precise question or topic boundary.", "Collect a varied set of relevant papers: foundational work, recent studies, different methods, and studies that disagree.", "Record what each paper actually investigated, rather than what its title suggests.", "Compare populations, data, measures, designs, assumptions, and outcomes.", "Mark claims that recur, claims that conflict, and claims authors explicitly limit.", "Write a short evidence statement that names the papers or pattern supporting the proposed gap."]
      },
      {
        id: "compare-papers",
        title: "How to compare multiple papers",
        paragraphs: ["Comparison becomes useful when every paper is read against the same fields. A simple matrix prevents the literature review from becoming a collection of isolated summaries. Add fields that matter to your question and preserve uncertainty when a paper does not report something clearly."] ,
        table: {
          headers: ["Compare", "Questions to ask"],
          rows: [
            ["Question and scope", "What claim or question does the study actually address?"],
            ["Population or data", "Who or what was studied, and what was excluded?"],
            ["Method", "How were observations collected, measured, or analyzed?"],
            ["Outcome", "What result is supported, and under what conditions?"],
            ["Limitations", "What boundary or uncertainty do the authors identify?"],
            ["Relation to other papers", "Does it extend, qualify, or conflict with another study?"]
          ]
        }
      },
      {
        id: "recurring-limitations",
        title: "Identify recurring limitations",
        paragraphs: ["One limitation may be a routine boundary of a particular design. A stronger lead appears when the same limitation occurs across independent papers, affects an important conclusion, and can be addressed with a credible design. Count patterns carefully: three papers using the same dataset are not three independent lines of evidence."] ,
        table: {
          headers: ["Observation", "Possible research gap"],
          rows: [
            ["Most studies use one benchmark dataset", "Test whether the finding transfers to a clearly justified second dataset or setting."],
            ["Studies report an association but not temporal evidence", "Examine whether a longitudinal design can clarify ordering or change."],
            ["Results differ by study", "Investigate whether samples, measures, or analysis choices explain the disagreement."],
            ["A group is mentioned as a limitation", "Design a study with that population and a justified comparison."],
            ["Methods optimize a metric without real-world evaluation", "Assess the method under a defined operational constraint or user workflow."]
          ]
        }
      },
      {
        id: "future-work",
        title: "Inspect future-work sections",
        paragraphs: ["Future-work suggestions are useful because authors know their design closely. They are not a ready-made research agenda. Check whether the proposed direction is repeated elsewhere, whether it matters to your question, and whether you can define a feasible version of it.", "Translate a suggestion into a testable statement. Instead of writing 'future studies should use more data,' specify which data, for which population, to answer which unresolved question, and what evidence would count as an answer."]
      },
      {
        id: "contradictory-findings",
        title: "Identify contradictory findings",
        paragraphs: ["Do not treat different results as a contradiction until you compare the conditions that produced them. Differences in definitions, samples, interventions, time periods, measurements, and analysis can make apparently conflicting papers answer different questions.", "A useful contradiction table records the exact claim, not just whether the paper is positive or negative. Then ask which moderator or design choice could explain the pattern."] ,
        table: {
          headers: ["Paper evidence", "What to investigate next"],
          rows: [
            ["Two studies report different effects", "Compare samples, measures, exposure levels, and analysis decisions."],
            ["A method works in one environment but not another", "Test the environment as a boundary condition rather than averaging it away."],
            ["Authors use different definitions for the same term", "Map the definitions and test whether the disagreement is partly conceptual."],
            ["A review calls evidence inconclusive", "Trace the primary studies and identify the missing comparison or stronger design."]
          ]
        }
      },
      {
        id: "under-studied-settings",
        title: "Look for under-studied populations, datasets, and environments",
        paragraphs: ["An under-studied group is not automatically a gap worth pursuing. Explain why the group, dataset, or environment could change the claim and what ethical, practical, or sampling constraints affect the study. Avoid framing people as missing data points; describe the research context and the consequences of its absence.", "For datasets and environments, inspect whether the original result depends on clean inputs, a particular institution, a specific geography, a narrow time window, or a controlled task. A transfer question is strongest when the new setting is justified, not merely different."]
      },
      {
        id: "workflow",
        title: "A practical step-by-step workflow",
        steps: ["Define the boundary: topic, population, setting, time period, and type of evidence.", "Find a starting set of papers using broad searches, then add targeted terms for methods, populations, and outcomes.", "Read abstracts for fit, then inspect methods and discussions before treating a paper as evidence.", "Build a comparison matrix and record exact limitations, not vague impressions.", "Group observations into themes such as population, method, context, contradiction, or explanation.", "Test each candidate gap against the wider literature and look for counterexamples.", "Write the gap as a bounded evidence statement followed by a feasible research question."],
        actions: [
          { label: "Search papers", href: "/", description: "Try the broad topic first, then refine the query as the literature gives you better terms." },
          { label: "Browse Research Topics", href: "/research-topics", description: "Build background vocabulary before deciding which gap is worth testing." }
        ]
      },
      {
        id: "worked-example",
        title: "Worked example (fictional): from topic to gap",
        intro: "The papers, results, and labels in this example are fictional and illustrative. They are not real studies, citations, or evidence about medical imaging.",
        paragraphs: ["Initial broad topic: machine learning for medical image diagnosis. This is an area of interest, not a research gap. The student turns it into a provisional question: How consistently does a chest X-ray classification model perform when images come from clinical sites with different equipment and patient mixes?", "Fictional Paper A studies a chest X-ray classifier on one carefully curated public dataset. It reports strong internal test performance, but its data come from one source and it does not test another clinical site. Fictional Paper B evaluates a different model across two hospitals and reports that performance changes between sites, but it only reports aggregate accuracy and does not examine which patient or image characteristics are associated with the change. Fictional Paper C uses a smaller community-hospital dataset and reports weaker performance than Papers A and B, but its sample is narrow and its preprocessing differs from both papers.", "The student records these details before proposing a gap. The table is an evidence matrix, not a claim about real literature."],
        table: {
          headers: ["Fictional paper", "Study focus", "Evidence and limitation"],
          rows: [
            ["Paper A", "One model on one curated chest X-ray dataset", "Reports internal performance; does not test cross-site transfer."],
            ["Paper B", "Model comparison across two hospitals", "Shows site-level performance differences; does not analyze error patterns or patient/image factors."],
            ["Paper C", "Model evaluation on a community-hospital dataset", "Suggests weaker performance in a different setting; sample and preprocessing are not directly comparable."]
          ]
        },
        bullets: ["Recurring limitation: the fictional studies do not provide a consistent, comparable analysis of how site differences affect model errors.", "Counterexample: Paper B does include two hospitals, so the claim 'no one has studied multiple sites' is contradicted and cannot support a gap.", "Initial candidate gap: medical-imaging models have not been evaluated across clinical sites. This is too broad and unsupported because Paper B does evaluate two sites, and the three fictional studies use different data and preprocessing.", "Narrowed research gap: the literature represented by these fictional papers does not yet establish which image or patient-context differences explain changes in a defined chest X-ray classification task across sites.", "Resulting research question: For one defined chest X-ray task, which measurable site or image characteristics are associated with changes in classification errors when the model is evaluated across two justified clinical environments?"]
      },
      {
        id: "example-demonstrates",
        title: "What this example demonstrates",
        paragraphs: ["A limitation in one paper is not a research gap. A repeated limitation across relevant literature can be evidence of a possible gap, but it still needs broader verification. The student must search for additional studies, test whether the apparent pattern survives different methods and settings, and narrow the question until a feasible design can address it."]
      },
      {
        id: "common-mistakes",
        title: "Common mistakes",
        bullets: ["Calling any interesting topic a gap.", "Treating one limitation sentence as proof that no one has studied the issue.", "Ignoring papers that disagree with the preferred conclusion.", "Confusing a gap in your own reading with a gap in the field.", "Making a gap so broad that no method could address it.", "Using 'few studies exist' without defining the search boundaries and evidence.", "Assuming novelty means importance, feasibility, or ethical acceptability."]
      },
      {
        id: "scholarlens-help",
        title: "How ScholarLens can help with literature discovery",
        paragraphs: ["ScholarLens can help you create the evidence set from which a gap is judged. Start with a focused query in the paper search, open promising records to inspect their metadata and abstracts, and save papers you expect to compare in your Library. Research Topics can help you build background vocabulary before you narrow the question.", "The tool does not decide whether a gap is real. You still need to read the studies, compare their designs, verify claims in the original papers, and explain why the proposed work matters."]
      },
      {
        id: "final-checklist",
        title: "Final checklist",
        checklist: ["I can state the exact literature boundary I searched.", "I have compared more than one kind of relevant paper.", "The proposed gap is supported by specific evidence, not intuition alone.", "I checked limitations, future work, contradictory findings, and excluded settings.", "I can explain why the gap matters.", "The research question is narrow enough for the available time, data, and ethics process.", "The method can produce evidence that addresses the gap directly."]
      }
    ],
    sources: [
      ["University of North Carolina Writing Center: Literature Reviews", "https://writingcenter.unc.edu/tips-and-tools/literature-reviews/"],
      ["Purdue OWL: Writing a Literature Review", "https://owl.purdue.edu/owl/research_and_citation/conducting_research/writing_a_literature_review.html"]
    ]
  },
  {
    slug: "how-to-conduct-a-literature-review",
    title: "How to Conduct a Literature Review",
    description: "A practical workflow for finding, screening, organizing, comparing, and synthesizing research literature around a clear question.",
    intro: "A literature review is an argument about the state of knowledge on a defined question. It is not a catalogue of everything you found. The strongest reviews make their search boundaries visible, compare evidence, and show what the comparison means for the next research step.",
    learn: ["Turn a broad interest into a searchable question", "Extract comparable evidence from papers", "Synthesize themes, methods, findings, and limitations"],
    sections: [
      {
        id: "what-is-review",
        title: "What a literature review is",
        paragraphs: ["A literature review locates and interprets relevant scholarship in order to explain what is known, how it has been studied, where findings agree or differ, and what remains uncertain. Its scope may be part of a thesis, an article, a project proposal, or a standalone review.", "A review is transparent about selection and reasoning. You do not need to claim that you found every paper; you do need to explain what you searched, what you included, and how the selected evidence supports your synthesis."],
        attribution: { text: "For a general explanation of organizing sources into a synthesis, see", label: "University of Toronto Writing Advice on literature reviews", url: "https://advice.writing.utoronto.ca/types-of-writing/literature-review/" }
      },
      {
        id: "review-types",
        title: "Which type of literature review are you doing?",
        paragraphs: ["The workflow in this guide is student-oriented and general. It can help you plan a narrative assignment or the early stages of a larger review, but it is not a replacement for a registered protocol, reporting standard, or specialist supervision when you are conducting a formal systematic or scoping review."],
        table: {
          headers: ["Review type", "Typical purpose and implication"],
          rows: [
            ["Narrative review", "Explains and synthesizes a body of literature around a question or theme. The search and selection boundaries should still be clear, even when the process is not intended to be exhaustive."],
            ["Scoping review", "Maps the extent, concepts, and types of evidence in a broad or emerging area. It normally needs a more explicit protocol and reporting decisions than a short course essay."],
            ["Systematic review", "Answers a focused question through a planned, reproducible search and appraisal process. Formal methods and reporting requirements should be followed rather than inferred from this general guide."]
          ]
        },
        attribution: { text: "For formal systematic-review reporting, consult the", label: "PRISMA 2020 statement and explanation", url: "https://www.bmj.com/content/372/bmj.n71" }
      },
      {
        id: "purpose",
        title: "Purpose of a literature review",
        bullets: ["Establish the background and vocabulary for a research question.", "Show how concepts, methods, and findings have developed.", "Compare the strength and limits of different kinds of evidence.", "Identify disagreements, blind spots, and useful directions.", "Justify the design and contribution of a new study."]
      },
      {
        id: "review-vs-annotated",
        title: "Literature review vs annotated bibliography",
        paragraphs: ["An annotated bibliography usually gives a separate citation and note for each source. A literature review uses sources together to build a line of reasoning. An annotated bibliography can be useful during preparation, but a final review normally needs cross-paper comparison and synthesis.", "If your draft has one paragraph per paper with no transitions based on ideas, methods, or findings, you may still be writing annotations rather than a review."]
      },
      {
        id: "research-question",
        title: "Define the research question",
        paragraphs: ["Start by defining the population or object, phenomenon, context, and kind of evidence that matter. A question such as 'What is the effect of online learning?' leaves too many choices open. A more usable question specifies the learner group, learning outcome, comparison, setting, and time frame when those distinctions affect the evidence.", "The question can evolve as you read, but record why the scope changed. Scope decisions are part of the review's credibility, not a sign that the first wording was perfect."]
      },
      {
        id: "keywords",
        title: "Build search keywords",
        paragraphs: ["Break the question into concept groups. List synonyms, related terms, spelling variants, acronyms, methods, populations, and outcomes for each group. Search combinations rather than one phrase only, and keep a log of queries that produced useful or irrelevant results."] ,
        table: {
          headers: ["Concept", "Examples"],
          rows: [
            ["Core phenomenon", "machine learning, neural network, predictive model"],
            ["Context", "medical diagnosis, clinical imaging, radiology"],
            ["Outcome", "classification performance, diagnostic error, calibration"],
            ["Method or design", "validation, retrospective study, qualitative interview"]
          ]
        }
      },
      {
        id: "review-workflow",
        title: "The literature-review workflow",
        intro: "Use this as a planning map. The exact order and documentation depend on your review type and institutional requirements.",
        workflowLabel: "Literature review workflow",
        workflow: ["Research question", "Search strategy", "Paper discovery", "Screening", "Evidence extraction", "Comparison", "Synthesis", "Research gap", "Final review"]
      },
      {
        id: "finding-papers",
        title: "Find relevant papers",
        paragraphs: ["Search broadly enough to learn the field's vocabulary, then narrow with terms that describe your actual question. Follow references from useful papers, look for related work, and seek recent papers that test whether older findings still hold. Search results are leads; relevance must be judged from the abstract, methods, and question.", "ScholarLens can provide a starting set from its academic index. Open records rather than relying on result titles, and use the paper page to inspect the available abstract, authors, venue, year, and access information."],
        actions: [
          { label: "Start a paper search", href: "/", description: "Use a provisional question to discover the vocabulary and first papers for your review." },
          { label: "Save comparison candidates", href: "/library", description: "Keep promising records together while you screen and extract evidence." }
        ]
      },
      {
        id: "criteria",
        title: "Set inclusion and exclusion criteria",
        paragraphs: ["Criteria keep the review aligned with its question. Decide them before screening where possible, and write them in operational language. Examples include publication period, language, population, setting, study design, outcome, and whether the paper contains primary evidence or a review.", "Criteria should not be used to remove an inconvenient result. If the scope changes, document the reason and consider whether the change affects the interpretation of the review."]
      },
      {
        id: "screening",
        title: "Screen papers",
        steps: ["Remove obvious duplicates and records outside the topic boundary.", "Screen titles and abstracts for likely fit.", "Read the full text of papers that could answer the question.", "Record an inclusion decision and a short reason for exclusions.", "Revisit borderline papers after the first themes become visible."]
      },
      {
        id: "organize",
        title: "Organize papers",
        paragraphs: ["Use a table or reference manager with fields that support your question. Useful fields include citation, year, setting, sample or dataset, design, intervention or exposure, outcome, main finding, limitations, and relation to other studies. Tag papers by theme, method, and evidence role so that one paper can belong to several discussions.", "Do not confuse organization with synthesis. A tidy spreadsheet still needs an argument about what the pattern means."]
      },
      {
        id: "extract",
        title: "Extract useful information",
        paragraphs: ["Extract claims together with the conditions that support them. Note whether a result is observational, experimental, qualitative, theoretical, or based on a review. Record measures and comparison groups precisely enough that you can explain why two studies should or should not be compared."] ,
        table: {
          headers: ["Field", "Useful extraction prompt"],
          rows: [
            ["Research aim", "What question was the study designed to answer?"],
            ["Evidence", "What data or material supports the answer?"],
            ["Method", "What design and analysis shape the result?"],
            ["Finding", "What is the narrowest claim justified by the study?"],
            ["Limit", "What does the study not establish?"],
            ["Use in review", "Which theme or comparison does this paper inform?"]
          ]
        }
      },
      {
        id: "compare-methodologies",
        title: "Compare methodologies",
        paragraphs: ["A method should be judged in relation to the question it can answer. Compare sampling, measurement, intervention, analysis, validation, and reporting. A quantitative study and an interview study may not be competing versions of the same evidence; they may illuminate different parts of the problem.", "Explain tradeoffs instead of ranking methods in the abstract. A method may provide depth but limited transfer, or broad coverage but less detail about mechanism."]
      },
      {
        id: "compare-findings",
        title: "Compare findings",
        paragraphs: ["Group findings by claims or themes, then ask whether differences come from the phenomenon or from the study conditions. Compare the population, setting, measurement, time period, and analysis before calling results contradictory. Preserve null or mixed findings; they often define the boundary of a claim."]
      },
      {
        id: "themes-gaps",
        title: "Identify themes, limitations, and gaps",
        paragraphs: ["Themes are recurring ideas that organize the evidence, such as measurement choices, implementation conditions, or explanations for an outcome. A limitation is a boundary in an individual study. A gap is a broader unresolved need supported by the comparison. Move from paper-level notes to a statement about the body of literature only after checking the pattern across sources."]
      },
      {
        id: "synthesis",
        title: "Synthesize instead of merely summarizing",
        paragraphs: ["Synthesis connects sources around a claim. A paragraph might compare three methods, explain why their findings differ, and identify what evidence is still missing. A paragraph per paper can be useful for notes, but it usually hides relationships between papers and makes the review feel like a list.", "Use signposting such as in contrast, across these studies, this difference may reflect, taken together, and the evidence is limited by. These phrases should express a real relationship, not decorate unrelated summaries."] ,
        table: {
          headers: ["Summary pattern", "Stronger synthesis move"],
          rows: [
            ["Paper A found X. Paper B found Y.", "Compare the conditions and explain why X and Y may differ."],
            ["Several authors studied the topic.", "Group the studies by method, population, or claim and state the pattern."],
            ["The literature has limitations.", "Name the repeated limitation, its consequence, and a feasible response."]
          ]
        }
      },
      {
        id: "illustrative-review-example",
        title: "Illustrative worked example: from question to evidence",
        intro: "This example is fictional and illustrative. Paper labels, queries, decisions, and results are invented for teaching and are not real studies or citations.",
        paragraphs: ["Research question: How do remote physiotherapy programs affect adherence to home exercises among adults recovering from knee surgery? The student defines adherence as completing the prescribed exercises during a stated recovery period, rather than treating every form of engagement as the same outcome.", "Search concepts: remote physiotherapy OR tele-rehabilitation; home exercise OR exercise adherence; knee surgery OR knee replacement; adults. Illustrative queries include 'tele-rehabilitation home exercise adherence knee surgery' and '(remote physiotherapy OR tele-rehabilitation) AND (exercise adherence OR home exercise) AND (knee replacement OR knee surgery)'. These queries are examples for planning, not guaranteed or exhaustive searches."],
        table: {
          headers: ["Fictional result", "Decision", "Reason"],
          rows: [
            ["Paper A", "Include", "Directly studies adults after knee replacement and reports home-exercise adherence during recovery."],
            ["Paper B", "Include as context", "Studies remote physiotherapy after hip surgery, so the population differs but the adherence measure helps define a method comparison."],
            ["Paper C", "Exclude", "Studies remote physiotherapy for chronic back pain and reports pain intensity only, outside the population and outcome boundary."],
            ["Paper D", "Include", "Compares video visits with telephone support after knee surgery but reports adherence differently from Paper A." ]
          ]
        },
        steps: ["Initial paper set: retain Papers A, B, C, and D long enough to record the screening decision and reason rather than silently deleting them.", "Evidence extraction: record each paper's population, delivery mode, adherence measure, comparison, follow-up period, and main limitation.", "Method comparison: Paper A uses scheduled video sessions, Paper B uses a broader tele-rehabilitation program, and Paper D compares video with telephone support. Their delivery modes and measures are not interchangeable.", "Finding themes: remote support may be described through access, adherence, supervision, or recovery outcomes. The student keeps these themes separate instead of treating every positive outcome as adherence evidence.", "Contradiction: fictional Paper A reports higher adherence with video support, while fictional Paper D finds little difference between video and telephone support. The student checks whether follow-up period, adherence definition, or baseline support explains the difference."]
      },
      {
        id: "illustrative-synthesis",
        title: "Illustrative synthesis paragraph",
        paragraphs: ["The fictional papers suggest that remote physiotherapy may support home-exercise adherence after knee surgery, but the evidence is not directly comparable. Paper A measures scheduled exercise completion during a short recovery period, whereas Paper D compares delivery modes using a different adherence definition and reports little difference between video and telephone support. Paper B contributes context from hip surgery but cannot establish the same effect for knee replacement, and Paper C is excluded because its population and outcome do not match the review question. Taken together, the evidence supports a narrower next question about how adherence definitions and support intensity affect comparisons between video and telephone rehabilitation after knee replacement; it does not establish that video care is generally superior."],
        attribution: { text: "The distinction between a transparent general review workflow and formal reporting standards is also reflected in", label: "PRISMA's official resources", url: "https://www.prisma-statement.org/" }
      },
      {
        id: "writing",
        title: "Write the literature review",
        steps: ["Introduce the question, scope, and reason the review matters.", "Explain the search and selection boundaries at the level appropriate to the assignment or project.", "Organize the body by themes, methods, developments, or disagreements rather than by publication order alone.", "Use evidence from several papers in each major discussion.", "State limitations in the literature and in the review itself.", "Conclude with the current evidence, unresolved question, and logical next step."]
      },
      {
        id: "common-mistakes",
        title: "Common mistakes",
        bullets: ["Searching only one wording for a concept.", "Treating citation count, venue, or recency as a substitute for relevance and quality assessment.", "Including papers because they are interesting but outside the defined question.", "Summarizing abstracts without checking methods and limitations.", "Writing a chronological list with no comparison.", "Claiming consensus when studies use different definitions or populations.", "Letting a search tool or AI summary replace reading the source."]
      },
      {
        id: "scholarlens-workflow",
        title: "A practical workflow using ScholarLens",
        steps: ["Write a provisional question and concept list.", "Use ScholarLens search to discover a broad starting set.", "Open papers and record why each is relevant before saving it.", "Save comparison candidates to your Library and tag or note their evidence role outside the tool as needed.", "Return to search with terms discovered in the first papers.", "Use the paper reader and Reading Assistant to clarify dense passages, then verify important claims in context.", "Draft a synthesis matrix and write around relationships between papers."],
        actions: [
          { label: "Open paper search", href: "/", description: "Run the next query after the first papers reveal better terminology." },
          { label: "Open Library", href: "/library", description: "Return to the papers you saved for screening and comparison." }
        ]
      },
      {
        id: "final-checklist",
        title: "Final checklist",
        checklist: ["The review has one clear question and a visible scope.", "Search terms include synonyms and field-specific language.", "Inclusion and exclusion decisions are explainable.", "The evidence matrix records methods, findings, and limitations.", "The body is organized around themes or comparisons.", "The conclusion distinguishes what is known from what remains uncertain.", "Important claims are checked against the original paper, not only a summary."]
      }
    ],
    sources: [
      ["University of Toronto Writing Advice: Literature Reviews", "https://advice.writing.utoronto.ca/types-of-writing/literature-review/"],
      ["Purdue OWL: Writing a Literature Review", "https://owl.purdue.edu/owl/research_and_citation/conducting_research/writing_a_literature_review.html"]
    ]
  },
  {
    slug: "how-to-find-research-papers",
    title: "How to Find Research Papers for a Research Topic",
    description: "A search strategy for moving from a broad topic to a useful, organized reading list without relying on titles alone.",
    intro: "Finding papers is a reasoning task, not just a search-box task. Start with the question you need to answer, learn the vocabulary used by the field, and compare candidate papers before deciding what belongs in your reading list.",
    learn: ["Turn a broad topic into searchable concepts", "Balance foundational and recent literature", "Evaluate relevance before saving a paper"],
    sections: [
      {
        id: "precise-question",
        title: "Start with a precise research question",
        paragraphs: ["A topic names an area; a question names the relationship, process, population, or outcome you need to understand. Write down what you want to know, who or what is involved, the setting, and the kind of evidence that would help.", "You do not need a final thesis question before searching. A provisional question is enough to guide the first search and reveal the vocabulary you were missing."]
      },
      {
        id: "core-concepts",
        title: "Identify core concepts",
        paragraphs: ["Underline the important nouns and relationships in your question. Separate the central phenomenon from context, population, intervention or exposure, outcome, and method. This prevents a broad label from carrying the entire search strategy."] ,
        table: {
          headers: ["Concept role", "Question to ask"],
          rows: [
            ["Phenomenon", "What is the main process, technology, behavior, or condition?"],
            ["Context", "Where or in what system does it occur?"],
            ["Population or object", "Who or what is being studied?"],
            ["Outcome", "What change, measure, or experience matters?"],
            ["Method", "What kind of evidence will answer the question?" ]
          ]
        }
      },
      {
        id: "keywords",
        title: "Build keyword combinations and use synonyms",
        paragraphs: ["List technical terms, plain-language terms, abbreviations, older terms, alternate spellings, and related methods. Combine one or two terms from different concept groups, then inspect useful results for the language authors actually use.", "For example, 'AI in healthcare' could become a set of searches involving machine learning, medical diagnosis, medical imaging, radiology, classification, clinical validation, or diagnostic error. These examples are starting points, not exhaustive queries and do not guarantee the best literature."],
        attribution: { text: "For official guidance on interpreting search results and refining queries, see", label: "Google Scholar's search tips", url: "https://scholar.google.com/intl/en/scholar/help.html" }
      },
      {
        id: "illustrative-search-progression",
        title: "Illustrative search progression: from topic to reading list",
        intro: "The queries and results below are illustrative examples. They are not exhaustive, do not guarantee the best papers, and do not represent real papers or citations.",
        paragraphs: ["Initial topic: 'AI in healthcare.' That phrase is too broad to guide a balanced reading list, so the student uses each search stage for a different discovery purpose."],
        table: {
          headers: ["Step", "Illustrative query", "What the query is intended to discover"],
          rows: [
            ["1. Broad discovery", "AI healthcare review", "Field vocabulary, overview papers, major applications, and recurring research themes."],
            ["2. Concept refinement", "machine learning medical diagnosis medical imaging clinical validation", "Papers connecting the four chosen concepts and revealing more precise terms."],
            ["3. Narrow query", "machine learning AND medical diagnosis AND medical imaging", "Studies focused on models used for diagnosis from medical images rather than healthcare AI generally."],
            ["4. Method refinement", "machine learning AND medical imaging AND diagnostic validation", "Work emphasizing evaluation or validation rather than model development alone."],
            ["5. Population or setting refinement", "machine learning AND chest X-ray diagnosis AND external validation hospital", "A narrower question about a modality, clinical task, and evaluation environment."]
          ]
        },
        paragraphs: ["Adding a term changes the search intent. 'Medical imaging' narrows the domain; 'clinical validation' emphasizes evaluation; 'hospital' points toward a setting. The student should inspect results after each stage and adjust terminology rather than adding every possible term at once."],
        table: {
          headers: ["Fictional result", "Classification", "Why"],
          rows: [
            ["Paper A", "Keep", "Directly studies machine-learning diagnosis from chest X-rays and reports an external hospital evaluation relevant to the question."],
            ["Paper B", "Background", "Explains medical-image model evaluation but uses a different imaging modality, so it informs method vocabulary without being direct evidence."],
            ["Paper C", "Exclude", "Discusses hospital scheduling with AI and does not study medical diagnosis or imaging."]
          ]
        },
        paragraphs: ["These fictional classifications are based on the student's question, not on a universal quality ranking. Paper B can be useful even though it is not a core answer, while Paper C may be interesting but outside the defined scope."]
      },
      {
        id: "broad-to-narrow",
        title: "Search broadly first, then narrow",
        paragraphs: ["The first search is for vocabulary and landmarks. It helps you discover reviews, recurring authors, datasets, methods, and terms. The second phase adds constraints that reflect your question, such as a specific population, outcome, setting, or study design.", "If every result is irrelevant, your terms may be too broad or your concept groups may be mixed. If every result is nearly identical, remove one constraint and look for adjacent terminology."],
        actions: [
          { label: "Try the broad search in ScholarLens", href: "/", description: "Use the first result set to learn terms before narrowing the question." },
          { label: "Browse Research Topics", href: "/research-topics", description: "Use topic guides to orient yourself when the field vocabulary is unfamiliar." }
        ]
      },
      {
        id: "foundational-work",
        title: "Identify seminal or foundational work",
        paragraphs: ["Foundational work often introduces a concept, method, dataset, measurement, or influential finding that later papers build on. Look for papers repeatedly cited by relevant later work, review articles that define the field, and the earliest study that established the specific idea you are using.", "Citation count alone does not establish quality, importance, or relevance. A highly cited paper may be cited because it is disputed, historically important, or used as a baseline. Read the paper for its role in the field, inspect its methods, and compare it with later evidence before placing it at the center of your project."]
      },
      {
        id: "recent-literature",
        title: "Find recent literature",
        paragraphs: ["Recent papers show how a question has developed and whether older conclusions have been extended, challenged, or applied in new settings. 'Recent' depends on the field and the research question: a fast-moving technical area may change quickly, while a historical or theoretical question may require a much longer view. Use publication year as a discovery filter, not as a universal cutoff or quality shortcut. A recent paper can still be outside your question, and an older paper can remain foundational."]
      },
      {
        id: "citation-chaining",
        title: "Follow references and related work",
        paragraphs: ["Backward chaining follows the references in a useful paper to locate its foundations. Forward or related-work searching looks for later papers that extend, test, criticize, or apply it. Use both directions when the search interface makes them available, and record why each newly found paper is relevant.", "Citation relationships are discovery clues, not proof of agreement or quality. A paper may cite another to disagree with it."]
      },
      {
        id: "evaluate-relevance",
        title: "Evaluate relevance",
        paragraphs: ["Read the title, abstract, methods, and conclusion as a sequence. Ask whether the paper studies the same phenomenon, population, setting, and outcome as your question. A paper can be useful as background even when it is not direct evidence, but label that role clearly."] ,
        table: {
          headers: ["Evidence", "Decision prompt"],
          rows: [
            ["Title and abstract", "Does the paper plausibly address the question?"],
            ["Methods", "Does its design actually study the population, setting, or measure I need?"],
            ["Results", "Does it report evidence relevant to my outcome?"],
            ["Limitations", "What boundary affects whether I can transfer the finding?"],
            ["Role", "Is it foundational, direct evidence, context, method, or a counterexample?"]
          ]
        }
      },
      {
        id: "titles-alone",
        title: "Avoid relying on titles alone",
        paragraphs: ["Titles compress a study and may emphasize a technique, application, or headline result. They rarely tell you the full sample, comparison, measurement, or limitations. Before placing a paper on the core reading list, verify the abstract and at least the parts of the full text that determine fit.", "Pay attention to access labels and metadata. An open-access label can help you plan reading, but access does not establish relevance or quality."]
      },
      {
        id: "compare-before-selecting",
        title: "Compare papers before selecting them",
        paragraphs: ["Put promising papers in a small comparison table. Record the question, population or data, method, outcome, main finding, and limitation. This makes it easier to choose a balanced reading list instead of selecting only the first results or papers that confirm an assumption."]
      },
      {
        id: "organize-literature",
        title: "Organize the literature",
        paragraphs: ["Group papers by the role they play: foundations, methods, direct evidence, applications, disagreements, or open questions. Add tags for themes and settings. Keep a short note explaining why each paper is saved; without that note, a large library quickly becomes a second search problem."]
      },
      {
        id: "reading-list",
        title: "Build a research reading list",
        steps: ["Choose a small orientation set: one or two overview papers plus foundational or highly relevant work.", "Add direct evidence that matches your population, setting, and outcome.", "Add at least one paper that tests a different method or reports a different result.", "Add recent work to check the current state of the question.", "Remove papers that do not serve a clear role after closer reading.", "Order the list so concepts and methods are introduced before difficult comparisons."]
      },
      {
        id: "common-mistakes",
        title: "Common search mistakes",
        bullets: ["Searching the broad topic once and treating the first page as the literature.", "Using only everyday language when the field uses technical terms.", "Adding so many filters that useful adjacent work disappears.", "Selecting papers by title, venue, or citation count without reading their question and method.", "Collecting papers without recording why they matter.", "Confusing a paper's mention of a topic with evidence about the topic.", "Assuming one database or search tool contains every relevant source."]
      },
      {
        id: "scholarlens-help",
        title: "How ScholarLens helps",
        paragraphs: ["Use the ScholarLens paper search to test query wording and discover papers across a broad academic index. Open individual paper pages to inspect available metadata and abstracts, use the Reading Assistant when a passage needs explanation, and save promising records to your Library so the search does not have to start from zero.", "Research Topics can help you learn field vocabulary before searching. As your question becomes more precise, return to search with the concepts, methods, and outcomes you discovered in the first round."],
        actions: [
          { label: "Search ScholarLens", href: "/", description: "Test the next illustrative query against the live paper index." },
          { label: "Open your Library", href: "/library", description: "Keep papers with different roles together while you evaluate them." }
        ]
      },
      {
        id: "final-checklist",
        title: "Final checklist",
        checklist: ["I can state the question behind my search.", "I split the question into concept groups and synonyms.", "I searched broadly, then used meaningful constraints.", "My list includes foundational, recent, direct, and contrasting work where appropriate.", "I checked relevance beyond the title.", "Each saved paper has a clear role and note.", "I know which claims still require full-text verification."]
      }
    ],
    sources: [
      ["Google Scholar Help: Search Tips", "https://scholar.google.com/intl/en/scholar/help.html"],
      ["University of Michigan Library: Literature Reviews", "https://guides.lib.umich.edu/c.php?g=283073&p=1888073"]
    ]
  }
];

export const guideBySlug = Object.fromEntries(researchGuides.map((guide) => [guide.slug, guide]));