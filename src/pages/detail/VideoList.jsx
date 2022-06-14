import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import tmdbApi from '../../api/tmdbApi'

const VideoList = () => {
    const [videos, setVideos] = useState()

    const { category, id } = useParams()

    useEffect(() => {
        const getVideoList = async () => {
            const res = await tmdbApi.getVideos(category, id)
            setVideos(res.results.slice(0, 4))
        }
        getVideoList()
    }, [category, id])

    return (
        <div className='videos'>
            {videos &&
                videos.map((item, i) => {
                    return <Video item={item} key={i} />
                })}
        </div>
    )
}

const Video = ({ item }) => {
    const src = 'https://www.youtube.com/embed/' + item.key

    return (
        <div className='video'>
            <div className='video__title'>
                <h2>{item.name}</h2>
            </div>
            <iframe width='1260' height='519' src={src} title='video' frameBorder='0'></iframe>
        </div>
    )
}

export default VideoList
