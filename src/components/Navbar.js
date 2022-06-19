import * as React from 'react';
import {NavLink} from "react-router-dom";
import {getUserInfo, signOut} from "../controllers/authController";

/**
 * Компонент навигации (навбар).
 */
export const NavBar = () => {

    return (
        <nav className="navbar">
            <span
                className="brand-logo">{`USPTU (${getUserInfo().surname} ${getUserInfo().name} ${getUserInfo().middleName})`}</span>
            <ul>
                {getUserInfo().isSuperuser && (<>
                    {/*Если пользователь является суперпользователем, то ему доступны страницы Преподавателей и подразделений*/}
                    <li><NavLink style={({isActive}) => {
                        return {
                            display: "block",
                            color: isActive ? "white" : "#E0E0E0"
                        }
                    }} to="/filters">Фильтры</NavLink></li>
                    <li><NavLink style={({isActive}) => {
                        return {
                            display: "block",
                            color: isActive ? "white" : "#E0E0E0"
                        }
                    }} to="/">Преподаватели</NavLink></li>
                    <li><NavLink style={({isActive}) => {
                        return {
                            display: "block",
                            color: isActive ? "white" : "#E0E0E0"
                        }
                    }} to="/departments">Подразделения</NavLink></li>
                </>)}

                <li><NavLink style={({isActive}) => {
                    return {
                        display: "block",
                        color: isActive ? "white" : "#E0E0E0"
                    }
                }} to="/trainings">Повышение квалификации</NavLink></li>

                <li><NavLink onClick={signOut} style={({isActive}) => {
                    return {
                        display: "block",
                        color: isActive ? "white" : "#E0E0E0"
                    }
                }} to="/">Выйти</NavLink></li>
            </ul>
        </nav>
    )
}
