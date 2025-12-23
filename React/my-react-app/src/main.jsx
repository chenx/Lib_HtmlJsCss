import { StrictMode } from 'react'

import { useState } from 'react'
import { FormContext } from './MyContext.js';

// For redux
import store from './redux/store.js'
import { Provider } from 'react-redux'
import { ReduxCounter} from './redux/ReduxCounter2.jsx'

import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import './index.css'
import TimerApp from './Timer.jsx'
import Game from './TicTacToe.jsx'
import Form from './Form.jsx'
import Menu from './Menu.jsx'
import FormElements from './FormElements.jsx'
import Home from './Home.jsx'
import GuessWords from './GuessWords.jsx'

// Can't persist data so far when switching page.
function FormApp() {
    const [contextValue, setContextValue] = useState([]);

    return (
        <FormContext.Provider value={{ contextValue, setContextValue }}>
            <Form />
        </FormContext.Provider>
    );
}

const router = createBrowserRouter([
  {
    path: "/",
    element:<Home />,
  },
  {
    path: "/TimerApp",
    element: <TimerApp/>
  },
  {
    path: "/Game",
    element: <Game />
  },
  {
    path: "/Form",
    element: <FormApp />
  },
  {
    path: "/FormElements",
    element: <FormElements />
  },
  {
    path: "/ReduxCounter",
    element: <ReduxCounter />
  },
  {
    path: "/GuessWords",
    element: <GuessWords />
  },
]);

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
);

/*
const myelement = (
  <table>
    <tr>
      <th>Name</th>
    </tr>
    <tr>
      <td>John</td>
    </tr>
    <tr>
      <td>Elsa</td>
    </tr>
  </table>
);

createRoot(document.getElementById('root')).render(
  <strict>
    <App/>
  </strict>
)

createRoot(document.getElementById('test1')).render(
  myelement
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Game/>
  </StrictMode>
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Form/>
  </StrictMode>
)
*/