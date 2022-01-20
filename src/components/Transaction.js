import React, { useEffect, useState } from 'react'
import ProductStore from '../store/productStore'
import TransactionStore from '../store/transactionStore'
import Header from './layout/Header'
import { observer } from 'mobx-react'
import { useNavigate } from 'react-router-dom'

function Transaction() {
  const { getProducts, products, } = ProductStore
  const [disable, setDisable] = useState(false)
  const [time, setTime] = useState(5)
  const navigate = useNavigate()
  const { getTransactions, postTransaction, form, setTransaction, totalSpent, totalTransaction } = TransactionStore
  useEffect(() => {
    getProducts()
  }, [getProducts])



  const handleTransaction = async () => {
    const status = await postTransaction()
    if (!status) return
    setDisable(true)
    setTime(5)
    getTransactions()
    alert('Transaction created')
    setTimeout(() => {
      setDisable(false)
    }, 5000)

    const refreshIntervalId = setInterval(() => {
      if (time < 0) return clearInterval(refreshIntervalId)
      setTime(prev => prev - 1)
    }, 1000)

  }

  const checkLink = () => {
    if (totalSpent >= 100 && totalTransaction >= 3) return <h3 className='my-5 text-center fw-bold'>
      <span onClick={() => navigate('/form')} style={{ borderBottom: '1px solid #DDD', paddingBottom: '.5rem', cursor: 'pointer' }}>Get your voucher here!</span>
    </h3>
  }

  return <>
    <Header />
    <div className="container mt-5 p-3">
      <div className="row justify-content-center mb-5" style={{ minHeight: '10vh', maxHeight: '40vh', overflow: 'auto' }}>
        <div className="col-lg-6">
          <Transactions />
        </div>
      </div>

      {checkLink()}
      <h4 className='text-center mb-4'>Make Transaction for: {form.name} - ${form.price}</h4>
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
            {
              !disable ? <div className="button-wrapper">
                <button className="btn primary" type="button" onClick={handleTransaction}>Process Transaction</button>
              </div> : <p className='mt-3'>Please Wait... {time} seconds</p>
            }
          </form>
        </div>
      </div>
    </div>
  </>
}

export default observer(Transaction)



const Transactions = observer(() => {
  const { transactions, totalSpent, totalTransaction } = TransactionStore

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
    <p className='fw-bold mb-0'>Last 30 Days:</p>
    <p>Total Spent: ${totalSpent}.00</p>
    <p>Total Transaction: {totalTransaction}</p>
  </div>
})

