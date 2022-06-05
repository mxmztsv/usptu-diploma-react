import {BASE_URL} from "../config/api";
import {signOut} from "../controllers/authController";

/**
 * Функция отправки http запросов
 */
export const request = async (url, body = null, method = 'POST', headers = {
    'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36'
}) => {
    try {

        if (body) {
            // Если переданно тело запроса, приводим его к строке
            body = JSON.stringify(body)
            // В заголовок в таком случае нужно установить 'Content-Type': 'application/json'
            headers['Content-Type'] = 'application/json'
        }

        // Делаем запрос с помощью функции fetch, в праметрах дополнительно указываем, что нужно включить credentials
        // Чтоб куки отправлялись с каждым запросом.
        const response = await fetch(BASE_URL + url, { method, body, headers, credentials: 'include' })
        let data
        try {
            // Получаем данные из тела ответа в json
            data = await response.json()
        } catch (e) {}


        if (!response.ok) {
            // Если статус ответа не 200, значит произошла ошибка
            if (response.status === 401) {
                // Статус 401 значит что пользователь не авторизован, вызываем функцию выхода
                await signOut()
            }
            // Пробрасываем ошибку
            throw new Error(data.message || 'ERR CODE ' + response.status + '. ' + 'Something went wrong during http request')
        }
        // Возвращаем ответ
        return data
    } catch (e) {
        throw e
    }
}
