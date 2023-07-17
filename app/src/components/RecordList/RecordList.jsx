import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Box } from '@mui/material';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@material-ui/core';

const RecordList = () => {
    const navigate = useNavigate();
    const [records, setRecords] = useState([]);
    const tableHeader = [
        '再生開始',
        '記録開始日時',
        '記録終了日時',
        'ユーザー名',
        'マシン名',
    ]

    useEffect(() => {
        axios.get('http://localhost:8000/user_sessions')
            .then(response => {
                setRecords(response.data.user_sessions);
            }).catch(error => {
                console.error('Error fetching records:', error);
            });
    }, []);

    return (
        <Box>
            <Typography variant="h4" component="h4" gutterBottom>
                Record List
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        {tableHeader.map((header) => (
                            <TableCell key={header}>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {records.map((record) => (
                        <TableRow key={record.id}>

                            <TableCell>
                                <IconButton onClick={() => {
                                    navigate("/player", { state: { sessionId: record.sessionId } })
                                }}>
                                    <SmartDisplayIcon fontSize="large" color='error' />
                                </IconButton>
                            </TableCell>
                            <TableCell>{record.startDate}</TableCell>
                            <TableCell>{record.endDate}</TableCell>
                            <TableCell>{record.userName}</TableCell>
                            <TableCell>{record.machineName}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default RecordList;
