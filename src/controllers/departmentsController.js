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