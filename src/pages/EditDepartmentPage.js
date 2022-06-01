import {Container} from "@mui/material";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import {getDepartmentById, removeDepartment, saveDepartment} from "../controllers/departmentsController";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const EditDepartmentPage = () => {

    const [departmentId, setDepartmentId] = useState(null)

    const params = useParams()

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: {errors},
    } = useForm({
        defaultValues: {
            title: '',
            abbreviation: '',
            surname: '',
            name: '',
            middleName: '',
        }
    })

    const onSubmit = async (data) => {
        data.id = departmentId
        const departmentData = await saveDepartment(data)
        setDepartmentId(departmentData.Id_podrazdeleniya)
        window.history.replaceState({}, '', `/edit-department/${departmentData.Id_podrazdeleniya}`)
    }

    const deleteDepartment = async () => {
        const response = await removeDepartment(departmentId)
        console.log(response)
    }

    const getDepartment = async () => {
        if (params.id !== undefined) {
            setDepartmentId(params.id)
            const departmentData = await getDepartmentById(params.id)
            setValue("title", departmentData.Polnoe_nazvanie)
            setValue("abbreviation", departmentData.Abbreviatura)
            setValue("surname", departmentData.Familiya)
            setValue("name", departmentData.Imya)
            setValue("middleName", departmentData.Otchestvo)
        }
    }

    useEffect(() => {
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
