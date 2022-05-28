import React, {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import {getAllTrainings} from "../controllers/TrainingsController";
import {TrainingsTable} from "../components/TrainingsTable";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

export const TrainingsPage = () => {

    const [trainings, setTrainings] = useState([])

    const navigate = useNavigate()

    const getTrainings = async () => {
        setTrainings(await getAllTrainings())
    }

    useEffect( () => {
        getTrainings()
    }, []);


    return (
        <section className="employees">
            <Container>
                <h1 className="title">Мои повышения квалификации</h1>
                <Button variant="contained" onClick={() => {navigate('/edit-training')}}>Новое повышение квалификации</Button>
                <TrainingsTable trainings={trainings}/>
            </Container>
        </section>
    )
}
