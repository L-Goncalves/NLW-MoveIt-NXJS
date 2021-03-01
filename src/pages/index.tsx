import { CompletedChallenges } from "../components/CompletedChallenges"
import { CountDown } from "../components/Countdown"
import { ExperienceBar } from "../components/ExperienceBar"
import { Profile } from "../components/Profile"
import {ChallengeBox} from '../components/ChallengeBox'

import { GetServerSideProps } from 'next'
import Head from 'next/head'

import styles from '../styles/pages/Home.module.css'
import { CountdownProvider } from "../contexts/CountdownContext"
import React from "react"
import { ChallengesProvider } from "../contexts/ChallengesContext"


interface HomeProps{
    level: number,
    currentExperience: number,
    challegensCompleted: number,
}

export default function Home(props: HomeProps)  {

  console.log(props)
  return (
    
    <ChallengesProvider 
    level={props.level} 
    currentExperience={props.currentExperience} 
    challegensCompleted={props.challegensCompleted}>
      <div className={styles.container}>
        
        <Head>
            <title>Início | move.it</title>
        </Head>

        <ExperienceBar/>

        <CountdownProvider>
        <section>
          <div>
            <Profile/>
            <CompletedChallenges/>
            <CountDown/>
          </div>
          <div>
            <ChallengeBox/>
          </div>
        </section>
        </CountdownProvider>
     
      </div>

      </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {

  const {level, currentExperience, challegensCompleted } = ctx.req.cookies

  return{ 
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challegensCompleted: Number(challegensCompleted)
    }
  }
}