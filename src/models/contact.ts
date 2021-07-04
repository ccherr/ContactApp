class BaseContact {
    firstName?: string
    lastName?: string
    age?: number
    photo?: string
}

class Contact extends BaseContact {
    id?: string = ''
}

export class ContactReq extends BaseContact {

}

export default Contact