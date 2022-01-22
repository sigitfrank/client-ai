import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import { CUSTOMER_URL } from '../api/api'
import jwt_decode from 'jwt-decode'

class Store {
    imageData = null
    voucherData = null
    file = null
    voucherStatus = false
    lastClaimed = null
    nextVoucherTime = new Date()
    constructor() {
        makeAutoObservable(this)
    }
    setFile = (file) => this.file = file
    postUploadImage = async () => {
        const userAccessToken = localStorage.getItem('userAccessToken')
        try {
            const { id } = userAccessToken ? jwt_decode(userAccessToken) : ''
            if (!this.file) return false
            const formData = new FormData()
            formData.append("id", id)
            formData.append("image", this.file)
            await axios.post(CUSTOMER_URL, formData, {
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
        try {
            const { id } = userAccessToken ? jwt_decode(userAccessToken) : ''
            const response = await axios.get(`${CUSTOMER_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${userAccessToken}`
                }
            })
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
        try {
            const { id } = userAccessToken ? jwt_decode(userAccessToken) : ''
            const response = await axios.post(`${CUSTOMER_URL}/voucher`, {
                customer_id: id
            }, {
                headers: {
                    Authorization: `Bearer ${userAccessToken}`
                }
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
        try {
            const { id } = userAccessToken ? jwt_decode(userAccessToken) : ''
            const response = await axios.get(`${CUSTOMER_URL}/voucher/${id}`, {
                headers: {
                    Authorization: `Bearer ${userAccessToken}`
                }
            })
            const { voucher } = response.data
            this.voucherData = voucher
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    checkVoucher = async () => {
        const userAccessToken = localStorage.getItem('userAccessToken')
        try {
            const response = await axios.get(`${CUSTOMER_URL}/voucher/check/status`, {
                headers: {
                    Authorization: `Bearer ${userAccessToken}`
                }
            })
            const { status, next_voucher_time, last_claimed } = response.data
            this.voucherStatus = status
            this.nextVoucherTime = next_voucher_time
            this.lastClaimed = last_claimed
            return true
        } catch (error) {
            this.voucherStatus = 'not-available'
            return false
        }
    }

}

const CustomerStore = new Store()
export default CustomerStore