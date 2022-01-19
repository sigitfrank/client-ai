import React from 'react'
import { observer } from 'mobx-react'
import '../css/home.css'
import AppStore from '../store/store'
function Home() {
  const { email, setEmail, postLogin } = AppStore
  return <div className='home'>
    <h1>Hi, are you ABC Customer?</h1>
    <div className="form-group mt-3">
      <label htmlFor="email">Email*</label>
      <input type="text" className="form-control mt-2" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder='xxx@youmail.com' />
      <div className="button-wrapper">
        <button className="btn primary" onClick={postLogin}>
          Get in
        </button>
      </div>
    </div>

  </div>
}

export default observer(Home)
