import { Alert } from "react-native";

export const addFavourite = async(
    email: string,
    listingId: string
) => {
    try {
        const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
        const res = await fetch(`${BASE_URL}/api/favourite`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, listingId})
        })

        const data = await res.json(); 
        
        return { ok: res.ok, data }; 
    } catch (error) {
        console.error("Favourite API Error:", error);
        Alert.alert("Error", "Could not connect to the server");
        return { ok: false, data: null };
    }
}