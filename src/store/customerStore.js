import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import { CUSTOMER_URL } from '../api/api'
import jwt_decode from 'jwt-decode'

class Store {

    file = null
    
    constructor() {
        makeAutoObservable(this)
    }

    setFile = (file)=> this.file = file

    postUploadImage = async () => {
        const accessToken = localStorage.getItem('userAccessToken')
        const { id } = accessToken ? jwt_decode(accessToken) : ''
        try {
            const response = await axios.post(CUSTOMER_URL, {
                id,
                price: +this.form.price,
            })
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

}

const CustomerStore = new Store()
export default CustomerStore