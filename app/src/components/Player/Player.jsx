import React, { useState, useEffect, useRef } from 'react';
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
    const [countOfExpandComponent, setcountOfExpandComponent] = useState(0);

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

    var countSensorComponent = 3;
    const switchedDisplayTable = (nextState) => {

        var nextCountOfExpandComponent = countOfExpandComponent;
        nextCountOfExpandComponent += nextState ? 1 : -1;
        nextCountOfExpandComponent = Math.max(0, Math.min(3, nextCountOfExpandComponent));
        console.log("nextCountOfExpandComponent:", nextCountOfExpandComponent);
        var nextheight = CurrentHight / nextCountOfExpandComponent;
        console.log("bottomMargin:", CurrentHight);
        console.log("nextheight:", nextheight);
        setsensorMaxHeight(nextheight);
        setcountOfExpandComponent(nextCountOfExpandComponent);
    };

    const ref = useRef(null);
    const [CurrentHight, setCurrentHight] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            /*const parentHeight = ref.current.parentElement.offsetHeight;
            const elementHeight = ref.current.offsetHeight;*/
            console.log("ref.current.parentElement.offsetHeight:", ref.current.parentElement.offsetHeight);
            console.log("ref.current.offsetHeight:", ref.current.offsetHeight);
            setCurrentHight(ref.current.parentElement.offsetHeight);
            setsensorMaxHeight(ref.current.parentElement.offsetHeight / countOfExpandComponent);
        };

        handleResize(); // 初回レンダリング時にマージンを計算

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    //const [bottomMargin, setBottomMargin] = useState(0);
    const [sensorMaxHeight, setsensorMaxHeight] = useState(65);

    return (
        <Box>
            <h1>記録再生画面</h1>
            <div style={{ display: 'flex', height: '75vh' }}>
                <div style={{ flexBasis: '50%', padding: '20px' }}>
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
                <div style={{ flexBasis: '50%', padding: '20px' }} ref={ref}>
                    <ProcessSensor processes={processes} maxHeight={sensorMaxHeight} onChange={switchedDisplayTable} />
                    <PortSensor ports={ports} maxHeight={sensorMaxHeight} onChange={switchedDisplayTable} />
                    <DriveSensor drives={drives} maxHeight={sensorMaxHeight} onChange={switchedDisplayTable} />
                </div>
            </div>
        </Box>
    );
};

export default Player;
