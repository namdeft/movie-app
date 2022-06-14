import React, { useEffect, useRef } from 'react'

import { Link, useLocation } from 'react-router-dom'

import './header.scss'

import logo from '../../assets/vozflix-logo.png'

const headerNav = [
    {
        display: 'Home',
        path: '/',
    },
    {
        display: 'Movies',
        path: '/movie',
    },
    {
        display: 'Tv Series',
        path: '/tv',
    },
]

const Header = () => {
    const headerRef = useRef(null)

    useEffect(() => {
        const headerShrink = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink')
            } else {
                headerRef.current.classList.remove('shrink')
            }
        }
        window.addEventListener('scroll', headerShrink)

        return () => {
            window.removeEventListener('scroll', headerShrink)
        }
    }, [])

    const { pathname } = useLocation()

    const active = headerNav.findIndex((e) => e.path === pathname)

    return (
        <div>
            <div ref={headerRef} className='header'>
                <div className='header__wrap container '>
                    <div className='logo'>
                        <img src={logo} alt=''></img>
                        <Link to='/'>.DEFT</Link>
                    </div>
                    <ul className='header__nav'>
                        {headerNav.map((e, i) => {
                            return (
                                <li key={i} className={`${i === active ? 'active' : ''}`}>
                                    <Link to={e.path}>{e.display}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header
