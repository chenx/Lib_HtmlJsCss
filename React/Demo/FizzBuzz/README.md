# FizzBuzz

<img width="136" height="463" alt="image" src="https://github.com/user-attachments/assets/7142212a-c9fb-473d-bc02-a087c144ffd0" />

## About

```
You’re comparing two fundamentally different approaches to rendering FizzBuzz in a React page:

React declarative rendering (JSX + virtual DOM)

Manual DOM manipulation (imperative JavaScript)

I'll break down the differences in architecture, React compatibility, performance, and best practices.

1. React Declarative Method

Your first approach:

function getFizBuzz(n: number) {
  const list = []
  for (let i = 1; i <= n; ++ i) {
    list.push(<li>{getFizBuzzText(i)}</li>)
  }
  return <ol>{list}</ol>
}
How it works

Creates React elements (JSX) instead of DOM nodes.

React builds a Virtual DOM tree.

React diffs and updates the real DOM automatically.

Flow
React component render
      ↓
JSX → React elements
      ↓
Virtual DOM diff
      ↓
Minimal DOM updates
Advantages

✔ Idiomatic React
✔ Easy to maintain
✔ Integrates with state/props
✔ React controls DOM updates

Example improvement

React normally expects keys for lists:

function getFizzBuzz(n: number) {
  const list = []

  for (let i = 1; i <= n; i++) {
    list.push(<li key={i}>{getFizBuzzText(i)}</li>)
  }

  return <ol>{list}</ol>
}

Or more idiomatic React:

function getFizzBuzz(n: number) {
  return (
    <ol>
      {Array.from({ length: n }, (_, i) => (
        <li key={i}>{getFizBuzzText(i + 1)}</li>
      ))}
    </ol>
  )
}
2. Imperative DOM Manipulation

Your second approach:

function createFizzBuzz() {
  const ol = document.getElementById('contentList') as HTMLElement
  ol.replaceChildren()

  for (let i = 0; i < 15; ++ i) {
    const li = document.createElement('li')
    li.textContent = getFizBuzzText(i + 1);
    ol.appendChild(li)
  }
}
How it works

Directly manipulates the browser DOM

Bypasses React entirely

Flow
JS code
  ↓
Create DOM nodes
  ↓
Append to DOM manually
Advantages

✔ Simple for plain JS
✔ No React overhead

Disadvantages inside React

❌ Breaks React's rendering model
❌ React does not know the DOM changed
❌ Can cause UI inconsistencies
❌ Harder to maintain

Example problem:

React might later re-render and overwrite your manual DOM changes.

3. Architectural Difference
Aspect	React Method	Manual DOM
Style	Declarative	Imperative
DOM ownership	React	Your code
React compatibility	Native	Dangerous
State updates	Automatic re-render	Manual updates
Maintainability	High	Lower
Performance	Optimized diffing	Raw DOM ops
4. Performance

For small lists (like FizzBuzz), performance differences are negligible.

However:

React batching + diffing often beats naive DOM manipulation for complex UIs.

Direct DOM operations may be faster in tiny scripts but don’t scale well in React apps.

5. When Each Should Be Used
Use the React approach (recommended)

Inside React components:

function FizzBuzz() {
  const n = 20
  return getFizzBuzz(n)
}
Use manual DOM manipulation only when:

Working in non-React scripts

Integrating 3rd-party libraries that require DOM access

Inside React refs/effects intentionally

Example React-safe DOM manipulation:

const ref = useRef<HTMLUListElement>(null)

useEffect(() => {
  // controlled manual DOM work
}, [])
6. Conceptual Difference (Important)
React mindset

Describe what the UI should look like.

n = 20
→ render list
→ React handles DOM
Imperative JS mindset

Describe how to build the UI step by step.

create element
append child
append child
append child
7. Key Takeaway

In a React application, the first method is the correct pattern.

Your second function (createFizzBuzz) essentially treats the page like vanilla JavaScript, which defeats React’s purpose.

✅ Rule of thumb

If React renders the element, let React update it.

Avoid mixing React rendering and manual DOM manipulation unless absolutely necessary.

If you'd like, I can also show the most idiomatic modern React FizzBuzz (5 lines using .map) that most senior React
developers would write.

yes

Here are a few progressively more idiomatic React implementations of FizzBuzz. Senior React developers typically
prefer the functional + map version because it's concise and declarative.

1. Clean Modern React Version (Most Common)
function getFizzBuzzText(n: number) {
  if (n % 15 === 0) return "FizzBuzz"
  if (n % 3 === 0) return "Fizz"
  if (n % 5 === 0) return "Buzz"
  return String(n)
}

function FizzBuzz() {
  const n = 20

  return (
    <ol>
      {Array.from({ length: n }, (_, i) => (
        <li key={i}>{getFizzBuzzText(i + 1)}</li>
      ))}
    </ol>
  )
}
Why this is idiomatic

Uses functional rendering

Uses .map() style iteration

Keeps rendering logic inside JSX

Includes React keys

2. Even Simpler (Inline Logic)

If the logic is tiny, many developers inline it:

function FizzBuzz() {
  const n = 20

  return (
    <ol>
      {Array.from({ length: n }, (_, i) => {
        const x = i + 1
        const text =
          x % 15 === 0 ? "FizzBuzz" :
          x % 3 === 0 ? "Fizz" :
          x % 5 === 0 ? "Buzz" :
          x

        return <li key={x}>{text}</li>
      })}
    </ol>
  )
}

Good for small demo problems.

3. Cleanest Separation (Best for Real Apps)

Separate logic from UI:

function fizzBuzz(n: number): string[] {
  return Array.from({ length: n }, (_, i) => {
    const x = i + 1
    if (x % 15 === 0) return "FizzBuzz"
    if (x % 3 === 0) return "Fizz"
    if (x % 5 === 0) return "Buzz"
    return String(x)
  })
}

function FizzBuzz() {
  return (
    <ol>
      {fizzBuzz(20).map((text, i) => (
        <li key={i}>{text}</li>
      ))}
    </ol>
  )
}

Advantages:

Logic becomes testable

Component stays pure UI

4. Ultra-Compact (Interview Style)

Some developers write it like this:

function FizzBuzz() {
  return (
    <ol>
      {[...Array(20)].map((_, i) => {
        const n = i + 1
        return (
          <li key={n}>
            {n % 15 === 0 ? "FizzBuzz" :
             n % 3 === 0 ? "Fizz" :
             n % 5 === 0 ? "Buzz" : n}
          </li>
        )
      })}
    </ol>
  )
}

Short but slightly less readable.

5. What Senior React Devs Usually Prefer

Most teams would choose something close to:

function FizzBuzz({ n = 20 }: { n?: number }) {
  return (
    <ol>
      {Array.from({ length: n }, (_, i) => {
        const x = i + 1
        const text =
          x % 15 === 0 ? "FizzBuzz" :
          x % 3 === 0 ? "Fizz" :
          x % 5 === 0 ? "Buzz" :
          x

        return <li key={x}>{text}</li>
      })}
    </ol>
  )
}

Reasons:

Reusable

Readable

Idiomatic

Small Optimization Tip

Checking 15 first is slightly cleaner:

if (n % 15 === 0)

instead of:

n % 3 === 0 && n % 5 === 0

✅ Key React principle illustrated here

React components should describe UI as a function of data.

FizzBuzz becomes:

numbers → mapped → JSX

If you'd like, I can also show a very advanced React version (using hooks, memoization, and component splitting) that senior engineers might write in production-scale apps.
```
