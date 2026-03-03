import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "./api";

export default function useLogout() {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await API.post("/users/logout");
            setUser(null);
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.message || "Logout failed");
        }
    };

    return logout;
}