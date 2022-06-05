import {Toaster} from 'react-hot-toast';
import {BrowserRouter as Router} from "react-router-dom";
import {getUserInfo} from "./controllers/authController";
import {useRoutes} from "./routes";
import {NavBar} from "./components/Navbar";

/**
 * Корневой компонент приложения.
 */
export const App = () => {
    // Получаем информацию о пользователе
    const userInfo = getUserInfo()
    const isAuthenticated = userInfo.id
    const isSuperuser = userInfo.isSuperuser

    // Получаем пути
    const routes = useRoutes(isAuthenticated, isSuperuser)

    return (
        <>
            {/*В Router кладем наши пути и Navbar, если пользователь авторизован*/}
            <Router>
                {isAuthenticated && <NavBar/>}
                <div>
                    {routes}
                </div>
            </Router>
            {/*Компанент тостера для вывода сообщений пользователю*/}
            <Toaster/>
        </>
    )
}

