import { Navigate } from "react-router-dom"
import jwt_decode from 'jwt-decode'
function PrivateRoute({ children, redirectTo }) {
    const  accessToken = localStorage.getItem('userAccessToken')
    const decoded = accessToken ? jwt_decode(accessToken) : ''
    return accessToken && decoded.email ? children : <Navigate to={redirectTo} />
  }

export default PrivateRoute