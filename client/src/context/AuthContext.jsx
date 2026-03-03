import { createContext, useEffect, useState } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                console.log("Checking auth...");
                const res = await API.get("/users/get-current-user");
                console.log("User from backend:", res.data.data);
                setUser(res.data.data);
            } catch (error) {
                console.log("Not logged in");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);
    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}