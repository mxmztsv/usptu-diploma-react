import React, {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import {getAllEmployees} from "../controllers/employeesController";
import {EmployeesTable} from "../components/EmployeesTable";

export const EmployeesPage = () => {

    const [employees, setEmployees] = useState([])

    const getEmployees = async () => {
        setEmployees(await getAllEmployees())
    }

    useEffect( () => {
        getEmployees()
    }, []);


    return (
        <section className="employees">
            <Container>
                <h1 className="title">Преподаватели</h1>
                <EmployeesTable employees={employees}/>
            </Container>
        </section>
    )
}
