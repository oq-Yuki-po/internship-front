import { Box, IconButton, Table, Typography, TableBody, TableRow, TableCell, TableHead, Button } from '@mui/material'
import React, { useEffect } from 'react'
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ReportFiles() {

    const [reportFiles, setReportFiles] = React.useState([]);

    // 出力済みのcsvファイルの一覧を読み込む
    useEffect(() => {

        // 仮のデータを設定

        const reportFiles = [
            {
                id: 1,
                userName: 'user1',
                targetDate: '2021-10-01',
                fileName: 'user1_20211001.csv'
            },
            {
                id: 2,
                userName: 'user1',
                targetDate: '2021-10-02',
                fileName: 'user1_20211002.csv'
            },
            {
                id: 3,
                userName: 'user1',
                targetDate: '2021-10-03',
                fileName: 'user1_20211003.csv'
            },
        ]
        setReportFiles(reportFiles)

        console.log('ReportFiles')
    }, [])

    function handleDownload(reportID) {
        console.log(reportID)
    }

    function handleDelete(reportID) {
        console.log(reportID)
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '80%',
            marginRight: "30px"
        }}>
            <Typography variant="h5" component="h5" gutterBottom>
                Report Files
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell >ユーザ名</TableCell>
                        <TableCell >日付</TableCell>
                        <TableCell >ファイル名</TableCell>
                        <TableCell >ダウンロード</TableCell>
                        <TableCell >削除</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reportFiles.map((reportFile) => (
                        <TableRow key={reportFile.id}>
                            <TableCell >{reportFile.userName}</TableCell>
                            <TableCell >{reportFile.targetDate}</TableCell>
                            <TableCell >{reportFile.fileName}</TableCell>
                            <TableCell align='center'>
                                <IconButton
                                    color='primary'
                                    onClick={() => handleDownload(reportFile.id)}
                                >
                                    <DownloadIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell align='center'>
                                <IconButton
                                    color='error'
                                    onClick={() => handleDelete(reportFile.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    )
}
