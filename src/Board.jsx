import React, { useRef, useEffect,useState } from 'react';
import ifresa from './assets/img/fresa.webp';


const WIDTH = 30;
const WALL_WIDTH = 6;
const TAM_STRAW=WIDTH+7;
const TAM_PACMAN=WIDTH-3;
const SPEED = 220;


const WALL_SPACE = WIDTH-(WALL_WIDTH*2); 
const map = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0],
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

export function Board(){
    const canvasRef = useRef(null);
    const soundRef = useRef(null);
    const soundRef2 = useRef(null);


    const [maps,setMap] = useState(map);
    const [isAnimanding,setAnimanding] = useState(false);
    const [isAnimandingGhost,setAnimandingGhost] = useState(true);
    const [pacmanPosition, setPacmanPosition] = useState({ x: 1, y: 1 });
    const [redPosition, setRedPosition] = useState({ x: 7, y: 8 });
    const [bluePosition, setBluePosition] = useState({ x: 9, y: 9 });
    const [pinkPosition, setPinkPosition] = useState({ x: 9, y: 10 });
    const [orangePosition, setOrangePosition] = useState({ x: 9, y: 11 });
    
    const [directionGhostRed, setDirectionGhostRed] = useState('rigth');

    const [direction, setDirection] = useState('rigth');
    const [score, setScore] = useState(0);
    const [directionBefore,setDirectionBefore] = useState('right');
    const [framePacman,setFrameP] = useState('open');
    const [soundRep,setSound] = useState(false);
    const [star,setStar] = useState(false);
    const [isPlayingRef,setIsPlayingRef] = useState(false);
    const [space, setSpace] = useState(0);


    
    const fresa = new Image;
    fresa.src = ifresa;
    const pacmanR = new Image;
    pacmanR.src = "public/pacman2"+framePacman+".png";
    const pacmanL = new Image;
    pacmanL.src = "public/pacman2L"+framePacman+".png";
    const pacmanU = new Image;
    pacmanU.src = "public/pacman2U"+framePacman+".png";
    const pacmanD = new Image;
    pacmanD.src = "public/pacman2DR"+framePacman+".png";

    const ghostRed = new Image;
    ghostRed.src = "public/red.png";
    const ghostBlue = new Image;
    ghostBlue.src = "public/blue.png";
    const ghostPink = new Image;
    ghostPink.src = "public/pink.png";
    const ghostOrange = new Image;
    ghostOrange.src = "public/orange.png";

    
    const soundWaka = new Audio('public/pacman-waka-waka.mp3');
    soundRef.current = soundWaka;

    const soundSiren = new Audio('public/pacman-siren.mp3');
    soundRef2.current = soundSiren;


    const start=()=>{
        setStar(true);
    };

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

useEffect(()=>{
    setTimeout(() => {
        requestAnimationFrame(drawGhost);
      }, isAnimandingGhost?SPEED:0); 
},[redPosition])
    

const drawGhost = () => {
    let y = 0;
    let x =0;
    const newMap = [...map];
   
    switch (directionGhostRed) {
        case 'up':
            x-=1;
            break;
        case 'down':
            x+=1;
            break;
        case 'left':
            y-=1;
            break;
        case 'rigth':
            y+=1;
            break;
        default:
        break;
    }

    const newY = redPosition.y +y;
    const newX = redPosition.x +x;
    
    if(newY===-1 && newX===9){
        setRedPosition({x:9,y:maps[9].length})
        setAnimandingGhost(true);
        return;
    }
    if(newY===maps[9].length && newX===9 ){
        setRedPosition({x:9,y:-1})
        setAnimandingGhost(true);
        return;
    }

    if(newMap[newX][newY] ===0){
        let flag = false;
        while(!flag){
            let direction = Math.floor(Math.random() * 4);

            switch (direction) {

                case 0:
                    if(newMap[redPosition.x][redPosition.y+1]!==0){
                        setDirectionGhostRed('rigth');
                        flag=true;
                    }
                    break;
                case 1:
                    if(newMap[redPosition.x][redPosition.y-1]!==0){
                        setDirectionGhostRed('left');
                        flag=true;
                    }
                    break;
                case 2:
                    if(newMap[redPosition.x+1][redPosition.y]!==0){
                        setDirectionGhostRed('down');
                        flag=true;
                    }
                    break;
                case 3:
                    if(newMap[redPosition.x-1][redPosition.y]!==0){
                        setDirectionGhostRed('up');
                        flag=true;
                    }
                    break;
                default:
                    break;
                
            }
        }
        const newX2 = redPosition.x;
        const newY2 = redPosition.y;

        setRedPosition({x:newX2,y:newY2});
        
        return;
    }

    setRedPosition({x:newX,y:newY});
}



useEffect(()=>{
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
        // Aquí puedes llamar a las funciones de dibujo en el contexto 2D
        for (let i = 0; i < maps.length; i++) {
            for (let j = 0; j < maps[i].length; j++) {
                
                context.drawImage(ghostRed, (redPosition.y* WIDTH), (redPosition.x*WIDTH),TAM_PACMAN,TAM_PACMAN);

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

        
        
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            cancelAnimationFrame(draw);
            window.removeEventListener('keydown', handleKeyDown);
        };

    }, [maps,redPosition]);
/*    
    useEffect(()=>{
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.drawImage(ghostRed, (redPosition.y* WIDTH), (redPosition.x*WIDTH),TAM_PACMAN,TAM_PACMAN);
        context.drawImage(ghostBlue, (bluePosition.y* WIDTH), (bluePosition.x*WIDTH),TAM_PACMAN,TAM_PACMAN);
        context.drawImage(ghostPink, (pinkPosition.y* WIDTH), (pinkPosition.x*WIDTH),TAM_PACMAN,TAM_PACMAN);
        context.drawImage(ghostOrange, (orangePosition.y* WIDTH), (orangePosition.x*WIDTH),TAM_PACMAN,TAM_PACMAN);

    },[redPosition,bluePosition,pinkPosition,orangePosition])
*/ 
    return(
        <>
            <div className='score'> <h2>Score: {score}</h2></div>

            <div>
            <canvas ref={canvasRef} width={map[0].length * WIDTH} height={900} />
            </div>
            
        </>
    )
}