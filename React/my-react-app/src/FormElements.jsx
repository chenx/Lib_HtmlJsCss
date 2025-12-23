import { useState, useCallback, useEffect } from 'react'
import Menu from './Menu.jsx'
import './FormElements.css'

const cond = {
    loadCount : 0,
    isFirstLoad : true,
};

function TextInput({ textInput, handleTextInputChange }) {
    return (
        <>
            <input type="text" id="textInput" name="textInput" className="text-input" value={textInput} placeholder="Title"
                onChange={handleTextInputChange} />
        </>
    );
}

function TextArea({ textAreaValue, handleTextAreaChange }) {
    return (
        <>
            <textarea id="textArea" name="textArea" className="text-area" value={textAreaValue} placeholder="Description" 
                onChange={handleTextAreaChange} />
        </>
    );
}

function Checkbox({ checked, onCheckMeChange }) {
    return (
        <>
            <input type="checkbox" id="checkbox" className='check-box' checked={checked} 
                onChange={onCheckMeChange}/>
        </>
    );
}

function RadioGroup({ radioValue, onRadioGroupChange }) {
    return (
        <>
            <div>
                <span>Favorite color: </span>
                <span className='color-item'>
                    <input type="radio" id="favColorRed" name="favColor" className='radio' value="red"
                        checked={radioValue === "red"} onChange={onRadioGroupChange} />
                    <label htmlFor="favColorRed">Red</label>
                </span>
                <span className='color-item'>
                    <input type="radio" id="favColorGreen" name="favColor" className='radio' value="green"
                        checked={radioValue === "green"} onChange={onRadioGroupChange} />
                    <label htmlFor="favColorGreen">Green</label>
                </span>
                <span className='color-item'>
                    <input type="radio" id="favColorBlue" name="favColor" className='radio' value="blue"
                        checked={radioValue === "blue"} onChange={onRadioGroupChange} />
                    <label htmlFor="favColorBlue">Blue</label>
                </span>
            </div>
        </>
    );
}

function DropdownList({ selectValue, onSelectChange }) {
    return (
        <>
            <select id="dropdownList" name="dropdownList" value={selectValue} onChange={onSelectChange}>
                <option value="">-- Select Weekday--</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
            </select>
        </>
    );
}

function DateInput({ dateValue, onDateChange }) {
    return (
        <>
            <input
                type="date"
                id="start-date"
                name="start-date"
                value={dateValue}
                min="2025-01-01"
                max="2025-12-31"
                onChange={onDateChange} />
        </>
    );
}

function ActionBar({ onBtnSubmitClick, onBtnResetClick, onBtnLoadClick }) {
    return (
        <>
            <button className='button' id="btnSubmit" name="btnSubmit" onClick={onBtnSubmitClick}>Save To Storage</button>
            <button className='button' id="btnReset" name="btnReset" onClick={onBtnResetClick}>Reset</button>
            <button className='button' id="btnLoad" name="btnLoad" onClick={onBtnLoadClick}>Load From Storage</button>
            <div className='toast toast-hidden' id="myToast" name="myToast"></div>
        </>
    );
}

function getCurrentDate() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${year}-${month}-${day}`;
    return currentDate;
}

function readFromStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

function saveToStorage(key, value) {
    localStorage.setItem(key, value);
}

function showToast(message) {
    const toast = document.getElementById('myToast');
    toast.textContent = message;
    toast.classList.remove('toast-hidden');
    toast.classList.add('toast-visible');

    setTimeout(() => {
        toast.classList.remove('toast-visible');
        toast.classList.add('toast-hidden');
    }, 3000); // Hide after 3 seconds.
}


export default function FormElements() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [checkMe, setCheckMe] = useState(false);
    const [favColor, setFavColor] = useState("");
    const [weekday, setWeekday] = useState("");
    const [date, setDate] = useState(getCurrentDate());

    const handleTitleChange = useCallback((event) => {
        setTitle(event.target.value);
    }, []);

    const handleDescriptionChange = useCallback((event) => {
        setDescription(event.target.value);
    }, []);

    const handleCheckboxChange = useCallback((event) => {
        setCheckMe(! checkMe);
    }, [checkMe]);

    const handleRadioGroupChange = useCallback((event) => {
        setFavColor(event.target.value);
    }, []);

    const handleWeekdayChange = useCallback((event) => {
        setWeekday(event.target.value);
    }, []);

    const handleDateChange = useCallback((event) => {
        setDate(event.target.value);
    }, []);

    const onSubmit = useCallback(() => {
        const value = {
            title: title,
            description: description,
            checkme: checkMe,
            favcolor: favColor,
            weekday: weekday,
            date: date,            
        }
        saveToStorage("formElements", JSON.stringify(value));
        showToast("data has been saved to storage");
    }, [title, description, checkMe, favColor, weekday, date]);

    const onReset = useCallback(() => {
        setTitle("");
        setDescription("");
        setCheckMe(false);
        setFavColor("");
        setWeekday("");
        setDate(getCurrentDate());
        showToast("data has been reset");
    }, []);

    const onLoadStorage = useCallback((hideToast) => {
        const value = readFromStorage("formElements");
        requestAnimationFrame(() => {
            console.log('value: ', value);
        });
        if (value) {
            setTitle(value.title);
            setDescription(value.description);
            setCheckMe(value.checkme);
            setFavColor(value.favcolor);
            setWeekday(value.weekday);
            setDate(value.date);
            if (! hideToast) showToast("data has been loaded from storage");
        } else {
            if (! hideToast) showToast("data does not exist in storage");
        }
    }, []);

    // UseEffect is the way to do something on page load.
    // However Strict mode causes useEffect to be called twice.
    // https://stackoverflow.com/questions/65841765/how-can-i-trigger-an-event-on-page-load-in-react
    // https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
    useEffect(() => {
        onLoadStorage(/*hideToast=*/ true);
    }, []);

    return (
        <>
            <Menu />
            <header>
                <h1>Form Elements</h1>
            </header>
            <div id="div-options">
                <TextInput textInput={title} handleTextInputChange={handleTitleChange} />
                <TextArea textAreaValue={description} handleTextAreaChange={handleDescriptionChange} />
                <div className='div-row'><Checkbox checked={checkMe} onCheckMeChange={handleCheckboxChange} /> Checked</div>
                <div className='div-row'><RadioGroup radioValue={favColor} onRadioGroupChange={handleRadioGroupChange} /></div>
                <div className='div-row'><DropdownList selectValue={weekday} onSelectChange={handleWeekdayChange} /></div>
                <div className='div-row'><DateInput dateValue={date} onDateChange={handleDateChange} /></div>
                <ActionBar onBtnSubmitClick={onSubmit} onBtnResetClick={onReset} onBtnLoadClick={() => onLoadStorage(/*hideToast=*/ false)} />
            </div>
            <div id="div-display">
                <div className='div-row'><span className='row-title'>Title:</span> {title}</div>
                <div className='div-row'><span className='row-title'>Description:</span> {description}</div>
                <div className='div-row'><span className='row-title'>Checked:</span> {checkMe ? "true" : "false"}</div>
                <div className='div-row'><span className='row-title'>Favorite color:</span> {favColor}</div>
                <div className='div-row'><span className='row-title'>Selected weekday:</span> {weekday}</div>
                <div className='div-row'><span className='row-title'>Selected date:</span> {date}</div>
            </div>
        </>
    );
}
