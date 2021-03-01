import {createContext, useState, ReactNode, useEffect} from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie'
import { LevelUpModal } from '../components/LevelUpModal';


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
    CloseModal: () => void;
}

interface ChallengesProviderProps{
    children: ReactNode;
    level: number,
    currentExperience: number,
    challegensCompleted: number,
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({
        children,
        ...otherProps
    }: ChallengesProviderProps){

    const [level, setlevel] = useState(otherProps.level ?? 1)
    const [currentExperience, setCurrentExperience] = useState(otherProps.currentExperience ?? 0)
    const [challegensCompleted, setChallengesCompleted] = useState( otherProps.challegensCompleted ?? 0)

    const [activeChallenge, setActiveChallenge] = useState(null)

    const [isLevelUpModalOpen, setIslevelUpModalOpen] = useState(false)


    const experienceToNextLevel = Math.pow( (level + 1) * 7, 2 )


    useEffect(() =>{
        Notification.requestPermission()
    }, [])


    useEffect(() =>{
        Cookies.set('level', level.toString() )
        Cookies.set('currentExperience', currentExperience.toString() )
        Cookies.set('challegensCompleted', challegensCompleted.toString() )
    }, [level, currentExperience, challegensCompleted])


    function LevelUp(){
      setlevel(level + 1)
      setIslevelUpModalOpen(true)
    }

    function CloseModal(){
        setIslevelUpModalOpen(false)
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
        console.log('XP FINAL', finalXP)
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
            completeChallenge,
            CloseModal
            }}>
            {children}

            {isLevelUpModalOpen && <LevelUpModal/>}
            
        </ChallengesContext.Provider>
    )
}