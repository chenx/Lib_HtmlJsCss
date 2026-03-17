export default function App() {
  const createFizzBuzz = (n: number = 15) => {
    return Array.from({ length: n }, (_, i) => {
      const num = i + 1

      const text =
        num % 15 === 0 ? "FizzBuzz" :
        num % 3 === 0 ? "Fizz" :
        num % 5 === 0 ? "Buzz" :
        num

      return <li key={num}>{text}</li>
    })
  }

  return (
    <ol>
      {createFizzBuzz()}
    </ol>
  )
}
