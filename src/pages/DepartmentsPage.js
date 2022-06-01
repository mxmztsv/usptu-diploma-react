import React, {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import {getAllDepartments} from "../controllers/departmentsController";
import {DepartmentsTable} from "../components/DepartmentsTable";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

export const DepartmentsPage = () => {

    const [departments, setDepartments] = useState([])

    const navigate = useNavigate()

    const getDepartments = async () => {
        const departments = await getAllDepartments()
        setDepartments(await getAllDepartments())
    }

    useEffect( () => {
        getDepartments()
    }, []);


    return (
        <section className="employees">
            <Container>
                <h1 className="title">Подразделения</h1>
                <Button variant="contained" onClick={() => {navigate('/edit-department')}}>Добавить подразделение</Button>
                <DepartmentsTable departments={departments}/>
            </Container>
        </section>
    )
}
