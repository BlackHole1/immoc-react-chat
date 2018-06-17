import React from 'react'
import logoImg from './job.png'
import './logo.css'

function Logo (props) {
  return (
    <div className="logo-container">
      <img src={logoImg} width='250px' />
    </div>
  )
}

export default Logo
