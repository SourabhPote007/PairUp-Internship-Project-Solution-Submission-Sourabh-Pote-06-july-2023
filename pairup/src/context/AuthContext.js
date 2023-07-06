import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user: {
        _id : "64a10d6dabecd62d43367c5d",
        username : "SourabhDemo3",
        email : "SD3@gmail.com",
        profilePicture : "",
        coverPicture : "",
        isAdmin : false,
        followers : [],
        following : [],
    },
    isFetching:false,
    error:false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer,INITIAL_STATE);

    return (
        <AuthContext.Provider value={{user:state.user, isFetching:state.isFetching,error:state.error,dispatch}}>
            {
                children
            }
        </AuthContext.Provider>
    )
}