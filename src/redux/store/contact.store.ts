import { createStore, combineReducers } from 'redux'
import ContactReducer from '../reducer/contact.reducer'

const ContactStore = createStore(combineReducers({
    contactReducer : ContactReducer
}))

export default ContactStore