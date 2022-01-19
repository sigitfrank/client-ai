import React from 'react'
import { observer } from 'mobx-react'
import '../css/home.css'
import AppStore from '../store/store'
import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()
  const { email, setEmail, postLogin } = AppStore

  const handleLogin = async ()=>{
    const isLoggedIn = await postLogin()
    if(!isLoggedIn) return
    alert('Login')
    navigate('/voucher')
  }
  
  return <div className='home'>
    <h1>Hi, are you ABC Customer?</h1>
    <div className="form-group mt-3">
      <label htmlFor="email">Email*</label>
      <input type="text" className="form-control mt-2" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder='xxx@youmail.com' />
      <div className="button-wrapper">
        <button className="btn primary" onClick={handleLogin}>
          Get in
        </button>
      </div>
    </div>

  </div>
}

export default observer(Home)
