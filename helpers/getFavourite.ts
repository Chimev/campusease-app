const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const getFavourite = async(email:string) => {
    try {
        const res = await fetch(`${BASE_URL}/api/favourite/${email}`);
        if(!res.ok) throw new Error('Failded to fetch SavedListing');
        const data = res.json();
        return data;
    } catch (error) {
        console.error('Error fetching schools', error);
        throw error;
    }
}