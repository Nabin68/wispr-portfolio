/* ───────── Hologram guide ─────────
   A ball rides a wavy line down the left gutter as you scroll. Stop for a moment and it
   looks up, projects a V-shaped beam, and a cartoon hologram of me appears inside it and
   talks about whatever is on screen right now. Images: assets/hologram/ (see HOLOGRAM-GUIDE.md). */
;(function hologram() {
  const DIR = 'assets/hologram/'
  const IDLE_MS = 1000 // how long the visitor must stop before the hologram appears

  // What is on screen → what the hologram says. The most visible spot near the middle wins.
  const SPOTS = [
    ['.hero-title', 'hello', 'Hey, I\'m Nabin! Stop scrolling for a sec and I\'ll show you around.'],
    ['.hero-visual', 'smile', 'That\'s the real me. I\'m the cartoon version, here to guide you.'],
    ['#highlights', 'proud', 'Registered engineer, published with Springer, 18+ public repos.'],
    ['.about-statement', 'explain', 'I care about the engineering around the model as much as the model.'],
    ['.about-grid', 'explain', 'Right now I\'m building an AI ecosystem for Nepal, plus my own products.'],
    ['.tl-head', 'excited', 'ThoughtLoom! My latest project, for the decisions that keep you up at night.'],
    ['.tl-stage', 'excited', 'Hit "Watch with sound". This film is the best intro to ThoughtLoom.'],
    ['.tl-features', 'explain', 'It asks a few sharp questions, researches if needed, then commits to an answer.'],
    ['.arch', 'thinking', 'Flutter, FastAPI, Supabase and Cohere, and every layer is swappable.'],
    ['#work > .display', 'proud', 'Every one of these, I designed, built and shipped end to end.'],
    // the bento grid shows cards side by side, so each row gets one line covering its cards
    ['#work .project:nth-child(1)', 'proud', 'SYNAPSE runs LangGraph agents with memory and RAG. OMNIS is my all-in-one voice assistant.'],
    ['#work .project:nth-child(3)', 'excited', 'AutoTube makes and uploads videos alone, SunSide picks your shady seat, Auto-Insta posts carousels.'],
    ['#work .more', 'smile', 'More on GitHub. Flip to "File deck" for a fun 3D view.'],
    ['#experience > .display', 'thinking', 'Where I\'ve worked and learned: from KIIT to GrowthSchool to going independent.'],
    ['#experience .tl-item:nth-child(1)', 'thinking', 'Since August I\'ve been independent, building AI for Nepal.'],
    ['#experience .tl-item:nth-child(2)', 'explain', 'At GrowthSchool I built multi-agent workflows for news discovery and fact-checking.'],
    ['#experience .tl-item:nth-child(3)', 'proud', 'B.Tech in Computer Science from KIIT, with a 9.11 GPA.'],
    ['#skills > .display', 'smile', 'My everyday toolkit. LangGraph and Claude Code do a lot of the heavy lifting.'],
    ['#skills .skills', 'smile', 'My everyday toolkit. LangGraph and Claude Code do a lot of the heavy lifting.'],
    ['#research > .display', 'thinking', 'Yes, that\'s real published research. Have a look below.'],
    ['#research .research', 'thinking', 'MLESA-Net, published with Springer. I annotated all 1,059 samples myself.'],
    ['#contact .contact-copy', 'hello', 'Got something to build? Pick any way to reach me.'],
    ['#contact .form', 'explain', 'Type a message here. It lands straight in my inbox.'],
    ['.alt-edition', 'excited', 'Want something playful? There\'s a Spider-Verse version of me too.'],
    ['.footer', 'smile', 'Thanks for scrolling all the way! Catch my radio show up top.'],
  ]

  const desktop = matchMedia('(min-width: 1180px)')
  const root = document.documentElement

  /* ── Light: scattered rays forming a V that frames the avatar ──
     The V follows the silhouette of the expression on show (after the oval fade)
     plus ~12% breathing room, widening gradually from the orb. It never exceeds the gutter.
     B = avatar bottom above the orb centre, APEX = where the rays leave the orb. */
  const R = (a, b) => a + Math.random() * (b - a)
  const B = 163, APEX = 28, ROOM = 1.12, PAD = 9 // B: avatar raised so a gradual V can hold its shoulders
  let W = 0, av = 0, H = 0, env = null
  const envs = {} // one V per expression image, measured once
  const hw = (d) => (env ? env[Math.max(0, Math.min(env.length - 1, Math.round(d)))] : 0) // V half-width at height d

  // Widest visible pixel per row of one expression, using the same oval fade as the CSS mask.
  const silhouette = async (src) => {
    if (envs[src]) return envs[src]
    const rows = new Float32Array(av + 1)
    const c = document.createElement('canvas'); c.width = c.height = av
    const x = c.getContext('2d', { willReadFrequently: true })
    for (const f of [src]) {
      const im = new Image(); im.src = f
      try { await im.decode() } catch { continue }
      x.clearRect(0, 0, av, av); x.drawImage(im, 0, 0, av, av)
      const px = x.getImageData(0, 0, av, av).data
      for (let yy = 0; yy < av; yy += 2) for (let xx = 0; xx < av; xx += 2) {
        const nx = (xx / av - 0.5) / 0.6, ny = (yy / av - 0.34) / 0.52, r = Math.hypot(nx, ny) // oval: 60% x 52% at 50% 34% (matches the CSS mask)
        const m = r <= 0.62 ? 1 : r >= 1 ? 0 : 1 - (r - 0.62) / 0.38
        if ((px[(yy * av + xx) * 4 + 3] / 255) * m > 0.35) rows[yy] = Math.max(rows[yy], Math.abs(xx - av / 2)) // clearly visible parts only; the faint dissolving edge may touch the light
      }
    }
    // One smooth curve, width = top * (d / D)^P: a steady, gradual spread from the orb, scaled
    // just enough to clear the silhouette (+ breathing room) at every height. No kinks, no bulge.
    const D = B - APEX + av, P = 0.62
    const need = (d) => { const yy = av - (d - (B - APEX)); return yy >= 0 && yy <= av ? rows[yy] * ROOM + PAD : 0 }
    let top = 0
    for (let d = B - APEX; d <= D; d++) top = Math.max(top, need(d) / (d / D) ** P)
    top = Math.min(top, W) // never into the content
    const p = P
    const env = (envs[src] = new Float32Array(D + 1))
    for (let d = 0; d <= D; d++) env[d] = top * (d / D) ** p
    return env
  }
  // Re-draw the light around the expression that is about to appear.
  const fitLight = async (src) => { env = await silhouette(src); buildLight() }

  const buildLight = () => {
    let out = ''
    const ray = (side, f, len, o, cls = 'ray') => {
      const wob = R(0, 3), ph = R(0, 6)
      let d = ''
      for (let y = 0; y <= len; y += 10) {
        const x = W + side * (f * hw(y) + wob * Math.sin(y / 45 + ph) * (y / len))
        d += `${d ? 'L' : 'M'}${x.toFixed(1)} ${(H - y).toFixed(1)}`
      }
      const w = R(0.5, 1.4), vars = `--o:${o.toFixed(2)};--d:${R(2.6, 5.4).toFixed(2)}s;--del:-${R(0, 5).toFixed(2)}s`
      out += `<path class="glow" d="${d}" stroke-width="${(w * 6).toFixed(1)}" style="${vars}"/>`
      out += `<path class="${cls}" d="${d}" stroke-width="${w.toFixed(2)}" style="${vars}"/>`
      if (cls === 'ray' && Math.random() < 0.55) out += `<path class="pulse" d="${d}" pathLength="400" stroke-width="${(w + 0.4).toFixed(2)}" style="${vars}"/>`
    }
    const top = H - 4
    for (const side of [-1, 1]) {
      for (let i = 0; i < 2; i++) ray(side, R(0.99, 1), top - R(0, 30), R(0.5, 0.85)) // the V's edges, hugging the silhouette
      for (let i = 0; i < 3; i++) ray(side, R(0.6, 0.9), top - R(10, 70), R(0.35, 0.75)) // scattered inside
      ray(side, R(0.3, 0.5), B - APEX + av * R(0.25, 0.4), R(0.25, 0.45), 'ray faint') // crosses the lower torso, never the face
    }
    $('.holo-rays g', el).innerHTML = out
    $('.holo-motes', el).innerHTML = Array.from({ length: 22 }, () => {
      const side = Math.random() < 0.5 ? -1 : 1, up = R(50, B - APEX + av * 0.9)
      const x1 = side * R(0.15, 0.8) * hw(up) // straight chord inside the V
      const tint = Math.random() < 0.6 ? 'var(--ray2)' : '255, 255, 255'
      return `<i class="holo-mote" style="--x0:${R(-4, 4).toFixed(1)}px;--x1:${x1.toFixed(1)}px;--y1:-${up.toFixed(0)}px;--s:${R(1.4, 3.4).toFixed(1)}px;--o:${R(0.4, 1).toFixed(2)};--d:${R(3, 6.5).toFixed(2)}s;--del:-${R(0, 6).toFixed(2)}s;--mc:${tint}"></i>`
    }).join('')
  }

  let sized = ''
  const sizeLight = async () => {
    const room = Math.floor(g / 2 - amp() - 4) // the most the V may ever use, wherever the orb sways
    av = Math.round(Math.min(210, 2 * (room - 6))) // avatar size (unchanged: scaled evenly, never stretched)
    W = room
    const key = `${W}/${av}/${Object.keys(faces).length}`
    if (key === sized) return
    sized = key
    H = B - APEX + av + 24
    unit.style.setProperty('--av', `${av}px`)
    unit.style.setProperty('--W', `${W}px`)
    unit.style.setProperty('--H', `${H}px`)
    $('.holo-rays', el).setAttribute('viewBox', `0 0 ${2 * W} ${H}`)
    $('#holo-ray', el).setAttribute('y1', H)
    $('#holo-fade-g', el).setAttribute('y1', H)
    $('#holo-fade rect', el).setAttribute('width', 2 * W)
    $('#holo-fade rect', el).setAttribute('height', H)
    for (const k in envs) delete envs[k] // sizes changed: measure again
    const first = Object.values(faces)[0]
    if (first && first.base.includes('holo-')) await fitLight(first.base)
  }

  /* ── Markup ── */
  const el = document.createElement('div')
  el.className = 'holo'
  el.setAttribute('aria-hidden', 'true')
  el.innerHTML = `
    <svg class="holo-rail"><path class="holo-line"/><g class="holo-dots"></g></svg>
    <div class="holo-unit">
      <div class="holo-haze"></div>
      <div class="holo-aura"></div>
      <div class="holo-figure"><img class="holo-img" alt="" /><div class="holo-scan"></div></div>
      <svg class="holo-rays">
        <defs>
          <linearGradient id="holo-ray" gradientUnits="userSpaceOnUse" x1="0" y1="330" x2="0" y2="0">
            <stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset=".2" stop-color="currentColor" stop-opacity=".95"/>
            <stop offset=".55" stop-color="currentColor" stop-opacity=".45"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="holo-fade-g" gradientUnits="userSpaceOnUse" x1="0" y1="330" x2="0" y2="0">
            <stop offset="0" stop-color="#fff"/><stop offset=".4" stop-color="#fff"/><stop offset=".78" stop-color="#fff" stop-opacity=".3"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
          </linearGradient>
          <mask id="holo-fade" maskUnits="userSpaceOnUse"><rect x="0" y="0" width="250" height="330" fill="url(#holo-fade-g)"/></mask>
        </defs>
        <g mask="url(#holo-fade)"></g>
      </svg>
      <div class="holo-motes"></div>
      <div class="holo-cloud"></div>
      <span class="holo-spark s1"></span><span class="holo-spark s2"></span><span class="holo-spark s3"></span>
      <div class="holo-ball" data-face="roll"><img alt="" /><span class="holo-face"><i></i><i></i><b></b></span></div>
    </div>`
  document.body.append(el)
  const line = $('.holo-line', el), dots = $('.holo-dots', el), unit = $('.holo-unit', el)
  const img = $('.holo-img', el), cloud = $('.holo-cloud', el)
  const ball = $('.holo-ball', el), ballImg = $('img', ball)

  /* ── Images: preload; anything missing falls back gracefully ── */
  const probe = (src) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(src); i.onerror = () => ok(null); i.src = src })
  const faces = {}
  Promise.all([...new Set(SPOTS.map((s) => s[1]))].map(async (f) => {
    faces[f] = { base: (await probe(`${DIR}holo-${f}.webp`)) || 'assets/nabin.jpg', talk: await probe(`${DIR}holo-${f}-talk.webp`) }
  })).then(() => enabled && sizeLight()) // the V is shaped from these images
  const ballFaces = {}
  Promise.all(['roll', 'look-up', 'project', 'blink'].map(async (f) => (ballFaces[f] = await probe(`${DIR}ball-${f}.webp`))))
    .then(() => { if (ballFaces.roll) { ball.classList.add('img'); setFace(ball.dataset.face) } })
  const setFace = (f) => {
    ball.dataset.face = f
    if (ballFaces.roll) ballImg.src = ballFaces[f] || ballFaces.roll
  }

  /* ── Geometry: the line is a sine wave in page space, drawn for the visible window ── */
  let g = 250, vh = innerHeight, by = 600
  const amp = () => Math.min(22, g * 0.09)
  const xAt = (docY) => g / 2 + amp() * Math.sin((docY / 1300) * Math.PI * 2)
  const DOT_EVERY = 460

  const layout = () => {
    const c = $('.hero .container')
    g = Math.max(200, c ? c.getBoundingClientRect().left : 250)
    vh = innerHeight
    by = Math.min(vh - 64, Math.max(500, vh * 0.8)) // ball height on screen, with room above for beam + cloud
    el.style.setProperty('--g', `${g}px`)
    cloud.style.setProperty('--cw', `${g - 24}px`)
    sizeLight()
    draw()
  }

  const draw = () => {
    const sy = scrollY
    let d = ''
    for (let y = -10; y <= vh + 10; y += 12) d += `${d ? 'L' : 'M'}${xAt(sy + y).toFixed(1)} ${y}`
    line.setAttribute('d', d)
    let circles = ''
    for (let docY = Math.ceil(sy / DOT_EVERY) * DOT_EVERY; docY < sy + vh; docY += DOT_EVERY) circles += `<circle cx="${xAt(docY).toFixed(1)}" cy="${(docY - sy).toFixed(1)}" r="4"/>`
    dots.innerHTML = circles
    const bx = xAt(sy + by)
    unit.style.transform = `translate(${bx}px, ${by}px)`
    unit.style.setProperty('--tilt', `${(xAt(sy + by + 10) - xAt(sy + by - 10)) * 2}deg`)
    cloud.style.setProperty('--cl', `${12 - bx}px`) // the cloud hugs the gutter's left edge
    cloud.style.setProperty('--tail', `${Math.max(30, bx - 12)}px`)
    // White light over the dark ThoughtLoom section
    const dark = $('.tl')?.getBoundingClientRect()
    el.classList.toggle('dark', !!dark && dark.top < by && dark.bottom > by - 340)
  }

  /* ── What is on screen right now? ── */
  const onScreen = () => {
    if (scrollY + vh >= document.documentElement.scrollHeight - 8) return SPOTS[SPOTS.length - 1] // at the very bottom: the footer
    const top = vh * 0.15, bottom = vh * 0.85, mid = vh * 0.45
    let best = null, bestScore = -1
    for (const spot of SPOTS) {
      const n = $(spot[0])
      if (!n) continue
      const r = n.getBoundingClientRect()
      if (!r.height || r.bottom < top || r.top > bottom) continue
      const shown = Math.min(r.bottom, bottom) - Math.max(r.top, top)
      const coverage = shown / Math.min(r.height, bottom - top) // how much of it (or of the view) it fills
      const centre = 1 - Math.min(1, Math.abs((r.top + r.bottom) / 2 - mid) / vh) // nearer the middle wins ties
      const score = coverage * 0.5 + centre * 0.5
      if (score > bestScore) { bestScore = score; best = spot }
    }
    return best || SPOTS[0]
  }

  /* ── stop → look up → beam → hologram → caption ── */
  let run = 0, idleTimer, talkTimer
  const wait = (ms) => new Promise((r) => setTimeout(r, ms))
  const stopTalking = (f) => { clearTimeout(talkTimer); if (f) img.src = f.base }
  const talk = (f) => {
    if (!f.talk) return
    let open = false
    const flip = () => {
      open = !open
      img.src = open ? f.talk : f.base
      talkTimer = setTimeout(flip, 90 + Math.random() * 110) // uneven, like real speech
    }
    flip()
  }

  const present = async () => {
    const my = ++run, alive = () => my === run
    const [, face, text] = onScreen()
    const f = faces[face] || { base: 'assets/nabin.jpg' }
    img.src = f.base
    if (f.base.includes('holo-')) await fitLight(f.base) // a V shaped to this expression's silhouette
    if (!alive()) return
    img.parentElement.style.setProperty('--sil', `url("${f.base}")`) // scan lines follow the avatar's silhouette
    unit.classList.toggle('fallback', !f.base.includes('holo-'))

    setFace('look-up')
    await wait(520); if (!alive()) return
    setFace('project')
    unit.classList.add('beam')
    await wait(420); if (!alive()) return
    unit.classList.add('figure')
    await wait(650); if (!alive()) return
    cloud.innerHTML = ''
    unit.classList.add('cloud')
    talk(f)
    for (const w of text.split(' ')) {
      if (!alive()) return stopTalking()
      const sp = document.createElement('span')
      sp.textContent = w + ' '
      cloud.append(sp)
      await wait(80 + Math.min(130, w.length * 14))
    }
    stopTalking(f)
  }

  const hide = () => {
    run++
    stopTalking()
    unit.classList.remove('beam', 'figure', 'cloud')
    setFace('roll')
  }

  let ticking = false
  const onScroll = () => {
    if (!enabled) return
    if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; draw() }) }
    if (unit.classList.contains('beam') || ball.dataset.face !== 'roll') hide()
    clearTimeout(idleTimer)
    idleTimer = setTimeout(present, IDLE_MS)
  }

  // Idle blinks while travelling
  ;(function blink() {
    setTimeout(() => {
      if (ball.dataset.face === 'roll') { setFace('blink'); setTimeout(() => ball.dataset.face === 'blink' && setFace('roll'), 150) }
      blink()
    }, 2600 + Math.random() * 2600)
  })()

  /* ── On / off with the screen size ── */
  let enabled = false
  const toggle = () => {
    enabled = desktop.matches
    root.classList.toggle('holo-on', enabled)
    hide()
    if (!enabled) return
    requestAnimationFrame(() => {
      layout()
      if (window.ScrollTrigger) ScrollTrigger.refresh() // the gutter shifted the content
      clearTimeout(idleTimer)
      idleTimer = setTimeout(present, 1500)
    })
  }
  desktop.addEventListener('change', toggle)
  addEventListener('resize', () => enabled && layout())
  addEventListener('scroll', onScroll, { passive: true })
  toggle()
})()
