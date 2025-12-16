import { Alert } from "react-native";



export const updateListing = async(
    id:string,
    formData: any
) => {
    try {
        const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
        const res = await fetch(`${BASE_URL}/api/listings/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        return {res}
    } catch (error) {
        console.error("Update Listing API Error:", error);
        Alert.alert("Error", "Could not connect to the server");
        return { ok: false, data: null };
    }
}