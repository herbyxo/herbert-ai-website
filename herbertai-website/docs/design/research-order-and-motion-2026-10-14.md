# What the research says about page order and motion

- **Created:** 14 October 2026, for the homepage rebuild
- **Asked by Will:** "is there research on what good web design is? and what does the research actually measure - im referring to how we should structure the page in terms of the motion of each section, and what order to do"
- **Method:** nine web searches this session on the primary studies; two points marked unverified where the primary source could not be opened. Figures labelled [data] (a study with a stated method), [editorial] (practitioner or vendor claims), [estimate].

## What the research measures

The studies behind "good web design" measure five things, and section order is not one of them.

1. **Appeal in a glance.** Lindgaard and colleagues (2006, Carleton University, Behaviour and Information Technology) flashed home pages for 50 milliseconds and found the appeal ratings matched ratings made after a long look [data]. It measured appeal, not behaviour. Tuch and colleagues (2012) found the two things driving that glance are visual complexity (processed first) and prototypicality, how much the page looks like what it is; low complexity plus high prototypicality rated most appealing, even at 17 milliseconds [data]. Reinecke and colleagues (CHI 2013, 450 sites, 548 raters) built models of complexity and colourfulness that explain about half the variance in appeal after a 500 millisecond view [data].
2. **Where the eyes go and for how long.** Nielsen Norman Group's eye tracking (2018, 130,000 fixations on a 1920 by 1080 screen): 57 percent of viewing time above the fold, 74 percent in the first two screens, a sharp drop after; 80 percent above the fold in 2010 [data]. The F pattern of reading is from the same body of work.
3. **Whether people can do the task.** Usability studies measure completion, errors, time and satisfaction. This is where parallax was tested: Frederick and colleagues (Purdue 2013, Journal of Usability Studies 2015, 86 people, two identical sites bar the scrolling) found no difference in usability, satisfaction or visual appeal, a gain only in "fun", and two of 86 participants had motion sickness [data]. A 2021 Oslo Metropolitan University replication found no difference in time, errors or opinion [data].
4. **What motion does to attention.** Vision science: an abrupt onset speeds search when it is the target (Yantis and Jonides 1984, well replicated), and moving or looming stimuli pull attention (Franconeri and Simons 2003), with debate over whether it is automatic and whether the onset or the motion does it [data]. Nielsen Norman Group's reading of it: moving elements pull the eye reflexively, which helps when the thing moving is what you want seen and hurts when it sits beside what someone is trying to read [editorial, their own studies not opened].
5. **Conversion.** A/B tests by vendors and agencies. No peer reviewed study or meta analysis of landing page section order was found; the claims about where social proof goes contradict each other, and the one 2026 agency study of 2,000 pages is unreplicated [editorial].

Not found this session: Nielsen Norman Group's scrolljacking article (believed to report disorientation and missed content in user testing, unverified), and any controlled study of section order on a marketing page.

## What it says for this homepage

- **The first screen carries most of the weight.** Over half the viewing time, judged in a glance on complexity and prototypicality. The hero is the product window on a plain ground, which is the low complexity, high prototypicality shape the glance rewards. It stays the only section that fills a screen.
- **The first two screens get three quarters of the attention.** Whatever must be seen goes in them: the product running (hero) and the offer with its prices (How It Works). The AI employees scene sits in screen three onward, where attention has already fallen, so the hero's board should show the same six employees doing their jobs; the scene then deepens what the hero introduced instead of introducing it.
- **Motion where the eye should go, still where people read.** The reflex is real, so a moving thing beside text pulls the eye off the text. Hence the rhythm: a moving section, then a calm one, and the charter's rule that motion shows the system working and never decorates.
- **Do not take the scroll away.** Parallax bought fun and nothing else, and made some people ill. The AI employees scene holds position but leaves the wheel alone and plays the queue by itself (Will's call, 13 Oct 2026), which is the less bad form; a still version stays for reduced motion.
- **Order below the second screen is story, not science.** Nothing measured says proof must come before or after the employees. Treat it as a test: the audit bookings and scroll depth per section are the measure, and the pipeline file (`marketing/markdown/pipeline.md`) is where they land.

## Sources

- Nielsen Norman Group, Scrolling and Attention (2018): https://www.nngroup.com/articles/scrolling-and-attention/
- Nielsen Norman Group, Animation for Attention and Comprehension; Animations Are Distracting (video): https://www.nngroup.com/articles/animation-usability/ and https://www.nngroup.com/videos/distracting-animations/
- Lindgaard et al. 2006, reported in Nature: https://www.nature.com/news/2006/060109/full/news060109-13.html
- Tuch et al. 2012 and Reinecke et al. CHI 2013: https://research.google/pubs/pub38315/ and https://kgajos.seas.harvard.edu/papers/reinecke13aesthetics.pdf
- Frederick et al. 2015, Journal of Usability Studies: https://uxpajournal.org/wp-content/uploads/sites/7/pdf/JUS_Frederick_Feb2015.pdf; the 2013 thesis: https://docs.lib.purdue.edu/dissertations/AAI1544322; Oslo 2021 replication: https://oda.oslomet.no/oda-xmlui/handle/11250/2832354
- Yantis and Jonides 1984: https://pubmed.ncbi.nlm.nih.gov/2137514/; Franconeri and Simons 2003: https://www.kellogg.northwestern.edu/faculty/research/detail/2003/moving-and-looming-stimuli-capture-attention
- The 2,000 page agency study (unreplicated): https://www.digitalapplied.com/blog/landing-page-conversion-study-2000-pages-tested-2026
