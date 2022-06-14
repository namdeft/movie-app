import React from 'react'

import { BiSearchAlt } from 'react-icons/bi'

import './input.scss'

const Input = (props) => {
    return (
        <div className='input-container'>
            <input
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange ? (e) => props.onChange(e) : null}
            />
            <div className='icon-search' onClick={() => props.goToSearch()}>
                <BiSearchAlt />
            </div>
        </div>
    )
}

export default Input
