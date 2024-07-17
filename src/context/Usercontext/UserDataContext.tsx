"use client"
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, db } from '@/firebase/config';
import { User } from '@/types.index';
import { onAuthStateChanged, signOut } from 'firebase/auth';

interface State {
    user: User | null;
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: State = {
    user: null,
    loading: false,
    error: null,
    success: false,
};

type Action =
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS'; payload: User }
    | { type: 'FETCH_FAILURE'; payload: string }
    | { type: 'LOGOUT' };

const userDataReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true, error: null, success: false };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, user: action.payload, success: true };
        case 'FETCH_FAILURE':
            return { ...state, loading: false, error: action.payload, success: false };
        case 'LOGOUT':
            return { ...state, user: null, success: false };
        default:
            return state;
    }
};

interface ContextProps {
    state: State;
    fetchUserData: (user: User) => Promise<void>;
    logoutUser: () => Promise<void>;
}

const UserDataContext = createContext<ContextProps | undefined>(undefined);

export const useUserData = (): ContextProps => {
    const context = useContext(UserDataContext);
    if (!context) {
        throw new Error('useUserData must be used within a UserDataProvider');
    }
    return context;
};

interface UserDataProviderProps {
    children: ReactNode;
}

export const UserDataProvider: React.FC<UserDataProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(userDataReducer, initialState);

    const fetchUserData = async (user: any) => {

        dispatch({ type: 'FETCH_START' });
        try {
            const userDocRef = doc(db, 'User', user.uid);
            const userDoc = await getDoc(userDocRef);

            let userData;
            if (userDoc.exists()) {
                userData = userDoc.data() as User;
            } else {
                userData = {
                    name: user.displayName || "",
                    email: user.email || "",
                    address: "",
                    pincode: "",
                    dateOfBirth: "",
                    city: "",
                    state: "",
                    country: "",
                    phone: "",
                    isSeller: false,
                    photo: user.photoURL || "",
                    uid: user.uid,
                };
                await setDoc(userDocRef, userData);
            }

            dispatch({ type: 'FETCH_SUCCESS', payload: userData });
            localStorage.setItem("User", JSON.stringify(userData));
        } catch (error) {
            dispatch({ type: 'FETCH_FAILURE', payload: error instanceof Error ? error.message : 'Error fetching user data' });
            toast.error('Failed to fetch user data');
        }
    };

    const logoutUser = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem("User");
            dispatch({ type: 'LOGOUT' });
        } catch (error) {
            toast.error('Failed to logout');
        }
    };

    // Calling fetchuserData method if user is authenticated
    useEffect(() => {
        //get user from auth and fetch data from document
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // console.log("LoggedinUser from home page", user)
                fetchUserData(user);
            } else {
                dispatch({ type: 'LOGOUT' });
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <UserDataContext.Provider value={{ state, fetchUserData, logoutUser }}>
            {children}
        </UserDataContext.Provider>
    );
};
