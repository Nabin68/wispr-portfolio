# Hologram guide: how it works and what to make

> **Status: all images done and live.** The site uses the processed `.webp` files in this folder
> (background removed, mouth-only talk frames, ~40 KB each). Your full-size originals are in
> `originals/hologram/` (not published). To change an image later, drop the new `.png` here and ask
> Claude to process it again.

## How it works (short)
- When a visitor stops scrolling, the ball projects your cartoon hologram and a caption types out.
- **While the caption types, the hologram "talks"** by flipping fast between two pictures of the same pose:
  `holo-excited.png` ⇄ `holo-excited-talk.png` ⇄ `holo-excited.png` ⇄ ...
- So for each of your 6 images you need **one extra copy** where **only the mouth is different**.
  - If the mouth is **open** in your image, make the copy **closed**.
  - If the mouth is **closed**, make the copy **open**.
- If a `-talk` file is missing, that expression simply shows without talking. Nothing breaks.

## What you already have (done ✅)
`holo-hello.png` · `holo-smile.png` · `holo-explain.png` · `holo-excited.png` · `holo-proud.png` · `holo-thinking.png`

## What to make now: 6 talk frames

**How, for each row below:**
1. Open ChatGPT and upload **the file in the "Upload" column** (not `main.png`; the pose must match exactly).
2. If ChatGPT offers **"Select / edit area"**, paint over **just the mouth**. This keeps everything else from moving.
3. Paste the prompt from that row.
4. Download the result and save it in this folder with the name in the **"Save as"** column.

---

### 1. Hello (mouth is open now → make it closed)
**Upload:** `holo-hello.png` · **Save as:** `holo-hello-talk.png`
> Edit this image. Change only the mouth: close it, lips gently together, keeping the same friendly smile. Keep everything else exactly the same: same face, eyes, eyebrows, hair, waving hand, shirt, pose, position, size, framing and white background. Do not move or redraw anything except the mouth.

### 2. Smile (mouth is closed now → make it open)
**Upload:** `holo-smile.png` · **Save as:** `holo-smile-talk.png`
> Edit this image. Change only the mouth: open it slightly as if he is in the middle of saying a word, a small natural gap between the lips, still smiling. Keep everything else exactly the same: same face, eyes, eyebrows, hair, shirt, pose, position, size, framing and white background. Do not move or redraw anything except the mouth.

### 3. Explain (mouth is open now → make it closed)
**Upload:** `holo-explain.png` · **Save as:** `holo-explain-talk.png`
> Edit this image. Change only the mouth: close it, lips together in a calm neutral expression, as if pausing between words. Keep everything else exactly the same: same face, eyes, raised eyebrows, hair, open-palm hand, shirt, pose, position, size, framing and white background. Do not move or redraw anything except the mouth.

### 4. Excited (mouth is wide open now → make it half-closed)
**Upload:** `holo-excited.png` · **Save as:** `holo-excited-talk.png`
> Edit this image. Change only the mouth: make it much smaller, a small round "o" shape, as if mid-word, still looking excited. Keep everything else exactly the same: same face, wide eyes, raised eyebrows, hair, raised fists, shirt, pose, position, size, framing and white background. Do not move or redraw anything except the mouth.

### 5. Proud (mouth is open now → make it closed)
**Upload:** `holo-proud.png` · **Save as:** `holo-proud-talk.png`
> Edit this image. Change only the mouth: close it into a confident closed-mouth grin, lips together. Keep everything else exactly the same: same face, the wink, eyebrows, hair, thumbs-up hand, shirt, pose, position, size, framing and white background. Do not move or redraw anything except the mouth.

### 6. Thinking (mouth is closed now → make it open)
**Upload:** `holo-thinking.png` · **Save as:** `holo-thinking-talk.png`
> Edit this image. Change only the mouth: open it slightly as if he is saying "hmm, well..." mid-word, a small gap between the lips. Keep everything else exactly the same: same face, eyes looking up, eyebrows, hair, hand on chin, shirt, pose, position, size, framing and white background. Do not move or redraw anything except the mouth.

---

## Check before saving
Flip between the original and the new one. **Only the mouth should change.** If the hair, hand or
shoulders shifted, the hologram will jitter. Regenerate with only the mouth selected, or send it to Claude
to fix (the mouth can be pasted onto the original).

## Optional: the ball (4 images)
Right now a drawn blue ball is used, which works fine. If you want image versions, make **one** ball
first with the prompt below, then upload that ball for the other three and change only the face.
Square, white background. Save in this folder.

| Save as | Prompt |
|---|---|
| `ball-roll.png` | A cute glossy 3D blue sphere character, blue-to-violet gradient, big round cartoon eyes (white with black pupils) looking forward, small happy smile, soft white highlight top-left, centred, plain white background, no shadow, square. |
| `ball-look-up.png` | Same ball as the uploaded image, only change the face: pupils looking straight up, small round "o" mouth, curious. Keep everything else identical. |
| `ball-project.png` | Same ball as the uploaded image, only change the face: eyes happily closed like ^ ^, wide open smile. Keep everything else identical. |
| `ball-blink.png` | Same ball as the uploaded image, only change the face: eyes closed as flat lines, small neutral mouth. Keep everything else identical. |

## After you add the images
Tell Claude. It will cut out the white backgrounds (so you float in the light instead of sitting in a
white box) and shrink the files so the site stays fast.

## Before deploying
Delete this `.md` file and anything here the site doesn't use (`image.png`, `main.png`, `girl*.webp`).
