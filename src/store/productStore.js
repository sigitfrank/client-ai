import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import { PRODUCT_URL } from '../api/api'

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

}

const ProductStore = new Store()
export default ProductStore