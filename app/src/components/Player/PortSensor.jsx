import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Collapse,
    IconButton
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';

const PortSenssor = ({ ports, maxHeight, onChange }) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        var nextState = !expanded;
        onChange(nextState);
        setExpanded(!expanded);
    };

    return (
        < TableContainer component={Paper} style={{ maxHeight: `${maxHeight}px`, overflow: 'auto', minHeight: '50px' }} >
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <IconButton size="small" onClick={handleExpandClick}>
                                {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                            </IconButton>
                            ポート情報
                        </TableCell>
                    </TableRow>
                    <Collapse in={expanded} unmountOnExit>
                        <TableRow style={{ overflow: 'auto' }} >
                            <TableCell colSpan={2}>
                                {/* ポート情報のテーブル */}
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Local Port</TableCell>
                                            <TableCell>Local IP Address</TableCell>
                                            <TableCell>Process PID</TableCell>
                                            {/* <TableCell>Remote Port</TableCell>
                                            <TableCell>Remote IP Address</TableCell>*/}
                                            <TableCell>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {ports.length && ports.map((port) => (
                                            <TableRow key={port.port}>
                                                <TableCell>{port.port}</TableCell>
                                                <TableCell>{port.localIpAddress}</TableCell>
                                                <TableCell>{port.process_id}</TableCell>
                                                {/*port.state === 'ESTABLISH' && (
                                                    <>
                                                        <TableCell>{port.remote_port}</TableCell>
                                                        <TableCell>{port.remote_ip}</TableCell>
                                                    </>
                                                )}
                                                {port.state === 'LISTENING' && (
                                                    <>
                                                        <TableCell />
                                                        <TableCell />
                                                    </>
                                                ) */}
                                                <TableCell>{port.state}</TableCell>
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