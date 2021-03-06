/**
 * Функция преобразует текст в транслит и заменяем пробелы на _.
 * Это нужно для называний документов.
 * Иначе из-за кодировки русские символы отображаются некорректно.
 */
export const toTranslit= (text) => {

    // Ассоциативный массив символов
    const converter = {
        'а': 'a',    'б': 'b',    'в': 'v',    'г': 'g',    'д': 'd',
        'е': 'e',    'ё': 'e',    'ж': 'zh',   'з': 'z',    'и': 'i',
        'й': 'y',    'к': 'k',    'л': 'l',    'м': 'm',    'н': 'n',
        'о': 'o',    'п': 'p',    'р': 'r',    'с': 's',    'т': 't',
        'у': 'u',    'ф': 'f',    'х': 'h',    'ц': 'c',    'ч': 'ch',
        'ш': 'sh',   'щ': 'sch',  'ь': '',     'ы': 'y',    'ъ': '',
        'э': 'e',    'ю': 'yu',   'я': 'ya'
    }

    // Приводим текст к нижнему регистру
    text = text.toLowerCase()

    let answer = ''

    // Заменяем символы в цикле
    for (var i = 0; i < text.length; ++i ) {
        if (converter[text[i]] === undefined){
            answer += text[i];
        } else {
            answer += converter[text[i]]
        }
    }

    // Заменяем пробелы на _
    answer = answer.replace(/ /g,"_")

    // Возвращаем преобразованный текст
    return answer
}
