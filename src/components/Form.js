import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerStore from '../store/customerStore';
import Header from './layout/Header';
import { observer } from 'mobx-react'
import TransactionStore from '../store/transactionStore';
import moment from 'moment'

function Form() {
  const navigate = useNavigate()
  const { postUploadImage, setFile, getCustomerImage, imageData } = CustomerStore
  const { totalSpent, totalTransaction } = TransactionStore

  useEffect(() => {
    if (totalSpent < 100 || totalTransaction < 3) {
      return navigate('/transaction')
    }
    getCustomerImage()
  }, [getCustomerImage])

  const handleUpload = async () => {
    const status = await postUploadImage()
    if (!status) return
    alert('Image uploaded and valid!')
  }

  const renderContent = () => {
    if (!imageData) return <>
      <p className='text-center fw-bold'>Please upload your image with our product</p>
      <form action="">
        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input type="file" name="image" id="image" onChange={(e) => setFile(e.target.files[0])} className='form-control mt-3' />
        </div>
        <div className="button-wrapper">
          <button className="btn primary me-2" type='button' onClick={() => handleUpload()}>Upload</button>
          <button className="btn secondary" onClick={() => navigate('/transaction')}>Back</button>
        </div>
      </form>
    </>
    return <ImageWrapper />
  }

  return <>
    <Header />
    <div className="container mt-5 p-3">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          {renderContent()}
        </div>
      </div>
    </div>
  </>;
}

export default observer(Form);

const ImageWrapper = observer(() => {
  const { postClaimVoucher, getCustomerVoucher, voucherData, checkVoucher, voucherStatus, lastClaimed } = CustomerStore
  useEffect(() => {
    getCustomerVoucher()
  }, [getCustomerVoucher])

  useEffect(() => {
    checkVoucher()
  }, [checkVoucher])

  const handleClaimVoucher = async () => {
    const status = await postClaimVoucher()
    if (!status) return
    alert('Voucher claimed!')
  }

  const claimable = () => {
    if (!lastClaimed) return false
    const newLastClaimedTime = moment(lastClaimed).add(10, 'minutes')
    return moment(newLastClaimedTime).isBefore(moment())
  }
  const renderAction = () => {
    if (voucherData?.customer_id) return <p className='fw-bold mt-5'>You already claimed the voucher</p>
    if (!claimable()) return <p className='fw-bold mt-5'>Please wait until {moment(lastClaimed).add(10, 'minutes').format('YYYY-MM-DD HH:mm:ss')}  </p>
    if (!voucherData?.customer_id) return <div className="button-wrapper">
      <button className="btn primary" onClick={handleClaimVoucher}>Claim your voucher</button>
    </div>

  }
  return <div className='text-center mb-5'>
    <p className='fw-bold'>Your image is verified</p>
    <img src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80" alt="customer-img" style={{
      borderRadius: '.5rem',
      objectFit: 'cover',
      width: '200px'
    }} />
    {!voucherData?.customer_id && <p className='mt-5'>You don't claim your voucher yet</p>}
    {renderAction()}
  </div>
})

