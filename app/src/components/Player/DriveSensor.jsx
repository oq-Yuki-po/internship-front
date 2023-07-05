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
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {drives.map((drive) => (
                                            <TableRow key={drive.driveLetter}>
                                                <TableCell>{drive.driveLetter}</TableCell>
                                                <TableCell>{drive.driveType}</TableCell>
                                                <TableCell>{drive.fileSystem}</TableCell>
                                                <TableCell>{drive.volumeLabel}</TableCell>
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