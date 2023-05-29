export interface Login {
    email: string;
    password: string;
}

export interface Register {
    displayName: string;
    email: string,
    password: string;
    user?: object;
    tokens?: object;
}