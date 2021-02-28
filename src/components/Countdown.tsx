import styles from '../styles/components/Countdown.module.css'
import { useState, useEffect, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext';


let countdownTimeout: NodeJS.Timeout;
export function CountDown(){

    const {startNewChallenge} = useContext(ChallengesContext)
 
    const [time, setTime] =  useState(0.2 * 60);
    const [active, setActive] = useState(false); 
    const [hasFinished, setHasFinished] = useState(false)

    const minutes =  Math.floor(time / 60);
    const seconds = time % 60

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')


    function startCountdown(){
        setActive(true)

    }

    function stopCountdown(){
        clearTimeout(countdownTimeout)
        setActive(false);
    }

    function resetCountdown(){
        clearTimeout(countdownTimeout)
        setActive(false);
        setTime(0.2 * 60)
    }

    useEffect(() => {
        if(active && time > 0){
            countdownTimeout = setTimeout(() => {
                setTime(time -1)
            }, 1000 )
        }
        else if(active && time === 0){
           
            setHasFinished(true)
            setActive(false)
            startNewChallenge();
            
        }
       
    }, [active, time] )
    
    

    return( 
        <>
        <div className={styles.countdownContainer}>
            <div>
                <span>{minuteLeft}</span>
                <span>{minuteRight}</span>
            </div>
            <span>:</span>
            <div>
                <span>{secondLeft}</span>
                <span>{secondRight}</span>
            </div>

          
        </div>

        
        <div className={styles.buttonContainer}>

            {hasFinished?
            (<button
                disabled
                className={styles.countdownButton}>
                    Ciclo Encerrado
            </button>)
            :(  
                <>
                {active?
                (
                <>
                <button type="button" onClick={resetCountdown} className={`${styles.countdownButton} ${styles.countdownButtonQuit}` }>
                Sair do Ciclo
                </button>

                <button type="button" onClick={stopCountdown} className={`${styles.countdownButton} ${styles.countdownButtonPause}` } >
                Pausar Ciclo
                </button>
                
               
                </>
                )
                :(
                <>
                <button type="button" onClick={startCountdown} className={styles.countdownButton}>
                Iniciar Ciclo
                </button>

                <button type="button" onClick={stopCountdown} className={`${styles.countdownButton} ${styles.countdownButtonPause}` } >
                Pausar Ciclo
                </button>
                
                </>
                )
                
                } 
                </>
                )}


          
    
           
       
        </div>
       
         
      

     
       </>
    )
}