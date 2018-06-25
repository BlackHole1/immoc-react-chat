import React from 'react'
import logoImg from './job.png'
import './logo.css'

function Logo () {
  return (
    <div className="logo-container">
      <img src={logoImg} width='250px' alt='Logo' />
    </div>
  )
}

export default Logo
