import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ChallengeBox.module.css'
export function ChallengeBox(){
    const { activeChallenge, resetChallenge } = useContext(ChallengesContext)
 
    return(
        <div className={styles.challengeBoxContainer}>

            {activeChallenge? (
            <div className={styles.challengeBoxActive}>
                <header>
                    Ganhe {activeChallenge.amount} de XP
                </header>
                <main>  
                    <img src={`icons/${activeChallenge.type}.svg`}/>
                    <strong>Novo Desafio</strong>
                    <p>{activeChallenge.description}</p>
                </main>

                <footer>
                    <button
                        onClick={resetChallenge} 
                        className={styles.challengeFailButton} type="button">Falhei</button>
                    <button  className={styles.challengeCompleteButton}type="button">Consegui</button>
                </footer>
            </div>) :
            (
            <div className={styles.challengeBoxNotActive}>
                <strong>Inicie um ciclo
                para receber desafios a
                serem completados
                </strong>
                <p>
                     <img src='icons/level-up.svg'/>  
                     Avance de level completandos desafios!
                </p>
                </div>
            )}


          
        </div>
    )
}