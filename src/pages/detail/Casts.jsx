import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import apiConfig from '../../api/apiConfig'
import tmdbApi from '../../api/tmdbApi'

const Casts = () => {
    const [casts, setCasts] = useState()

    const { category, id } = useParams()

    useEffect(() => {
        const getCasts = async () => {
            const res = await tmdbApi.Casts(category, id)
            setCasts(res.cast.slice(0, 5))
        }
        getCasts()
    }, [category, id])

    return (
        <div>
            <div className='casts'>
                {casts &&
                    casts.map((cast, i) => {
                        return (
                            <>
                                <div className='casts__item' key={i}>
                                    <img src={apiConfig.w500Image(cast?.profile_path)} alt=''></img>
                                    <span>{cast.name}</span>
                                </div>
                            </>
                        )
                    })}
            </div>
        </div>
    )
}

export default Casts
