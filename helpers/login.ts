import { Alert } from "react-native";

export const loginApi = async  (email: string, password: string) => {
    try {
        const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
        const res = await fetch(`${BASE_URL}/api/mobile/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, password})
        })
        
        const data  = await res.json();
        return {ok:res.ok, data};
    } catch (error) {
        console.error("Login API Error:", error);
        Alert.alert("Error", "Could not connect to the server");
        return { ok: false, data: null };
    }
}