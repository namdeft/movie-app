import React, { useEffect, useState } from 'react'

import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi'

import MovieCard from '../movie-card/MovieCard'
import { OutlineButton } from '../button/Button'

import './movie-grid.scss'
import Input from '../input/Input'

import { useNavigate, useParams } from 'react-router-dom'

const MovieGrid = (props) => {
    const [listMovie, setListMovie] = useState()

    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState()

    const { keyword } = useParams()

    useEffect(() => {
        let res = null

        const getListMovie = async () => {
            if (keyword === undefined) {
                switch (props.category) {
                    case category.movie:
                        res = await tmdbApi.getMovieList(movieType.popular, { params: {} })
                        break

                    default:
                        res = await tmdbApi.getTvList(tvType.popular, { params: {} })
                        break
                }
            } else {
                const params = {
                    query: keyword,
                }
                res = await tmdbApi.search(props.category, { params })
            }
            setListMovie(res.results)
            setTotalPage(res.total_pages)
            window.scrollTo(0, 0)
        }
        getListMovie()
    }, [props.category, keyword])

    const handleLoadMore = async () => {
        let res = null
        let params = {
            query: keyword,
            page: page + 1,
        }

        if (keyword === undefined) {
            switch (props.category) {
                case category.movie:
                    res = await tmdbApi.getMovieList(movieType.popular, { params })
                    break

                default:
                    res = await tmdbApi.getTvList(tvType.popular, { params })
                    break
            }
        } else {
            res = await tmdbApi.search(props.category, { params })
        }

        setPage(page + 1)
        setListMovie([...listMovie, ...res.results])
    }
    return (
        <>
            <div className='movie-search'>
                <MovieSearch category={props.category} />
            </div>
            <div className='movie-grid'>
                {listMovie &&
                    listMovie.map((item, i) => {
                        return <MovieCard category={props.category} item={item} key={i} />
                    })}
            </div>
            {page < totalPage ? (
                <div className='movie-grid__loadmore'>
                    <OutlineButton onClick={() => handleLoadMore()}>Load more</OutlineButton>
                </div>
            ) : null}
        </>
    )
}

const MovieSearch = (props) => {
    const navigate = useNavigate()

    const [keyword, setKeyword] = useState('')

    const goToSearch = () => {
        if (keyword.trim().length > 0) {
            navigate(`/${props.category}/search/${keyword}`)
        }
    }

    useEffect(() => {
        const enterEvent = (e) => {
            if (e.key === 'Enter') {
                goToSearch()
                setKeyword('')
            }
        }

        document.addEventListener('keypress', enterEvent)
        return () => {
            document.removeEventListener('keypress', enterEvent)
        }
    }, [keyword])

    return (
        <Input
            type='text'
            placeholder='Search...'
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
            goToSearch={goToSearch}
        />
    )
}

export default MovieGrid
