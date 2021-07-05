export const contactValidation = (firstName: string, lastName: string, age: number, photo: string) => {
    if (firstName == '' || lastName == '' || age == undefined || photo == '') {
        return "Data cannot be empty! please input form"
    } else if (firstName.length < 4 || firstName.length < 31) {
        return "First name should be more than 4 and should be less than 31"
    } else if (lastName.length < 4 || lastName.length < 31) {
        return "Last name shoud be more than 4 and should be less than 31"
    } else if (age > 100 || age < 1) {
        return "age cannot be more than 100 and cannot be less than 1"
    }
    else {
        return ''
    }
}