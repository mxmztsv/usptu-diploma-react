import {request} from "../services/httpService";
import toast from "react-hot-toast";

/**
 * Контроллер для работы с подразделением.
 */

/**
 * Функция получения всех подразделений.
 */
export const getAllDepartments = async() => {
    let response
    try {
        response = await request('/department/get-all', null, 'GET')
        return response
    } catch (e) {
        console.error(e.message)
        toast.error(e.message)
    }
}

/**
 * Функция получения подразделения по id.
 */
export const getDepartmentById = async(id) => {
    let response
    try {
        response = await request(`/department/get-by-id/${id}`, null, 'GET')
        return response
    } catch (e) {
        console.error(e.message)
        toast.error(e.message)
    }
}

/**
 * Функция сохранения подразделения.
 */
export const saveDepartment = async (data) => {
    let response
    try {
        response = await request('/department/save', data)
        toast.success('Сохранено')
    } catch (e) {
        console.error(e.message)
        toast.error(e.message)
        return
    }
    return response
}

/**
 * Функция удаления подраздения.
 */
export const removeDepartment = async (departmentId) => {
    let response
    try {
        response = await request('/department/remove', {id: departmentId})
        toast.success('Удалено')
        window.location.href = '/departments'
    } catch (e) {
        console.error(e.message)
        toast.error(e.message)
        return
    }
    return response
}
