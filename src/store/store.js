import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import { LOGIN_URL } from '../api/api'
import loginValidation from '../validations/auth/loginValidation'

class Store {
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
        if (!isValid) return false
        try {
            const response = await axios.post(LOGIN_URL, {
                email: this.email,
            })
            const { userAccessToken } = response.data
            localStorage.setItem('userAccessToken', userAccessToken)
            return true
        } catch (error) {
            alert(error.response.data.msg)
            return false
        }
    }

    postLogout = () => {
        localStorage.removeItem('userAccessToken')
    }

}

const AppStore = new Store()
export default AppStore