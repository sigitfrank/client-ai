import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import { PRODUCT_URL } from '../api/api'
import createTransactionValidation from '../validations/transaction/createTransaction'

class Store {
    products = []

    form = {
        name: '',
        price: 0,
    }


    constructor() {
        makeAutoObservable(this)
    }

    getProducts = async () => {
        try {
            const response = await axios.get(PRODUCT_URL)
            const { products } = response.data
            this.products = products
        } catch (error) {
            console.log(error)
        }
    }

    setTransaction = (value) => {
        this.form = JSON.parse(value)
    }

    postTransaction = () => {
        const isValid = createTransactionValidation(this.form)
        if (!isValid) return false
        try {
            const response = await axios.post(PRODUCT_URL, {
                price: this.form.price,
            })
            console.log(response.data)
            return true
        } catch (error) {
            alert(error.response.data.msg)
            return false
        }
    }

}

const ProductStore = new Store()
export default ProductStore