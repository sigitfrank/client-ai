import jwtDecode from 'jwt-decode';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppStore from '../../store/store';

function Header() {
    const navigate = useNavigate()
    const userAccessToken = localStorage.getItem('userAccessToken')
    const {first_name} = jwtDecode(userAccessToken)

    const { postLogout } = AppStore

    const handleLogout = () => {
        postLogout()
        navigate('/')
    }
    return <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <span className="navbar-brand" style={{cursor:'pointer'}} onClick={()=>navigate('/transaction')}>ABC Company</span>
            <span >Hi, {first_name}</span>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <span className="nav-link" style={{ cursor: 'pointer' }} onClick={handleLogout}>Logout</span>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
}

export default Header;
