


export async function validateAddItemManagerForm(values){
    const errors = {}
    nameVerify(errors, values)
    availableVerify(errors, values)
    damagedVerify(errors, values)

    return errors
}

export async function validateLoginForm(values){
    const errors = {}
    emailVerify(errors, values)

    return errors
}

/** ************************************************* */

/** validate name */
function nameVerify(errors, values){
    if(!values.name){
        errors.name = 'First Name Required...!'
    }
    
    return errors;
}

/** validate name */
function availableVerify(errors, values){
    if(!values.available){
        errors.available = 'Available field is Required...!'
    }

    return errors;
}

/** validate name */
function damagedVerify(errors, values){
    if(!values.damaged){
        errors.damaged = 'Damaged field is Required...!'
    }

    return errors;
}

/** validate gender */
function genderVerify(errors, values){
    if(!values.gender){
        errors.gender = 'Gender is Required...!'
    }
    
    return errors;
}

/** validate date-of-birth */
function dobVerify(errors, values){
    if(!values.dob){
        errors.dob = 'Date-of-Birth is Required...!'
    }
    
    return errors;
}

/** validate Roll */
function rollVerify(errors, values){
    if(!values.roll){
        errors.roll = 'Roll is Required...!'
    }
    
    return errors;
}

/** validate blood */
function bloodVerify(errors, values){
    if(!values.blood){
        errors.blood = 'Blood Group is Required...!'
    }
    
    return errors;
}

/** validate religion */
function religionVerify(errors, values){
    if(!values.religion){
        errors.religion = 'Religion is Required...!'
    }
    
    return errors;
}

/** validate Class */
function classVerify(errors, values){
    if(!values.class){
        errors.class = 'Class is Required...!'
    }
    
    return errors;
}

/** validate section */
function sectionVerify(errors, values){
    if(!values.section){
        errors.section = 'Section is Required...!'
    }
    
    return errors;
}

/** validate phone */
function phoneVerify(errors, values){
    let pattern = "(?:\\+88|88)?(01[3-9]\\d{8}$)"
    if(!values.phone){
        errors.phone = 'Phone Number is Required...!'
    }else if(!values.phone.match(pattern)){
        errors.phone = "Invalid Phone Number"
    }
    
    return errors;
}

/** validate email */
function emailVerify(errors, values){
    if(values.email.trim()){
        if(values.email.includes(" ")){
            errors.email = "Invalid Email...!"
        }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
            errors.email = "Invalid email address...!"
        }
    }

    return errors;
}