# Page ease-in when scroll: scroll-triggered animation (“scroll reveal”)

How to build a page with dynamic effect of showing page elements ease-in when scrolling down.

This is commonly called a scroll-triggered animation (or “scroll reveal”). Sites use this to fade/slide elements into view as you scroll.

## Example

https://chenx.github.io/scroll_reveal/ (<a href="https://github.com/chenx/chenx.github.io/blob/main/docs/scroll_reveal/index.html">src</a>)

## How

There are three main ways to build it, from simple to advanced:

✅ 1. Modern & clean: Use Intersection Observer (recommended)

This is the best native way in JavaScript—smooth and efficient.

🔧 Example

HTML
```
<div class="fade-in">Hello</div>
<div class="fade-in">More content</div>
```

CSS
```
.fade-in {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s ease;
}

.fade-in.show {
  opacity: 1;
  transform: translateY(0);
}
```

JavaScript
```
const elements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.2
});

elements.forEach(el => observer.observe(el));
```

👉 What happens:
```
Elements start hidden (opacity 0 + moved down)
When they enter viewport → .show is added
CSS transition creates the “ease-in” effect
```

🎯 2. Add staggered animations (like OpenArt)

To get that polished feel where elements appear one after another:

```
elements.forEach((el, index) => {
  el.style.transitionDelay = `${index * 0.2}s`;
});
```

🚀 3. Use a library (faster, more powerful)

If you want OpenArt-level polish, use animation libraries:

⭐ Option A: AOS (Animate On Scroll)

Super easy.
```
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>

<div data-aos="fade-up">Hello</div>

<script>
  AOS.init();
</script>
```

⭐ Option B: GSAP + ScrollTrigger (pro level)

This is what many premium sites use.
```
gsap.from(".fade-in", {
  scrollTrigger: ".fade-in",
  y: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.2
});
```

✨ 4. Extra effects used on OpenArt-style sites

To match that feel, combine:

✔ Parallax scrolling
```
background-attachment: fixed;
```

✔ Smooth scrolling
```
html {
  scroll-behavior: smooth;
}
```

✔ Section-based layout
```
Full-screen sections (height: 100vh)
Big typography
Lots of whitespace
```

🧠 Pro tips (important)
```
Use Intersection Observer, not scroll events (better performance)
Animate transform + opacity only (GPU optimized)
Avoid animating too many elements at once
Test on mobile (scroll animations can feel different)
```
