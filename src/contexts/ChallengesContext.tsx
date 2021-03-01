import {createContext, useState, ReactNode, useEffect} from 'react';
import challenges from '../../challenges.json';

interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData{
    level: number;
    currentExperience: number;
    challegensCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel: number;
    LevelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

interface ChallengesProviderProps{
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children }: ChallengesProviderProps){
    const [level, setlevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [challegensCompleted, setChallengesCompleted] = useState(0)

    const [activeChallenge, setActiveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow( (level + 1) * 4, 2 )


    useEffect(() =>{
        Notification.requestPermission()
    }, [])


    function LevelUp(){
      setlevel(level + 1)
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        let challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge)

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount} de XP!`
            }
            )
        }

        new Audio('/notification.mp3').play()
    }

    function resetChallenge(){
        setActiveChallenge(null)
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const { amount } = activeChallenge;

        let finalXP = currentExperience + amount;

        if(finalXP >= experienceToNextLevel){
            finalXP = finalXP - experienceToNextLevel;
            LevelUp()
        }

        setCurrentExperience(finalXP)
        setActiveChallenge(null)
        setChallengesCompleted(challegensCompleted + 1)
    }

    return(
        <ChallengesContext.Provider 
        value={{
            level, 
            currentExperience, 
            challegensCompleted,
            activeChallenge,
            experienceToNextLevel,
            LevelUp,
            startNewChallenge,
            resetChallenge,
            completeChallenge
            }}>
            {children}
        </ChallengesContext.Provider>
    )
}