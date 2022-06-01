import {request} from "../services/httpService";
import toast from "react-hot-toast";

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
