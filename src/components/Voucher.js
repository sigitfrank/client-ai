import React, { useEffect } from 'react';
import ProductStore from '../store/productStore';
import Header from './layout/Header';
import { observer } from 'mobx-react'

function Voucher() {
  const { getProducts, products, setTransaction, form } = ProductStore
  useEffect(() => {
    getProducts()
  }, [])
  return <>
    <Header />
    <div className="container mt-3">
      <h4 className='text-center'>Make Transaction for: {form.name} - {form.price}</h4>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <form>
            <div className="form-group">
              <label htmlFor="product">Product</label>
              <select name="product" className='form-select' id="product" defaultValue="" onChange={(e) => setTransaction(e.target.value)}>
                <option value="">Select Product</option>
                {
                  products && products.map(product => {
                    return <option key={product.id} value={JSON.stringify(product)}>{product.name} - ${product.price}</option>
                  })
                }
              </select>
            </div>
            <div className="button-wrapper">
              <button className="btn primary">Process Transaction</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>;
}

export default observer(Voucher);
