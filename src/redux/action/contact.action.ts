import Contact from '../../models/contact'

enum ContactActions {
    RELOAD_CONTACT = 'RELOAD_CONTACT',
    GET_CONTACT = 'GET_CONTACT',
    ADD_CONTACT = 'ADD_CONTACT',
    ADD_CONTACTS = 'ADD_CONTACTS',
    UPDATE_CONTACT = 'UPDATE_CONTACT',
    DELETE_CONTACT = 'DELETE_CONTACT'
}

export type TypeContactActions = {
    type: ContactActions,
    data?: Contact | Contact[] | String
}

const ReloadContact = (): TypeContactActions => {
    return {
        type: ContactActions.RELOAD_CONTACT,
        data: []
    }
}

const GetContactById = (data: Contact): TypeContactActions => {
    return {
        type: ContactActions.GET_CONTACT,
        data: data
    }
}

const AddContact = (data: Contact): TypeContactActions => {
    return {
        type: ContactActions.ADD_CONTACT,
        data: data
    }
}

const AddContacts = (data: Contact[]): TypeContactActions => {
    return {
        type: ContactActions.ADD_CONTACTS,
        data: data
    }
}

const UpdateContact = (data: Contact): TypeContactActions => {
    return {
        type: ContactActions.UPDATE_CONTACT,
        data: data
    }
}

const DeleteContact = (id: String): TypeContactActions => {
    return {
        type: ContactActions.DELETE_CONTACT,
        data: id
    }
}

export { ContactActions, ReloadContact, GetContactById, AddContact, AddContacts, UpdateContact, DeleteContact }