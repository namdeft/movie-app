import React, { useEffect, useState } from 'react'

import './modal.scss'

const Modal = (props) => {
    const [active, setActive] = useState(false)

    const handleCloseVideo = () => {
        const modal = document.querySelector(`#${props.id}`)
        modal.classList.remove('active')
        if (props.closeVideo) {
            props.closeVideo()
        }
    }

    useEffect(() => {
        setActive(props.active)
    }, [props.active])

    return (
        <div
            id={props.id}
            className={`modal ${active ? 'active' : ''}`}
            onClick={() => handleCloseVideo()}
        >
            {props.children}
        </div>
    )
}

export const ModalContent = (props) => {
    return <div className='modal__content'>{props.children}</div>
}

export default Modal
