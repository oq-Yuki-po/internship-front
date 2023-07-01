import React from 'react'
import Button from '@mui/material/Button'
import { useNavigate } from "react-router-dom";

export default function NavMenu(props) {

    let navigate = useNavigate();

    function handleOnClick() {
        navigate(props.to)
    }

    return (
        <Button
            color="inherit"
            size="large"
            sx={{ fontSize: 16 }}
            startIcon={props.icon}
            onClick={handleOnClick}>
            {props.title}
        </Button>
    )
}