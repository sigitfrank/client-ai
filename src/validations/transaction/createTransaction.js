const createTransactionValidation = (payload)=>{
    const  {name, price} = payload
    if (!name) {
        alert('Choose product first')
        return false
    }
    if (!price) {
        alert('Choose product first')
        return false
    }
    return true
}

export default createTransactionValidation