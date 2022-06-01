import React from "react";
import {Routes, Route} from 'react-router-dom'
import {AuthPage} from "./pages/AuthPage";
import {EmployeesPage} from "./pages/EmployeesPage";
import {DepartmentsPage} from "./pages/DepartmentsPage";
import {TrainingsPage} from "./pages/TrainingsPage";
import {EditTrainingPage} from "./pages/EditTrainingPage";
import {EditEmployeePage} from "./pages/EditEmployeePage";
import {EditDepartmentPage} from "./pages/EditDepartmentPage";

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
                <Route path="edit-employee" element={<EditEmployeePage/>}>
                    <Route path=":id" element={<EditEmployeePage/>}/>
                </Route>
                <Route path="edit-department" element={<EditDepartmentPage/>}>
                    <Route path=":id" element={<EditDepartmentPage/>}/>
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
