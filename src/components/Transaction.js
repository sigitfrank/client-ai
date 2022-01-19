import React, { useEffect } from 'react'
import ProductStore from '../store/productStore'
import TransactionStore from '../store/transactionStore'
import Header from './layout/Header'
import { observer } from 'mobx-react'

function Transaction() {
  const { getProducts, products, } = ProductStore
  const { transactions, getTransactions, postTransaction, form, setTransaction } = TransactionStore
  useEffect(() => {
    getProducts()
  }, [getProducts])
  useEffect(() => {
    getTransactions()
  }, [getTransactions])


  const handleTransaction = async () => {
    const status = await postTransaction()
    if (!status) return
    alert('Transaction created')
  }

  return <>
    <Header />
    <div className="container mt-5 p-3">
      <div className="row justify-content-center mb-5" style={{ minHeight: '10vh', maxHeight: '50vh', overflow: 'auto' }}>
        <div className="col-lg-6">
          <Transactions transactions={transactions} />
        </div>
      </div>
      <h4 className='text-center mb-4'>Make Transaction for: {form.name} - {form.price}</h4>

      <div className="row justify-content-center">
        <div className="col-lg-6">
          <form>
            <div className="form-group">
              <label htmlFor="product">Product</label>
              <select name="product" className='form-select' id="product" defaultValue={JSON.stringify(form)} onChange={(e) => setTransaction(e.target.value)}>
                <option value="">Select Product</option>
                {
                  products && products.map(product => {
                    return <option key={product.id} value={JSON.stringify({
                      name: product.name,
                      price: product.price,
                    })}>{product.name} - ${product.price}</option>
                  })
                }
              </select>
            </div>
            <div className="button-wrapper">
              <button className="btn primary" type="button" onClick={handleTransaction}>Process Transaction</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
}

export default observer(Transaction)



const Transactions = observer(({ transactions }) => {
  const getTotal = () => transactions.map(transaction => +transaction.total_spent).reduce((accumulator, item) => {
    return accumulator + item
  }, 0)
  return <div> <table className="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Total Spent</th>
        <th scope="col">Total Saving</th>
        <th scope="col">Transaction Date</th>
      </tr>
    </thead>
    <tbody>
      {
        transactions && transactions.map((transaction, index) => {
          return <tr className='text-center' key={transaction.id}>
            <th scope="row">{index + 1}</th>
            <td>{transaction.total_spent}</td>
            <td>{transaction.total_saving}</td>
            <td>{transaction.transaction_at.split('T')[0]}</td>
          </tr>
        })
      }
    </tbody>
  </table>
    <p>Total Spent: ${getTotal()}.00</p>
    <p>Total Transaction: {transactions.length}</p>
  </div>
})

