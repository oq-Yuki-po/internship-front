import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Table, Typography, TableCell, TableBody, TableHead, TableRow, TableContainer, IconButton } from '@mui/material';
import { useLocation } from "react-router-dom"
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Player = () => {
    const location = useLocation()
    const sessionId = location.state.sessionId;
    const [frameNumber, setFrameNumber] = useState(1);
    const [frameData, setFrameData] = useState('');
    const [image, setImage] = useState('');
    const [driveSensors, setDriveSensors] = useState([]);
    const [ipPortSensors, setIpPortSensors] = useState([]);
    const [processSensors, setProcessSensors] = useState([]);

    function getFrame() {
        axios.get(`http://localhost:8000/frames/${sessionId}/${frameNumber}`)
            .then(response => {
                setFrameData(response.data);
                const screenshotSensor = response.data.screenshot_sensor;
                const driveSensors = response.data.drive_sensors;
                const ipPortSensors = response.data.ip_port_sensors;
                const processSensors = response.data.process_sensors;
                setImage(screenshotSensor.image);
                setDriveSensors(driveSensors);
                setIpPortSensors(ipPortSensors);
                setProcessSensors(processSensors);
                setFrameData(response.data.record_time);
            }).catch(error => {
                console.error('Error querying frame:', error);
            });
    }
    useEffect(() => {
        getFrame();
    }, []);

    useEffect(() => {
        getFrame();
    }, [frameNumber]);

    function handleOnClickBack() {
        if (frameNumber > 1) {
            setFrameNumber(frameNumber - 1)
        }
    }

    function handleOnClickForward() {
        setFrameNumber(frameNumber + 1)
    }

    return (
        <Box display="flex" flexDirection="row">
            <Box m={2} maxWidth="50%" width={"50%"}>
                <Typography variant="h4" gutterBottom>
                    Screen
                </Typography>
                {image && <img src={`data:image/png;base64, ${image}`} alt="Frame" width={"100%"} />}
                <Box display="flex" flexDirection="row" justifyContent="space-between">
                    <IconButton onClick={handleOnClickBack}>
                        <ArrowBackIcon sx={{ fontSize: "2.5rem" }} />
                    </IconButton>
                    <Typography variant="h5" m={3}>
                        {frameData}
                    </Typography>
                    <IconButton onClick={handleOnClickForward}>
                        <ArrowForwardIcon sx={{ fontSize: "2.5rem" }} />
                    </IconButton>
                </Box>
            </Box>
            <Box m={2} maxWidth="50%" width={"50%"} display="flex" flexDirection="column">
                <Typography variant="h4" component="h4" gutterBottom>
                    Sensor Info
                </Typography>
                <Typography variant='h5' m={1}>
                    Drive Sensors
                </Typography>
                <TableContainer style={{ maxHeight: "25vh" }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Drive Letter</TableCell>
                                <TableCell>Drive Type</TableCell>
                                <TableCell>File System</TableCell>
                                <TableCell>Volume Name</TableCell>
                                <TableCell>All Space</TableCell>
                                <TableCell>Free Space</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {driveSensors.map((drive) => (
                                <TableRow key={drive.drive_letter}>
                                    <TableCell>{drive.drive_letter}</TableCell>
                                    <TableCell>{drive.drive_type}</TableCell>
                                    <TableCell>{drive.file_system}</TableCell>
                                    <TableCell>{drive.volume_name}</TableCell>
                                    <TableCell>{drive.all_space}</TableCell>
                                    <TableCell>{drive.free_space}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Typography variant='h5' m={1}>
                    IP Port Sensors
                </Typography>
                <TableContainer style={{ maxHeight: "25vh" }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>State</TableCell>
                                <TableCell>IP</TableCell>
                                <TableCell>Port</TableCell>
                                <TableCell>Process ID</TableCell>
                                <TableCell>Remote IP</TableCell>
                                <TableCell>Remote Port</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ipPortSensors.map((port) => (
                                <TableRow>
                                    <TableCell>{port.state}</TableCell>
                                    <TableCell>{port.ip}</TableCell>
                                    <TableCell>{port.port}</TableCell>
                                    <TableCell>{port.process_id}</TableCell>
                                    <TableCell>{port.remote_ip}</TableCell>
                                    <TableCell>{port.remote_port}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Typography variant='h5' m={1}>
                    Process Sensors
                </Typography>
                <TableContainer style={{ maxHeight: "25vh" }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>File Path</TableCell>
                                <TableCell>Process ID</TableCell>
                                <TableCell>Process Name</TableCell>
                                <TableCell>Started At</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {processSensors.map((process) => (
                                <TableRow>
                                    <TableCell>{process.file_path}</TableCell>
                                    <TableCell>{process.process_id}</TableCell>
                                    <TableCell>{process.process_name}</TableCell>
                                    <TableCell>{process.started_at}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box >
    );
};

export default Player;
