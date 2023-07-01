import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Collapse,
    IconButton
} from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';

const PortSenssor = ({ ports }) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        < TableContainer component={Paper} >
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <IconButton size="small" onClick={handleExpandClick}>
                                {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                            </IconButton>
                        </TableCell>
                        <TableCell>ポート情報</TableCell>
                    </TableRow>
                    <Collapse in={expanded} unmountOnExit>
                        <TableRow>
                            <TableCell colSpan={2}>
                                {/* ポート情報のテーブル */}
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Local Port</TableCell>
                                            <TableCell>Local IP Address</TableCell>
                                            <TableCell>Process PID</TableCell>
                                            <TableCell>Remote Port</TableCell>
                                            <TableCell>Remote IP Address</TableCell>
                                            <TableCell>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {ports.map((port) => (
                                            <TableRow key={port.localPort}>
                                                <TableCell>{port.localPort}</TableCell>
                                                <TableCell>{port.localIpAddress}</TableCell>
                                                <TableCell>{port.processPid}</TableCell>
                                                {port.status === 'ESTABLISH' && (
                                                    <>
                                                        <TableCell>{port.remotePort}</TableCell>
                                                        <TableCell>{port.remoteIpAddress}</TableCell>
                                                    </>
                                                )}
                                                {port.status === 'LISTENING' && (
                                                    <>
                                                        <TableCell />
                                                        <TableCell />
                                                    </>
                                                )}
                                                <TableCell>{port.status}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableCell>
                        </TableRow>
                    </Collapse>
                </TableBody>
            </Table>
        </TableContainer >

    );
};

export default PortSenssor;