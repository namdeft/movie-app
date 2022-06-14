import React, { useEffect, useRef, useState } from 'react'

import { useNavigate } from 'react-router'

import apiConfig from '../../api/apiConfig'
import tmdbApi, { category, movieType } from '../../api/tmdbApi'

import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import './hero-slide.scss'
import { Button, OutlineButton } from '../button/Button'

import Modal, { ModalContent } from '../modal/Modal'

const HeroSlide = () => {
    SwiperCore.use([Autoplay])

    const [movieItems, setMovieItems] = useState([])

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 }
            try {
                const res = await tmdbApi.getMovieList(movieType.popular, { params })
                if (res && res.results) {
                    setMovieItems(res.results.slice(0, 3))
                }
            } catch {
                console.log('error')
            }
            window.scrollTo(0, 0)
        }
        getMovies()
    }, [])

    return (
        <div className='hero-slide'>
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                // autoplay={{ delay: 3000 }}
            >
                {movieItems &&
                    movieItems.map((item, i) => {
                        return (
                            <SwiperSlide key={i}>
                                {({ isActive }) => (
                                    <HeroSlideItem
                                        item={item}
                                        className={`${isActive ? 'active' : ''}`}
                                    />
                                )}
                            </SwiperSlide>
                        )
                    })}
            </Swiper>

            {movieItems.map((item, i) => {
                return <ModalTrailer key={i} item={item} />
            })}
        </div>
    )
}

const HeroSlideItem = ({ item, className }) => {
    const [videosTrailer, setVideosTrailer] = useState()

    let navigate = useNavigate()

    const backgroundImg = apiConfig.originalImage(
        item.backdrop_path ? item.backdrop_path : item.poster_path
    )

    useEffect(() => {
        const getVideosTrailer = async () => {
            try {
                const videos = await tmdbApi.getVideos(category.movie, item.id)

                if (videos && videos.results) {
                    setVideosTrailer(videos.results)
                }
            } catch {
                console.log('error')
            }
        }
        getVideosTrailer()
    }, [])

    const handleActiveModal = () => {
        const modal = document.querySelector(`#modal_${item.id}`)

        const finalTrailer = videosTrailer.find((video) => video.type === 'Trailer')

        if (finalTrailer) {
            const videoSrc = 'https://www.youtube.com/embed/' + finalTrailer.key
            modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc)
        } else {
            modal.querySelector('.modal__content > iframe').innerHTML = 'No Trailer'
        }

        modal.classList.add('active')
    }

    return (
        <div
            className={`hero-slide__item  ${className}`}
            style={{
                backgroundImage: `url(${backgroundImg})`,
            }}
        >
            <div className='hero-slide__item__content container'>
                <div className='hero-slide__item__content__info'>
                    <h2 className='title'>{item.title}</h2>
                    <div className='overview'>{item.overview}</div>
                    <div className='btns'>
                        <Button onClick={() => navigate('/movie' + '/' + item.id)}>
                            Watch now
                        </Button>
                        <OutlineButton onClick={() => handleActiveModal()}>
                            Watch trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className='hero-slide__item__content__poster'>
                    <img src={apiConfig.w500Image(item.poster_path)} alt='' />
                </div>
            </div>
        </div>
    )
}

export const ModalTrailer = ({ item }) => {
    const iframeRef = useRef(null)

    const closeVideo = () => {
        iframeRef.current.setAttribute('src', '')
    }

    return (
        <Modal id={`modal_${item.id}`} closeVideo={closeVideo}>
            <ModalContent closeVideo={closeVideo}>
                <iframe
                    ref={iframeRef}
                    width='900'
                    height='500'
                    title='YouTube video player'
                    frameBorder='0'
                    allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                ></iframe>
            </ModalContent>
        </Modal>
    )
}

export default HeroSlide
