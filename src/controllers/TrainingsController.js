import {request} from "../services/httpService";
import toast from "react-hot-toast";
import {getUserInfo} from "./authController";
import {BASE_URL} from "../config/api";
import axios from "axios";
import {toTranslit} from "../services/translitService";

/**
 * Функция получения всех повышений квалификации.
 */
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


/**
 * Функция получения ПК по id.
 */
export const getTrainingById = async (trainingId) => {
    try {
        const response = await request(`/training/get-by-id/${trainingId}`, null, 'GET')
        return response
    } catch (e) {
        console.error(e.message)
        toast.error(e.message)
    }
}


/**
 * Функция получения всех ПК по id преподавателя.
 */
export const getAllTrainingsByEmployeeId = async (employeeId) => {
    try {
        const response = await request(`/training/get-all-by-employee-id/${employeeId}`, null, 'GET')
        return response
    } catch (e) {
        console.error(e.message)
        toast.error(e.message)
    }
}


/**
 * Функция получения всех форм ПК по id ПК.
 */
export const getTrainingFormByTrainingId = async (trainingId) => {
    try {
        const response = await request(`/training-form/get-by-training-id/${trainingId}`, null, 'GET')
        return response
    } catch (e) {
        console.error(e.message)
        toast.error(e.message)
    }
}

/**
 * Функция получения всех форм стажировки по id ПК.
 */
export const getInternshipFormByTrainingId = async (trainingId) => {
    try {
        const response = await request(`/internship-form/get-by-training-id/${trainingId}`, null, 'GET')
        return response
    } catch (e) {
        console.error(e.message)
        toast.error(e.message)
    }
}


/**
 * Функция сохранения ПК.
 */
export const saveTraining = async (data) => {
    let response
    try {
        data.employeeId = getUserInfo().id
        response = await request('/training/save', data)
        toast.success('Сохранено')
    } catch (e) {
        console.error(e.message)
        toast.error(e.message)
        return
    }
    return response
}


/**
 * Функция сохранения формы стажировки.
 */
export const saveInternshipForm = async (data) => {
    let response
    try {
        response = await request('/internship-form/save', data)
        toast.success('Сохранено')
    } catch (e) {
        console.error(e.message)
        toast.error(e.message)
        return
    }
    return response
}


/**
 * Функция сохранения формы ПК.
 */
export const saveTrainingForm = async (data) => {
    let response
    try {
        response = await request('/training-form/save', data)
        toast.success('Сохранено')
    } catch (e) {
        console.error(e.message)
        toast.error(e.message)
        return
    }
    return response

}


/**
 * Функция удаления ПК.
 */
export const removeTraining = async (trainingId) => {
    let response
    try {
        response = await request('/training/remove', {id: trainingId})
        toast.success('Удалено')
        window.location.href = '/trainings'
    } catch (e) {
        console.error(e.message)
        toast.error(e.message)
        return
    }
    return response
}

/**
 * Функция удаления формы стажировки.
 */

export const removeInternshipForm = async (formId) => {
    let response
    try {
        response = await request('/internship-form/remove', {id: formId})
        window.location.reload()
        toast.success('Удалено')
    } catch (e) {
        console.error(e.message)
        toast.error(e.message)
        return
    }
    return response
}


/**
 * Функция удаления формы ПК.
 */
export const removeTrainingForm = async (formId) => {
    let response
    try {
        response = await request('/training-form/remove', {id: formId})
        window.location.reload()
        toast.success('Удалено')
    } catch (e) {
        console.error(e.message)
        toast.error(e.message)
        return
    }
    return response
}


/**
 * Функция генерации документа.
 */
export const generateDocument = async (type, trainingId) => {
    let filename = null
    try {
        const response = await request('/training/generate-document',
            {
                type,
                trainingId
            })
        filename = response.fileName
        toast.success('Документ создан')
    } catch (e) {
        console.error(e.message)
        toast.error(e.message)
        return
    }
    return filename
}


/**
 * Функция загрузки документа.
 */
export const uploadDocument = async (file, trainingId, reportType) => {
    // Создаем объект формы
    const data = new FormData()
    let filename = null
    if (file !== null) {
        // Добавляем в форму данные
        data.append('file', file)
        data.append('filename', toTranslit(file.name))
        data.append('trainingId', trainingId)
        data.append('reportType', reportType)

        try {
            const config = {
                headers: {
                    'content-type': 'multipart/form-data', // Указываем такой заголовок, тк отправляем форму с файлом
                },
            }
            // Используем для отправки библиотку axios, тк с ее помощью удобнее отправлять форму с файлами
            const response = await axios.post(`${BASE_URL}/training/upload-document`, data, config)
            filename = response.data.filename
            if (filename) {
                toast.success('Отчет загружен')
            }
        } catch (e) {
            console.error(e.message)
            toast.error(e.message)
        }
        return filename
    }
}
