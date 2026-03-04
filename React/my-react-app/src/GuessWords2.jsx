import {useState, useEffect} from 'react'
import Menu from './Menu.jsx'
import './GuessWords2.css'

function Board({rows, cols, score}) {
    const createTable = (rows, cols) => {
        const table = []
        for (let i = 0; i < rows; ++ i) {
            const row = []
            for (let j = 0; j < cols; ++ j) {
                row.push(<td className="cell" key={`col-${i}-${j}`}></td>)
            }
            table.push(<tr key={`row-${i}`}>{row}</tr>)
        }
        return table
    }

    return (
        <>
            <h1>Guess Word</h1>
            <table id="board">
                <thead>
                    <tr>
                        <td colSpan={cols}>Score: {score}</td>
                    </tr>
                </thead>
                <tbody>
                    {createTable(rows, cols)}
                </tbody>
            </table>
        </>        
    )
}

function ControlPanel({onResetGame}) {
    return (
        <div>
            <button onClick={onResetGame}>Reset Game</button>
        </div>
    )
}

export default function TestApp() {
    const ROWS = 6
    const COLS = 5
    const TOTAL = ROWS * COLS
    const DICTIONARY = ['TODAY', 'HELLO']

    const [count, setCount] = useState(0)
    const [dict, setDict] = useState(new Set(DICTIONARY))
    const [state, setState] = useState('GAME_ON')
    const [score, setScore] = useState(0)

    const cells = document.getElementsByClassName("cell")
    let status = '';

    useEffect(() => {
        const handleKeyboardEvent = (event) => {
            if (event.key >= 'a' && event.key <= 'z') {
                if (state === "GAME_ON") {
                    cells[count].textContent = event.key.toUpperCase();
                }

                const newCount = count + 1
                if (newCount % COLS == 0 && state === 'GAME_ON') {
    
                    let word = ''
                    for (let i = newCount - COLS; i < newCount; ++ i) {
                        word += cells[i].textContent
                    }

                    const found = dict.has(word)
                    if (found) {
                        setScore(score => score + 10)
                        dict.delete(word)
                    }
                    setDict(dict)

                    for (let i = newCount - COLS; i < newCount; ++ i) {
                        word += cells[i].textContent
                        cells[i].style.backgroundColor = found ? 'green' : 'red';
                    }

                    if (newCount == TOTAL) {
                        setState('GAME_OFF')
                    }
                }

                setCount(count => newCount)
            }
        }

        document.addEventListener("keyup", handleKeyboardEvent)

        return () => {
            document.removeEventListener("keyup", handleKeyboardEvent)
        }
    })

    const onResetGame = () => {
        setCount(0)
        setState('GAME_ON')
        setScore(0)
        setDict(new Set(DICTIONARY))

        for (let i = 0; i < ROWS; ++ i) {
            for (let j = 0; j < COLS; ++ j) {
                const index = i * COLS + j
                cells[index].textContent = ''
                cells[index].style.backgroundColor = '';
            }
        }
    }

    return (
        <>
            <Menu />
            <Board rows={ROWS} cols={COLS} score={score}></Board>
            <ControlPanel onResetGame={onResetGame}></ControlPanel>
            <div className="msg">{state === 'GAME_ON' ? '' : 'Game Over. Press "Reset Game" to restart.'}</div>
        </>        
    )
}
