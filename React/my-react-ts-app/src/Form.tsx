import { useState, useEffect, useCallback, type SetStateAction } from 'react'
import { type  FormField } from './MyContext.js';
import Menu from './Menu.jsx'
import './Form.css'

interface InputSectionType { 
    title: string;
    summary: string;
    titleError: boolean;
    summaryError: boolean;
    onChangeTitle: React.ChangeEventHandler<HTMLInputElement>;
    onChangeSummary: React.ChangeEventHandler<HTMLInputElement>;
    onAddEntry: React.MouseEventHandler<HTMLButtonElement>;
    onResetEntry: React.MouseEventHandler<HTMLButtonElement>;
    repeatedAdd: boolean | undefined;
    onSetRepeatedAdd: React.ChangeEventHandler<HTMLInputElement>; 
}

function InputSection({ title, summary, titleError, summaryError, onChangeTitle, onChangeSummary, onAddEntry, onResetEntry, repeatedAdd, onSetRepeatedAdd }: InputSectionType) {
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

interface SectionType {
    item: FormField;
    onClickRemove: (id: number) => void;
}

function Section({ item, onClickRemove }: SectionType) {
    const [isOpened, setIsOpened] = useState(false);

    const onClickToggle = useCallback(() => {
        setIsOpened(!isOpened);
    }, [isOpened]);

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

interface DisplaySectionType {
    items: FormField[];
    onResetItems: React.MouseEventHandler<HTMLButtonElement>;
    onClickRemove: (id: number) => void;
}

function DisplaySection({ items, onResetItems, onClickRemove }: DisplaySectionType) {
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

function UpdateItemsInStorage(items: FormField[]) {
    // console.log('update items in storage', items);
    localStorage.setItem('formItems', JSON.stringify(items));
}

function GetItemsInStorage() {
    const data = localStorage.getItem('formItems');
    return data ? JSON.parse(data) : null;
    // return JSON.parse(localStorage.getItem('formItems') || '');
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
        requestAnimationFrame(() => {
            console.log('savedItems: ', savedItems);
        });
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
        const title = (document.getElementById('title') as HTMLInputElement).value;
        const summary = (document.getElementById('summary') as HTMLInputElement).value;

        setTitleError(title.trim() === '');
        setSummaryError(summary.trim() === '');

        // const hasError = (titleError || summaryError); 
        const hasError = (title.trim() === '' || summary.trim() === '');
        const msg = hasError ? 'Please fill in both title and summary.' : ' ';
        (document.getElementsByClassName('warning')[0] as HTMLElement).innerText = msg;

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
        (document.getElementsByClassName('warning')[0] as HTMLElement).innerText = ' ';
    }

    interface SetStateActionEvent {
        target: { 
            value: SetStateAction<string>; 
        };
    }

    const onChangeTitle = useCallback((event: SetStateActionEvent) => {
        setTitle(event.target.value);
    }, []);

    const onChangeSummary = useCallback((event: SetStateActionEvent) => {
        setSummary(event.target.value);
    }, []);

    const onSetRepeatedAdd = useCallback(() => {
        const checkbox = document.getElementById('checkbox') as HTMLInputElement;
        setRepeatedAdd(checkbox.checked);
    }, []);

    const onResetItems = useCallback(() => {
        setItems(dummyItems);
        UpdateItemsInStorage(dummyItems);
    }, []);

    // Don't use useCallback; or use useCallback but add items as dependency.
    const onClickRemove = useCallback((id: number) => {
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
