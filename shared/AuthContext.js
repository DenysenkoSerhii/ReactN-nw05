import { useState, createContext } from "react";

export const authContext = createContext(false);

const AuthContext = ({children}) => {
    const [isAuth, setIsAuth] = useState(false);

    return (<authContext.Provider value={{ isAuth, setIsAuth }}>
                {children}
            </authContext.Provider>)
}

export default AuthContext;