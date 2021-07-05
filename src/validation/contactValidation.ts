export const contactValidation = (firstName: string, lastName: string, age: undefined, photo: undefined) => {
    if (firstName == '' && lastName == '' && age == undefined && photo == undefined){
        return "Data cannot be empty! please input form"
    }else if(firstName.length < 3 ){
        return "firstName should be more than 3"
    }else if(lastName.length < 3){
        return "lastName shoud be more than 3"
    }
    else {
        return ''
    }
}