import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import { LOGIN_URL } from '../api/api'
import loginValidation from '../validations/auth/loginValidation'

class Store {
    isAuth = false
    email = ''
    constructor() {
        makeAutoObservable(this)
    }

    setIsAuth = (value) => {
        this.isAuth = value
    }
    setEmail = (value) => this.email = value
    postLogin = async () => {
        const isValid = loginValidation({ email: this.email })
        if (!isValid) return
        try {
            const response = await axios.post(LOGIN_URL, {
                email: this.login.email,
            })
            return response.data
        } catch (error) {
            alert(error.response.data.message)
            return false
        }
    }

    postLogout = () => {
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('userAccessToken')
    }

}

const AppStore = new Store()
export default AppStore