import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import { CUSTOMER_URL } from '../api/api'
import jwt_decode from 'jwt-decode'

class Store {
    file = null
    constructor() {
        makeAutoObservable(this)
    }
    setFile = (file)=>this.file = file
    postUploadImage = async () => {
        const userAccessToken = localStorage.getItem('userAccessToken')
        const { id } = userAccessToken ? jwt_decode(userAccessToken) : ''
        if(!this.file) return false
        const formData = new FormData()
        formData.append("id", id)
        formData.append("image", this.file)
        try {
            const response = await axios.post(CUSTOMER_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userAccessToken}`
                }
            })
            console.log(response.data)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

}

const CustomerStore = new Store()
export default CustomerStore