import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'


export default function ReportFilter() {

    const [userName, setUserName] = useState('');
    const [targetDate, setTargetDate] = useState('');
    const [open, setOpen] = React.useState(false);

    function handleOnClick(params) {
        // 入力チェック
        if (userName === '') {
            alert('ユーザ名を入力してください')
            return
        }
        if (targetDate === '') {
            alert('日付を入力してください')
            return
        }

        setOpen(true);
    }

    function executeReport() {
        setOpen(false);
        console.log('executeReport')
        console.log(userName)
        console.log(targetDate)
        // axios.get(`/api/report/${userName}/${targetDate}`)
        //     .then((response) => {
        //         console.log(response)
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
    }



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '300px',
            marginRight: "30px",
            marginLeft: "30px"
        }}>
            <Typography variant="h5" component="h5" gutterBottom>
                Report Filter
            </Typography>
            <TextField
                label="User Name"
                style={{ marginBottom: '16px' }}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
                label="Target Date"
                type="date"
                style={{ marginBottom: '16px' }}
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }} />
            <Button
                onClick={handleOnClick}
                variant="contained"
                style={{ width: '50%', alignSelf: "flex-end" }}>
                出力</Button>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>CSV出力</DialogTitle>
                <DialogContent
                    style={{ display: 'flex', flexDirection: 'column', width: '500px' }}
                >
                    <div>以下の内容でCSVを出力しますか？</div>
                    <div>ユーザ名：{userName}</div>
                    <div>日付：{targetDate}</div>
                    <DialogActions>
                        <Button onClick={executeReport}>OK</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Box>
    )
}
