import {request} from "../services/httpService";
import toast from "react-hot-toast";
import {getUserInfo} from "./authController";

export const getAllTrainings = async () => {
    try {
        const employeeId = getUserInfo().id
        const response = await request(`/training/get-all-by-employee-id/${employeeId}`, null, 'GET')
        return response
    } catch (e) {
        console.error(e.message)
        toast.error(e.message)
    }
}

export const saveTraining = async (data) => {
    try {
        data.employeeId = getUserInfo().id
        const response = await request('/training/save', data)
        toast.success('Сохранено')
        return response
    } catch (e) {
        console.error(e.message)
        toast.error(e.message)
    }
}
