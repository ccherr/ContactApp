export const contactValidation = (firstName: string, lastName: string, age: number, photo: string) => {
    if (firstName == '' || lastName == '' || age == undefined || photo == '') {
        return "Data cannot be empty! please input form"
    } else if (firstName.length < 3) {
        return "First name should be more than 3 and should be less than 31"
    } else if (firstName.length > 30) {
        return "First name should be more than 3 and should be less than 31"
    } else if (lastName.length < 3) {
        return "Last name shoud be more than 3 and should be less than 31"
    } else if(lastName.length > 30) {
        return "Last name shoud be more than 3 and should be less than 31"
    } else if (age > 100) {
        return "age cannot be more than 100 and cannot be less than 1"
    } else if (age < 1){
        return "age cannot be more than 100 and cannot be less than 1"
    }
    else {
        return ''
    }
}