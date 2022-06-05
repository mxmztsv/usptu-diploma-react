import {request} from "../services/httpService";
import toast from "react-hot-toast";

/**
 * Контроллер авторизации.
 */

/**
 * Функция авторизации.
 */
export const signIn = async (login, password) => {
    let response
    try {
        // Отправляем запрос на авторизацию на бэкенд
        response = await request('/auth/sign-in', { login, password })

        // Полученные данные пользователя складываем в Local Storage
        localStorage.setItem("userData", JSON.stringify({
            id: response.Id_prepodavatelya,
            name: response.Imya,
            surname: response.Familiya,
            middleName: response.Otchestvo,
            isSuperuser: response.Is_superuser
        }))

        // Перезагружаем страницу, чтоб пользователь оказался в приложении
        window.location.href = '/'
    } catch (e) {
        console.error(e.message)
        toast.error(e.message)
    }

    return response
}

/**
 * Функция выхода из системы.
 */
export const signOut = async () => {
    let response
    try {
        // Отправляем запрос на выход
        response = await request('/auth/sign-out')

        //Удаляем данные пользователя из Local Storage
        localStorage.removeItem("userData")

        // Перезагружаем страницу, чтоб выбить пользователя из приложения на страницу авторизации
        window.location.href = '/'
    } catch (e) {
        console.error(e.message)
        toast.error(e.message)
    }

    return response
}

/**
 * Функция получения данных пользователя из Local Storage
 */
export const getUserInfo = () => {
    const userInfo = JSON.parse(localStorage.getItem("userData"))
    if (userInfo) return userInfo
    return {
        name: null,
        surname: null,
        middleName: null,
        id: null,
    }
}

