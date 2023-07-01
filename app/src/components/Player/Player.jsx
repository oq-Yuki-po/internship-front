import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, IconButton } from '@mui/material';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ProcessSensor from './ProcessSensor';
import PortSensor from './PortSensor';
import DriveSensor from './DriveSensor';

const Player = () => {
    const { sessionId } = useParams();
    const [frameNumber, setFrameNumber] = useState(1);
    const [frameData, setFrameData] = useState('');

    useEffect(() => {
        // 初回表示時に1フレーム目の情報をクエリする
        queryFrame(frameNumber);
    }, []);

    const queryFrame = async (frameNo) => {
        try {
            //const response = await axios.get(`/api/frames/${sessionId}/${frameNo}`);
            //const { frame } = response.data;
            //setImageData(frame);
        } catch (error) {
            console.error('Error querying frame:', error);
        }
    };

    const handleNextFrame = () => {
        const nextFrame = frameNumber + 1;
        setFrameNumber(nextFrame);
        queryFrame(nextFrame);
    };

    const handlePreviousFrame = () => {
        if (frameNumber > 1) {
            const previousFrame = frameNumber - 1;
            setFrameNumber(previousFrame);
            queryFrame(previousFrame);
        }
    };

    // ダミーデータ
    const processes = [
        {
            processName: 'Process 1',
            filePath: '/path/to/process1',
            pid: 123,
        },
        {
            processName: 'Process 2',
            filePath: '/path/to/process2',
            pid: 456,
        },
    ];

    const ports = [
        {
            localPort: 8080,
            localIpAddress: '127.0.0.1',
            processPid: 123,
            remotePort: 0,
            remoteIpAddress: '0.0.0.0',
            status: 'LISTENING',
        },
        {
            localPort: 1234,
            localIpAddress: '127.0.0.1',
            processPid: 456,
            remotePort: 5678,
            remoteIpAddress: '192.168.0.1',
            status: 'ESTABLISH',
        },
    ];

    const drives = [
        {
            driveLetter: 'C:',
            driveType: 'Internal Disk',
            fileSystem: 'NTFS',
            volumeLabel: 'System Drive',
        },
        {
            driveLetter: 'D:',
            driveType: 'Removable Disk',
            fileSystem: 'FAT32',
            volumeLabel: '',
        },
    ];

    return (
        <Box>
            <h1>記録再生画面</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto' }}>
                <div>
                    {/* <img src={`data:image/png;base64, ${frame.screen.imageData}`} alt="Frame" /> */}
                    <img src={`data:image/png;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD`} alt="Frame" />
                    <div></div>
                    <IconButton onClick={handlePreviousFrame}>
                        <SkipPreviousIcon fontSize='Large' />
                    </IconButton>
                    <IconButton onClick={handleNextFrame}>
                        <SkipNextIcon fontSize='Large' />
                    </IconButton>
                </div>
                <div>
                    <ProcessSensor processes={processes} />
                    <PortSensor ports={ports} />
                    <DriveSensor drives={drives} />
                </div>
            </div>
        </Box>
    );
};

export default Player;
