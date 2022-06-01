import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {NavLink} from "react-router-dom";
import {getUserInfo, signOut} from "../controllers/authController";

const NavBar = () => {

    return (
        // <header className="navbar">
        <nav className="navbar">
            {/*<div className="nav-wrapper">*/}
            <span className="brand-logo">{`USPTU (${getUserInfo().surname} ${getUserInfo().name} ${getUserInfo().middleName})`}</span>
            {/*<span className="brand-logo">Админ панель ({name})</span>*/}
            <ul>
                <li><NavLink style={({ isActive }) => {
                    return {
                        display: "block",
                        color: isActive ? "white" : "white"
                    };
                }}
                             to="/">Преподаватели</NavLink></li>
                <li><NavLink style={({ isActive }) => {
                    return {
                        display: "block",
                        color: isActive ? "white" : "white"
                    };
                }}
                             to="/departments">Подразделения</NavLink></li>
                <li><NavLink style={({ isActive }) => {
                    return {
                        display: "block",
                        color: isActive ? "white" : "white"
                    };
                }}
                             to="/trainings">Повышение квалификации</NavLink></li>
                <li><NavLink style={({ isActive }) => {
                    return {
                        display: "block",
                        color: isActive ? "white" : "white"
                    };
                }}
                             to="/trainings">Профиль</NavLink></li>
                <li><NavLink onClick={signOut} style={({ isActive }) => {
                    return {
                        display: "block",
                        color: isActive ? "white" : "white"
                    };
                }}
                             to="/">Выйти</NavLink></li>
            </ul>
            {/*</div>*/}
        </nav>
        // </header>
    )
}
export default NavBar;
