import React, {useEffect} from 'react'
import {useNavigate} from "react-router-dom";

/**
 * Компонент таблицы подразделений.
 */
export const DepartmentsTable = ({ departments }) => {

    // Используем хук для навигации
    const navigate = useNavigate()

    if (!departments.length) {
        // Если массив переданных подразделений пустой, выводим "пусто"
        return <p>Пусто</p>
    }

    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Аббревиатура</th>
                <th>Фамилия</th>
                <th>Имя</th>
                <th>Отчество</th>
            </tr>
            </thead>

            <tbody>
            { departments.map((department, index) => {
                // В цилке выводим по строке в таблицу на каждое подразделение
                return (
                    <tr key={department.Id_podrazdeleniya} className="table__item" onClick={() => {
                        // По клику переходим на страницу редактирования подразделения
                        navigate(`/edit-department/${department.Id_podrazdeleniya}`)
                    }}>
                        <td>{department.Id_podrazdeleniya}</td>
                        <td>{department.Polnoe_nazvanie}</td>
                        <td>{department.Abbreviatura}</td>
                        <td>{department.Familiya}</td>
                        <td>{department.Imya}</td>
                        <td>{department.Otchestvo}</td>
                    </tr>
                )
            }) }
            </tbody>
        </table>
    )
}
