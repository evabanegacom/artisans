interface AvatarProps {
    url: string;
}

interface UserDataProps {
    id: number;
    uuid: string;
    name: string;
    email: string;
    activated: boolean;
    seller: boolean;
    store_name: string;
    mobile: string;
    state: string;
    account_name: string | null;
    account_number: string | null;
    bank_code: string | null;
    paystack_recipient_code: string | null;
    avatar: AvatarProps | null;
}

interface AuthProps {
    isAuth: boolean;
    user: UserDataProps | null;
}

let initialState: AuthProps = {
    isAuth: false,
    user: null
};

// Load user from localStorage
const storedUser = localStorage.getItem("user");

if (storedUser) {
    try {
        const parsedUser: UserDataProps = JSON.parse(storedUser);

        if (parsedUser && parsedUser.id) {
            initialState = {
                isAuth: true,
                user: parsedUser
            };
        } else {
            localStorage.removeItem("user");
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
