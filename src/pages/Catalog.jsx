import React from 'react'

import { useParams } from 'react-router-dom'

import MovieGrid from '../components/movie-grid/MovieGrid'
import PageHeader from '../components/page-header/PageHeader'

const Catalog = () => {
    const { category } = useParams()

    return (
        <>
            <PageHeader>{category === 'movie' ? 'Movie' : 'Tv Series'}</PageHeader>
            <MovieGrid category={category}></MovieGrid>
        </>
    )
}

export default Catalog
