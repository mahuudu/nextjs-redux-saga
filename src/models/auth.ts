export interface Login {
    username: string;
    password: string;
}

export interface Register {
    displayName: string;
    email: string,
    password: string;
    user?: object;
    tokens?: object;
}