import TextField from '@mui/material/TextField';
import {Controller, useForm} from 'react-hook-form';
import Button from '@mui/material/Button';
import {signIn} from "../controllers/authController";

export const AuthPage = () => {

    const {
        register,
        handleSubmit,
        control,
        formState: {errors},
    } = useForm()

    const onSubmit = async (data) => {
        const res = await signIn(data.login, data.password)
    }

    return (
        <section className="auth">
            <div className="auth__card">
                <h1 className="title">
                    Вход
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="input__wrapper">
                        <Controller
                            name={"login"}
                            required
                            fullWidth
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextField onChange={onChange} value={value} label={"Логин"} required
                                           fullWidth/>
                            )}
                        />
                    </div>

                    <div className="input__wrapper">
                        <Controller
                            name={"password"}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextField onChange={onChange} value={value} label={"Пароль"} required
                                           fullWidth
                                           type="password"/>
                            )}
                        />
                    </div>

                    <Button variant="contained" type="submit">Войти</Button>

                </form>

            </div>
        </section>
    )
}
