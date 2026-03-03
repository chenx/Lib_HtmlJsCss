import { useState, useEffect, useCallback, useRef } from 'react'
import Menu from './Menu.jsx'
import './snake.css'

interface BoardSize {
    rows: number,
    cols: number,
}

interface ControlParams {
    onStartPlay: () => void,
    onResetPlay: () => void,
    state: string,
}

function Board({rows, cols} : BoardSize) {
    // https://blog.cloudboost.io/for-loops-in-react-render-no-you-didnt-6c9f4aa73778
    const createTable = (rows: number, cols: number) => {
        const table = []
        for (let i = 0; i < rows; ++ i) {
            const row = []
            for (let j = 0; j < cols; ++ j) {
                row.push(<td className="cell_1" key={`col-${i}-${j}`}></td>)
            }
            table.push(<tr key={`row-${i}`}>{row}</tr>)
        }
        return table
    }
    return (
        <>
            <h1>Hungrey Snake</h1>
            <table id="divBoard">
                <tbody>
                    {createTable(rows, cols)}
                </tbody>
            </table>
        </>
    )
}

function ControlPanel({onStartPlay, onResetPlay, state} : ControlParams) {
    const btnStartText = state === "GAME_ON" ? 'Pause' : 'Play';
    return (
        <div>
            <button id="btnStart" onClick={onStartPlay} className="control-button">{btnStartText}</button>
            <button id="btnReset" onClick={onResetPlay} className="control-button">Reset</button>
        </div>
    )
}

export default function SnakeGame() {
    const ROWS = 10
    const COLS = 10
    const TOTAL_CELLS = ROWS * COLS;
    const SPEED = 200  // move interval in milli-seconds
    const GAME_ON = "GAME_ON"
    const GAME_OFF = "GAME_OFF"
    const GAME_PAUSE = "GAME_PAUSE"

    const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
    const cells = document.getElementsByClassName('cell_1') as HTMLCollectionOf<HTMLElement>;
    const START_SNAKE = [0,1,2,3,4]
    
    const [direction, setDirection] = useState('R');
    const [snake, setSnake] = useState(START_SNAKE);
    const [state, setState] = useState(GAME_OFF);

    function onStartPlay() {
        if (state === GAME_ON) {
            setState(GAME_PAUSE)
        } else {
            setState(GAME_ON)
        }
    }

    function onResetPlay() {
        setState(GAME_OFF)
        setDirection("R")
        setSnake(START_SNAKE)
        setState(GAME_OFF)
    }

    useEffect(() => {

        function controller() {
            drawSnake();

            timerRef.current = setTimeout(() => {
                if (state === GAME_ON) {
                    controller();
                }
            }, SPEED);
        };

        function resetSnake() {
            for (let i = 0; i < TOTAL_CELLS; ++ i) {
                cells[i].style.backgroundColor = '';
            }
            for (const cell in START_SNAKE) {
                cells[snake[cell]].style.backgroundColor = 'green';
            }
        }

        if (state === GAME_ON) {
            controller();
        } else if (state === GAME_OFF) {
            resetSnake();
        }

        // Cleanup function to clear the timeout if the component unmounts
        return () => {
            clearTimeout(timerRef.current);
        };
    }, [state, state, direction]);


    const drawSnake = useCallback(() => {
        const prevHeadCell = snake[snake.length - 1];
        let newHeadCell = 0;
        if (direction === 'L') {
            newHeadCell = prevHeadCell - 1;
            if (newHeadCell % COLS === COLS - 1) newHeadCell += COLS;
        } else if (direction === 'R') {
            newHeadCell = prevHeadCell + 1;
            if (newHeadCell % COLS === 0) newHeadCell -= COLS;
        } else if (direction === 'U') {
            newHeadCell = (prevHeadCell - COLS + TOTAL_CELLS) % TOTAL_CELLS;
        } else if (direction === 'D') {
            newHeadCell = (prevHeadCell + COLS) % TOTAL_CELLS;
        }

        cells[snake[0]].style.backgroundColor = ''; // remove tail.
        snake.shift();

        snake.push(newHeadCell);
        cells[snake[snake.length - 1]].style.backgroundColor = 'green';

        setSnake(snake);
    }, [direction]);

    
    function drawStartSnake() {
        for (const cell in snake) {
            cells[cell].style.backgroundColor = 'green';
        }
    }
        
    useEffect(() => {
        const handleKeyPress = (event: React.KeyboardEvent<HTMLElement> | KeyboardEvent) => {
            if (state !== GAME_ON) return;

            let newDirection = '';
            if (event.key === 'ArrowLeft') {
                newDirection = 'L';
            } else if (event.key === 'ArrowRight') {
                newDirection = 'R';
            } else if (event.key === 'ArrowUp') {
                newDirection = 'U';
            } else if (event.key === 'ArrowDown') {
                newDirection = 'D';
            }

            setDirection(newDirection);
        }

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };

    }, [state, direction]);

    useEffect(() => {
        const handleDOMLoaded = () => {
            if (state == GAME_OFF) {
                drawStartSnake();
            }
        };

        if (document.readyState !== 'loading') { // Check if the document is already loaded
            handleDOMLoaded();
        } else { // Otherwise, add an event listener
            document.addEventListener('DOMContentLoaded', handleDOMLoaded);
        }

        return () => { // remove the event listener when the component unmounts
            document.removeEventListener('DOMContentLoaded', handleDOMLoaded);
        };
    }, []); // Empty dependency array ensures this runs once on mount

    return (
        <>
            <Menu />
            <div className="content">
                <Board rows={ROWS} cols={COLS} />
                <ControlPanel onStartPlay={onStartPlay} onResetPlay={onResetPlay} state={state}></ControlPanel>
            </div>
        </>
    )
}