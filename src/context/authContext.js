import {createContext} from 'react'

export const AuthContext = createContext({
    name: null,
    surname: null,
    middleName: null,
    id: null,
    isSuperuser: false,
    isAuthenticated: false
})
