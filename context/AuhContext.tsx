import { getSchools } from "@/helpers/getSchools";
import { loginApi } from "@/helpers/login";
import { router } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";


type User = {
    id: string,
    email: string,
    name: string,
    phone: string,
    school: string,
    role: string,
}

type AuthContextType = {
    user: User | null;
    schools: any;
    isLoading?: boolean;
    setIsLoading?: any;
    token: string | null;
    login: (email: string, password: string) => Promise<{ok: boolean} |void>;
    logout: () => Promise<void>
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Start with true to check auth on load
    const [token, setToken] = useState<string|null>(null) // Changed from ''
    const [schools, setSchools] = useState([])

    useEffect(() => {
        const checkAuth = async() => {
            try {
                const storedToken = await SecureStore.getItemAsync('token');
                const storedUser = await SecureStore.getItemAsync('user'); 
                
                if (storedToken && storedUser) {
                    setToken(storedToken);
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error('Error checking auth:', error);
            } finally {
                setIsLoading(false);
            }
        }
        checkAuth();
    }, []);

    useEffect(() => {
    const fetchSchools = async() => {
        try {
            const data =  await getSchools();
            setSchools(data)

        } catch (error) {
            console.error('Error fetching schools', error)
        }
    }

     fetchSchools()

  }, [])

    const login = async(email: string, password:string) => {
       setIsLoading(true)
       try {
        const {ok, data} = await loginApi(email, password)
        if(!ok){
            Alert.alert('Login Failed', data?.error || 'Something went wrong');
            return;
        }
        // Store both token and user data
        await SecureStore.setItemAsync('token', data.token);
        await SecureStore.setItemAsync('user', JSON.stringify(data.user));
        
        setUser(data.user);
        setToken(data.token);
        return { ok: true };
      }catch (error) {
        console.error('Sign in error:', error);
        throw error;
      }finally{
        setIsLoading(false)
      }
    }


    const logout = async () => {
        setUser(null);
        setToken(null);
        await SecureStore.deleteItemAsync('token');
        await SecureStore.deleteItemAsync('user'); // Delete user data too
        router.replace('/(auth)/login');
    }
    
    const value ={
        user,
        schools,
        isLoading,
        setIsLoading,
        token,
        login,
        logout
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within the AuthProvider')
    }
    return context;
}