import { useState, useEffect, useCallback } from 'react'
import Menu from './Menu.jsx'

import './snake.css'


function Board({rows, cols}) {
    // https://blog.cloudboost.io/for-loops-in-react-render-no-you-didnt-6c9f4aa73778
    const createTable = (rows, cols) => {
        const table = []
        for (let i = 0; i < rows; ++ i) {
            const children = []
            for (let j = 0; j < cols; ++ j) {
                children.push(<td className='cell_1' key={`cell-${i}-${j}`}></td>)
            }
            table.push(<tr key={`row-${i}`}>{children}</tr>)
        }
        return table
    };

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

function ControlPanel({onStartPlay, onResetPlay, gameOn}) {
    return (
        <div>
            <button id="btnStart" onClick={onStartPlay} className="control-button">{gameOn ? 'Pause' : 'Play'}</button>
            <button id="btnReset" onClick={onResetPlay} className="control-button">Reset</button>
        </div>
    )
}

export default function SnakeGame() {
    const ROWS = 10
    const COLS = 10
    const TOTAL_CELLS = ROWS * COLS;
    const SPEED = 500  // move interval in milli-seconds

    const cells = document.getElementsByClassName('cell_1'); // as HTMLCollectionOf<HTMLElement>;
    const START_SNAKE = [0,1,2,3,4]
    let timer;

    const [gameOn, setGameOn] = useState(false);
    const [direction, setDirection] = useState('R');
    const [snake, setSnake] = useState(START_SNAKE);
    const [state, setState] = useState('OFF');

    function onStartPlay() {
        // console.log('onStartPlay, gameon = ' + gameOn);
        if (gameOn) {
            setGameOn(false);
            setState("PAUSE");
        } else {
            setGameOn(true);
            setState("ON")
        }
    }

    function onResetPlay() {
        setGameOn(false);
        setDirection("R");
        setSnake(START_SNAKE);
        setState("OFF")
    }

    useEffect(() => {
        function controller() {
            drawSnake();

            timer = setTimeout(() => {
                if (gameOn) {
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

        if (gameOn) {
            controller();
        }
        if (state === "OFF") {
            resetSnake();
        }

        // Cleanup function to clear the timeout if the component unmounts
        return () => {
            clearTimeout(timer);
        };
    }, [state, gameOn, direction]);


    const drawSnake = useCallback(() => {
        let newCell;
        if (direction === 'L') {
            newCell = (snake[snake.length - 1] - 1);
            if (newCell % COLS === COLS - 1) newCell += COLS;
        } else if (direction === 'R') {
            newCell = (snake[snake.length - 1] + 1);
            if (newCell % COLS === 0) newCell -= COLS;
        } else if (direction === 'U') {
            newCell = (snake[snake.length - 1] - COLS + TOTAL_CELLS) % TOTAL_CELLS;
        } else if (direction === 'D') {
            newCell = (snake[snake.length - 1] + COLS) % TOTAL_CELLS;
        }

        cells[snake[0]].style.backgroundColor = '';
        snake.shift();

        snake.push(newCell);
        cells[snake[snake.length - 1]].style.backgroundColor = 'green';

        setSnake(snake);
    });

    
    function drawStartSnake() {
        for (const cell in snake) {
            cells[cell].style.backgroundColor = 'green';
        }
    }

    const handleKeyPress = (event) => {
        if (!gameOn) return;

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
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };

    }, [gameOn, direction]);

    useEffect(() => {
        const handleDOMLoaded = () => {
            // console.log('drawStartSnake ..... state = ' + state);
            if (state == "OFF") {
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
                <ControlPanel onStartPlay={onStartPlay} onResetPlay={onResetPlay} gameOn={gameOn}></ControlPanel>
            </div>
        </>
    )
}