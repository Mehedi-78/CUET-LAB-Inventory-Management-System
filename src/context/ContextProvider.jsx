'use client'

import { createContext, useContext, useReducer } from "react";

const initialState = {
    user: null,
    refetchUserTable1: 0,
    refetchUserTable2: 0,
}


const Reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return { ...state, user: action.payload };
        case 'REMOVE_USER':
            return { ...state, user: null };
        case 'Recfetch_Table_1':
            return { ...state, refetchUserTable1: state.refetchUserTable1 + 1, refetchUserTable2: state.refetchUserTable2 + 1,  };
        case 'Recfetch_Table_2':
            return { ...state, refetchUserTable2: state.refetchUserTable2 + 1 };
        default:
            return state
    }
}

export let Context = createContext()

export function useUserContext() {
    return useContext(Context)
}

export default function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(Reducer, initialState)

    return (
        <Context.Provider value={{
            ...state,
            dispatch
        }}>
            {children}
        </Context.Provider>
    )
}