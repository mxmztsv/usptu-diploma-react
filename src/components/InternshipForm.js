import {Controller, useForm} from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";
import {
    generateDocument,
    getInternshipFormByTrainingId,
    removeInternshipForm,
    saveInternshipForm
} from "../controllers/TrainingsController";
import {BASE_URL} from "../config/api";

export const InternshipForm = ({ trainingId }) => {

    const [internshipFormId, setInternshipFormId] = useState(null);
    const [documentLink, setDocumentLink] = useState(null);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: {errors},
    } = useForm()

    const onSubmit = async (data) => {
        data.trainingId = trainingId
        data.formId = internshipFormId
        const internshipFormData = await saveInternshipForm(data)
        setInternshipFormId(internshipFormData.Id_formy_stazhirovki)
    }

    const getFormData = async () => {
        if (trainingId) {
            const formData = await getInternshipFormByTrainingId(trainingId)
            setInternshipFormId(formData.Id_formy_stazhirovki)
            setValue("topic", formData.Tematika)
            setValue("location", formData.Mesto)
            setValue("internshipForm", formData.Forma_programmy_stazhirovki)
            setValue("companyName", formData.Naimenovanie_organizacii)
            setValue("representation", formData.Sistemnoe_izlozhenie)
            setValue("recommendations", formData.Rekomendacii)
            setValue("directorSurname", formData.Familiya_rukovoditelya)
            setValue("directorName", formData.Imya_rukovoditelya)
            setValue("directorMiddleName", formData.Otchestvo_rukovoditelya)
        }
    }

    const deleteForm = async () => {
        await removeInternshipForm(internshipFormId)
    }

    const createReport = async () => {
        const filename = await generateDocument("internship_report", trainingId)
        setDocumentLink(filename)
    }

    useEffect(() => {
        getFormData()
    }, []);


    return (
        <div className="edit-page__card">
            <h2>Форма стажировки</h2>
            <form onSubmit={handleSubmit(onSubmit)} >

                <div className="input__wrapper">
                    <Controller
                        name={"topic"}
                        required
                        fullWidth
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField onChange={onChange} value={value} label={"Тематика"} required
                                       fullWidth inputProps={{maxlength: 30}}/>
                        )}
                    />
                </div>
                <div className="input__wrapper">
                    <Controller
                        name={"location"}
                        required
                        fullWidth
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField onChange={onChange} value={value} label={"Место проведения"} required
                                       fullWidth inputProps={{maxlength: 30}}/>
                        )}
                    />
                </div>
                <div className="input__wrapper">
                    <Controller
                        name={"internshipForm"}
                        required
                        fullWidth
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField onChange={onChange} value={value} label={"Форма программы стажировки"} required
                                       fullWidth inputProps={{maxlength: 30}}/>
                        )}
                    />
                </div>
                <div className="input__wrapper">
                    <Controller
                        name={"companyName"}
                        required
                        fullWidth
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField onChange={onChange} value={value} label={"Наименование организации проводящей стажировку"} required
                                       fullWidth multiline inputProps={{maxlength: 150}}/>
                        )}
                    />
                </div>
                <div className="input__wrapper">
                    <Controller
                        name={"representation"}
                        required
                        fullWidth
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField onChange={onChange} value={value} label={"Системное изложение о проделанной работе"} required
                                       fullWidth multiline inputProps={{maxlength: 150}}/>
                        )}
                    />
                </div>
                <div className="input__wrapper">
                    <Controller
                        name={"recommendations"}
                        required
                        fullWidth
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField onChange={onChange} value={value} label={"Рекомендации"} required
                                       fullWidth multiline inputProps={{maxlength: 150}}/>
                        )}
                    />
                </div>
                <div className="input__wrapper">
                    <Controller
                        name={"directorSurname"}
                        required
                        fullWidth
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField onChange={onChange} value={value} label={"Фамилия руководителя"} required
                                       fullWidth inputProps={{maxlength: 30}}/>
                        )}
                    />
                </div>
                <div className="input__wrapper">
                    <Controller
                        name={"directorName"}
                        required
                        fullWidth
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField onChange={onChange} value={value} label={"Имя руководителя"} required
                                       fullWidth inputProps={{maxlength: 30}}/>
                        )}
                    />
                </div>
                <div className="input__wrapper">
                    <Controller
                        name={"directorMiddleName"}
                        required
                        fullWidth
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField onChange={onChange} value={value} label={"Отчество руководителя"} required
                                       fullWidth inputProps={{maxlength: 30}}/>
                        )}
                    />
                </div>

                <div className="btn__row">
                    <div className="btn__wrapper">
                        <Button variant="contained" type="submit">Сохранить</Button>
                    </div>
                    <div className="btn__wrapper">
                        <Button variant="contained" onClick={createReport}>Создать отчет</Button>
                    </div>
                    <div className="btn__wrapper">
                        <Button variant="contained" onClick={() => {window.location.href = `${BASE_URL}/documents/${documentLink}`}}>Скачать отчет</Button>
                    </div>
                    <div className="btn__wrapper">
                        <Button variant="contained" color="error" onClick={deleteForm}>Удалить</Button>
                    </div>
                </div>

            </form>
        </div>
    )
}
