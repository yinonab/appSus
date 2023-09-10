import { UserMsg } from "../cmps/UserMsg.jsx"


const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
            <h3>.</h3>
        </Link>
        <nav>
            <NavLink to="/">
            <img src="./assets/img/7.jpeg" alt="" />
            </NavLink>
            <NavLink to="/about">
            <img src="./assets/img/3.png" alt="" />
            </NavLink>
            <NavLink to="/mail">
            <img src="./assets/img/5.png" alt="" />
            </NavLink>
            <NavLink to="/note">
            <img src="./assets/img/keep.jpg" alt="" />
            </NavLink>
        </nav>
        <UserMsg/>
    </header>
}
