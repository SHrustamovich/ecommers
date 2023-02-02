import { createContext, useState, FC } from "react";
import { IUser, IUserContext, IUserProviderProps } from "./types";

const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

const UserContextInitials = {
    userData: {
        user: {} as IUser,
        tokens: {
            accessToken: !!accessToken ? (accessToken as string) : "",
            refreshToken: !!refreshToken ? (accessToken as string) : "",
        },
    },
};

export const UserContext = createContext<IUserContext>(UserContextInitials);

const UserProvider: FC<IUserProviderProps> = ({ children }) => {
    const [userData, setUserData] = useState(UserContextInitials.userData);

    function setTokens(accessToken: string, refreshToken: string) {
        setUserData({ ...userData, tokens: { accessToken, refreshToken } });
    }

    return (
        <UserContext.Provider value={{ userData, setTokens }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
