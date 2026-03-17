import React, {useState, useEffect, useRef} from 'react'
import './App.css'

type BoardConfig = {
    rows: number,
    cols: number,
    score: number,
    count: number,
    values: string[],
    foundArray: string[],
}

type ControlPanelConfig = {
    onResetGame: () => void
}

function Board({rows, cols, score, count, values, foundArray} : BoardConfig) {
    const createTable = (rows: number, cols: number) => {
        const table = []
        for (let i = 0; i < rows; ++ i) {
            const row = []
            for (let j = 0; j < cols; ++ j) {
                const color = foundArray[i] === 'FOUND' ? 'green' : foundArray[i] === 'NOT_FOUND' ? 'red' : ''
                row.push(
                  <td className="cell" key={`col-${i}-${j}`}
                    style={{backgroundColor: color}}
                  >
                    {values[i * cols + j]}
                  </td>
                )
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

function ControlPanel({onResetGame}: ControlPanelConfig) {
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
    const [values, setValues] = useState(new Array(TOTAL).fill(''))
    const [foundArray, setFoundArray] = useState(new Array(ROWS).fill(''))

    useEffect(() => {
        const handleKeyboardEvent = (event: React.KeyboardEvent<HTMLElement> | KeyboardEvent) => {
            if (event.key >= 'a' && event.key <= 'z') {
                const newValues = [... values]
                if (state === "GAME_ON") {
                    newValues[count] = event.key.toUpperCase()
                    setValues(newValues)
                }

                const newCount = count + 1
                if (newCount % COLS == 0 && state === 'GAME_ON') {
    
                    let word = ''
                    for (let i = newCount - COLS; i < newCount; ++ i) {
                        word += newValues[i]
                    }

                    const found = dict.has(word)
                    const row = Math.floor(count / COLS)
                    const newFoundArray = [...foundArray]
                    if (found) {
                        setScore(score => score + 10)
                        const newDict = new Set(dict)
                        newDict.delete(word)
                        setDict(newDict)

                        newFoundArray[row] = 'FOUND'
                    } else {
                        newFoundArray[row] = 'NOT_FOUND'
                    }
                    setFoundArray(newFoundArray)

                    if (newCount == TOTAL) {
                        setState('GAME_OFF')
                    }
                }

                setCount(count => count + 1)
            }
        }

        document.addEventListener("keyup", handleKeyboardEvent)

        return () => {
            document.removeEventListener("keyup", handleKeyboardEvent)
        }
    }, [count])

    const onResetGame = () => {
        setCount(0)
        setState('GAME_ON')
        setScore(0)
        setDict(new Set(DICTIONARY))
        setValues(new Array(TOTAL).fill(''))
        setFoundArray(new Array(ROWS).fill(''))
    }

    return (
        <>
            <Board rows={ROWS} cols={COLS} score={score} count={count} values={values} foundArray={foundArray}></Board>
            <ControlPanel onResetGame={onResetGame}></ControlPanel>
            <div className="msg">{state === 'GAME_ON' ? '' : 'Game Over. Press "Reset Game" to restart.'}</div>
        </>        
    )
}
