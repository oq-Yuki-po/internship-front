import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@material-ui/core';

const RecordList = () => {
    const navigate = useNavigate();
    /*const [records, setRecords] = useState([]);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await axios.get('/api/records');
                setRecords(response.data);
            } catch (error) {
                console.error('Error fetching records:', error);
            }
        };

        fetchRecords();
    }, []);*/

    const [records, setRecords] = useState([
        {
            id: 1,
            startDate: '2023-07-01 09:00',
            endDate: '2023-07-01 10:00',
            userName: 'John Doe',
            machineName: 'Machine A',
            sessionId: '123abc',
        },
        {
            id: 2,
            startDate: '2023-07-02 14:30',
            endDate: '2023-07-02 15:30',
            userName: 'Jane Smith',
            machineName: 'Machine B',
            sessionId: '456def',
        },
    ]);

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
