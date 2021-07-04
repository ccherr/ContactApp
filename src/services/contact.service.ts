import axios from 'axios'
import Respons from '../models/respons'
import Contact, { ContactReq } from '../models/contact'

const BASE_URL = 'https://simple-contact-crud.herokuapp.com/contact'

const getContact = async () => {
    try {
        const { data, status } = await axios.get<Respons<Contact[]>>(BASE_URL)
        if (status == 200) return data
    } catch (error) {
        throw error.response
    }
}

const getContactById = async (body: string) => {
    try {
        const { data, status } = await axios.get<Respons<Contact>>(`${BASE_URL}/${body}`)
        if (status == 200) return data.data
    } catch (error) {
        throw error.response
    }
}

const insertContact = async (body: ContactReq) => {
    try {
        const { data, status } = await axios.post<Respons<{ id: string }>>(BASE_URL, body)
        if (status == 201) return data
    } catch (error) {
        throw error.response
    }
}

const updateContact = async (body: ContactReq, id: string) => {
    try {
        const { data } = await axios.put<Respons<Contact>>(`${BASE_URL}/${id}`, body)
        return data
    } catch (error) {
        throw error.response
    }
}

const deleteContact = async (body: string) => {
    try {
        const { data } = await axios.delete<Respons<any>>(`${BASE_URL}/${body}`)
        return data
    } catch (error) {
        throw error.response
    }
}

export { getContact, insertContact, updateContact, deleteContact, getContactById }