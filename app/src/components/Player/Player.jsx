import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, IconButton } from '@mui/material';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ProcessSensor from './ProcessSensor';
import PortSensor from './PortSensor';
import DriveSensor from './DriveSensor';
import { useLocation } from "react-router-dom"

const Player = () => {
    const location = useLocation()
    //const { sessionId } = useParams();
    const sessionId = location.state.sessionId;
    const [frameNumber, setFrameNumber] = useState(1);
    const [frameData, setFrameData] = useState('');
    const [countOfExpandComponent, setcountOfExpandComponent] = useState(0);
    const [imageData, setImageData] = useState(`/9j/4AAQSkZJRgABAQEAAAAAAAD`);

    const queryFrame = (frameNo) => {
        console.log(location);
        console.log(sessionId);
        axios.get(`http://localhost:8000/frames/${sessionId}/${frameNumber}`)
            .then(response => {
                const frame = response.data;
                setFrameData(frame);
                setImageData(frame.screenshot_sensor.image);
                console.log(frame);
            }).catch(error => {
                console.error('Error querying frame:', error);
            });
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
        if (frameData.length > 0) {
            console.log(frameData.screenshot_sensor.image);
            setImageData(frameData.screenshot_sensor.image);
        }
    }, [frameData]);

    useEffect(() => {
        const handleResize = () => {
            /*const parentHeight = ref.current.parentElement.offsetHeight;
            const elementHeight = ref.current.offsetHeight;*/
            console.log("ref.current.parentElement.offsetHeight:", ref.current.parentElement.offsetHeight);
            console.log("ref.current.offsetHeight:", ref.current.offsetHeight);
            setCurrentHight(ref.current.parentElement.offsetHeight);
            setsensorMaxHeight(ref.current.parentElement.offsetHeight / countOfExpandComponent);
        };

        // 初回表示時に1フレーム目の情報をクエリする
        queryFrame(frameNumber);

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
                    <img src={`data:image/png;base64, ${imageData}`} alt="Frame" />
                    {/*<img src={`data:image/png;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD`} alt="Frame" />*/}
                    <div></div>
                    <IconButton onClick={handlePreviousFrame}>
                        <SkipPreviousIcon fontSize='Large' />
                    </IconButton>
                    <IconButton onClick={handleNextFrame}>
                        <SkipNextIcon fontSize='Large' />
                    </IconButton>
                </div>
                <div style={{ flexBasis: '50%', padding: '20px' }} ref={ref}>
                    <ProcessSensor processes={frameData.length ? frameData.process_sensors : []} maxHeight={sensorMaxHeight} onChange={switchedDisplayTable} />
                    <PortSensor ports={frameData.length ? frameData.ip_port_sensors : []} maxHeight={sensorMaxHeight} onChange={switchedDisplayTable} />
                    <DriveSensor drives={frameData.length ? frameData.drive_sensors : []} maxHeight={sensorMaxHeight} onChange={switchedDisplayTable} />
                </div>
            </div>
        </Box>
    );
};

export default Player;
