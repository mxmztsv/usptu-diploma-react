import {useParams} from "react-router-dom";
import Container from "@mui/material/Container";
import {Controller, useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {FormControl, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {getTrainingById, removeTraining, saveTraining} from "../controllers/TrainingsController";
import {useEffect, useState} from "react";
import {InternshipForm} from "../components/InternshipForm";
import {TrainingForm} from "../components/TrainingForm";


/**
 * Страница редактирования подразделения. Очень похожа на остальные страницы редактирования.
 */
export const EditTrainingPage = () => {

    const [trainingId, setTrainingId] = useState(null);

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
            trainingType: ''
        }})

    // Нужно следить за изменением выбранного вырианта типа ПК в элементе select, для отображения формы ПК либо стажировки
    const trainingType = watch("trainingType")

    const onSubmit = async (data) => {
        data.trainingId = trainingId
        const trainingData = await saveTraining(data)
        setTrainingId(trainingData.Id_povysheniya_kvalifikacii)
        window.history.replaceState( {} , '', `/edit-training/${trainingData.Id_povysheniya_kvalifikacii}` )
    }

    const deleteTraining = async () => {
        const response = await removeTraining(trainingId)
        console.log(response)
    }

    const getTraining = async () => {
        if (params.id !== undefined) {
            setTrainingId(params.id)
            const trainingData = await getTrainingById(params.id)
            setValue("trainingType", trainingData.Forma_povysheniya_kvalifikacii)
            setValue("startDate", trainingData.Data_nachala.split('T')[0])
            setValue("endDate", trainingData.Data_zaversheniya.split('T')[0])
        }
    }

    useEffect(() => {
        getTraining()
    }, []);


    return (
        <section className="edit-page">
            <Container>
                <h1 className="title">
                    Редактирование повышения квалификации
                </h1>
                <div className="edit-page__card">
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="input__wrapper">
                            <Controller
                                name={"trainingType"}
                                rules={{required: true}}
                                fullWidth
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <FormControl fullWidth>
                                        <InputLabel id="select-training-type-label">Форма повышения квалификации</InputLabel>
                                        <Select
                                            labelId="select-training-type-label"
                                            id="demo-simple-select"
                                            value={value}
                                            label="Форма повышения квалификации"
                                            onChange={onChange}
                                        >
                                            <MenuItem value={'Стажировка'}>Стажировка</MenuItem>
                                            <MenuItem value={'Повышение квалификации'}>Повышение квалификации</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </div>
                        <div className="input__wrapper">
                            <label htmlFor="startDate" className="date-label">Дата начала:</label>
                            <input type="date" id="startDate"
                                   {...register("startDate", {required: true})}
                            />
                        </div>
                        <div className="input__wrapper">
                            <label htmlFor="endDate" className="date-label">Дата завершения:</label>
                            <input type="date" id="endDate"
                                   {...register("endDate", {required: true})}
                            />
                        </div>

                        <div className="btn__row">
                            <div className="btn__wrapper">
                                <Button variant="contained" type="submit">Сохранить</Button>
                            </div>
                            <div className="btn__wrapper">
                                <Button variant="contained" color="error" onClick={deleteTraining}>Удалить</Button>
                            </div>
                        </div>

                    </form>
                </div>
                { trainingId && ((trainingType === "Стажировка") ? (
                    // Выводим либо компонент формы стажировки, либо ПК. В зависимости от выбранного типа ПК
                    <InternshipForm trainingId={trainingId}/>
                ) : (
                    <TrainingForm trainingId={trainingId}/>
                )) }
            </Container>
        </section>
    )
}
