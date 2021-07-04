import Contact from '../../models/contact'
import { ContactActions, TypeContactActions } from '../action/contact.action'

export type TypeContactReducer = {
    contactReducer: Contact[]
}

const ContactReducer = (contactState: Contact[] = [], action: TypeContactActions) => {
    switch (action.type) {
        case ContactActions.RELOAD_CONTACT:
            return []
        case ContactActions.GET_CONTACT:
            return contactState.filter(item => item.id == action.data)
        case ContactActions.ADD_CONTACT:
            return [...contactState, action.data]
        case ContactActions.ADD_CONTACTS:
            if (action.data) return [...contactState, ...action.data]
        case ContactActions.UPDATE_CONTACT:
            const indexUpdated = contactState.findIndex(item => item.id == action.data.id)
            let updateState = [...contactState]
            updateState[indexUpdated] = action.data
            return updateState
        case ContactActions.DELETE_CONTACT:
            const newState = contactState.filter(item => item.id != action.data)
            return newState
        default:
            return contactState
    }
}

export default ContactReducer