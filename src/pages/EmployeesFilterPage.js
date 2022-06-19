import React, {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import {
    getAllEmployees,
    getEmployeesByPeriodWithoutTraining,
    getEmployeesByTrainingPeriod
} from "../controllers/employeesController";
import {EmployeesTable} from "../components/EmployeesTable";
import Button from "@mui/material/Button";

/**
 * Страница списка сотрудников с возможностью фильтрации.
 */
export const EmployeesFilterPage = () => {

    // Состояния страницы
    const [employees, setEmployees] = useState([])
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [yearsWithoutTraining, setYearsWithoutTraining] = useState(1);

    const getEmployees = async () => {
        setEmployees(await getAllEmployees())
    }

    const startDateHandler = (e) => {
        setStartDate(e.target.value)
    }

    const endDateHandler = (e) => {
        setEndDate(e.target.value)
    }

    const increaseCounter = () => {
        setYearsWithoutTraining(prevState => ++prevState)
    }

    const decreaseCounter = () => {
        if (yearsWithoutTraining > 1) {
            setYearsWithoutTraining(prevState => --prevState)
        }
    }

    const filter1Handler = async () => {
        const filteredEmployees = await getEmployeesByTrainingPeriod(startDate, endDate)
        setEmployees(filteredEmployees)
    }

    const filter2Handler = async () => {
        const filteredEmployees = await getEmployeesByPeriodWithoutTraining(yearsWithoutTraining)
        setEmployees(filteredEmployees)
    }

    useEffect(() => {
        getEmployees()
    }, []);

    return (
        <section className="employees">
            <Container>
                <h1 className="title">Фильтрация преподавателей по ПК</h1>
                <div className="filters">
                    <div className="filters__item">
                        <div className="filters__item_term">
                            Проходившие ПК в период с
                            <input type="date" id="endDate" className="simple-date" value={startDate}
                                   onChange={startDateHandler}
                            />
                            по
                            <input type="date" id="endDate" className="simple-date" value={endDate}
                                   onChange={endDateHandler}/>
                        </div>
                        <Button variant="contained" onClick={filter1Handler}>Применить</Button>
                    </div>
                    <div className="filters__item">
                        <div className="filters__item_term">
                            Не проходившие ПК в последние
                            <div className="counter">
                                <button className="counter__btn" onClick={decreaseCounter}>-</button>
                                <p className="counter__num">{yearsWithoutTraining}</p>
                                <button className="counter__btn" onClick={increaseCounter}>+</button>
                            </div>
                            лет
                        </div>
                        <Button variant="contained" onClick={filter2Handler}>Применить</Button>
                    </div>
                </div>
                <EmployeesTable employees={employees}/>
            </Container>
        </section>
    )
}
