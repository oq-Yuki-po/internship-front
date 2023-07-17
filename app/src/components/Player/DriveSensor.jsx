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

const DriveSensor = ({ drives, maxHeight, onChange }) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        var nextState = !expanded;
        onChange(nextState);
        setExpanded(!expanded);
    };

    return (
        <TableContainer component={Paper} style={{ maxHeight: `${maxHeight}px`, minHeight: '50px' }}>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <IconButton size="small" onClick={handleExpandClick}>
                                {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                            </IconButton>
                            ドライブ情報
                        </TableCell>
                    </TableRow>
                    <Collapse in={expanded} unmountOnExit>
                        <TableRow style={{ overflow: 'auto' }}>
                            <TableCell colSpan={2}>
                                {/* ドライブ情報のテーブル */}
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Drive Letter</TableCell>
                                            <TableCell>Drive Type</TableCell>
                                            <TableCell>File System</TableCell>
                                            <TableCell>Volume Label</TableCell>
                                            <TableCell>All Space</TableCell>
                                            <TableCell>Free Space</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {drives.length && drives.map((drive) => (

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
                            </TableCell>
                        </TableRow>
                    </Collapse>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DriveSensor;