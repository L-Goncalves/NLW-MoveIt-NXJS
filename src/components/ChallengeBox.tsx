import styles from '../styles/components/ChallengeBox.module.css'
export function ChallengeBox(){

    const hasActiveChallenges = true;
    return(
        <div className={styles.challengeBoxContainer}>

            {hasActiveChallenges? (
            <div className={styles.challengeBoxActive}>
                <header>
                    Ganhe 400 de XP
                </header>
                <main>  
                    <img src="icons/body.svg"/>
                    <strong>Novo Desafio</strong>
                    <p>Levante e faça uma caminhada</p>
                </main>

                <footer>
                    <button className={styles.challengeFailButton} type="button">Falhei</button>
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