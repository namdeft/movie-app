import React from 'react'

import { Link } from 'react-router-dom'

import apiConfig from '../../api/apiConfig'

import './movie-card.scss'

const MovieCard = ({ category, item }) => {
    const link = '/' + category + '/' + item.id

    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path)

    return (
        <Link to={link}>
            <div className='movie-card'>
                <div className='movie-card__img' style={{ backgroundImage: `url(${bg})` }}></div>
            </div>
            <h3 className='title'>{item.title || item.name}</h3>
        </Link>
    )
}

export default MovieCard
