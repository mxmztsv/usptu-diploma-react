import {Controller, useForm} from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";
import {
    generateDocument,
    getInternshipFormByTrainingId,
    removeInternshipForm,
    saveInternshipForm,
    uploadDocument
} from "../controllers/TrainingsController";
import {BASE_URL} from "../config/api";

/**
 * Компонент формы для отчета о стажировке
 */
export const InternshipForm = ({trainingId}) => {

    // Состояния компонента
    const [internshipFormId, setInternshipFormId] = useState(null);
    const [generatedReportName, setGeneratedReportName] = useState(null);
    const [uploadedReportName, setUploadedReportName] = useState(null);
    const [reportFile, setReportFile] = useState(null);
    const [generatedFormName, setGeneratedFormName] = useState(null);
    const [uploadedFormName, setUploadedFormName] = useState(null);
    const [formFile, setFormFile] = useState(null);

    // Инициализируем обработчик формы из библиотки react-hook-form
    const {
        handleSubmit,
        control,
        setValue,
    } = useForm({
        defaultValues: {
            topic: '',
            location: '',
            internshipForm: '',
            companyName: '',
            representation: '',
            recommendations: '',
            directorSurname: '',
            directorName: '',
            directorMiddleName: ''
        }
    })

    // Функция обработки отправки формы
    const onSubmit = async (data) => {
        // Добавляем в data id повышения квалификации и id стажировки
        data.trainingId = trainingId
        data.formId = internshipFormId

        // Отпрвляем данные
        const internshipFormData = await saveInternshipForm(data)

        // Устанавливаем id формы в состояние компонента
        setInternshipFormId(internshipFormData.Id_formy_stazhirovki)
    }

    // Функция получает данные формы по id при редактировании
    const getFormData = async () => {
        if (trainingId) {
            // Если у формы уже есть id, значит мы редактируем существующую форму.
            // Нужно получить ее данные из БД
            const formData = await getInternshipFormByTrainingId(trainingId)

            // Устанавливаем некоторые данные в состояние компонента
            setInternshipFormId(formData.Id_formy_stazhirovki)
            setGeneratedReportName(formData.Otchet)
            setUploadedReportName(formData.Zagruzhenniy_otchet)
            setGeneratedFormName(formData.Forma_programmy_stazhirovki)
            setUploadedFormName(formData.Zagruzhennaya_forma_programmy_stazhirovki)

            // Также предзаполняем поля формы раннее сохраненными в БД данными
            setValue("topic", formData.Tematika)
            setValue("location", formData.Mesto)
            setValue("companyName", formData.Naimenovanie_organizacii)
            setValue("representation", formData.Sistemnoe_izlozhenie)
            setValue("recommendations", formData.Rekomendacii)
            setValue("directorSurname", formData.Familiya_rukovoditelya)
            setValue("directorName", formData.Imya_rukovoditelya)
            setValue("directorMiddleName", formData.Otchestvo_rukovoditelya)
        }
    }

    // Функция обработки удаления формы
    const deleteForm = async () => {
        await removeInternshipForm(internshipFormId)
    }

    // Функция обработки создания отчета из формы
    const createReport = async () => {
        const filename = await generateDocument("internship_report", trainingId)

        //Устанавливаем полученное имя файла в состояние
        setGeneratedReportName(filename)
    }

    // Функция обработки загрузки файла отчета
    const handleReportFileInput = (event) => {
        setReportFile(event.target.files[0])
    }

    // Функция обработки отправки файла отчета
    const uploadReport = async () => {
        const filename = await uploadDocument(reportFile, trainingId, 'internship_report')
        setUploadedReportName(filename)
    }

    // Функция обработки создания формы
    const createForm = async () => {
        const filename = await generateDocument("internship_form", trainingId)
        setGeneratedFormName(filename)
    }

    // Функция обработки загрузки файла формы
    const handleFormFileInput = (event) => {
        setFormFile(event.target.files[0])
    }

    // Функция обработки отправки файла формы
    const uploadForm = async () => {
        const filename = await uploadDocument(formFile, trainingId, 'internship_form')
        setUploadedFormName(filename)
    }

    useEffect(() => {
        // При рендере компонента вызывается функция получения данных формы по id
        getFormData()
    }, []);


    return (
        <>
            <div className="edit-page__card">
                <h2>Форма стажировки</h2>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="input__wrapper">
                        <Controller
                            name={"topic"}
                            required
                            fullWidth
                            control={control}
                            render={({field: {onChange, value}}) => (
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
                            render={({field: {onChange, value}}) => (
                                <TextField onChange={onChange} value={value} label={"Место проведения"} required
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
                            render={({field: {onChange, value}}) => (
                                <TextField onChange={onChange} value={value}
                                           label={"Наименование организации проводящей стажировку"} required
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
                            render={({field: {onChange, value}}) => (
                                <TextField onChange={onChange} value={value}
                                           label={"Системное изложение о проделанной работе"} required
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
                            render={({field: {onChange, value}}) => (
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
                            render={({field: {onChange, value}}) => (
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
                            render={({field: {onChange, value}}) => (
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
                            render={({field: {onChange, value}}) => (
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
                            <Button variant="contained" color="error" onClick={deleteForm}
                                    disabled={internshipFormId === null}>Удалить</Button>
                        </div>
                    </div>

                    <div className="btn__row">
                        <div className="btn__wrapper">
                            <Button variant="contained" onClick={createForm} disabled={internshipFormId === null}>Создать
                                форму</Button>
                        </div>
                        <div className="btn__wrapper">
                            <Button variant="contained" href={BASE_URL + '/download/generated/' + generatedFormName}
                                    disabled={generatedFormName === null}>Скачать форму</Button>
                        </div>
                    </div>

                    <div className="btn__row">
                        <div className="btn__wrapper">
                            <Button variant="contained" onClick={createReport} disabled={internshipFormId === null}>Создать
                                отчет</Button>
                        </div>
                        <div className="btn__wrapper">
                            <Button variant="contained" href={BASE_URL + '/download/generated/' + generatedReportName}
                                    disabled={generatedReportName === null}>Скачать отчет</Button>
                        </div>
                    </div>

                </form>
            </div>
            <div className="edit-page__card">
                <h2>Загрузка подписанной формы</h2>

                <input type="file" id="file" name="file" className="file-input" onChange={handleFormFileInput}/>
                <div className="btn__row">
                    <div className="btn__wrapper">
                        <Button variant="contained" onClick={uploadForm}>Загрузить форму</Button>
                    </div>
                    <div className="btn__wrapper">
                        <Button variant="contained" href={BASE_URL + '/download/uploaded/' + uploadedFormName}
                                disabled={uploadedFormName === null}>Скачать загруженную форму</Button>
                    </div>
                </div>
            </div>
            <div className="edit-page__card">
                <h2>Загрузка подписанного отчета</h2>

                <input type="file" id="file" name="file" className="file-input" onChange={handleReportFileInput}/>
                <div className="btn__row">
                    <div className="btn__wrapper">
                        <Button variant="contained" onClick={uploadReport}>Загрузить отчет</Button>
                    </div>
                    <div className="btn__wrapper">
                        <Button variant="contained" href={BASE_URL + '/download/uploaded/' + uploadedReportName}
                                disabled={uploadedReportName === null}>Скачать загруженный отчет</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
