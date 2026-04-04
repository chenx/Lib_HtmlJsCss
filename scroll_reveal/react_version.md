Here’s a React / Next.js version of the scroll-reveal-style landing page with clean structure, reusable components, and scroll-triggered animations using the native Intersection Observer.

I’ll show it in Next.js App Router (modern setup).

⚛️ 1. Project Structure
```
app/
 ├─ page.js
 ├─ components/
 │   ├─ Section.js
 │   ├─ FadeIn.js
 ├─ styles.css
```

🧩 2. FadeIn Component (reusable animation)
```
'use client';

import { useEffect, useRef } from 'react';

export default function FadeIn({ children, delay = 0 }) {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}s`;
          el.classList.add('show');
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [delay]);

  return <div ref={ref} className="fade">{children}</div>;
}
```

🧱 3. Section Component
```
export default function Section({ children, className = '' }) {
  return (
    <section className={`section ${className}`}>
      <div className="container">
        {children}
      </div>
    </section>
  );
}
```

🌐 4. Main Page (app/page.js)
```
import Section from './components/Section';
import FadeIn from './components/FadeIn';

export default function Home() {
  return (
    <main>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <FadeIn>
            <h1>Build Stunning Experiences</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p>Modern, smooth, and interactive web design.</p>
          </FadeIn>
        </div>
      </section>

      {/* FEATURES */}
      <Section>
        <FadeIn>
          <h1>Features</h1>
        </FadeIn>

        <div className="grid">
          <FadeIn delay={0.1}><div className="card">Fast</div></FadeIn>
          <FadeIn delay={0.2}><div className="card">Smooth</div></FadeIn>
          <FadeIn delay={0.3}><div className="card">Modern</div></FadeIn>
        </div>
      </Section>

      {/* ABOUT */}
      <Section>
        <FadeIn>
          <h1>About</h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p>This is a OpenArt-style scroll animation layout.</p>
        </FadeIn>
      </Section>

      {/* CTA */}
      <Section>
        <FadeIn>
          <h1>Start Your Project</h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p>Create beautiful web experiences.</p>
        </FadeIn>
      </Section>

    </main>
  );
}
```

🎨 5. Global Styles (app/styles.css)
```
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #0f0f0f;
  color: #fff;
  font-family: sans-serif;
}

/* Layout */
.section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  border-top: 1px solid #222;
}

.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a1a, #222);
}

.container {
  max-width: 1100px;
  width: 100%;
  text-align: center;
}

/* Typography */
h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

p {
  opacity: 0.8;
}

/* Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  margin-top: 40px;
  gap: 20px;
}

.card {
  background: #1e1e1e;
  padding: 30px;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
}

/* Animation */
.fade {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s ease;
}

.fade.show {
  opacity: 1;
  transform: translateY(0);
}
```

⚡ 6. Enable CSS in Next.js

In app/layout.js:
```
import './styles.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

🚀 Upgrade to “true OpenArt-level” (optional)

If you want the premium feel like OpenArt, next steps are:

🔥 Add GSAP + ScrollTrigger
```
Pin sections while scrolling
Animate timelines (not just fade)
Create storytelling scroll
```

🔥 Add smooth scrolling library
```
Lenis or locomotive-scroll
Makes motion feel buttery smooth
```

🔥 Add parallax layers
```
Background moves slower than foreground
```
