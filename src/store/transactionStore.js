import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import { TRANSACTION_URL } from '../api/api'
import jwt_decode from 'jwt-decode'
import createTransactionValidation from '../validations/transaction/createTransaction'

class Store {
    transactions = []
    form = {
        name: '',
        price: 0,
    }
    totalTransaction = 0
    totalSpent = 0
    constructor() {
        makeAutoObservable(this)
    }

    setTransaction = (value) => {
        if(!value) return this.form = {
            name: '',
            price: 0,
        }
        this.form = JSON.parse(value)
    }
    postTransaction = async () => {
        const userAccessToken = localStorage.getItem('userAccessToken')
        try {
            const { id } = userAccessToken ? jwt_decode(userAccessToken) : ''
            const isValid = createTransactionValidation(this.form)
            if (!isValid) return false
            const response = await axios.post(TRANSACTION_URL, {
                id,
                price: +this.form.price,
            },{
                headers: {
                    Authorization: `Bearer ${userAccessToken}`
                }
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
        const userAccessToken = localStorage.getItem('userAccessToken')
        try {
            const { id } = userAccessToken ? jwt_decode(userAccessToken) : ''
            const response = await axios.get(`${TRANSACTION_URL}/${id}`,{
                headers: {
                    Authorization: `Bearer ${userAccessToken}`
                }
            })
            const { transactions, last30DaysSpentTransactions, last30DaysTransactions} = response.data
            this.transactions = transactions
            this.totalSpent = last30DaysSpentTransactions
            this.totalTransaction = last30DaysTransactions
        } catch (error) {
            console.log(error)
        }
    }

}

const TransactionStore = new Store()
export default TransactionStore