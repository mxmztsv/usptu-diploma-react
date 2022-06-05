import React from 'react'
import {useNavigate} from "react-router-dom";
import {toRU} from "../services/dateService";

/**
 * Компонент таблицы повышений квалификации. Все аналогично таблице подраздений.
 */
export const TrainingsTable = ({trainings}) => {

    const navigate = useNavigate()

    if (!trainings.length) {
        return <p>Пусто</p>
    }

    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Форма повышения квалификации</th>
                <th>Дата начала</th>
                <th>Дата звершения</th>
            </tr>
            </thead>

            <tbody>
            {trainings.map((training, index) => {
                return (
                    <tr key={training.Id_povysheniya_kvalifikacii} className="table__item" onClick={() => {
                        navigate(`/edit-training/${training.Id_povysheniya_kvalifikacii}`)
                    }}>
                        <td>{training.Id_povysheniya_kvalifikacii}</td>
                        <td>{training.Forma_povysheniya_kvalifikacii}</td>
                        <td>{toRU(training.Data_nachala)}</td>
                        <td>{toRU(training.Data_zaversheniya)}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}
