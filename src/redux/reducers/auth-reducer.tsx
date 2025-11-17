import { jwtDecode } from "jwt-decode";

interface userDataProps {
    id: string;
    email: string;
    name: string;
    activated: boolean;
    seller: boolean;
    store_name: string;
    mobile: string;
    state: string;
    url: string;
}

interface authProps {
    isAuth: boolean;
    user: userDataProps | null;
}

let initialState: authProps = {
    isAuth: false,
    user: null
};

const userData = localStorage?.getItem("user");

if (userData) {
    try {
        // Parse stored JSON
        const token = JSON.parse(userData);

        // Extract token string (IMPORTANT FIX)

        if (token && typeof token === "string") {
            const decodedToken: any = jwtDecode(token);
            const expiresAt = new Date(decodedToken.exp * 1000);

            if (new Date() > expiresAt) {
                // Token expired — clear user
                localStorage.removeItem("user");
            } else {
                // Token still valid — hydrate state
                initialState = {
                    isAuth: true,
                    user: {
                        id: decodedToken.user_id,
                        email: decodedToken.email,
                        name: decodedToken.name,
                        activated: decodedToken.activated,
                        seller: decodedToken.seller,
                        store_name: decodedToken.store_name,
                        mobile: decodedToken.mobile,
                        state: decodedToken.state,
                        url: decodedToken.avatar?.url
                    }
                };
            }
        } else {
            console.warn("Stored user has no valid token");
        }
    } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
    }
}

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default authReducer;
