import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../components/Home'
import Form from '../components/Form'
import PrivateRoute from './PrivateRoute'
import Transaction from '../components/Transaction'

function RoutesApp() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route
                path="/transaction"
                element={
                    <PrivateRoute redirectTo="/">
                        <Transaction />
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