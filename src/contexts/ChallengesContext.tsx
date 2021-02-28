import {createContext, useState, ReactNode} from 'react';
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

    function LevelUp(){
      setlevel(level + 1)
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        let challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge)
    }

    function resetChallenge(){
        setActiveChallenge(null)
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
            resetChallenge
            }}>
            {children}
        </ChallengesContext.Provider>
    )
}