import { useNavigate } from "react-router-dom";
import { toast } from "./use-toast";

export const useAuthToken = () => {
    const navigate = useNavigate();

    const getToken = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            toast({
                title: "User not authenticated!",
                variant: "destructive",
            });
            return null;
        }
        return token;
    };

    return { getToken };
};
