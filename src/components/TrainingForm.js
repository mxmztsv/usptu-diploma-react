import {Controller, useForm} from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";
import {
    generateDocument,
    getTrainingFormByTrainingId,
    removeTrainingForm,
    saveTrainingForm,
    uploadDocument
} from "../controllers/TrainingsController";
import {BASE_URL} from "../config/api";
import {FormControl, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

/**
 * Компонент формы для отчета о повышении квалификации. Все аналогично как в форме стажировки.
 */
export const TrainingForm = ({trainingId}) => {

    const [trainingFormId, setTrainingFormId] = useState(null);
    const [generatedReportName, setGeneratedReportName] = useState(null);
    const [uploadedReportName, setUploadedReportName] = useState(null);
    const [reportFile, setReportFile] = useState(null);
    const [generatedFormName, setGeneratedFormName] = useState(null);
    const [uploadedFormName, setUploadedFormName] = useState(null);
    const [formFile, setFormFile] = useState(null);

    const {
        register,
        handleSubmit,
        control,
        setValue,
    } = useForm({
        defaultValues: {
            topic: '',
            courseName: '',
            trainingLocation: '',
            learningPoints: '',
            trainingResults: '',
            workingDisciplineChanges: '',
            workingCourseChanges: '',
            disiciplineRefactoring: '',
            courseRefactoring: '',
            disciplineAPIM: '',
            courseAPIM: '',
            anotherResults: '',
            courseContentRating: '',
            courseRating: '',
            courseContentMatching: '',
            organizationLevelRating: '',
            expediency: '',
            reportDate: '',
            reportNumber: '',
            protocolExtract: '',
            departmentsResolution: '',
            resolutionReviews: '',
            poorPerfomanceReasons: '',
            improvementSuggestions: ''
        }
    })

    const onSubmit = async (data) => {
        data.trainingId = trainingId
        data.formId = trainingFormId
        console.log(data)
        const trainingFormData = await saveTrainingForm(data)
        setTrainingFormId(trainingFormData.Id_formy_PK)
    }

    const getFormData = async () => {
        if (trainingId) {
            const formData = await getTrainingFormByTrainingId(trainingId)
            setTrainingFormId(formData.Id_formy_PK)
            setGeneratedReportName(formData.Otchet)
            setUploadedReportName(formData.Zagruzhenniy_otchet)
            setGeneratedFormName(formData.Forma_programmy_PK)
            setUploadedFormName(formData.Zagruzhennaya_forma_programmy_PK)
            setValue("topic", formData.Tematika)
            setValue("courseName", formData.Naimenovanie_programmy_PK)
            setValue("trainingLocation", formData.Mesto_prohozhdeniya_PK)
            setValue("learningPoints", formData.Izuchennye_voprosy)
            setValue("trainingResults", formData.Rezultaty_PK)
            setValue("workingDisciplineChanges", formData.Izmeneniya_v_rabochih_programmy_disciplin)
            setValue("workingCourseChanges", formData.Izmenenie_v_rabochie_programmy_obrazovatelnyh_programm)
            setValue("disiciplineRefactoring", formData.Pererabotka_po_disciplinam)
            setValue("courseRefactoring", formData.Pererabotka_dlya_obrazovatelnyh_programm)
            setValue("disciplineAPIM", formData.Razrabotka_APIM_po_disciplinam)
            setValue("courseAPIM", formData.Razrabotka_APIM_dlya_obrazovatelnyh_programm)
            setValue("anotherResults", formData.Drugie_pokazateli_rezultatov_PK)
            setValue("courseContentRating", formData.Ocenka_soderzhaniya_programmy_obucheniya)
            setValue("courseRating", formData.Ocenka_zayavlennoj_programmy)
            setValue("courseContentMatching", formData.Sootvetstvie_soderzhaniya_programmy)
            setValue("organizationLevelRating", formData.Ocenka_urovnya_organizacii_PK)
            setValue("expediency", formData.Celesoobraznost_napravleniya)
            setValue("reportDate", formData.Data_protokola)
            setValue("reportNumber", formData.Nomer_protokola)
            setValue("protocolExtract", formData.Vypiska_iz_protokola)
            setValue("departmentsResolution", formData.Postanovlenie_kafedry)
            setValue("resolutionReviews", formData.Kommentarij_k_postanovleniyu)
            setValue("poorPerfomanceReasons", formData.Prichiny_nizkoj_rezultativnosti)
            setValue("improvementSuggestions", formData.Predlozheniya_po_ustraneniyu)
        }
    }

    const deleteForm = async () => {
        await removeTrainingForm(trainingFormId)
    }

    const createReport = async () => {
        const filename = await generateDocument("training_report", trainingId)
        setGeneratedReportName(filename)
    }

    const handleReportFileInput = (event) => {
        setReportFile(event.target.files[0])
    }

    const uploadReport = async () => {
        const filename = await uploadDocument(reportFile, trainingId, 'training_report')
        setUploadedReportName(filename)
    }

    const createForm = async () => {
        const filename = await generateDocument("training_form", trainingId)
        setGeneratedFormName(filename)
    }

    const handleFormFileInput = (event) => {
        setFormFile(event.target.files[0])
    }

    const uploadForm = async () => {
        const filename = await uploadDocument(formFile, trainingId, 'training_form')
        setUploadedFormName(filename)
    }

    useEffect(() => {
        getFormData()
    }, []);


    return (
        <>
            <div className="edit-page__card">
                <h2>Форма повышения квалификации</h2>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="input__wrapper">
                        <Controller
                            name={"topic"}
                            required
                            fullWidth
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <TextField onChange={onChange} value={value} label={"Тематика"} required
                                           fullWidth inputProps={{maxlength: 10}}/>
                            )}
                        />
                    </div>
                    <div className="input__wrapper">
                        <Controller
                            name={"courseName"}
                            required
                            fullWidth
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <TextField onChange={onChange} value={value}
                                           label={"Наименование программы ПК"} required
                                           fullWidth multiline inputProps={{maxlength: 30}}/>
                            )}
                        />
                    </div>
                    <div className="input__wrapper">
                        <Controller
                            name={"trainingLocation"}
                            required
                            fullWidth
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <TextField onChange={onChange} value={value}
                                           label={"Место прохождения ПК"} required
                                           fullWidth inputProps={{maxlength: 50}}/>
                            )}
                        />
                    </div>
                    <div className="input__wrapper">
                        <Controller
                            name={"learningPoints"}
                            required
                            fullWidth
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <TextField onChange={onChange} value={value} label={"Изученные вопросы"} required
                                           fullWidth multiline inputProps={{maxlength: 255}}/>
                            )}
                        />
                    </div>
                    <div className="input__wrapper">
                        <Controller
                            name={"trainingResults"}
                            required
                            fullWidth
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <TextField onChange={onChange} value={value} label={"Результаты ПК"} required
                                           fullWidth multiline inputProps={{maxlength: 255}}/>
                            )}
                        />
                    </div>
                    <div className="input__wrapper">
                        <Controller
                            name={"workingDisciplineChanges"}
                            required
                            fullWidth
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <TextField onChange={onChange} value={value}
                                           label={"Изменения в рабочих программы дисциплин"} required
                                           fullWidth multiline inputProps={{maxlength: 255}}/>
                            )}
                        />
                    </div>
                    <div className="input__wrapper">
                        <Controller
                            name={"workingCourseChanges"}
                            required
                            fullWidth
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <TextField onChange={onChange} value={value}
                                           label={"Изменение в рабочие программы образовательных программ"} required
                                           fullWidth multiline inputProps={{maxlength: 255}}/>
                            )}
                        />
                    </div>
                    <div className="input__wrapper">
                        <Controller
                            name={"disiciplineRefactoring"}
                            required
                            fullWidth
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <TextField onChange={onChange} value={value} label={"Переработка по дисциплинам"}
                                           required
                                           fullWidth multiline inputProps={{maxlength: 255}}/>
                            )}
                        />
                    </div>
                    <div className="input__wrapper">
                        <Controller
                            name={"courseRefactoring"}
                            required
                            fullWidth
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <TextField onChange={onChange} value={value}
                                           label={"Переработка для образовательных программ"} required
                                           fullWidth multiline inputProps={{maxlength: 255}}/>
                            )}
                        />
                    </div>
                    <div className="input__wrapper">
                        <Controller
                            name={"disciplineAPIM"}
                            required
                            fullWidth
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <TextField onChange={onChange} value={value}
                                           label={"Разработка АПИМ (КИМ) по дисциплинам"} required
                                           fullWidth multiline inputProps={{maxlength: 255}}/>
                            )}
                        />
                    </div>
                    <div className="input__wrapper">
                        <Controller
                            name={"courseAPIM"}
                            required
                            fullWidth
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <TextField onChange={onChange} value={value}
                                           label={"Разработка АПИМ (КИМ) для образовательных программ"} required
                                           fullWidth multiline inputProps={{maxlength: 255}}/>
                            )}
                        />
                    </div>
                    <div className="input__wrapper">
                        <Controller
                            name={"anotherResults"}
                            required
                            fullWidth
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <TextField onChange={onChange} value={value} label={"Другие показатели результатов ПК"}
                                           required
                                           fullWidth inputProps={{maxlength: 50}}/>
                            )}
                        />
                    </div>

                    <div className="input__wrapper">
                        <Controller
                            name={"courseContentRating"}
                            rules={{required: true}}
                            fullWidth
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <FormControl fullWidth>
                                    <InputLabel id="select-training-type-label">Оценка содержания программы
                                        обучения</InputLabel>
                                    <Select
                                        labelId="select-training-type-label"
                                        id="demo-simple-select"
                                        value={value}
                                        label="Оценка содержания программы обучения"
                                        onChange={onChange}
                                    >
                                        <MenuItem value={'Отлично'}>Отлично</MenuItem>
                                        <MenuItem value={'Хорошо'}>Хорошо</MenuItem>
                                        <MenuItem value={'Удовлетворительно'}>Удовлетворительно</MenuItem>
                                        <MenuItem value={'Неудовлетворительно'}>Неудовлетворительно</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </div>

                    <div className="input__wrapper">
                        <Controller
                            name={"courseRating"}
                            rules={{required: true}}
                            fullWidth
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <FormControl fullWidth>
                                    <InputLabel id="select-training-type-label">Оценка соответствия заявленной программы
                                        прослушанному материалу</InputLabel>
                                    <Select
                                        labelId="select-training-type-label"
                                        id="demo-simple-select"
                                        value={value}
                                        label="Оценка соответствия заявленной программы прослушанному материалу"
                                        onChange={onChange}
                                    >
                                        <MenuItem value={'Отлично'}>Отлично</MenuItem>
                                        <MenuItem value={'Хорошо'}>Хорошо</MenuItem>
                                        <MenuItem value={'Удовлетворительно'}>Удовлетворительно</MenuItem>
                                        <MenuItem value={'Неудовлетворительно'}>Неудовлетворительно</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </div>

                    <div className="input__wrapper">
                        <Controller
                            name={"courseContentMatching"}
                            rules={{required: true}}
                            fullWidth
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <FormControl fullWidth>
                                    <InputLabel id="select-training-type-label">Соответствие содержания программы
                                        требованиям</InputLabel>
                                    <Select
                                        labelId="select-training-type-label"
                                        id="demo-simple-select"
                                        value={value}
                                        label="Соответствие содержания программы требованиям"
                                        onChange={onChange}
                                    >
                                        <MenuItem value={'Соответствует'}>Соответствует</MenuItem>
                                        <MenuItem value={'Не соответствует'}>Не соответствует</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </div>

                    <div className="input__wrapper">
                        <Controller
                            name={"organizationLevelRating"}
                            rules={{required: true}}
                            fullWidth
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <FormControl fullWidth>
                                    <InputLabel id="select-training-type-label">Оценка уровня организации
                                        ПК</InputLabel>
                                    <Select
                                        labelId="select-training-type-label"
                                        id="demo-simple-select"
                                        value={value}
                                        label="Оценка уровня организации ПК"
                                        onChange={onChange}
                                    >
                                        <MenuItem value={'Отлично'}>Отлично</MenuItem>
                                        <MenuItem value={'Хорошо'}>Хорошо</MenuItem>
                                        <MenuItem value={'Удовлетворительно'}>Удовлетворительно</MenuItem>
                                        <MenuItem value={'Неудовлетворительно'}>Неудовлетворительно</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </div>

                    <div className="input__wrapper">
                        <Controller
                            name={"expediency"}
                            rules={{required: true}}
                            fullWidth
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <FormControl fullWidth>
                                    <InputLabel id="select-training-type-label">Целесообразность
                                        направления</InputLabel>
                                    <Select
                                        labelId="select-training-type-label"
                                        id="demo-simple-select"
                                        value={value}
                                        label="Целесообразность направления"
                                        onChange={onChange}
                                    >
                                        <MenuItem value={'Целесообразно'}>Целесообразно</MenuItem>
                                        <MenuItem value={'Нецелесообразно'}>Нецелесообразно</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </div>

                    <div className="input__wrapper">
                        <label htmlFor="reportDate" className="date-label">Дата протокола</label>
                        <input type="date" id="reportDate"
                               {...register("reportDate", {required: true})}
                        />
                    </div>

                    <div className="input__wrapper">
                        <Controller
                            name={"reportNumber"}
                            required
                            fullWidth
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <TextField onChange={onChange} value={value} label={"Номер протокола"} required
                                           fullWidth/>
                            )}
                        />
                    </div>

                    <div className="input__wrapper">
                        <Controller
                            name={"protocolExtract"}
                            required
                            fullWidth
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <TextField onChange={onChange} value={value} label={"Выписка из протокола"} required
                                           fullWidth multiline inputProps={{maxlength: 255}}/>
                            )}
                        />
                    </div>

                    <div className="input__wrapper">
                        <Controller
                            name={"departmentsResolution"}
                            required
                            fullWidth
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <TextField onChange={onChange} value={value} label={"Постановление кафедры"} required
                                           fullWidth multiline inputProps={{maxlength: 255}}/>
                            )}
                        />
                    </div>

                    <div className="input__wrapper">
                        <Controller
                            name={"resolutionReviews"}
                            required
                            fullWidth
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <TextField onChange={onChange} value={value} label={"Комментарий к постановлению"}
                                           required
                                           fullWidth multiline inputProps={{maxlength: 255}}/>
                            )}
                        />
                    </div>

                    <div className="input__wrapper">
                        <Controller
                            name={"poorPerfomanceReasons"}
                            required
                            fullWidth
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <TextField onChange={onChange} value={value} label={"Причины низкой результативности"}
                                           required
                                           fullWidth multiline inputProps={{maxlength: 255}}/>
                            )}
                        />
                    </div>

                    <div className="input__wrapper">
                        <Controller
                            name={"improvementSuggestions"}
                            required
                            fullWidth
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <TextField onChange={onChange} value={value} label={"Предложения по устранению"}
                                           required
                                           fullWidth multiline inputProps={{maxlength: 255}}/>
                            )}
                        />
                    </div>

                    <div className="btn__row">
                        <div className="btn__wrapper">
                            <Button variant="contained" type="submit">Сохранить</Button>
                        </div>
                        <div className="btn__wrapper">
                            <Button variant="contained" color="error" onClick={deleteForm}
                                    disabled={trainingFormId === null}>Удалить</Button>
                        </div>
                    </div>

                    <div className="btn__row">
                        <div className="btn__wrapper">
                            <Button variant="contained" onClick={createForm} disabled={trainingFormId === null}>Создать
                                форму</Button>
                        </div>
                        <div className="btn__wrapper">
                            <Button variant="contained" href={BASE_URL + '/download/generated/' + generatedFormName}
                                    disabled={generatedFormName === null}>Скачать форму</Button>
                        </div>
                    </div>

                    <div className="btn__row">
                        <div className="btn__wrapper">
                            <Button variant="contained" onClick={createReport} disabled={trainingFormId === null}>Создать
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
