/**
 * Функция преобразует дату в RU формат.
 * Пояснение: дата храниться в БД по умолчанию в формате гггг-мм-дд,
 * но для русского пользователя привычнее формат дд.мм.гггг
 */
export const toRU = (dateString) => {
    if (dateString) {
        return dateString.split('-').reverse().join('.')
    }
}
