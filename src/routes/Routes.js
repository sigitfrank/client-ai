import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../components/Home'
import Voucher from '../components/Voucher'
import Form from '../components/Form'
import PrivateRoute from './PrivateRoute'

function RoutesApp() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route
                path="/voucher"
                element={
                    <PrivateRoute redirectTo="/">
                        <Voucher />
                    </PrivateRoute>
                }
            />
            <Route
                path="/form"
                element={
                    <PrivateRoute redirectTo="/" >
                        <Form />
                    </PrivateRoute >
                }
            />
        </Routes >
    )
}
export default RoutesApp