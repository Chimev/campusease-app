import { Alert } from "react-native";


export const registerApi = async(
    name:string,
    phone: string,
    email: string,
    password: string,
    schoolInput: string,
    role: string[]
) => {
    try {
        const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
        const res = await fetch(`${BASE_URL}/api/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name, phone, email, password, school: schoolInput, role})
        });

        console.log(res)
        return {res}
    } catch (error) {
        console.error("Registration API Error:", error);
        Alert.alert("Error", "Could not connect to the server");
        return { ok: false, data: null };
    }
}