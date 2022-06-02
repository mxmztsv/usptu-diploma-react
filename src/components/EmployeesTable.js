import React from 'react'
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";

export const EmployeesTable = ({employees}) => {

    const navigate = useNavigate()

    if (!employees.length) {
        return <p>Пусто</p>
    }

    // todo: подразделение

    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Фамилия</th>
                <th>Имя</th>
                <th>Отчество</th>
                <th>Дата рождения</th>
                <th>Должность</th>
                <th>Ученая степень</th>
                <th>Звание</th>
                <th>Дата приема</th>
                <th>Стаж</th>
            </tr>
            </thead>

            <tbody>
            {employees.map((employee, index) => {
                return (
                    <tr key={employee.Id_prepodavatelya} className="table__item" onClick={() => {
                        navigate(`/employee/${employee.Id_prepodavatelya}`)
                    }}>
                        <td>{employee.Id_prepodavatelya}</td>
                        <td>{employee.Familiya}</td>
                        <td>{employee.Imya}</td>
                        <td>{employee.Otchestvo}</td>
                        <td>{employee.Data_Rozhdeniya}</td>
                        <td>{employee.Dolzhnost}</td>
                        <td>{employee.Uchenaya_stepen}</td>
                        <td>{employee.Zvanie}</td>
                        <td>{employee.Data_priema}</td>
                        <td>{employee.Stazh}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}
