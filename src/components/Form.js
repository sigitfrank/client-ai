import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './layout/Header';

function Form() {
  const navigate = useNavigate()
  return <>
    <Header />
    <div className="container mt-5 p-3">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <form action="">
            <div className="form-group">
              <label htmlFor="image">Upload Image</label>
              <input type="file" name="image" id="image" className='form-control mt-3' />
            </div>
            <div className="button-wrapper">
              <button className="btn primary me-2">Upload</button>
              <button className="btn secondary" onClick={() => navigate('/transaction')}>Back</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>;
}

export default Form;
