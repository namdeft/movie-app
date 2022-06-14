import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import apiConfig from '../../api/apiConfig'
import tmdbApi from '../../api/tmdbApi'

import './detail.scss'
import VideoList from './VideoList'
import Casts from './Casts'
import MovieList from '../../components/movie-list/MovieList'

const Detail = () => {
    const { category, id } = useParams()

    const [movie, setMovie] = useState()

    useEffect(() => {
        const getMovieDetail = async () => {
            const res = await tmdbApi.getDetail(category, id, { params: {} })
            setMovie(res)
            window.scrollTo(0, 0)
        }
        getMovieDetail()
    }, [category, id])

    return (
        <>
            {movie && (
                <>
                    <div
                        className='banner'
                        style={{
                            backgroundImage: `url(${apiConfig.originalImage(
                                movie.backdrop_path || movie.poster_path
                            )})`,
                        }}
                    ></div>
                    <div className='movie-content container mb-3'>
                        <div className='movie-content__poster'>
                            <img
                                src={apiConfig.w500Image(movie.poster_path || movie.backdrop_path)}
                                alt=''
                            />
                        </div>
                        <div className='movie-content__info'>
                            <h1 className='title'>{movie.title || movie.name}</h1>
                            <div className='genres'>
                                {movie.genres.map((genre, i) => {
                                    return (
                                        <span key={i} className='genre'>
                                            {genre.name}
                                        </span>
                                    )
                                })}
                            </div>
                            <p className='description'>{movie.overview}</p>
                            <div className='cast__container'>
                                <div className='cast__header'>
                                    <h2>Casts</h2>
                                </div>
                                <Casts />
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div className='container'>
                {/* <div className='movie-clip section mb-3'>
                    <VideoList/>
                </div> */}
                <div className='similar-movie section mb-3'>
                    <div className='section__header'>
                        <h2>Similar</h2>
                    </div>
                    <MovieList category={category} id={id} type='similar' />
                </div>
            </div>
        </>
    )
}

export default Detail
