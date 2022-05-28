import React, {useEffect} from 'react'

export const DepartmentsTable = ({ departments }) => {

    if (!departments.length) {
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
                return (
                    <tr key={department.Id_podrazdeleniya} className="table__item">
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
