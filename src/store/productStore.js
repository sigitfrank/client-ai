import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import { PRODUCT_URL } from '../api/api'

class Store {
    products = []
    constructor() {
        makeAutoObservable(this)
    }
    getProducts = async () => {
        const userAccessToken = localStorage.getItem('userAccessToken')
        try {
            const response = await axios.get(PRODUCT_URL, {
                headers: {
                    Authorization: `Bearer ${userAccessToken}`
                }
            })
            const { products } = response.data
            this.products = products
        } catch (error) {
            console.log(error)
        }
    }

}

const ProductStore = new Store()
export default ProductStore