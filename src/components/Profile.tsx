import styles from '../styles/components/Profile.module.css'

export function Profile(){
    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/l-goncalves.png" alt='Imagem de Perfil'/>

        <div>
            <strong>Lucas Gonçalves</strong>
            <p>
                <img src='icons/level.svg' alt='Level'/>
                Level 1
            </p>
        </div>
        </div>
        
       
    )
}