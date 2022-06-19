import React from "react";
import {Navigate, Route, Routes} from 'react-router-dom'
import {AuthPage} from "./pages/AuthPage";
import {EmployeesPage} from "./pages/EmployeesPage";
import {DepartmentsPage} from "./pages/DepartmentsPage";
import {TrainingsPage} from "./pages/TrainingsPage";
import {EditTrainingPage} from "./pages/EditTrainingPage";
import {EditEmployeePage} from "./pages/EditEmployeePage";
import {EditDepartmentPage} from "./pages/EditDepartmentPage";
import {EmployeePage} from "./pages/EmployeePage";
import {EmployeesFilterPage} from "./pages/EmployeesFilterPage";

/**
 * Компонент, возвращающий пути для приложения, в зависимости от авторизации и уровня доступа.
 */
export const useRoutes = (isAuthenticated, isSuperuser) => {
    if (isAuthenticated && isSuperuser) {
        // Если пользователь авторизован и является суперпользователем, передаем ему следующие пути
        return (
            <Routes>
                <Route path="/" element={<EmployeesPage/>}/>
                <Route path="filters" element={<EmployeesFilterPage/>}/>
                <Route path="departments" element={<DepartmentsPage/>}/>
                <Route path="trainings" element={<TrainingsPage/>}/>
                <Route path="employee/:id" element={<EmployeePage/>}/>
                <Route path="edit-training" element={<EditTrainingPage/>}>
                    <Route path=":id" element={<EditTrainingPage/>}/>
                </Route>
                <Route path="edit-employee" element={<EditEmployeePage/>}>
                    <Route path=":id" element={<EditEmployeePage/>}/>
                </Route>
                <Route path="edit-department" element={<EditDepartmentPage/>}>
                    <Route path=":id" element={<EditDepartmentPage/>}/>
                </Route>
            </Routes>
        )
    }

    if (isAuthenticated) {
        // Если пользователь авторизован, но не является суперпользователем, передаем ему следующие пути
        return (
            <Routes>
                <Route path="trainings" element={<TrainingsPage/>}/>
                <Route path="edit-training" element={<EditTrainingPage/>}>
                    <Route path=":id" element={<EditTrainingPage/>}/>
                </Route>
                <Route path="*" element={<Navigate to="/trainings" replace/>}/>
            </Routes>
        )
    }

    // Неавторизованному пользователю доступна только страница авторизации
    return (
        <Routes>
            <Route path="/" element={<AuthPage/>}/>
        </Routes>
    )
}
