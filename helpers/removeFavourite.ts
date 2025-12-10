import { Alert } from "react-native";

export const removeFavourite = async(email:string, listingId: string) => {
    try {
        const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
        const res = await fetch(`${BASE_URL}/api/favourite/${listingId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email})
        });

        const data = await res.json();
        
        return { ok: res.ok, data }; // Return ok directly, not nested
    } catch (error) {
        console.error("Remove Favourite API Error:", error);
        Alert.alert("Error", "Could not connect to the server");
        return { ok: false, data: null };
    }
}