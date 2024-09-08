import React, { useRef, useEffect,useState } from 'react';
import './Board.css';
import ifresa from './assets/img/fresa3.png';


import pacmanRopen from './assets/img/pacmanRopen.png';
import pacmanLopen from './assets/img/pacmanLopen.png';
import pacmanUopen from './assets/img/pacmanUopen.png';
import pacmanDopen from './assets/img/pacmanDopen.png';

import pacmanRclose from './assets/img/pacmanRclose.png';
import pacmanLclose from './assets/img/pacmanLclose.png';
import pacmanUclose from './assets/img/pacmanUclose.png';
import pacmanDclose from './assets/img/pacmanDclose.png';


import ighostRed from './assets/img/red.png';
import ighostBlue from './assets/img/blue.png';
import ighostPink from './assets/img/pink.png';
import ighostOrange from './assets/img/orange.png';

import isoundWaka from './assets/sounds/pacman-waka-waka.mp3';
import isoundSiren from './assets/sounds/pacman-siren.mp3';

const WIDTH = 27;
const WALL_WIDTH = 6;
const TAM_STRAW=WIDTH-5;
const TAM_PACMAN=WIDTH-3;
const SPEED = 220;

const SPEED_GHOST_RED = 220;
const SPEED_GHOST_BLUE = 270;
const SPEED_GHOST_PINK = 200;
const SPEED_GHOST_ORANGE = 240;


const WALL_SPACE = WIDTH-(WALL_WIDTH*2); 

const map = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,2,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,1,0],
    [0,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,0],
    [0,0,0,0,0,1,0,0,0,1,1,1,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,0,1,0,1,1,1,1,1,1,1,0,1,0,0,0,0,0],
    [0,0,0,0,0,1,0,1,0,0,2,0,0,1,0,1,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,0,2,2,2,0,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0],
    [0,0,0,0,0,1,0,1,1,1,1,1,1,1,0,1,0,0,0,0,0],
    [0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0],
    [0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0],
    [0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0],
    [0,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,0],
    [0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]

    const map2 = [...map];

export function Board(){
    const canvasRef = useRef(null);
    const soundRef = useRef(null);
    const soundRef2 = useRef(null);


    const [maps,setMap] = useState(map);
    const [isAnimanding,setAnimanding] = useState(false);
    const [pacmanPosition, setPacmanPosition] = useState({ x: 1, y: 1 });
    const [redPosition, setRedPosition] = useState({ x: 7, y: 8 });
    const [bluePosition, setBluePosition] = useState({ x: 7, y: 9 });
    const [pinkPosition, setPinkPosition] = useState({ x: 7, y: 10 });
    const [orangePosition, setOrangePosition] = useState({ x: 7, y: 11 });
    
    const [directionGhostRed, setDirectionGhostRed] = useState('right');
    const [directionGhostBlue, setDirectionGhostBlue] = useState('right');
    const [directionGhostPink, setDirectionGhostPink] = useState('right');
    const [directionGhostOrange, setDirectionGhostOrange] = useState('right');

    const [direction, setDirection] = useState('');
    const [over, setOver] = useState(false);
    const [score, setScore] = useState(0);
    const [directionBefore,setDirectionBefore] = useState('right');
    const [framePacman,setFrameP] = useState('open');



    
    const fresa = new Image;
    fresa.src = ifresa;
    const pacmanR = new Image;
    pacmanR.src = framePacman==='open'?pacmanRopen:pacmanRclose;
    const pacmanL = new Image;
    pacmanL.src = framePacman==='open'?pacmanLopen:pacmanLclose;
    const pacmanU = new Image;
    pacmanU.src = framePacman==='open'?pacmanUopen:pacmanUclose;
    const pacmanD = new Image;
    pacmanD.src = framePacman==='open'?pacmanDopen:pacmanDclose;

    const ghostRed = new Image;
    ghostRed.src = ighostRed;
    const ghostBlue = new Image;
    ghostBlue.src = ighostBlue;
    const ghostPink = new Image;
    ghostPink.src = ighostPink;
    const ghostOrange = new Image;
    ghostOrange.src = ighostOrange;

    
    const soundWaka = new Audio(isoundWaka);
    soundRef.current = soundWaka;

    const soundSiren = new Audio(isoundSiren);
    soundRef2.current = soundSiren;


    const start=()=>{
        setStar(true);
    };

    const restart=()=>{
        setOver(false);
        setScore(0);
        setPacmanPosition({ x: 1, y: 1 });
        setRedPosition({ x: 7, y: 8 });
        setBluePosition({ x: 7, y: 9 });
        setPinkPosition({ x: 7, y: 10 });
        setOrangePosition({ x: 7, y: 11 });
        setDirectionGhostRed('right');
        setDirectionGhostBlue('right');
        setDirectionGhostPink('right');
        setDirectionGhostOrange('right');
        setDirection('');
        setDirectionBefore('right');
        setAnimanding(false);
        
        const newMap = [...map];

        for (let i = 0; i < newMap.length; i++) {
            for (let j = 0; j < newMap[i].length; j++) {
                if(newMap[i][j]===2){
                    newMap[i][j]=1;
                }
            }
        }

        setMap(newMap);
    }

    const handleKeyDown = (event) => { 
        setDirectionBefore(direction)
        switch (event.key) {
            case 'ArrowUp':
                setDirection('up');
                break;
            case 'ArrowDown':
                setDirection('down');
                break;
            case 'ArrowLeft':
                setDirection('left');
                break;
            case 'ArrowRight':
                setDirection('right');
                break;
            default:
                break;
        }
        setAnimanding(true)        
    };

    useEffect(() => {
        if(over) return
        const timerId = setTimeout(() => {
            drawGhost(directionGhostRed, redPosition, 'red');
        }, SPEED_GHOST_RED);
    }, [redPosition]); 

useEffect(()=>{
    if(over) return
    setTimeout(() => {
        drawGhost(directionGhostBlue, bluePosition, 'blue');
    }, SPEED_GHOST_BLUE);
},[bluePosition])

useEffect(()=>{
    if(over) return
    setTimeout(() => {
        drawGhost(directionGhostPink, pinkPosition, 'pink');
    }, SPEED_GHOST_PINK);
},[pinkPosition])

useEffect(()=>{
    if(over) return
    setTimeout(() => {
        drawGhost(directionGhostOrange, orangePosition, 'orange');
    }, SPEED_GHOST_ORANGE);
},[orangePosition])


const drawGhost = (directionGhost, positionGhost, ghost) => {
    let y = 0;
    let x =0;
    const newMap = [...map];

    

    switch (directionGhost) {
        case 'up':
            x-=1;
            break;
        case 'down':
            x+=1;
            break;
        case 'left':
            y-=1;
            break;
        case 'right':
            y+=1;
            break;
        default:
        break;
    }

    const newY = positionGhost.y +y;
    const newX = positionGhost.x +x;

    if(newY===-1 && newX===9){
        setPositionGhost({x:9,y:maps[9].length}, ghost);
        return;
    }
    if(newY===maps[9].length && newX===9 ){
        setPositionGhost({x:9,y:-1}, ghost);
        return;
    }
    if(newMap[newX][newY] ===0){
        let flag = false;
        while(!flag){
            let direction = Math.floor(Math.random() * 4);
            switch (direction) {
                case 0:
                    if(newMap[positionGhost.x][positionGhost.y+1]!==0){
                        setDirectionGhost('right', ghost);
                        flag=true;
                    }
                    break;
                case 1:
                    
                    if(newMap[positionGhost.x][positionGhost.y-1]!==0){
                        setDirectionGhost('left', ghost);
                        flag=true;
                    }
                    break;
                case 2:
                    if(newMap[positionGhost.x+1][positionGhost.y]!==0){
                        setDirectionGhost('down', ghost);
                        flag=true;
                    }
                    break;
                case 3:
                    if(newMap[positionGhost.x-1][positionGhost.y]!==0){
                        setDirectionGhost('up', ghost);
                        flag=true;
                    }
                    break;
                default:
                    break;
                
            }
        }

        const newX2 = positionGhost.x;
        const newY2 = positionGhost.y;

        

        setPositionGhost(newX2,newY2, ghost);
        
        return;
    }

    
    setPositionGhost(newX,newY, ghost);
}

const setPositionGhost = (x,y, ghost) => {
    const newX = x;
    const newY = y;

    switch(ghost){
        case 'red':
            setRedPosition({x:newX,y:newY});
            break;
        case 'blue':
            setBluePosition({x:newX,y:newY});
            break;
        case 'pink':
            setPinkPosition({x:newX,y:newY});
            break;
        case 'orange':
            setOrangePosition({x:newX,y:newY});
            break;
        default:
            break;
    }
}


const setDirectionGhost = (directionGhost, ghost) => {
    switch (ghost) {
        case 'red':
            setDirectionGhostRed(directionGhost);
            break;
        case 'blue':
            setDirectionGhostBlue(directionGhost);
            break;
        case 'pink':
            setDirectionGhostPink(directionGhost);
            break;
        case 'orange':
            setDirectionGhostOrange(directionGhost);
            break;
        default:
            break;
    }
}



useEffect(()=>{
    if(over) return
    setTimeout(() => {
        requestAnimationFrame(draw);
    }, isAnimanding?SPEED:0); 
},[pacmanPosition,isAnimanding])


    const draw = () => {
        let y = 0;
        let x =0;
        const newMap = [...map]  
            
        switch (direction) {
            case 'up':
                x-=1;
                break;
            case 'down':
                x+=1;
                break;
            case 'left':
                y-=1;
                break;
            case 'right':
                y+=1;
                break;
            default:
            break;
        }

        const newY = pacmanPosition.y +y;
        const newX = pacmanPosition.x +x;
        
        if(newY===-1 && newX===9){
            setPacmanPosition({x:9,y:maps[9].length})
            setAnimanding(true);
            return;
        }
        if(newY===maps[9].length && newX===9 ){
            setPacmanPosition({x:9,y:-1})
            setAnimanding(true);
            return;
        }

        if(newMap[newX][newY] ===0){
            setAnimanding(false);
            return ;
        }   
        
        if(newMap[newX][newY] ===2 && score >1){
            soundRef2.current.currentTime = 1.45;
            soundRef2.current.play(); 
        }   

        if(newMap[newX][newY]===1){
            const newScore = score+1;
            newMap[newX][newY]=2;

            soundRef.current.currentTime = 0.4;
            soundRef.current.play();                    
            
            setScore(newScore);
        }
        
        if(isAnimanding){
            setMap(newMap); 
            setPacmanPosition({x:newX,y:newY});
            setFrameP(framePacman==='open'?'close':'open')
        }
        setAnimanding(true)
    }


    
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        for (let i = 0; i < maps.length; i++) {
            for (let j = 0; j < maps[i].length; j++) {
                
                

                switch (maps[i][j]) {
                    case 0:
                        context.fillStyle = '#231942';
                        context.fillRect(j*WIDTH, i*WIDTH, WIDTH, WIDTH);
                        break;
                    case 1:
                        context.fillStyle = '#973cec';
                        context.fillRect(j*WIDTH, i*WIDTH, WIDTH, WIDTH);
                        context.drawImage(fresa,(j*WIDTH),(i*WIDTH),TAM_STRAW,TAM_STRAW)
                        break;
                    case 2:
                        context.fillStyle = '#973cec';
                        context.fillRect(j*WIDTH, i*WIDTH, WIDTH, WIDTH);
                        break;
                    default:
                        break;
                }

                if (maps[i][j]==0) {
                    context.fillStyle = "#6f2dbd";
                    context.fillRect((j*WIDTH)+WALL_WIDTH,(i*WIDTH)+WALL_WIDTH,WALL_SPACE,WALL_SPACE);
                }
                if (maps[i][j]==0 && j<maps[i].length && maps[i][j-1]==0) {
                    
                    context.fillRect((j*WIDTH)-WALL_WIDTH,(i*WIDTH)+WALL_WIDTH,WALL_SPACE+(2*WALL_WIDTH),WALL_SPACE);
                }
                if (i>0 && maps[i][j]==0 && maps[i-1][j]==0) {
                    context.fillRect((j*WIDTH)+WALL_WIDTH,(i*WIDTH)-WALL_WIDTH,WALL_SPACE,WALL_SPACE+(2*WALL_WIDTH));
                }
            }
            
        }
        
        switch (direction) {
            case 'up':
                context.drawImage(pacmanU, (pacmanPosition.y* WIDTH), (pacmanPosition.x*WIDTH),TAM_PACMAN,TAM_PACMAN);
                break;
            case 'down':
                context.drawImage(pacmanD, (pacmanPosition.y* WIDTH), (pacmanPosition.x*WIDTH),TAM_PACMAN,TAM_PACMAN);
                break;
            case 'left':
                context.drawImage(pacmanL, (pacmanPosition.y* WIDTH), (pacmanPosition.x*WIDTH),TAM_PACMAN,TAM_PACMAN);
                break;
            case 'right':
                context.drawImage(pacmanR, (pacmanPosition.y* WIDTH), (pacmanPosition.x*WIDTH),TAM_PACMAN,TAM_PACMAN);
                break;
            default:
                context.drawImage(pacmanR, (pacmanPosition.y* WIDTH), (pacmanPosition.x*WIDTH),TAM_PACMAN,TAM_PACMAN);
            break;
        }

        context.drawImage(ghostRed, (redPosition.y* WIDTH), (redPosition.x*WIDTH),TAM_PACMAN,TAM_PACMAN);
        context.drawImage(ghostBlue, (bluePosition.y* WIDTH), (bluePosition.x*WIDTH),TAM_PACMAN,TAM_PACMAN);
        context.drawImage(ghostPink, (pinkPosition.y* WIDTH), (pinkPosition.x*WIDTH),TAM_PACMAN,TAM_PACMAN);
        context.drawImage(ghostOrange, (orangePosition.y* WIDTH), (orangePosition.x*WIDTH),TAM_PACMAN,TAM_PACMAN);

        if((pacmanPosition.x===redPosition.x && pacmanPosition.y===redPosition.y)
        || (pacmanPosition.x===bluePosition.x && pacmanPosition.y===bluePosition.y)
        || (pacmanPosition.x===pinkPosition.x && pacmanPosition.y===pinkPosition.y)
        || (pacmanPosition.x===orangePosition.x && pacmanPosition.y===orangePosition.y)){
            setOver(true);
        }
        
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            cancelAnimationFrame(draw);
            window.removeEventListener('keydown', handleKeyDown);
        };

    }, [maps,redPosition,bluePosition,pinkPosition,orangePosition]);

    return(
        <>
            <div className='score'> <h2>Score: {score}</h2></div>

            <div>
            <canvas ref={canvasRef} width={map[0].length * WIDTH} height={900} />
            </div>
        {
            over && (
                <div className='game-over'>
                    <h1>Game Over</h1>
                    <button onClick={restart}>Play Again</button>
                </div>
            )
        
        }
            
        </>
    )
}