import React from 'react'

import HeroSlide from '../components/hero-slide/HeroSlide'
import { OutlineButton } from '../components/button/Button'

import { Link } from 'react-router-dom'

import MovieList from '../components/movie-list/MovieList'
import { category, movieType, tvType } from '../api/tmdbApi'

const Home = () => {
    return (
        <>
            <HeroSlide />
            <div className='container'>
                <div className='section mb-3'>
                    <div className='section__header mb-2'>
                        <h2>Trending Movies</h2>
                        <Link to={'/movie'}>
                            <OutlineButton className='small'>Load more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.popular} />
                </div>

                <div className='section mb-3'>
                    <div className='section__header mb-2'>
                        <h2>Top Rated Movies</h2>
                        <Link to={'/movie'}>
                            <OutlineButton className='small'>Load more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.top_rated} />
                </div>

                <div className='section mb-3'>
                    <div className='section__header mb-2'>
                        <h2>Trending Tv Series</h2>
                        <Link to={'/tv'}>
                            <OutlineButton className='small'>Load more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.popular} />
                </div>

                <div className='section mb-3'>
                    <div className='section__header mb-2'>
                        <h2>Top Rated Tv Series </h2>
                        <Link to={'/tv'}>
                            <OutlineButton className='small'>Load more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.on_the_air} />
                </div>
            </div>
        </>
    )
}

export default Home
