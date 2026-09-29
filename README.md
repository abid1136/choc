# 💌 Your Romantic Digital Gift — Setup Guide

## How to Open the Website

Just open `index.html` in any web browser. No server needed. No installation needed.

---

## How to Add YOUR Content

### 📝 Adding Your Shayari

Open `index.html` and find the section that says:
```
<!-- ADD YOUR SHAYARI HERE -->
```

Replace the example text with your own. Each Shayari sits inside a `.shayari-page` block.

To **add more Shayari**, copy the entire block:
```html
<div class="shayari-page">
  <div class="shayari-flower-deco">✿</div>
  <p class="shayari-text">
    YOUR SHAYARI HERE
  </p>
  <p class="shayari-author">— Abid</p>
  <div class="shayari-heart-deco">❤</div>
</div>
```
...and paste it before `</div>` of `.shayari-container`.

---

### 🌙 Adding Your Poems

Find `<!-- ADD YOUR POEM LINES HERE -->` in the poetry section.

Each line of the poem goes in a separate `<span>` tag:
```html
<span class="poem-line">Your poem line here</span>
```

To add a new poem, copy the entire `.poem-page` block and change the number, title, and lines.

---

### ✨ Adding Your Quotes

Find `<!-- ADD YOUR QUOTE HERE -->` in the quotes section.

Replace the text inside `<blockquote class="quote-text">`.

To add more quotes, copy the `.quote-card` block.

---

### 💌 Adding Your Letter

Find `<!-- ADD YOUR LETTER CONTENT HERE -->` in the letters section.

Replace the text inside the `.letter-body` div with your own words.
Use `<br/><br/>` for paragraph breaks.

---

### 📸 Adding Your Photos

1. Save your photos inside the **`assets/`** folder.
   - Name them: `photo1.jpg`, `photo2.jpg`, etc.

2. In the memories section, find the `.photo-placeholder` div and **replace it** with:
```html
<img src="assets/photo1.jpg" alt="Our memory" class="polaroid-img" />
```

3. Change the caption in `.polaroid-caption`.

To add more photos, copy the entire `.polaroid-wrap` block.

---

### 🎵 Adding Music

1. Save your MP3 file as **`assets/music.mp3`**
2. That's it. The music button will automatically use it.

> **Note:** Music does NOT autoplay. She has to click the ♪ Music button.

---

### 🐱 Changing Surprise Messages

Find the `.surprise-card` elements in `index.html`.

Change the `data-message` attribute:
```html
data-message="YOUR PERSONAL MESSAGE HERE 💕"
```

Change the label text inside `.surprise-label`.

---

### 💕 Changing "Abid" to Your Name

Do a Find & Replace (Ctrl+H in any text editor) for `— Abid` and replace with your name.

---

## Sending It to Her

**Option 1 — Share as files:**
Zip the entire folder and send it to her. She opens `index.html`.

**Option 2 — Host it free online:**
- Go to [netlify.com/drop](https://netlify.com/drop)
- Drag and drop the entire folder
- Get a private link instantly — share with her

**Option 3 — GitHub Pages (free):**
Upload the folder to GitHub and enable Pages for a permanent link.

---

## File Structure

```
hii/
├── index.html     ← Main file (edit your content here)
├── style.css      ← All the design (don't need to touch this)
├── script.js      ← All the interactions (don't need to touch this)
└── assets/
    ├── music.mp3  ← Your background music
    ├── photo1.jpg ← Your photos
    ├── photo2.jpg
    └── ...
```

---

*Made with ❤️ — every word, every animation, every hidden heart — for you.*
