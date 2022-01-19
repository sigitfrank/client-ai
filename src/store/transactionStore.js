import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import { TRANSACTION_URL } from '../api/api'
import jwt_decode from 'jwt-decode'
import createTransactionValidation from '../validations/transaction/createTransaction'

class Store {
    transactions = []
    form = {
        id: '',
        name: '',
        price: 0,
    }
    constructor() {
        makeAutoObservable(this)
    }

    setTransaction = (value) => {
        this.form = JSON.parse(value)
    }
    postTransaction = async () => {
        const accessToken = localStorage.getItem('userAccessToken')
        const { id } = accessToken ? jwt_decode(accessToken) : ''
        const isValid = createTransactionValidation(this.form)
        if (!isValid) return false
        try {
            const response = await axios.post(TRANSACTION_URL, {
                id,
                price: +this.form.price,
            })
            const { newTransaction } = response.data
            this.transactions.push(newTransaction)
            return true
        } catch (error) {
            alert(error.response.data.msg)
            return false
        }
    }
    getTransactions = async () => {
        const accessToken = localStorage.getItem('userAccessToken')
        const { id } = accessToken ? jwt_decode(accessToken) : ''
        try {

            const response = await axios.get(`${TRANSACTION_URL}/${id}`)
            const { transactions } = response.data
            this.transactions = transactions
        } catch (error) {
            console.log(error)
        }
    }

}

const ProductStore = new Store()
export default ProductStore