



const validatorPhoneNumber = (value) => {
    var validator = /1(3|4|5|7|8)\d{9}/g;
    return validator.test(value);
}

const validatorUserName=(value)=>{
    var validator=/^(?=[A-Z]+)(?=[a-zA-Z]*).{6,16}$/;
    return validator.test(value);
}
const validatorPassword=(value)=>{
    var validator=/^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,16}$/;
    return validator.test(value);
}



export default{
    validatorPhoneNumber,
    validatorUserName,
    validatorPassword
}


