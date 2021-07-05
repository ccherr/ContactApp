export const contactValidation = (firstName: string, lastName: string, age: number, photo: string) => {
    if (firstName == '' || lastName == '' || age == undefined || photo == undefined) {
        return "Data cannot be empty! please input form"
    } else if (firstName.length < 3) {
        return "First name should be more than 3"
    } else if (lastName.length < 3) {
        return "Last name shoud be more than 3"
    } else if (age > 100 || age < 1) {
        return "age cannot be more than 100 and cannot be less than 0"
    }
    else {
        return ''
    }
}