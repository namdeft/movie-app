import React, { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'

import tmdbApi, { category } from '../../api/tmdbApi'
import MovieCard from '../movie-card/MovieCard'

import './movie-list.scss'

const MovieList = (props) => {
    const [listMovie, setListMovie] = useState()

    useEffect(() => {
        const getListMovie = async () => {
            let res = null

            if (props.type !== 'similar') {
                switch (props.category) {
                    case category.movie:
                        res = await tmdbApi.getMovieList(props.type, { params: {} })
                        break

                    default:
                        res = await tmdbApi.getTvList(props.type, { params: {} })
                        break
                }
            } else {
                res = await tmdbApi.getSimilar(props.category, props.id)
            }
            setListMovie(res.results)
        }
        getListMovie()
    }, [listMovie])

    return (
        <div className='section movie-list'>
            <Swiper grabCursor={true} spaceBetween={4} slidesPerView={'auto'}>
                {listMovie &&
                    listMovie.map((item, i) => {
                        return (
                            <SwiperSlide key={i}>
                                <MovieCard item={item} category={props.category} />
                            </SwiperSlide>
                        )
                    })}
            </Swiper>
        </div>
    )
}

export default MovieList
