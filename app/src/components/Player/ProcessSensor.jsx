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

const ProcessSensor = ({ processes, maxHeight, onChange }) => {
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
                        <TableCell >
                            <IconButton size="small" onClick={handleExpandClick}>
                                {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                            </IconButton>
                            プロセス情報
                        </TableCell>
                    </TableRow>
                    <Collapse in={expanded} unmountOnExit>
                        <TableRow style={{ overflow: 'auto' }}>
                            <TableCell colSpan={2}>
                                {/* プロセス情報のテーブル */}
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>プロセス名</TableCell>
                                            <TableCell>プロセスのファイルパス</TableCell>
                                            <TableCell>pid</TableCell>
                                            <TableCell>開始日時</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* データをマッピングして表示 */}
                                        {processes.length && processes.map((process) => (
                                            <TableRow key={process.pid}>
                                                <TableCell>{process.process_name}</TableCell>
                                                <TableCell>{process.file_path}</TableCell>
                                                <TableCell>{process.process_id}</TableCell>
                                                <TableCell>{process.started_at}</TableCell>
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