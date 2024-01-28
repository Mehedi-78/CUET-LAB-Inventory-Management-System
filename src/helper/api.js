'use server'

import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

export const submitAddItemManagerForm = async (values) => {
    alert(JSON.stringify(values, null, 2))
}

export const submitTeacherForm = async (values) => {
    alert(JSON.stringify(values, null, 2))
}

const getAllUser = async () => {
    const res = await fetch(`http://localhost:3000/api/user`)
    return res.json()
}