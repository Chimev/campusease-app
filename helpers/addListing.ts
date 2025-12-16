import { Alert } from "react-native";


export const addListing = async({
    email,
    institution,
    type,
    category,
    description,
    campus,
    phone,
    image,
    name,
    accommodationTitle,
    videoLink,
    accommodationType,
    service,
    propertyType,
    property,
    roommateName,
    level,
    gender,
    price
}:any) => {
    try {
        const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
        const response = await fetch(`${BASE_URL}/api/listings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                institution,
                type,
                category,
                description,
                campus,
                phone: phone ? Number(phone) : undefined,
                image,
                name,
                accommodationTitle,
                videoLink,
                accommodationType,
                service,
                propertyType,
                property,
                roommateName,
                level,
                gender,
                price: price ? Number(price) : undefined,
            }),
        });

        const data: any = await response.json();

        // console.log('API RESPONSE:', response.status, data);

        if (!response.ok) {
            throw new Error(data.ststus || 'Failed to add listing');
        }
        return {res: response, data};
    } catch (error) {
        console.error("Listing API Error:", error);
        Alert.alert("Error", "Could not connect to the server");
        return { ok: false, data: null };
    }
    
}