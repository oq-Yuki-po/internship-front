import React from 'react'
import ReportFilter from './ReportFilter'
import { Box, Typography } from '@mui/material'
import ReportFiles from './ReportFiles'

export default function Report() {
    return (
        <div>
            <Typography variant="h4" component="h4" gutterBottom>
                Report
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <ReportFilter />
                <ReportFiles />
            </Box>
        </div>
    )
}
