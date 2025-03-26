import { createContext, useState } from "react";


export const AuthContext = createContext('');

export const AuthProtected = ({children}) =>{
    
    const [isadmin ,setIsAdmin] = useState(localStorage.getItem('isAdmin'));
    return (
        <AuthContext.Provider value={{isadmin, setIsAdmin }}>
            {children}
        </AuthContext.Provider>
    )

}

