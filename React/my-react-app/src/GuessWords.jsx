import { useState, useEffect, useCallback } from 'react'
import Menu from './Menu.jsx'
import React from 'react'
import './GuessWords.css'

function ControlPanel({ onStartPlay }) {
    return (
        <>
            <div>
                <button id="btnPlay" name="btnPlay" className='btnPlay' onClick={onStartPlay}>Reset Game</button>
            </div>
        </>
    );
}

function Board() {
    return (
        <>
            <table id="board" className="guess-words-board">
                <thead>
                    <tr>
                        <th colSpan={5}><h1>Guess Words</h1></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="cell"></td>
                        <td className="cell"></td>
                        <td className="cell"></td>
                        <td className="cell"></td>
                        <td className="cell"></td>
                    </tr>
                    <tr>
                        <td className="cell"></td>
                        <td className="cell"></td>
                        <td className="cell"></td>
                        <td className="cell"></td>
                        <td className="cell"></td>
                    </tr>
                    <tr>
                        <td className="cell"></td>
                        <td className="cell"></td>
                        <td className="cell"></td>
                        <td className="cell"></td>
                        <td className="cell"></td>
                    </tr>
                    <tr>
                        <td className="cell"></td>
                        <td className="cell"></td>
                        <td className="cell"></td>
                        <td className="cell"></td>
                        <td className="cell"></td>
                    </tr>
                    <tr>
                        <td className="cell"></td>
                        <td className="cell"></td>
                        <td className="cell"></td>
                        <td className="cell"></td>
                        <td className="cell"></td>
                    </tr>
                    <tr>
                        <td className="cell"></td>
                        <td className="cell"></td>
                        <td className="cell"></td>
                        <td className="cell"></td>
                        <td className="cell"></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

function App() {
    const ROWS = 6;
    const COLS = 5;
    const TOTAL = ROWS * COLS;
    const DEFAULT_MSG = 'Enter letters a-z to guess word';
    const VERBOSE = false;

    const cells = document.getElementsByClassName("cell"); // as HTMLCollectionOf<HTMLElement>;
    const WORD_LIST = new Set(['TODAY', 'MOONS', 'ABOUT']);

    const [gameOn, setGameOn] = useState(true);
    const [message, setMessage] = useState(DEFAULT_MSG);
    const [count, setCount] = useState(0);
    const [words, setWords] = useState(new Set(WORD_LIST));
    const [score, setScore] = useState(0);

    const onStartPlay = useCallback(() => {
        for (let i = 0; i < cells.length; ++i) {
            cells[i].textContent = '';
            cells[i].style.backgroundColor = '';
        }

        setMessage(DEFAULT_MSG);
        setWords(new Set(WORD_LIST));
        setCount(0);
        setScore(0);
        setGameOn(true);
    }, [count, gameOn]);

    const guessWord = useCallback((count) => {
        if (VERBOSE) console.log('guess word');

        let word = '';
        for (let i = count - 5; i < count; ++i) {
            word += cells[i].textContent;
        }

        if (words.has(word)) {
            words.delete(word);
            setWords(words);
            for (let i = count - 5; i < count; ++i) {
                cells[i].style.backgroundColor = 'green';
            }

            const newScore = score + 10;
            setScore(score => newScore);
            setMessage('Your score is ' + newScore);
        } else {
            for (let i = count - 5; i < count; ++i) {
                cells[i].style.backgroundColor = 'red';
            }
        }
    }, [count, gameOn]);

    const endGame = useCallback(() => {
        if (VERBOSE) console.log('end game');
        setGameOn(false);
        setMessage('Game Over. Your score is ' + score);
    }, [score, gameOn]); 
    // render when score or gameOn changes. With "[]" it will not render.
    // Without ", []" or ", [...]" it always renders.

    const handleKeyPress = useCallback((event) => {
        if (!gameOn) return;

        if (event.key >= 'a' && event.key <= 'z') {
            cells[count].textContent = event.key.toUpperCase();
            // console.log('key: ' + event.key + ', count = '+ count);

            const newCount = count + 1;
            if (newCount % COLS == 0) {
                guessWord(newCount);
            }
            if (newCount == TOTAL) {
                endGame();
            }
            setCount(count => newCount);
        } else if (event.key == 'Delete' || event.key == 'Backspace') {
            if (count >= 1) {
                const newCount = count - 1;
                cells[newCount].textContent = '';
                cells[newCount].style.backgroundColor = '';
                setCount(count => newCount);
            }
        }
    }, [count, gameOn]);

    useEffect(() => {
        document.addEventListener('keyup', handleKeyPress);

        return () => {
            document.removeEventListener('keyup', handleKeyPress);
        };
    }, [gameOn, count]);

    return (
        <>
            <Menu />
            <div className="content">
                <Board />
            </div>
            <div className="footer">
                <ControlPanel onStartPlay={onStartPlay} />
                <div className='message'>{message}</div>
            </div>
        </>
    )
}

export default App
