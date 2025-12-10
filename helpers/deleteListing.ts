import { Alert } from "react-native";


export const deleteListing = async(
    id:string,
) => {
    try {
        const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
        const res = await fetch(`${BASE_URL}/api/listings/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        return {res}
    } catch (error) {
        console.error("Delete Listing Error:", error);
        Alert.alert("Error", "Could not connect to the server");
        return { ok: false, data: null };
    }
}