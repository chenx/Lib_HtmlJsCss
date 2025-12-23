import { useState, useEffect, useCallback, useContext } from 'react'
import { FormContext } from './MyContext.js'
import Menu from './Menu.jsx'
import './Form.css'

function InputSection({ title, summary, titleError, summaryError, onChangeTitle, onChangeSummary, onAddEntry, onResetEntry, repeatedAdd, onSetRepeatedAdd }) {
    // const [title, setTitle] = useState('');
    // const [summary, setSummary] = useState('');
    // const [titleError, setTitleError] = useState(false);
    // const [summaryError, setSummaryError] = useState(false);

    // const onAddEntry = () => {
    //     const title = document.getElementById('title').value;
    //     const summary = document.getElementById('summary').value;

    //     setTitleError(title.trim() === '');
    //     setSummaryError(summary.trim() === '');

    //     // const hasError = (titleError || summaryError); 
    //     const hasError = (title.trim() === '' || summary.trim() === '');
    //     const msg = hasError ? 'Please fill in both title and summary.' : ' ';
    //     document.getElementsByClassName('warning')[0].innerText = msg;

    //     if (! hasError) {
    //         setSummary('');
    //         setTitle('');

    //         // items.push({ title: title, description: summary });
    //         items = [...items, { title: title, description: summary }];
    //     }
    // };

    // const onResetEntry = () => {
    //     setTitle('');
    //     setSummary('');
    //     setTitleError(false);
    //     setSummaryError(false);
    //     document.getElementsByClassName('warning')[0].innerText = ' ';
    // }

    // const onChangeTitle = useCallback((event) => {
    //     setTitle(event.target.value);
    // }, []);

    // const onChangeSummary = useCallback((event) => {
    //     setSummary(event.target.value);
    // }, []);

    // const titleField = document.getElementById('title');
    // if (titleField) titleField.focus();

    return (
        <>
            <div>
                <input className={`title field ${titleError ? "input-error" : ""}`} type="text" id="title" name="title" onChange={onChangeTitle} value={title} placeholder="Title" autoFocus />
                <input className={`summary field ${summaryError ? "input-error" : ""}`} type="text" id="summary" name="summary" onChange={onChangeSummary} value={summary} placeholder="Summary" />
                <button className="button" type="submit" onClick={onAddEntry} title="Add entry">Add</button>
                <button className="button" type="reset" onClick={onResetEntry} title="Clear title and summary input">Clear</button>
                <span title="Repeatedly add the same item" >
                <input type="checkbox" id="checkbox" name="checkbox" checked={repeatedAdd} onChange={onSetRepeatedAdd}/>Repeat Add
                </span>
                <p><span className="warning"></span></p>
            </div>
        </>
    );
}

function Section({ item, onClickRemove }) {
    const [isOpened, setIsOpened] = useState(false);

    const onClickToggle = useCallback(() => {
        setIsOpened(!isOpened);
    });

    return (
        <>
            <li className="section-item">
                <a href={`#${item.id}`} title="Toggle Summary" onClick={onClickToggle}>{item.title}</a>
                <button className="btn-delete" type="button" title="Remove" onClick={() => onClickRemove(item.id)}>&#10007;</button>
                <p style={{ display: isOpened ? "block" : "none" }}>{item.description}</p>
            </li>
        </>
    );
}

function DisplaySection({ items, onResetItems, onClickRemove }) {
    return (
        <>
            <h2>Items (Total: {items?.length})</h2>
            <button className="button" type="reset" onClick={onResetItems}>Reset Items</button>
            <ul>
                {items.map((item) => (
                    <Section key={item.id} item={item} onClickRemove={onClickRemove} />
                ))}
            </ul>
        </>
    );
}

// function* incrementingCounter(start = 0) {
//     let count = start;
//     while (true) {
//         yield count++; // Yield the current count, then increment it for the next call
//     }
// };
// const id = incrementingCounter(1);

let cond = {
    startItemId: 1,
    readFromBackend: true,
}

const id = (function* () {
    let i = cond.startItemId;
    while (true) {
        yield i ++;  // returns {value: i, done: false}
    }
})();

function setFocus(fieldId='title') {
    const field = document.getElementById(fieldId);
    if (field) {
        field.focus();
    }
}

function UpdateItemsInStorage(items) {
    console.log('update items in storage', items);
    localStorage.setItem('formItems', JSON.stringify(items));
}

function GetItemsInStorage() {
    const data = localStorage.getItem('formItems');
    return data ? JSON.parse(data) : null;
}

export default function Form() {
    let dummyItems = [ {id: 0, title: "Sample Title", description: "Sample Description", display: "none"} ];
    const [items, setItems] = useState(dummyItems);

    // const { contextValue, setContextValue } = useContext(FormContext);
    // const contextProvider = useContext(FormContext);
    // if (Array.isArray(contextProvider.contextValue) && contextValue.length > 0) {
    //     setItems(contextProvider.contextValue); // never called.
    //     console.log('set itmes. ', items);
    // } else {
    //     useEffect(() => { // useEffect renders after current component rendering finishes.
    //         contextProvider.setContextValue(items);
    //         console.log('-------', contextProvider.contextValue);
    //     });
    // }

    // Retrieve stored items in storage.
    useEffect(() => {
        const savedItems = GetItemsInStorage();
        // NOTE: print savedItem directly would cause this warning in console:
        //   Source map error: Error: JSON.parse: unexpected character at line 1 column 1 of the JSON data
        requestAnimationFrame(() => {
            console.log('savedItems: ', savedItems);
        });
        // console.log('savedItems: ', savedItems);
        // console.log('Array.isArray(null): ' , Array.isArray(null)); // false
        if (Array.isArray(savedItems) && savedItems.length > 0) {
            setItems(savedItems);
            cond.startItemId = savedItems[savedItems.length - 1].id + 1;
        } else {
            setItems([]);
            cond.startItemId = 1;
        }
        // console.log('items: ', items, ', startItemId = ', cond.startItemId);
    }, []);

    // Get data from backend.
    // $ cd /Users/chenx/www/service
    // # ./cmd_start_server
    /*
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (cond.readFromBackend) {
                    const response = await fetch('http://localhost:3000/api/1/data');
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const result = await response.json();
                    // setData(result);
                    console.log('fetch result: ', result.message);
                    setItems(JSON.parse(result.message));
                    cond.readFromBackend = false;
                }
            } catch (error) {
                // setError(error);
                console.error(error);
            } finally {
                // setLoading(false);
            }
        };
        fetchData();
    }, []);
    */

    const [title, setTitle] = useState('Title');
    const [summary, setSummary] = useState('Summary');
    const [titleError, setTitleError] = useState(false);
    const [summaryError, setSummaryError] = useState(false);
    const [repeatedAdd, setRepeatedAdd] = useState(true);


    const onAddEntry = () => {
        const title = document.getElementById('title').value;
        const summary = document.getElementById('summary').value;

        setTitleError(title.trim() === '');
        setSummaryError(summary.trim() === '');

        // const hasError = (titleError || summaryError); 
        const hasError = (title.trim() === '' || summary.trim() === '');
        const msg = hasError ? 'Please fill in both title and summary.' : ' ';
        document.getElementsByClassName('warning')[0].innerText = msg;

        if (! hasError) {
            const newItems = [...items, { 
                id: id.next().value,
                title: title, 
                description: summary,
                display: "none",
            }];
            setItems(newItems);

            // contextProvider.setContextValue([...items]);
            // console.log('set contextValue: ', contextProvider.contextValue)
            UpdateItemsInStorage(newItems);            

            if (! repeatedAdd) {
                setSummary('');
                setTitle('');
            }
            setFocus();
        } else {
            if (title.trim() === '') setFocus();
            else if (summary.trim() === '') setFocus('summary');
        }
    };

    const onResetEntry = () => {
        setTitle('');
        setSummary('');
        setTitleError(false);
        setSummaryError(false);
        document.getElementsByClassName('warning')[0].innerText = ' ';
    }

    const onChangeTitle = useCallback((event) => {
        setTitle(event.target.value);
    }, []);

    const onChangeSummary = useCallback((event) => {
        setSummary(event.target.value);
    }, []);

    const onSetRepeatedAdd = useCallback(() => {
        const checkbox = document.getElementById('checkbox');
        setRepeatedAdd(checkbox.checked);
    }, []);

    const onResetItems = useCallback(() => {
        setItems(dummyItems);
        UpdateItemsInStorage(dummyItems);
    }, []);

    // Don't use useCallback; or use useCallback but add items as dependency.
    const onClickRemove = useCallback((id) => {
        const newItems = items.filter((item) => item.id !== id);
        setItems( newItems );

        UpdateItemsInStorage(newItems);
    }, [items]);  // NOTE: add items as a dependency to capture its changed value.

    return (
        <>  
            <Menu />
            <header>
                <h1>Entry Form</h1>
            </header>
            <InputSection title={title}
                summary={summary} 
                titleError={titleError} 
                summaryError={summaryError}
                onChangeTitle={onChangeTitle}
                onChangeSummary={onChangeSummary}
                onAddEntry={onAddEntry}
                onResetEntry={onResetEntry}
                repeatedAdd={repeatedAdd}
                onSetRepeatedAdd={onSetRepeatedAdd} />
            <DisplaySection items={items} onResetItems={onResetItems} onClickRemove={onClickRemove}/>
        </>
    );
}


// export default function FormApp() {
//     const [contextValue, setContextValue] = useState([]);

//     return (
//         <FormContext.Provider value={{ contextValue, setContextValue }}>
//             <Form />
//         </FormContext.Provider>
//     );
// }