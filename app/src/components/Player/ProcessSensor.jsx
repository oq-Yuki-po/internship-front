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

const ProcessSensor = ({ processes }) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <IconButton size="small" onClick={handleExpandClick}>
                                {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                            </IconButton>
                        </TableCell>
                        <TableCell>プロセス情報</TableCell>
                    </TableRow>
                    <Collapse in={expanded} unmountOnExit>
                        <TableRow>
                            <TableCell colSpan={2}>
                                {/* プロセス情報のテーブル */}
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>プロセス名</TableCell>
                                            <TableCell>プロセスのファイルパス</TableCell>
                                            <TableCell>pid</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* データをマッピングして表示 */}
                                        {processes.map((process) => (
                                            <TableRow key={process.pid}>
                                                <TableCell>{process.processName}</TableCell>
                                                <TableCell>{process.filePath}</TableCell>
                                                <TableCell>{process.pid}</TableCell>
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

export default ProcessSensor;