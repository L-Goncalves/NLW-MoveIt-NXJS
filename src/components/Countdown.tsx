import styles from '../styles/components/Countdown.module.css'
import { useState, useEffect, useContext } from 'react'
import { CountdownContext } from '../contexts/CountdownContext';




export function CountDown(){

    const { minutes, seconds, active, startCountdown, resetCountdown, hasFinished, stopCountdown} = useContext(CountdownContext)

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')


   

   
    
    

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