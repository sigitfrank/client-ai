import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerStore from '../store/customerStore';
import Header from './layout/Header';
import { observer } from 'mobx-react'

function Form() {
  const navigate = useNavigate()
  const { postUploadImage, setFile } = CustomerStore

  const handleUpload = () => {
    alert('asd')
  }

  return <>
    <Header />
    <div className="container mt-5 p-3">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <p className='text-center fw-bold'>Please upload your image with our product</p>
          <form action="">
            <div className="form-group">
              <label htmlFor="image">Upload Image</label>
              <input type="file" name="image" id="image" onChange={(e) => setFile(e.target.value)} className='form-control mt-3' />
            </div>
            <div className="button-wrapper">
              <button className="btn primary me-2" type='button' onClick={() => handleUpload()}>Upload</button>
              <button className="btn secondary" onClick={() => navigate('/transaction')}>Back</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>;
}

export default observer(Form);
