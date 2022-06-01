import React, {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import {getAllEmployees} from "../controllers/employeesController";
import {EmployeesTable} from "../components/EmployeesTable";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

export const EmployeesPage = () => {

    const [employees, setEmployees] = useState([])

    const navigate = useNavigate()

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
                <Button variant="contained" onClick={() => {navigate('/edit-employee')}}>Добавить преподавателя</Button>
                <EmployeesTable employees={employees}/>
            </Container>
        </section>
    )
}
