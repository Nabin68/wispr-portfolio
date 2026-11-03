/* ───────── Nabin FM: the late-night radio show ─────────
   Every story lives in STATIONS and CALLS below as [raw, clean] pairs.
   Raw markup: {filler words} show grey, [false starts] show struck through; both melt
   away when the line "flows" into its clean version.
   Voice: drop recordings in assets/radio/ named <id>.mp3 (chances.mp3, call-intro.mp3...).
   With a file the captions follow the recording; without one they play over a music bed. */
;(function nabinFM() {
  const STATIONS = [
    {
      id: 'chances', freq: 88.1, name: 'Chances', short: 'Chances', tag: 'The bets I took',
      key: [220, 261.63, 329.63, 392],
      segs: [
        ['{So, umm,} the first real chance I took was [going to-] leaving Nepal to study.', 'The first real chance I took was leaving Nepal to study.'],
        ['Computer science at KIIT, in Odisha. {And} I told myself, [if I\'m-] if I\'m going this far, no half measures.', 'Computer science at KIIT, in Odisha. If I was going that far, there would be no half measures. I finished with a 9.11.'],
        ['Then research. There was no, {like,} no proper dataset for emotion in code-mixed Nepali. So I built one. By hand.', 'Then research. There was no dataset for emotion in code-mixed Nepali, so I built one by hand: 1,059 samples across three scripts.'],
        ['That became MLESA-Net, {and it} got published with Springer. [Which still-] Which still feels unreal.', 'That work became MLESA-Net, published with Springer.'],
        ['And the latest bet: going independent. {Um,} building an AI ecosystem for Nepal. No safety net.', 'My latest bet: going independent to build an AI ecosystem for Nepal. No safety net. Just building.'],
      ],
      notes: [['9.11', 'GPA · B.Tech CSE, KIIT'], ['1,059', 'Samples I annotated by hand'], ['LNCS', 'Published with Springer']],
      link: ['Read the paper ↗', 'https://link.springer.com/chapter/10.1007/978-3-032-29501-9_34'],
    },
    {
      id: 'mistakes', freq: 92.7, name: 'Mistakes', short: 'Mistakes', tag: 'What broke, what it taught me',
      key: [196, 246.94, 293.66, 369.99],
      segs: [
        ['{Okay so} my best mistakes are, {like,} all inside ThoughtLoom.', 'Most of my best mistakes live inside ThoughtLoom.'],
        ['[The first version kept-] The first version hedged everything. {Like} "it depends", "on one hand". Useless.', 'The first version hedged everything. "It depends." "On one hand." Nobody can act on that.'],
        ['So I made it, {um,} commit. Research first if it needs facts, then [take a-] take an actual position.', 'So I taught it to commit: research when it needs facts, then take a clear position.'],
        ['Another one: a retry could, {uh,} lose your place halfway through. [Which is-] Which is the worst feeling.', 'Another: a retry could lose your place mid-conversation. Now every question is stored, so nothing is lost.'],
        ['And memory. {Honestly,} the rule I care most about: [new users-] new users never get invented history.', 'And memory. The rule I care most about: a new user never gets invented history. Trust breaks fast when a model remembers things that never happened.'],
      ],
      notes: [['3-8', 'Adaptive questions, hard-capped'], ['0', 'Invented histories for new users'], ['Commit', 'A clear position, no hedging']],
      link: ['ThoughtLoom walkthrough ↗', 'https://app.notion.com/p/THOUGHTLOOM_V1-4c7483f5bf4c83bd988201ea5a360a59'],
    },
    {
      id: 'cares', freq: 98.3, name: 'What I Care About', short: 'I care', tag: 'The part around the model',
      key: [174.61, 220, 261.63, 329.63],
      segs: [
        ['{So} what I care about, [it\'s not the model, it\'s-] it\'s the stuff around the model.', 'What I care about isn\'t the model. It\'s everything around it.'],
        ['{Like,} tests, ownership checks on every call, {um,} swappable parts. The boring stuff that makes it real.', 'Tests. Ownership checks on every call. Swappable parts. The unglamorous work that makes AI real.'],
        ['And Nepal. [People hear AI and they-] {you know,} people either fear it or overhype it.', 'And Nepal. Most people here either fear AI or overhype it.'],
        ['I want people to actually understand it, and use it, {like,} wisely. In their work, their businesses.', 'I want people to understand it deeply and use it wisely, in their lives, work and businesses.'],
      ],
      notes: [['Every call', 'Token-verified ownership'], ['Nepal', 'An AI ecosystem, in progress'], ['NEC', 'Registered Engineer · No. 99623']],
      link: ['ThoughtLoom backend ↗', 'https://github.com/Nabin68/ThoughtLoom-Backend'],
    },
    {
      id: 'thinking', freq: 104.5, name: 'How I Think', short: 'I think', tag: 'Three rules, one pair engineer',
      key: [233.08, 293.66, 349.23, 440],
      segs: [
        ['{Okay,} three rules. {Um,} one: ship small.', 'Three rules. One: ship small.'],
        ['Two, test the logic around the model, [with a real-] with a fake model, so tests don\'t, {like,} run on vibes.', 'Two: test the logic around the model. ThoughtLoom\'s tests run on a fake model and a fake database.'],
        ['Three, keep everything swappable. The LLM, the search, [all of it-] it should be one interface away.', 'Three: keep everything swappable. The model and the search each sit behind one interface.'],
        ['And {honestly,} Claude Code is basically my pair engineer. Every day.', 'And Claude Code is my everyday pair engineer. Build. Experiment. Evolve.'],
      ],
      notes: [['Fake', 'Model & Supabase in pytest'], ['18+', 'Public repositories'], ['6', 'AI systems built end-to-end']],
      link: ['GitHub · Nabin68 ↗', 'https://github.com/Nabin68'],
    },
    {
      id: 'ads', freq: 107.1, name: 'Ad Break', short: 'Ad break', tag: 'Three ideas for Wispr Flow',
      key: [261.63, 329.63, 392, 493.88],
      segs: [
        ['{Okay,} quick break. {Um,} these are for the Wispr Flow team.', 'Quick ad break. These three are for the Wispr Flow team.'],
        ['Ad one: Roman-Nepali Week. [Nobody here types in-] Nobody texts in pure Nepali or pure English. We mix. {Like,} constantly.', 'Ad one: Roman-Nepali Week. Nobody here texts in pure Nepali or pure English. We mix, so dictation should too.'],
        ['{And} I literally published research on code-mixed Nepali, so, {yeah,} I know how messy it gets.', 'I published research on exactly this kind of code-mixed text. I know how messy it gets, and how big the gap is.'],
        ['Ad two: the Hinglish rant challenge. Sixty seconds, one rant, [post the-] post the raw and the Flow version side by side.', 'Ad two: the Hinglish Rant Challenge. Sixty seconds, one rant. Post the raw and the Flow version side by side.'],
        ['Ad three: No-Typing Week on campus. {Um,} every assignment spoken, {you know,} leaderboard by words dictated.', 'Ad three: No-Typing Week on campus. Every assignment spoken, with a leaderboard for words dictated.'],
      ],
      notes: [['100+', 'Languages Wispr Flow speaks'], ['3', 'Scripts in my Nepali corpus'], ['220 vs 45', 'WPM, speaking vs typing']],
      link: ['wisprflow.ai ↗', 'https://wisprflow.ai/'],
    },
  ]

  // Call-in line: the question is matched to the answer whose keywords it hits most.
  const CALLS = [
    { id: 'intro', q: 'Who are you?', keys: ['who', 'about you', 'introduce', 'yourself', 'tell me about you'], segs: [
      ['{Hey,} I\'m Nabin. [I\'m a-] I\'m an AI engineer from Nepal.', 'Hi, I\'m Nabin, an AI engineer from Nepal.'],
      ['I build, {um,} agentic systems, RAG pipelines, and products people actually use.', 'I build agentic systems, retrieval pipelines and AI products people actually use.'],
    ] },
    { id: 'hire', q: 'Why should we hire you?', keys: ['hire', 'why you', 'why should', 'strength', 'role', 'job', 'fit'], segs: [
      ['{Honestly?} I ship. [I don\'t just-] I don\'t stop at the demo.', 'Because I ship. I don\'t stop at the demo.'],
      ['ThoughtLoom went from, {like,} an idea to Flutter, FastAPI, Supabase and tests. End to end, by me.', 'ThoughtLoom went from idea to a Flutter app, a FastAPI service, Supabase and a test suite, end to end.'],
    ] },
    { id: 'thoughtloom', q: 'What is ThoughtLoom?', keys: ['thoughtloom', 'thought loom', 'decision', 'app', 'product', 'latest', 'project'], segs: [
      ['ThoughtLoom is, {um,} for the decisions that keep you up at night.', 'ThoughtLoom is for the decisions that keep you up at night.'],
      ['It asks [the right-] the right questions, researches when it needs to, and then actually commits to an answer.', 'It asks the right questions, researches when it needs facts, and commits to a clear recommendation.'],
    ] },
    { id: 'research', q: 'Tell me about your research', keys: ['research', 'paper', 'springer', 'publish', 'nepali', 'dataset', 'emotion', 'sentiment'], segs: [
      ['{So} my paper is MLESA-Net, [on-] on emotion and sentiment in code-mixed Nepali Reddit text.', 'My paper, MLESA-Net, is about emotion and sentiment in code-mixed Nepali Reddit text.'],
      ['I built the dataset myself, {like,} a thousand-plus samples, and XLM-R hit about 0.70 micro-F1.', 'I built the NEmoSen dataset myself, 1,059 samples, and XLM-RoBERTa reached about 0.70 micro-F1. It\'s published in Springer LNCS.'],
    ] },
    { id: 'stack', q: 'What\'s your stack?', keys: ['stack', 'skill', 'tech', 'tool', 'language', 'framework', 'python', 'langgraph', 'langchain'], segs: [
      ['Python, {mostly.} LangGraph and LangChain for agents, FAISS for retrieval.', 'Mostly Python. LangGraph and LangChain for agents, FAISS for retrieval.'],
      ['FastAPI, Supabase, {and} Flutter when it needs to be an app. [And-] And Claude Code every day.', 'FastAPI and Supabase on the backend, Flutter for apps, and Claude Code every day.'],
    ] },
    { id: 'experience', q: 'Where have you worked?', keys: ['experience', 'worked', 'growthschool', 'growth school', 'intern', 'previous', 'company'], segs: [
      ['Most recently GrowthSchool, as an AI generalist, {um,} July to August.', 'Most recently I was an AI Generalist at GrowthSchool, from July to August 2026.'],
      ['I built multi-agent workflows [for-] for tech-news discovery and fact checking. Now I\'m independent.', 'I built multi-agent workflows for tech-news discovery and fact verification. Now I work independently.'],
    ] },
    { id: 'next', q: 'What\'s next for you?', keys: ['next', 'future', 'plan', 'goal', 'nepal', 'dream', 'vision', 'ecosystem'], segs: [
      ['{Big picture?} An AI ecosystem for Nepal.', 'Big picture: an AI ecosystem for Nepal.'],
      ['A place where people [can-] can really understand AI and, {you know,} use it wisely. In life, work, business.', 'A place where people understand AI deeply and use it wisely, in their lives, work and businesses.'],
    ] },
    { id: 'voice', q: 'Why a radio show?', keys: ['radio', 'wispr', 'voice', 'dictat', 'speak', 'typing', 'show'], segs: [
      ['Because {honestly,} I think better out loud.', 'Because I think better out loud.'],
      ['Everyone sends a resume. [I wanted-] I wanted you to hear me. Raw first, then polished.', 'Everyone sends a resume. I wanted you to hear me: raw first, then polished. That\'s the whole idea.'],
    ] },
    { id: 'contact', q: 'How do I reach you?', keys: ['contact', 'email', 'reach', 'phone', 'linkedin', 'whatsapp', 'talk'], segs: [
      ['{Easy.} nabingupta68 at gmail dot com.', 'Email me at nabingupta68@gmail.com.'],
      ['Or LinkedIn, or WhatsApp. [It\'s all-] It\'s all on the sign-off card.', 'Or find me on LinkedIn and WhatsApp. It\'s all on the sign-off card.'],
    ] },
    { id: 'mistake', q: 'Biggest mistake?', keys: ['mistake', 'fail', 'weakness', 'wrong', 'regret'], segs: [
      ['{Oof.} Shipping a first ThoughtLoom that, {like,} hedged everything.', 'Shipping a first ThoughtLoom that hedged everything.'],
      ['Tune to 92.7. [The whole-] The whole station is about it.', 'Tune to 92.7. The whole station is about it.'],
    ] },
  ]
  const FALLBACK = { id: 'unknown', segs: [
    ['{Ooh,} that one\'s not in tonight\'s rundown.', 'That one isn\'t in tonight\'s rundown.'],
    ['Send it to me [directly-] directly, I\'ll answer it properly. nabingupta68 at gmail.', 'Send it to me directly and I\'ll answer properly: nabingupta68@gmail.com.'],
  ] }
  const CHIPS = ['Who are you?', 'Why should we hire you?', 'What is ThoughtLoom?', 'Biggest mistake?', 'Why a radio show?']

  const MIN = 87.5, MAX = 108
  const trigger = $('.fm-trigger')
  if (!trigger) return

  /* ── Markup ── */
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const pos = (f) => ((f - MIN) / (MAX - MIN)) * 100
  const ticks = []
  for (let f = MIN; f <= MAX + 0.01; f += 0.5) ticks.push(`<span class="fm-tick${f % 2 === 0 ? ' major' : ''}" style="left:${pos(f)}%"></span>`)
  for (let f = 88, i = 0; f <= 108; f += 2, i++) ticks.push(`<span class="fm-num${i % 2 ? ' alt' : ''}" style="left:${pos(f)}%">${f}</span>`)
  const marks = STATIONS.map((s, i) => `<button type="button" class="fm-mark" data-i="${i}" style="left:${pos(s.freq)}%" aria-label="Tune to ${s.freq} ${s.name}"><span>${s.short}</span></button>`).join('')
  const vuTicks = Array.from({ length: 13 }, (_, i) => {
    const a = ((-48 + i * 8) * Math.PI) / 180, r1 = i % 3 ? 56 : 52, r2 = 62
    const x = (r) => (70 + r * Math.sin(a)).toFixed(1), y = (r) => (76 - r * Math.cos(a)).toFixed(1)
    return `<line x1="${x(r1)}" y1="${y(r1)}" x2="${x(r2)}" y2="${y(r2)}"${i > 9 ? ' class="hot"' : ''}/>`
  }).join('')
  const POWER_SVG = '<svg viewBox="0 0 24 24"><path d="M12 3v8M6.3 6.8a8 8 0 1 0 11.4 0"/></svg>'

  const fm = document.createElement('dialog')
  fm.className = 'fm'
  fm.dataset.power = 'off'
  fm.setAttribute('aria-label', 'Nabin FM, an interactive radio show')
  fm.setAttribute('data-lenis-prevent', '')
  fm.innerHTML = `
  <div class="fm-room">
    <header class="fm-top">
      <span class="fm-onair"><i></i>On air</span>
      <p class="fm-brand">Nabin <em>FM</em></p>
      <span class="fm-clock"></span>
      <button type="button" class="fm-x" aria-label="Close the radio"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
    </header>

    <div class="fm-stage">
      <div class="fm-radio">
        <div class="fm-grille" aria-hidden="true"></div>
        <div class="fm-face">
          <div class="fm-dial" role="slider" tabindex="0" aria-label="Tuning dial" aria-valuemin="${MIN}" aria-valuemax="${MAX}" data-cursor="Tune">
            <div class="fm-scale">${ticks.join('')}${marks}<span class="fm-needle"></span></div>
          </div>
          <div class="fm-readout">
            <div class="fm-vu" aria-hidden="true"><svg viewBox="0 0 140 80">${vuTicks}</svg><i class="fm-vu-needle"></i><b>VU</b><span class="fm-peak"></span></div>
            <div class="fm-lcd">
              <p class="fm-freq"><span>87.5</span><small>MHz</small></p>
              <p class="fm-station">Static</p>
              <p class="fm-tag"><span class="fm-lock">Lock</span><span class="fm-tagline">Standby</span></p>
            </div>
            <div class="fm-knob" aria-hidden="true"><i></i></div>
          </div>
          <div class="fm-presets">
            ${STATIONS.map((s, i) => `<button type="button" class="fm-preset" data-i="${i}" aria-pressed="false"><b>${s.freq.toFixed(1)}</b><span>${s.short}</span></button>`).join('')}
            <button type="button" class="fm-power" aria-label="Power">${POWER_SVG}</button>
          </div>
        </div>
      </div>
      <aside class="fm-notes" aria-live="polite"></aside>
    </div>

    <div class="fm-captions">
      <span class="fm-mode">Standby</span>
      <p class="fm-prev"></p>
      <p class="fm-line"></p>
    </div>

    <footer class="fm-bar">
      <button type="button" class="fm-pill fm-callbtn"><i class="fm-phone"></i>Lines open · Call in</button>
      <p class="fm-hint">Drag the dial · spin the knob · ← → to tune</p>
      <button type="button" class="fm-pill fm-signbtn">Sign off</button>
    </footer>

    <div class="fm-call" hidden>
      <p class="fm-call-head"><i class="fm-phone"></i>Lines open · you're next<button type="button" class="fm-call-x" aria-label="Hang up">✕</button></p>
      <form class="fm-ask">
        <input type="text" placeholder="Ask me anything..." aria-label="Your question" autocomplete="off" />
        <button type="button" class="fm-mic" aria-label="Ask with your voice"><svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg></button>
        <button type="submit" class="fm-send" aria-label="Send"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
      </form>
      <div class="fm-chips">${CHIPS.map((q) => `<button type="button">${q}</button>`).join('')}</div>
    </div>

    <div class="fm-cover fm-cold">
      <p class="fm-kicker">Nabin FM · <span class="fm-clock"></span></p>
      <h2>The late-night radio show of <em>my life.</em></h2>
      <p class="lede">Turn it on. Turn the dial. Five stations, one story each. The lines are open if you want to call in.</p>
      <button type="button" class="fm-bigpower" aria-label="Power on" autofocus>${POWER_SVG}<span>Power</span></button>
    </div>

    <div class="fm-cover fm-end" hidden>
      <p class="fm-kicker">Signing off · <span class="fm-clock"></span></p>
      <h2>This has been <em>Nabin FM.</em></h2>
      <p class="lede">Thanks for staying up with me. If any of it sounded like someone you'd want on your team, the line is always open.</p>
      <div class="fm-links">
        <a class="fm-pill hot" href="mailto:nabingupta68@gmail.com">Email me</a>
        <a class="fm-pill" href="https://www.linkedin.com/in/nabin-rouniyar-86682726a/" target="_blank" rel="noopener">LinkedIn ↗</a>
        <a class="fm-pill" href="assets/Nabin-Kumar-Rouniyar-Resume.pdf" target="_blank" rel="noopener">Resume ↗</a>
      </div>
      <div class="fm-links">
        <button type="button" class="fm-pill fm-back">Back to the dial</button>
        <button type="button" class="fm-pill fm-leave">Back to the site</button>
      </div>
    </div>
  </div>`
  document.body.append(fm)

  const room = $('.fm-room', fm), radio = $('.fm-radio', fm), dial = $('.fm-dial', fm), knob = $('.fm-knob', fm)
  const freqEl = $('.fm-freq span', fm), stationEl = $('.fm-station', fm), taglineEl = $('.fm-tagline', fm)
  const vuNeedle = $('.fm-vu-needle', fm), peak = $('.fm-peak', fm), notes = $('.fm-notes', fm)
  const mode = $('.fm-mode', fm), prev = $('.fm-prev', fm), line = $('.fm-line', fm), hint = $('.fm-hint', fm)
  const cold = $('.fm-cold', fm), end = $('.fm-end', fm), call = $('.fm-call', fm), input = $('.fm-ask input', fm)
  const presets = $$('.fm-preset', fm), markEls = $$('.fm-mark', fm)

  /* ── Sound: static, music bed, recorded voice, all into one meter ── */
  let ac, master, analyser, staticGain, progGain, bed
  const voice = new Audio()
  voice.preload = 'auto'
  const engine = () => {
    if (ac) return ac
    ac = new (window.AudioContext || window.webkitAudioContext)()
    master = ac.createGain()
    analyser = ac.createAnalyser()
    analyser.fftSize = 1024
    master.connect(analyser).connect(ac.destination)
    // Two seconds of hiss with crackle baked in, looped through a band-pass.
    const len = ac.sampleRate * 2, buf = ac.createBuffer(1, len, ac.sampleRate), d = buf.getChannelData(0)
    for (let i = 0; i < len; i++) d[i] = Math.max(-1, Math.min(1, (Math.random() * 2 - 1) * 0.5 + (Math.random() < 0.0003 ? (Math.random() * 2 - 1) * 1.2 : 0)))
    const hiss = ac.createBufferSource(), band = ac.createBiquadFilter()
    hiss.buffer = buf; hiss.loop = true
    band.type = 'lowpass'; band.frequency.value = 1400 // soft hiss, not a buzz
    staticGain = ac.createGain(); staticGain.gain.value = 0
    hiss.connect(band).connect(staticGain).connect(master)
    hiss.start()
    progGain = ac.createGain(); progGain.gain.value = 0
    progGain.connect(master)
    ac.createMediaElementSource(voice).connect(progGain)
    return ac
  }
  const ramp = (param, v, t = 0.08) => ac && param.setTargetAtTime(v, ac.currentTime, t)

  // A soft lo-fi bed (pad + slow arpeggio) so a station without a recording still feels live.
  const startBed = (key) => {
    stopBed()
    const t = ac.currentTime, out = ac.createGain(), lp = ac.createBiquadFilter()
    out.gain.setValueAtTime(0, t); out.gain.linearRampToValueAtTime(tts ? 0.022 : 0.05, t + 2) // sits under the voice
    lp.type = 'lowpass'; lp.frequency.value = 1100
    lp.connect(out).connect(progGain)
    const nodes = key.slice(0, 3).map((f) => {
      const o = ac.createOscillator()
      o.type = 'triangle'; o.frequency.value = f / 2; o.detune.value = (Math.random() - 0.5) * 14
      o.connect(lp); o.start()
      return o
    })
    const lfo = ac.createOscillator(), depth = ac.createGain()
    lfo.frequency.value = 0.15; depth.gain.value = 450
    lfo.connect(depth).connect(lp.frequency); lfo.start()
    nodes.push(lfo)
    let step = 0
    const arp = setInterval(() => {
      const n = ac.currentTime, o = ac.createOscillator(), g = ac.createGain()
      o.type = 'sine'; o.frequency.value = key[[0, 2, 1, 3, 2, 1][step++ % 6]] * 2
      g.gain.setValueAtTime(0.0001, n); g.gain.exponentialRampToValueAtTime(0.35, n + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, n + 1.4)
      o.connect(g).connect(lp); o.start(n); o.stop(n + 1.5)
    }, 460)
    bed = { out, nodes, arp }
  }
  const stopBed = () => {
    if (!bed) return
    const { out, nodes, arp } = bed, t = ac.currentTime
    bed = null
    clearInterval(arp)
    out.gain.cancelScheduledValues(t); out.gain.setTargetAtTime(0, t, 0.25)
    nodes.forEach((o) => o.stop(t + 1.2))
  }

  const fileCache = {}
  const hasFile = (url) => (fileCache[url] ??= fetch(url, { method: 'HEAD' }).then((r) => r.ok && /audio|mpeg|octet/.test(r.headers.get('content-type') || 'audio')).catch(() => false))

  /* ── Meter ── */
  let isOpen = false, lvl = 0, env = 0
  const td = new Uint8Array(1024)
  const meter = () => {
    if (!isOpen) return
    requestAnimationFrame(meter)
    let rms = 0
    if (analyser && powered) {
      analyser.getByteTimeDomainData(td)
      for (const v of td) rms += ((v - 128) / 128) ** 2
      rms = Math.sqrt(rms / td.length)
    }
    env *= 0.9
    const target = powered ? Math.min(1, rms * 3 + env) : 0
    lvl += (target - lvl) * (target > lvl ? 0.35 : 0.07)
    vuNeedle.style.transform = `rotate(${-48 + lvl * 96}deg)`
    peak.classList.toggle('on', lvl > 0.82)
    fm.style.setProperty('--lvl', lvl.toFixed(3))
  }
  const bump = () => (env = Math.min(0.75, env + 0.22 + Math.random() * 0.25))

  /* ── Captions: raw speech flows into the clean line ── */
  const wait = (ms) => new Promise((r) => setTimeout(r, ms))
  const words = (s) => s.trim().split(/\s+/).length
  const rawHTML = (s) => s.split(/(\{[^}]*\}|\[[^\]]*\])/).map((part) => {
    const m = part.match(/^([{[])(.*)[}\]]$/)
    const ws = (m ? m[2] : part).trim().split(/\s+/).filter(Boolean).map((w) => `<span class="w">${esc(w)}</span>`).join(' ')
    return !ws ? '' : m ? `<span class="${m[1] === '{' ? 'filler' : 'cut'}">${ws}</span>` : ws
  }).filter(Boolean).join(' ')
  const setMode = (m, text) => { mode.dataset.mode = m; mode.textContent = text }

  // Stand-in voice until the real recordings exist: the browser's own text-to-speech.
  const tts = window.speechSynthesis
  let ttsVoice
  // Clearest available voice wins: neural "Natural"/online voices (Edge), then Google's, then the rest.
  const voiceScore = (v) =>
    (/natural|online|neural/i.test(v.name) ? 8 : 0) + (/google/i.test(v.name) ? 5 : 0) +
    (/en-(IN|GB)/i.test(v.lang) ? 2 : 0) + (/\b(prabhat|guy|andrew|brian|ryan|christopher|male|david)\b/i.test(v.name) ? 1 : 0)
  const pickVoice = () => {
    const vs = tts.getVoices().filter((v) => /^en/i.test(v.lang))
    ttsVoice = vs.sort((a, b) => voiceScore(b) - voiceScore(a))[0]
  }
  // How the stand-in voice should say names and acronyms (captions stay as written).
  const SAY = [
    [/MLESA-Net/g, 'M L E S A Net'], [/\bKIIT\b/g, 'K I I T'], [/\bLNCS\b/g, 'L N C S'], [/XLM-RoBERTa/g, 'X L M Roberta'],
    [/NEmoSen/g, 'N Emo Sen'], [/micro-F1/g, 'micro F 1'], [/\bFastAPI\b/g, 'Fast A P I'], [/\bFAISS\b/g, 'face'],
    [/Supabase/g, 'Supa-base'], [/\bWispr\b/g, 'Whisper'], [/9\.11/g, 'nine point one one'],
    [/nabingupta68@gmail\.com/g, 'nabin gupta 68, at gmail dot com'], [/\bAI\b/g, 'A.I.'],
  ]
  const forSpeech = (s) => SAY.reduce((t, [re, w]) => t.replace(re, w), s)
  if (tts) { pickVoice(); tts.addEventListener('voiceschanged', pickVoice) }
  const speak = (text) => new Promise((resolve) => {
    const u = new SpeechSynthesisUtterance(forSpeech(text))
    if (ttsVoice) { u.voice = ttsVoice; u.lang = ttsVoice.lang }
    u.rate = 0.94 // a touch slower reads clearer
    u.pitch = 1
    u.volume = 1
    u.onboundary = bump // word boundaries drive the VU meter
    u.onend = u.onerror = () => resolve()
    tts.speak(u)
    setTimeout(resolve, 3000 + text.length * 110) // in case a browser never fires onend
  })

  const say = async (raw, clean, dur, alive, recorded) => {
    const spoken = !recorded && tts ? speak(clean) : null
    if (line.dataset.clean) prev.textContent = line.dataset.clean
    line.dataset.clean = clean
    line.className = 'fm-line raw'
    line.innerHTML = rawHTML(raw)
    setMode('raw', 'Raw · as spoken')
    const ws = $$('.w', line), typeMs = Math.min(dur * 0.5, ws.length * 165)
    for (const w of ws) {
      if (!alive()) return
      w.classList.add('on')
      if (!recorded) bump()
      await wait(typeMs / ws.length)
    }
    await wait(450)
    if (!alive()) return
    line.classList.add('flowing')
    setMode('flow', 'Flow · polished')
    await wait(560)
    if (!alive()) return
    line.className = 'fm-line clean'
    line.innerHTML = clean.split(' ').map((w, i) => `<span class="w" style="--i:${i}">${esc(w)}</span>`).join(' ')
    if (spoken) { await spoken; await wait(900) } // next line starts once the voice has finished
    else await wait(Math.max(dur - typeMs - 1010, 1600))
  }

  let token = 0
  const stopProgram = () => { token++; voice.pause(); if (tts) tts.cancel(); if (ac) stopBed() }
  const runSegments = async (segs, url, key) => {
    stopProgram()
    const my = token, alive = () => my === token && isOpen
    const recorded = await hasFile(url)
    if (!alive()) return false
    let durs
    if (recorded) {
      voice.src = url
      await new Promise((r) => { voice.onloadedmetadata = r; voice.onerror = r })
      if (!alive()) return false
      const total = segs.reduce((n, s) => n + words(s[1]), 0)
      durs = segs.map((s) => (voice.duration * 1000 * words(s[1])) / total)
      voice.currentTime = 0
      voice.play().catch(() => {})
    } else {
      startBed(key)
      durs = segs.map(([raw]) => 900 + words(raw) * 165 + 3000)
    }
    for (let i = 0; i < segs.length; i++) {
      await say(segs[i][0], segs[i][1], durs[i], alive, recorded)
      if (!alive()) return false
    }
    stopBed()
    return true
  }

  /* ── Tuning ── */
  let freq = MIN, powered = false, current = null, dragging = false, tweenId = 0, settleTimer
  const heard = new Set()
  const nearest = (f) => STATIONS.reduce((a, s) => (Math.abs(s.freq - f) < Math.abs(a.freq - f) ? s : a))

  const setFreq = (f) => {
    freq = Math.min(MAX, Math.max(MIN, Math.round(f * 20) / 20))
    const p = (freq - MIN) / (MAX - MIN)
    fm.style.setProperty('--p', p)
    fm.style.setProperty('--rot', `${p * 600}deg`)
    dial.setAttribute('aria-valuenow', freq)
    freqEl.textContent = freq.toFixed(1)
    const s = nearest(freq), d = Math.abs(s.freq - freq), sig = Math.max(0, 1 - d / 0.6)
    dial.setAttribute('aria-valuetext', `${freq.toFixed(1)} MHz${sig > 0.8 ? `, ${s.name}` : ''}`)
    stationEl.textContent = sig > 0 ? s.name : 'Static'
    stationEl.style.filter = `blur(${((1 - sig) * 6).toFixed(1)}px)`
    stationEl.style.opacity = sig > 0 ? 0.3 + 0.7 * sig : 0.35
    if (!current) taglineEl.textContent = !powered ? 'Standby' : sig > 0.75 ? s.tag : 'Searching...'
    fm.style.setProperty('--glow', powered ? (0.4 + sig * 0.6).toFixed(2) : 0)
    if (powered && ac) {
      ramp(staticGain.gain, 0.04 * (1 - sig) ** 1.5 + 0.002) // background level: the voice stays on top
      ramp(progGain.gain, current ? sig : 0)
    }
    if (current && d > 0.15) unlock()
  }

  const tweenTo = (target, ms, done) => {
    const id = ++tweenId, from = freq, t0 = performance.now()
    dragging = true
    const step = (now) => {
      if (id !== tweenId) return
      const k = Math.min(1, (now - t0) / ms), e = 1 - (1 - k) ** 3
      setFreq(from + (target - from) * e)
      if (k < 1) return requestAnimationFrame(step)
      dragging = false
      done && done()
    }
    requestAnimationFrame(step)
  }
  const settle = () => {
    if (dragging || !powered) return
    const s = nearest(freq)
    if (Math.abs(s.freq - freq) <= 0.4) tweenTo(s.freq, 280, () => lock(s))
  }
  const settleSoon = () => { clearTimeout(settleTimer); settleTimer = setTimeout(settle, 380) }

  const lock = async (s) => {
    if (!powered || current === s) return
    current = s
    prev.textContent = ''
    line.dataset.clean = ''
    radio.classList.add('locked')
    taglineEl.textContent = s.tag
    presets.forEach((b, i) => b.setAttribute('aria-pressed', STATIONS[i] === s))
    markEls.forEach((m, i) => m.classList.toggle('on', STATIONS[i] === s))
    ramp(progGain.gain, 1, 0.3)
    showNotes(s)
    hint.textContent = `${s.freq} · ${s.name} · on air`
    const done = await runSegments(s.segs, `assets/radio/${s.id}.mp3`, s.key)
    if (!done || current !== s) return
    heard.add(s.id)
    presets[STATIONS.indexOf(s)].classList.add('heard')
    setMode('', 'End of segment')
    const all = heard.size === STATIONS.length
    hint.textContent = all ? 'You have heard every station · call in, or sign off' : 'That\'s the segment · turn the dial for the next station'
    $('.fm-signbtn', fm).classList.toggle('hot', all)
  }
  const unlock = () => {
    current = null
    radio.classList.remove('locked')
    presets.forEach((b) => b.setAttribute('aria-pressed', 'false'))
    markEls.forEach((m) => m.classList.remove('on'))
    notes.classList.remove('show')
    stopProgram()
    if (ac) ramp(progGain.gain, 0)
  }

  const showNotes = (s) => {
    notes.classList.remove('show')
    notes.innerHTML = `<p>Liner notes · ${s.freq}</p><h4>${s.name}</h4><ul>${s.notes.map(([b, t], i) => `<li style="--i:${i}"><b>${b}</b><span>${t}</span></li>`).join('')}</ul><a href="${s.link[1]}" target="_blank" rel="noopener">${s.link[0]}</a>`
    requestAnimationFrame(() => requestAnimationFrame(() => notes.classList.add('show')))
  }

  const tuneTo = (s) => {
    if (!powered) power(true)
    if (current === s) return
    unlock()
    tweenTo(s.freq, 900 + Math.abs(s.freq - freq) * 40, () => lock(s))
  }

  /* ── Power ── */
  const power = (on, sweep) => {
    powered = on
    fm.dataset.power = on ? 'on' : 'off'
    if (on) {
      engine()
      ac.resume()
      ramp(master.gain, 1)
      cold.hidden = true
      setFreq(freq)
      if (sweep) {
        setFreq(MAX - 0.1)
        setTimeout(() => tweenTo(STATIONS[0].freq, 2600, () => lock(STATIONS[0])), 700)
      }
    } else {
      unlock()
      if (ac) { ramp(master.gain, 0, 0.15); ramp(staticGain.gain, 0) }
      setMode('', 'Standby')
      line.textContent = ''; prev.textContent = ''; line.dataset.clean = ''
      setFreq(freq)
    }
  }

  /* ── Call-in line ── */
  const match = (q) => {
    const t = ` ${q.toLowerCase().replace(/[^a-z0-9.\s]/g, ' ')} `
    let best = FALLBACK, score = 0
    for (const c of CALLS) {
      const n = c.keys.filter((k) => t.includes(k)).length
      if (n > score) { score = n; best = c }
    }
    return best
  }
  const ask = async (q) => {
    q = q.trim()
    if (!q) return
    call.hidden = true
    input.value = ''
    if (!powered) power(true)
    tweenId++ // a sweep still in flight must not grab the line back
    dragging = false
    unlock()
    const c = match(q)
    setMode('call', 'Line 2 · you\'re on air')
    prev.textContent = ''
    line.className = 'fm-line clean'
    line.dataset.clean = `“${q}”`
    line.innerHTML = `<span class="w" style="--i:0">“${esc(q)}”</span>`
    hint.textContent = 'Caller on the line'
    ramp(staticGain.gain, 0.04, 0.05)
    setTimeout(() => ramp(staticGain.gain, 0.002, 0.2), 650)
    await wait(1400)
    ramp(progGain.gain, 1, 0.2)
    const done = await runSegments(c.segs, `assets/radio/call-${c.id}.mp3`, STATIONS[2].key)
    if (done) { setMode('', 'Call ended'); hint.textContent = 'Call again, or turn the dial' }
  }
  $('.fm-callbtn', fm).addEventListener('click', () => { call.hidden = !call.hidden; if (!call.hidden) input.focus() })
  $('.fm-call-x', fm).addEventListener('click', () => (call.hidden = true))
  $('.fm-ask', fm).addEventListener('submit', (e) => { e.preventDefault(); ask(input.value) })
  $$('.fm-chips button', fm).forEach((b) => b.addEventListener('click', () => ask(b.textContent)))

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition
  const mic = $('.fm-mic', fm)
  if (!SR) mic.hidden = true
  else mic.addEventListener('click', () => {
    if (mic.classList.contains('rec')) return
    const rec = new SR()
    rec.lang = 'en-IN'
    rec.interimResults = true
    rec.onresult = (e) => {
      input.value = [...e.results].map((r) => r[0].transcript).join('')
      if (e.results[e.results.length - 1].isFinal) ask(input.value)
    }
    rec.onend = rec.onerror = () => mic.classList.remove('rec')
    mic.classList.add('rec')
    rec.start()
  })

  /* ── Controls ── */
  $('.fm-bigpower', fm).addEventListener('click', () => power(true, true))
  $('.fm-power', fm).addEventListener('click', () => power(!powered, !powered && !heard.size))
  presets.forEach((b, i) => b.addEventListener('click', () => tuneTo(STATIONS[i])))
  markEls.forEach((m, i) => m.addEventListener('click', (e) => { e.stopPropagation(); tuneTo(STATIONS[i]) }))

  const fromPointer = (e) => {
    const r = $('.fm-scale', fm).getBoundingClientRect()
    setFreq(MIN + Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * (MAX - MIN))
  }
  dial.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.fm-mark')) return
    tweenId++
    dragging = true
    dial.setPointerCapture(e.pointerId)
    fromPointer(e)
  })
  dial.addEventListener('pointermove', (e) => dragging && dial.hasPointerCapture(e.pointerId) && fromPointer(e))
  dial.addEventListener('pointerup', () => { dragging = false; settle() })

  let kx = 0, ky = 0
  knob.addEventListener('pointerdown', (e) => { tweenId++; dragging = true; kx = e.clientX; ky = e.clientY; knob.setPointerCapture(e.pointerId) })
  knob.addEventListener('pointermove', (e) => {
    if (!knob.hasPointerCapture(e.pointerId)) return
    setFreq(freq + (e.clientX - kx - (e.clientY - ky)) * 0.03)
    kx = e.clientX; ky = e.clientY
  })
  knob.addEventListener('pointerup', () => { dragging = false; settle() })

  const nudge = (df) => { tweenId++; dragging = false; setFreq(freq + df); settleSoon() }
  ;[dial, knob].forEach((el) => el.addEventListener('wheel', (e) => { e.preventDefault(); nudge((e.deltaY > 0 || e.deltaX > 0 ? 1 : -1) * 0.1) }, { passive: false }))
  dial.addEventListener('keydown', (e) => {
    const df = { ArrowRight: 0.1, ArrowUp: 0.1, ArrowLeft: -0.1, ArrowDown: -0.1, PageUp: 1, PageDown: -1 }[e.key]
    if (df) { e.preventDefault(); nudge(df) }
  })

  /* ── Open / close ── */
  // The show always airs at 2:14 AM, Kathmandu time; the clock ticks on from there.
  const opened = Date.now()
  let clockTimer
  const tick = () => {
    const m = 2 * 60 + 14 + Math.floor((Date.now() - opened) / 60000)
    const t = `${String(Math.floor(m / 60) % 12 || 12).padStart(2, '0')}:${String(m % 60).padStart(2, '0')} AM`
    $$('.fm-clock', fm).forEach((el) => (el.textContent = `${t} · Kathmandu`))
  }

  trigger.addEventListener('click', () => {
    const r = trigger.getBoundingClientRect()
    fm.style.setProperty('--ox', `${r.left + r.width / 2}px`)
    fm.style.setProperty('--oy', `${r.top + r.height / 2}px`)
    fm.showModal()
    document.body.classList.add('fm-open')
    isOpen = true
    tick(); clockTimer = setInterval(tick, 15000)
    meter()
    if (powered) { ac.resume(); setFreq(freq); settle() }
  })
  const shut = () => {
    if (fm.classList.contains('closing')) return
    if (reduced) return fm.close()
    fm.classList.add('closing')
    setTimeout(() => { fm.classList.remove('closing'); fm.close() }, 560)
  }
  fm.addEventListener('cancel', (e) => { e.preventDefault(); shut() })
  fm.addEventListener('close', () => {
    isOpen = false
    clearInterval(clockTimer)
    unlock()
    if (ac) ac.suspend()
    document.body.classList.remove('fm-open')
  })
  $('.fm-x', fm).addEventListener('click', shut)
  $('.fm-leave', fm).addEventListener('click', shut)
  $('.fm-signbtn', fm).addEventListener('click', () => { unlock(); call.hidden = true; end.hidden = false })
  $('.fm-back', fm).addEventListener('click', () => { end.hidden = true; settle() })

  setFreq(freq)
})()
