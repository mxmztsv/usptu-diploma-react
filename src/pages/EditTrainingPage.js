import {useParams} from "react-router-dom";
import Container from "@mui/material/Container";
import {Controller, useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {FormControl, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {saveTraining} from "../controllers/TrainingsController";

export const EditTrainingPage = () => {

    const params = useParams()

    const {
        register,
        handleSubmit,
        control,
        formState: {errors},
    } = useForm()

    const onSubmit = async (data) => {
        if (params.id !== undefined) {
            data.trainingId = params.id
        } else {
            data.trainingId = null
        }
        await saveTraining(data)
    }

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
                                required
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
                            <label htmlFor="startDate">Дата начала:</label>
                            <input type="date" id="startDate"
                                   min="2018-01-01" max="2018-12-31"
                                   {...register("startDate", {required: true})}
                            />
                        </div>
                        <div className="input__wrapper">
                            <label htmlFor="endDate">Дата завершения:</label>
                            <input type="date" id="endDate"
                                   min="2018-01-01" max="2018-12-31"
                                   {...register("endDate", {required: true})}
                            />
                        </div>

                        <Button variant="contained" type="submit">Сохранить</Button>

                    </form>
                </div>
            </Container>
        </section>
    )
}
