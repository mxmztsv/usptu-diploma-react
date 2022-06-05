import TextField from '@mui/material/TextField';
import {Controller, useForm} from 'react-hook-form';
import Button from '@mui/material/Button';
import {signIn} from "../controllers/authController";

/**
 * Страница авторизации.
 */
export const AuthPage = () => {

    // Инициализируем форму с помощью библиотеки react-hook-form
    const {
        handleSubmit,
        control,
    } = useForm()

    // Функция обработки отправки данных на авторизацию
    const onSubmit = async (data) => {
        await signIn(data.login, data.password)
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
