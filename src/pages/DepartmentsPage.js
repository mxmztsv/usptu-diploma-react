import React, {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import {getAllDepartments} from "../controllers/departmentsController";
import {DepartmentsTable} from "../components/DepartmentsTable";

export const DepartmentsPage = () => {

    const [departments, setDepartments] = useState([])

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
                <DepartmentsTable departments={departments}/>
            </Container>
        </section>
    )
}
