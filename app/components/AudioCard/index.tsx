'use client'

import { Howl } from "howler"
import { useEffect, useRef, useState } from "react"
import styles from './index.module.css'
import { Pause, Play, StopCircle } from "react-feather"


export default function AudioCard(props: any) {
    const runId = useRef<NodeJS.Timeout>()
    const [timestamp, setTimestamp] = useState(0)
    const [audio, setAudio] = useState<Howl>()

    
    useEffect(() => {
        setAudio(new Howl({
            src: ['https://s3.us-west-1.amazonaws.com/crazycowmm.com/audio/' + encodeURI(props.hit.name)],
            onplay: () => {
                if(runId.current) return;
                runId.current = setInterval(() => {
                    setTimestamp(timestamp => timestamp + 1)
                }, 100)
            },
            onpause: () => {
                clearInterval(runId.current)
                runId.current = undefined
            },
            onend: () => {
                clearInterval(runId.current)
                runId.current = undefined
                setTimestamp(0)
            },
            onstop: () => {
                clearInterval(runId.current)
                runId.current = undefined
                setTimestamp(0)
            }
        }))
    }, [])
    
    if(!props.hit.name || !audio) return

    return (
        <div className={styles.card}>
            <p className={styles.title}>{props.hit.name.substring(props.hit.name.lastIndexOf('/') + 1)}</p>
            <div className={styles.controls}>
                <button className={styles.button} onClick={() => {if(runId.current) return; audio.play()}}><Play /></button>
                <button className={styles.button} onClick={() => {audio.pause()}}><Pause /></button>
                <button className={styles.button} onClick={() => {audio.stop()}}><StopCircle /></button>
                <progress className={styles.progress} max={audio.duration() * 10} value={timestamp} />
            </div>
        </div>
    )
}