import Container from "@mui/material/Container";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getEmployeesById} from "../controllers/employeesController";
import Button from "@mui/material/Button";
import {TrainingsTable} from "../components/TrainingsTable";
import {getAllTrainingsByEmployeeId} from "../controllers/TrainingsController";

export const EmployeePage = () => {

    const [employeeData, setEmployeeData] = useState({})
    const [trainings, setTrainings] = useState([])

    const params = useParams()
    const navigate = useNavigate()

    const getEmployee = async () => {
        const employee = await getEmployeesById(params.id)
        setEmployeeData(employee)
    }


    const getTrainings = async () => {
        setTrainings(await getAllTrainingsByEmployeeId(params.id))
    }

    useEffect(() => {
        getEmployee()
        getTrainings()
    }, []);


    return (
        <section className="employee-page">
            <Container>
                <h1 className="title">{employeeData.Familiya} {employeeData.Imya} {employeeData.Otchestvo}</h1>
                <div className="employee-page__info">
                    <p className="employee-page__info__text">
                        Дата рождения: {employeeData.Data_Rozhdeniya}
                    </p>
                    <p className="employee-page__info__text">
                        Должность: {employeeData.Dolzhnost}
                    </p>
                    <p className="employee-page__info__text">
                        Ученая степень: {employeeData.Uchenaya_stepen}
                    </p>
                    <p className="employee-page__info__text">
                        Звание: {employeeData.Zvanie}
                    </p>
                    <p className="employee-page__info__text">
                        Дата приема: {employeeData.Data_priema}
                    </p>
                    <p className="employee-page__info__text">
                        Стаж (лет): {employeeData.Stazh}
                    </p>
                </div>
                <Button variant="contained" onClick={() => {
                    navigate(`/edit-employee/${employeeData.Id_prepodavatelya}`)
                }}>Редактировать</Button>
                <h2 className="title">Повышения квалификации</h2>
                <TrainingsTable trainings={trainings}/>
            </Container>
        </section>
    )
}