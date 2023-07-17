import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import ListAltIcon from '@mui/icons-material/ListAlt';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from "react-router-dom";
import NavMenu from './NavMenu';

export default function Header() {

    let navigate = useNavigate()

    return (
        <Box sx={{ flexGrow: 1, minHeight: '7%' }}>
            <AppBar position='static' color='primary'>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h5"
                        color="inherit"
                        component="div"
                        sx={{ flexGrow: 1, maxWidth: 350, cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                        className='title'>
                        RECORD PLAYER
                    </Typography>
                    <Box>
                        <NavMenu to='/' title='記録一覧' icon={<ListAltIcon />} />
                        <NavMenu to='/reports' title='CSV出力' icon={<DownloadIcon />} />
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}