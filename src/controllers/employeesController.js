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
 * Функция получения всех преподавателей, проходивших ПК в заданный период.
 */
export const getEmployeesByTrainingPeriod = async(startDate, endDate) => {
    if (startDate && endDate) {
        let response
        try {
            response = await request(`/employee/get-by-training-period?startDate=${startDate}&endDate=${endDate}`, null, 'GET')
            return response
        } catch (e) {
            console.error(e.message)
            toast.error(e.message)
        }
    }
    return []
}

/**
 * Функция получения всех преподавателей, которые не проходили ПК за последние N лет.
 */
export const getEmployeesByPeriodWithoutTraining = async(yearsWithoutTraining) => {
    if (yearsWithoutTraining > 0) {
        let response
        try {
            response = await request(`/employee/get-by-period-without-training?yearsWithoutTraining=${yearsWithoutTraining}`, null, 'GET')
            return response
        } catch (e) {
            console.error(e.message)
            toast.error(e.message)
        }
    }
    return []
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
