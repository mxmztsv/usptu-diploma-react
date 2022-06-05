import {request} from "../services/httpService";
import toast from "react-hot-toast";

/**
 * Функция получения всех преподавателей.
 */
export const getAllEmployees = async() => {
    let response
    try {
        response = await request('/employee/get-all', null, 'GET')
        return response
    } catch (e) {
        console.error(e.message)
        toast.error(e.message)
    }
}

/**
 * Функция получения преподавателя по id.
 */
export const getEmployeesById = async(id) => {
    let response
    try {
        response = await request(`/employee/get-by-id/${id}`, null, 'GET')
        return response
    } catch (e) {
        console.error(e.message)
        toast.error(e.message)
    }
}

/**
 * Функция сохранения преподавателя.
 */
export const saveEmployee = async (data) => {
    let response
    try {
        response = await request('/employee/save', data)
        toast.success('Сохранено')
    } catch (e) {
        console.error(e.message)
        toast.error(e.message)
        return
    }
    return response
}

/**
 * Функция удаления преподавателя.
 */
export const removeEmployee = async (employeeId) => {
    let response
    try {
        response = await request('/employee/remove', {id: employeeId})
        toast.success('Удалено')
        window.location.href = '/'
    } catch (e) {
        console.error(e.message)
        toast.error(e.message)
        return
    }
    return response
}
