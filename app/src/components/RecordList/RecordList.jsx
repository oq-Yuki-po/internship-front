import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@material-ui/core';

const RecordList = () => {
    const navigate = useNavigate();
    const [records, setRecords] = useState([]);
    const fetchRecords = () => {
        axios.get('http://localhost:8000/user_sessions')
            .then(response => {
                //console.trace();
                //console.log('Records:', response.data.user_sessions);
                setRecords(response.data.user_sessions);
            }).catch(error => {
                console.error('Error fetching records:', error);
            });
    };

    useEffect(() => {
        //console.trace();
        //fetchRecords();
        axios.get('http://localhost:8000/user_sessions')
            .then(response => {
                setRecords(response.data.user_sessions);
            }).catch(error => {
                console.error('Error fetching records:', error);
            });
    }, []);

    return (
        <div>
            <h1>Record List</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>再生開始</TableCell>
                        <TableCell>記録開始日時</TableCell>
                        <TableCell>記録終了日時</TableCell>
                        <TableCell>ユーザー名</TableCell>
                        <TableCell>マシン名</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {records.map((record) => (
                        <TableRow key={record.id}>
                            <TableCell>
                                <IconButton onClick={() => navigate(`/player/${record.sessionId}`)}>
                                    <SmartDisplayIcon fontSize="large" />
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
        </div>
    );
};

export default RecordList;
