import validateEmail from "../validateEmail"

const loginValidation = (payload)=>{
    const  {email} = payload
    if (!email) {
        alert('Email cannot be empty')
        return false
    }
    const isEmailVaid = validateEmail(email)
    if (!isEmailVaid) {
        alert('Email format is not valid')
        return false
    }
}

export default loginValidation