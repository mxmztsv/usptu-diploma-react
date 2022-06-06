import {Container, FormControl, InputLabel, Select} from "@mui/material";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import {getEmployeesById, removeEmployee, saveEmployee} from "../controllers/employeesController";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import {getAllDepartments} from "../controllers/departmentsController";

/**
 * Страница редактирования сотрудника, очень похожа на страницу редактирования подразделения.
 */
export const EditEmployeePage = () => {

    const [employeeId, setEmployeeId] = useState(null)
    // В состоянии нужно хранить массив существующих подразделений для элемента select
    const [departments, setDepartments] = useState([])

    const params = useParams()

    const {
        register,
        handleSubmit,
        control,
        setValue,
    } = useForm({
        defaultValues: {
            surname: '',
            name: '',
            middleName: '',
            birthdate: '',
            position: '',
            degree: '',
            rank: '',
            hiringDate: '',
            experience: '',
            department: '',
            login: '',
            password: '',
            isSuperuser: '',
        }
    })

    const onSubmit = async (data) => {
        data.id = employeeId
        const employeeData = await saveEmployee(data)
        setEmployeeId(employeeData.Id_prepodavatelya)
        window.history.replaceState({}, '', `/edit-employee/${employeeData.Id_prepodavatelya}`)
    }

    const deleteEmployee = async () => {
        const response = await removeEmployee(employeeId)
    }

    // Функция получения массива подразделений для вариантов выбора в select
    const getDepartments = async () => {
        const departments = await getAllDepartments()
        setDepartments(departments)
    }

    const getEmployee = async () => {
        if (params.id !== undefined) {
            setEmployeeId(params.id)
            const employeeData = await getEmployeesById(params.id)
            setValue("surname", employeeData.Familiya)
            setValue("name", employeeData.Imya)
            setValue("middleName", employeeData.Otchestvo)
            setValue("birthdate", employeeData.Data_Rozhdeniya)
            setValue("position", employeeData.Dolzhnost)
            setValue("degree", employeeData.Uchenaya_stepen)
            setValue("rank", employeeData.Zvanie)
            setValue("hiringDate", employeeData.Data_priema)
            setValue("department", employeeData.Id_podrazdeleniya)
            setValue("login", employeeData.Login)
            setValue("isSuperuser", employeeData.Is_superuser)
        }
    }

    useEffect(() => {
        // При рендере компонента получем не только данные сотрудника, но и существующие подразделения для select
        getDepartments()
        getEmployee()
    }, []);

    return (
        <section className="edit-page">
            <Container>
                <h1 className="title">Редактирование преподавателя</h1>

                <div className="edit-page__card">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="input__wrapper">
                            <div className="input__wrapper">
                                <Controller
                                    name={"surname"}
                                    required
                                    fullWidth
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <TextField onChange={onChange} value={value} label={"Фамилия"}
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
                                        <TextField onChange={onChange} value={value} label={"Имя"}
                                                   required
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
                                        <TextField onChange={onChange} value={value} label={"Отчество"}
                                                   required
                                                   fullWidth inputProps={{maxlength: 30}}/>
                                    )}
                                />
                            </div>
                            <div className="input__wrapper">
                                <label htmlFor="birthdate" className="date-label">Дата рождения</label>
                                <input type="date" id="birthdate"
                                       {...register("birthdate", {required: true})}
                                />
                            </div>
                            <div className="input__wrapper">
                                <Controller
                                    name={"position"}
                                    required
                                    fullWidth
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <TextField onChange={onChange} value={value} label={"Должность"}
                                                   required
                                                   fullWidth inputProps={{maxlength: 50}}/>
                                    )}
                                />
                            </div>
                            <div className="input__wrapper">
                                <Controller
                                    name={"degree"}
                                    rules={{required: true}}
                                    fullWidth
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <FormControl fullWidth>
                                            <InputLabel id="select-training-type-label">Ученая степень</InputLabel>
                                            <Select
                                                labelId="select-training-type-label"
                                                id="demo-simple-select"
                                                value={value}
                                                label="Ученая степень"
                                                onChange={onChange}
                                            >
                                                <MenuItem value={'-'}>-</MenuItem>
                                                <MenuItem value={'Кандидат наук'}>Кандидат наук</MenuItem>
                                                <MenuItem value={'Доктор наук'}>Доктор наук</MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </div>
                            <div className="input__wrapper">
                                <Controller
                                    name={"rank"}
                                    rules={{required: true}}
                                    fullWidth
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <FormControl fullWidth>
                                            <InputLabel id="select-training-type-label">Звание</InputLabel>
                                            <Select
                                                labelId="select-training-type-label"
                                                id="demo-simple-select"
                                                value={value}
                                                label="Звание"
                                                onChange={onChange}
                                            >
                                                <MenuItem value={'-'}>-</MenuItem>
                                                <MenuItem value={'Доцент'}>Доцент</MenuItem>
                                                <MenuItem value={'Профессор'}>Профессор</MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </div>
                            <div className="input__wrapper">
                                <label htmlFor="hiringDate" className="date-label">Дата приема</label>
                                <input type="date" id="hiringDate"
                                       {...register("hiringDate", {required: true})}
                                />
                            </div>


                            <div className="input__wrapper">
                                <Controller
                                    name={"department"}
                                    rules={{required: true}}
                                    fullWidth
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <FormControl fullWidth>
                                            <InputLabel id="select-training-type-label">Подразделение</InputLabel>
                                            <Select
                                                labelId="select-training-type-label"
                                                id="demo-simple-select"
                                                value={value}
                                                label="Подразделение"
                                                onChange={onChange}
                                            >
                                                {departments.map(department => <MenuItem
                                                    value={department.Id_podrazdeleniya}>{department.Polnoe_nazvanie}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </div>


                            <div className="input__wrapper">
                                <Controller
                                    name={"isSuperuser"}
                                    fullWidth
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <FormControl fullWidth>
                                            <InputLabel id="select-training-type-label">Сделать
                                                суперпользователем</InputLabel>
                                            <Select
                                                labelId="select-training-type-label"
                                                id="demo-simple-select"
                                                value={value}
                                                label="Сделать суперпользователем"
                                                onChange={onChange}
                                            >
                                                <MenuItem value={'true'}>Да</MenuItem>
                                                <MenuItem value={'false'}>Нет</MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </div>

                            <div className="input__wrapper">
                                <Controller
                                    name={"login"}
                                    required
                                    fullWidth
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <TextField onChange={onChange} value={value} label={"Логин для пользователя"}
                                                   required
                                                   fullWidth/>
                                    )}
                                />
                            </div>

                            <div className="input__wrapper">
                                <Controller
                                    name={"password"}
                                    fullWidth
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <TextField onChange={onChange} value={value} label={"Пароль для пользователя"}
                                                   fullWidth/>
                                    )}
                                />
                            </div>

                        </div>

                        <div className="btn__row">
                            <div className="btn__wrapper">
                                <Button variant="contained" type="submit">Сохранить</Button>
                            </div>
                            <div className="btn__wrapper">
                                <Button variant="contained" color="error" onClick={deleteEmployee}>Удалить</Button>
                            </div>
                        </div>

                    </form>
                </div>

            </Container>
        </section>
    )
}
