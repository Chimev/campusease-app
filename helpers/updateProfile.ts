import { Alert } from "react-native";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const updateProfile = async(email: any, formData: any) => {
    try {
        const res = await fetch(`${BASE_URL}/api/user/${email}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })


        return {res};
    } catch (error) {
        console.error("Update API Error:", error);
        Alert.alert("Error", "Could not connect to the server");
        return { ok: false, data: null };
    }
}