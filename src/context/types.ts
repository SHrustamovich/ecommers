import { ReactElement } from "react";

export interface ITokens {
    accessToken: string;
    refreshToken: string;
}

export interface IUser {
    id: number;
    password: string;
    role: string;
    status: string;
    username: string;
}

export interface IUserData {
    user: IUser;
    tokens: ITokens;
}

export interface IUserContext {
    userData: IUserData;
    setTokens?: (a: string, b: string) => void;
}

export interface IUserProviderProps {
    children: ReactElement;
}
