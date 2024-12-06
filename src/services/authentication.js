import { redirect } from "react-router-dom";
import usersData from './users.json';

const isAuthenticated = async () => {
    const session = localStorage.getItem("session");
    if (session) {
        throw redirect("/");
    }
    return null;
}

const handleVerificationProtected = async () => {
    const session = localStorage.getItem("session");
    if (!session) {
        throw redirect("/signin");
    }
    return null;
}

const signIn = async (email, password) => {
    try {
        const user = usersData.users.find(
            user => user.email === email && user.password === password
        );

        if (user) {
            const sessionData = {
                email: user.email,
                name: user.name,
                token: Math.random().toString(36).substring(2),
                timestamp: new Date().getTime()
            };
            localStorage.setItem("session", JSON.stringify(sessionData));
            return { data: sessionData, error: null };
        }

        return { data: null, error: { message: "Login invalido" } };
    } catch (error) {
        console.error('Erro no login:', error);
        return { data: null, error };
    }
}

const signUp = async (email, password) => {
    try {
        const userExists = usersData.users.find(user => user.email === email);

        if (userExists) {
            return { data: null, error: { message: "User already registered" } };
        }

        const newUser = {
            email,
            password,
            name: email.split('@')[0]
        };

        return {
            data: {
                email: newUser.email,
                name: newUser.name
            },
            error: null
        };
    } catch (error) {
        console.error('Erro no cadastro:', error);
        return { data: null, error };
    }
}

const signOut = () => {
    localStorage.removeItem("session");
}

export {
    isAuthenticated,
    handleVerificationProtected,
    signIn,
    signUp,
    signOut
}