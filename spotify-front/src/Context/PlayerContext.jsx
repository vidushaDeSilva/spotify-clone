import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";
import axios from 'axios'

export const PlayerContext = createContext();

function PlayerContextProvider(props) {

    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    const [track, setTrack] = useState(songsData[0]);
    const [playerStatus, setPlayerStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0, minute: 0
        },
        totalTime: {
            second: 0, minute: 0
        }
    })

    const play = () => {
        audioRef.current.play();
        setPlayerStatus(true)
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayerStatus(false)
    }

    const playwithId = async (id) => {
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setPlayerStatus(true);
    }

    const previous = async () => {
        if (track.id > 0) {
            await setTrack(songsData[track.id - 1]);
            await audioRef.current.play();
            setPlayerStatus(true);
        }
    }

    const seekSong = async (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)
    }

    const next = async () => {
        if (track.id < songsData.length - 1) {
            await setTrack(songsData[track.id + 1]);
            await audioRef.current.play();
            setPlayerStatus(true);
        }
    }

    // const getSongsData = async () => {   new
    //     try {
    //         const response = await axios.get(`${url}/api/song/list`);
    //         setSongsData(response.data.songs)
    //         setTrack(response.data.songs[0]);
    //     } catch (error) {

    //     }
    // }

    // const getAlbumsData = async () => {      new
    //     const response = await axios.get(`${url}/api/album/list`);
    //     setSongsData(response.data.albums)

    // }


    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + '%'
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60), minute: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60), minute: Math.floor(audioRef.current.currentTime / 60)
                    }
                })
            }
        }, 1000);
    }, [audioRef])

    // useEffect(()=>{
    //     getSongsData();       new
    //     getAlbumsData();
    // }, [])

    const contextvalue = {
        audioRef,
        seekBg,
        seekBar,
        track,
        setTrack,
        playerStatus,
        setPlayerStatus,
        time,
        setTime,
        play,
        pause,
        playwithId,
        previous,
        next,
        seekSong,
        // songsData,   new
        // albumsdata
    }

    return (
        <div>
            <PlayerContext.Provider value={contextvalue}>
                {props.children}
            </PlayerContext.Provider>
        </div>
    )
}

export default PlayerContextProvider
