import React from "react";
import {Routes, Route} from 'react-router-dom'
import {AuthPage} from "./pages/AuthPage";
import {EmployeesPage} from "./pages/EmployeesPage";
import {DepartmentsPage} from "./pages/DepartmentsPage";
import {TrainingsPage} from "./pages/TrainingsPage";
import {EditTrainingPage} from "./pages/EditTrainingPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/" element={<EmployeesPage/>}/>
                <Route path="departments" element={<DepartmentsPage/>}/>
                <Route path="trainings" element={<TrainingsPage/>}/>
                <Route path="edit-training" element={<EditTrainingPage/>}>
                    <Route path=":id" element={<EditTrainingPage/>}/>
                </Route>
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/" element={<AuthPage/>}/>
        </Routes>
    )
}
