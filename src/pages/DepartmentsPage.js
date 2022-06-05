import React, {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import {getAllDepartments} from "../controllers/departmentsController";
import {DepartmentsTable} from "../components/DepartmentsTable";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

/**
 * Страница списка подразделений
 */
export const DepartmentsPage = () => {

    // Состояние для хранения массива подразделений
    const [departments, setDepartments] = useState([])

    // Подключаем навигацию
    const navigate = useNavigate()

    // Функция получения подразделений
    const getDepartments = async () => {
        const departments = await getAllDepartments()

        // Устанавливаем полученный массив подразделений в состояние
        setDepartments(await getAllDepartments())
    }

    useEffect(() => {
        // При рендере страницы вызываем получение подразделений
        getDepartments()
    }, [])


    return (
        <section className="employees">
            <Container>
                <h1 className="title">Подразделения</h1>
                <Button variant="contained" onClick={() => {
                    navigate('/edit-department')
                }}>Добавить подразделение</Button>
                <DepartmentsTable departments={departments}/>
            </Container>
        </section>
    )
}
