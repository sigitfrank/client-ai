import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import { CUSTOMER_URL } from '../api/api'
import jwt_decode from 'jwt-decode'

class Store {
    imageData = null
    voucherData = null
    file = null
    lastClaimed = null
    voucherStatus = 0
    constructor() {
        makeAutoObservable(this)
    }
    setFile = (file) => this.file = file
    postUploadImage = async () => {
        const userAccessToken = localStorage.getItem('userAccessToken')
        const { id } = userAccessToken ? jwt_decode(userAccessToken) : ''
        if (!this.file) return false
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
            this.getCustomerImage()
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    getCustomerImage = async () => {
        const userAccessToken = localStorage.getItem('userAccessToken')
        const { id } = userAccessToken ? jwt_decode(userAccessToken) : ''
        try {
            const response = await axios.get(`${CUSTOMER_URL}/${id}`)
            const { image } = response.data
            this.imageData = image
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    postClaimVoucher = async () => {
        const userAccessToken = localStorage.getItem('userAccessToken')
        const { id } = userAccessToken ? jwt_decode(userAccessToken) : ''
        try {
            const response = await axios.post(`${CUSTOMER_URL}/voucher`, {
                customer_id: id
            })
            const { newVoucher } = response.data
            this.voucherData = newVoucher
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }


    getCustomerVoucher = async () => {
        const userAccessToken = localStorage.getItem('userAccessToken')
        const { id } = userAccessToken ? jwt_decode(userAccessToken) : ''
        try {
            const response = await axios.get(`${CUSTOMER_URL}/voucher/${id}`)
            const { voucher } = response.data
            this.voucherData = voucher
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    checkVoucher = async () => {
        try {
            const response = await axios.get(`${CUSTOMER_URL}/voucher/check/status`)
            const { status, last_claimed } = response.data
            this.lastClaimed = last_claimed
            this.voucherStatus = status
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

}

const CustomerStore = new Store()
export default CustomerStore