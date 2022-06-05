import {Container} from "@mui/material";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import {getDepartmentById, removeDepartment, saveDepartment} from "../controllers/departmentsController";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

/**
 * Страница редактирования подразделения.
 */
export const EditDepartmentPage = () => {

    // Состояние для хранения данных о подразделении
    const [departmentId, setDepartmentId] = useState(null)

    // Получаем параметр из url страницы
    const params = useParams()

    // Инициализируем форму с помощью библиотеки react-hook-form
    const {
        handleSubmit,
        control,
        setValue,
    } = useForm({
        defaultValues: {
            title: '',
            abbreviation: '',
            surname: '',
            name: '',
            middleName: '',
        }
    })

    // Функция обработки отправки
    const onSubmit = async (data) => {
        // Кладем в data id подразделения (null при создании нового, либо id, при редактировании)
        data.id = departmentId

        // Сохраняем подразделение
        const departmentData = await saveDepartment(data)

        // Кладем в состояние полученный id подразделения
        setDepartmentId(departmentData.Id_podrazdeleniya)

        // Устанавливаем в url страницы полученный id подразделения
        window.history.replaceState({}, '', `/edit-department/${departmentData.Id_podrazdeleniya}`)
    }

    // Функция удаления подразделения
    const deleteDepartment = async () => {
        const response = await removeDepartment(departmentId)
    }

    // Функция для получения данных подразделения в случае редактирования
    const getDepartment = async () => {
        if (params.id !== undefined) {
            // Если есть id, значит мы редактируем существующее подразделение
            // Установим id из url в состояние компонента
            setDepartmentId(params.id)

            // Получаем данные подразделения по id
            const departmentData = await getDepartmentById(params.id)

            // Предзаполняем форму полученными данными из БД
            setValue("title", departmentData.Polnoe_nazvanie)
            setValue("abbreviation", departmentData.Abbreviatura)
            setValue("surname", departmentData.Familiya)
            setValue("name", departmentData.Imya)
            setValue("middleName", departmentData.Otchestvo)
        }
    }

    useEffect(() => {
        // При рендере страницы вызываем получение данных подразделения
        getDepartment()
    }, []);

    return (
        <section className="edit-page">
            <Container>
                <h1 className="title">Редактирование подразделения</h1>

                <div className="edit-page__card">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="input__wrapper">
                            <div className="input__wrapper">
                                <Controller
                                    name={"title"}
                                    required
                                    fullWidth
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <TextField onChange={onChange} value={value} label={"Полное название"} required
                                                   fullWidth inputProps={{maxlength: 60}}/>
                                    )}
                                />
                            </div>
                            <div className="input__wrapper">
                                <Controller
                                    name={"abbreviation"}
                                    required
                                    fullWidth
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <TextField onChange={onChange} value={value} label={"Аббревиатура"} required
                                                   fullWidth inputProps={{maxlength: 12}}/>
                                    )}
                                />
                            </div>
                            <div className="input__wrapper">
                                <Controller
                                    name={"surname"}
                                    required
                                    fullWidth
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <TextField onChange={onChange} value={value} label={"Фамилия заведующего"}
                                                   required
                                                   fullWidth inputProps={{maxlength: 30}}/>
                                    )}
                                />
                            </div>
                            <div className="input__wrapper">
                                <Controller
                                    name={"name"}
                                    required
                                    fullWidth
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <TextField onChange={onChange} value={value} label={"Имя заведующего"} required
                                                   fullWidth inputProps={{maxlength: 30}}/>
                                    )}
                                />
                            </div>
                            <div className="input__wrapper">
                                <Controller
                                    name={"middleName"}
                                    required
                                    fullWidth
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <TextField onChange={onChange} value={value} label={"Отчество заведующего"}
                                                   required
                                                   fullWidth inputProps={{maxlength: 30}}/>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="btn__row">
                            <div className="btn__wrapper">
                                <Button variant="contained" type="submit">Сохранить</Button>
                            </div>
                            <div className="btn__wrapper">
                                <Button variant="contained" color="error" onClick={deleteDepartment}>Удалить</Button>
                            </div>
                        </div>

                    </form>
                </div>
            </Container>
        </section>
    )
}
