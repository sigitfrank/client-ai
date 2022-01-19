const createTransactionValidation = (payload)=>{
    const  {name, price} = payload
    if (!name) {
        alert('Email cannot be empty')
        return false
    }
    if (!price) {
        alert('Email format is not valid')
        return false
    }
    return true
}

export default createTransactionValidation