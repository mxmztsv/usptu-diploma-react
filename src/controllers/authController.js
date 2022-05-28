import {request} from "../services/httpService";
import toast from "react-hot-toast";

export const signIn = async (login, password) => {
    let response
    try {
        response = await request('/auth/sign-in', { login, password })

        localStorage.setItem("userData", JSON.stringify({
            id: response.Id_prepodavatelya,
            name: response.Imya,
            surname: response.Familiya,
            middleName: response.Otchestvo,
            isSuperuser: response.Is_superuser
        }))
        window.location.href = '/'
    } catch (e) {
        console.error(e.message)
        toast.error(e.message)
    }

    return response
}

export const signOut = async () => {
    let response
    try {
        response = await request('/auth/sign-out')
        localStorage.removeItem("userData")
        window.location.href = '/'
    } catch (e) {
        console.error(e.message)
        toast.error(e.message)
    }

    return response
}

export const getUserInfo = () => {
    const userInfo = JSON.parse(localStorage.getItem("userData"))
    // console.log(userInfo, userInfo)
    if (userInfo) return userInfo
    return {
        name: null,
        surname: null,
        middleName: null,
        id: null
    }
}

