import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import TimerApp from './Timer.tsx'
import App from './App.tsx'
import Game from './TicTacToe.tsx'
import Form from './Form.tsx'
import FormElements from './FormElements.tsx'
import TestApp from './TestApp.tsx'

// import { useState } from 'react'
// import type { FormField } from './MyContext.ts'
// import { FormContext } from './MyContext.ts';

// For redux
import { store } from './redux/store.ts'
import { Provider } from 'react-redux'
import { ReduxCounter } from './redux/reduxCounter.tsx'

// interface FormContextValue {
//   contextValue: FormField;
//   setContextValue: React.Dispatch<React.SetStateAction<never[]>>;
// }

// Can't persist data so far when switching page.
// function FormApp() {
//     const [contextValue, setContextValue] = useState([]);

//     return (
//         <FormContext.Provider value={{ contextValue, setContextValue }}>
//             <Form />
//         </FormContext.Provider>
//     );
// }

const router = createBrowserRouter([
  {
    path: "/",
    element:<App />,
  },
  {
    path: "/Timer",
    element: <TimerApp/>
  },
  {
    path: "/Game",
    element: <Game />
  },
  {
    path: "/Form",
    element: <Form />
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
    path: "/TestApp",
    element: <TestApp />
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//     <Timer />
//   </StrictMode>,
// )
