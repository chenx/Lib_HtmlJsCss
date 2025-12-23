import { Link, Outlet } from 'react-router-dom'
import './Menu.css'

export default function Menu() {
  return (
    <main>
      <nav className="menu">
        <Link to="/">Main</Link>
        <span> | </span>
        <Link to="/Timer">Timer</Link>
        <span> | </span>
        <Link to="/ReduxCounter">ReduxCounter</Link>
        <span> | </span>
        <Link to="/Game">TicTacToe</Link>
        <span> | </span>
        <Link to="/Form">Form</Link>
        <span> | </span>
        <Link to="/FormElements">Form Elements</Link>
        <span> | </span>
        <Link to="/TestApp">Test App</Link>
      </nav>
      <Outlet />
    </main>
  );
}
