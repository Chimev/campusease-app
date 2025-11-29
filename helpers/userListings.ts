const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const userListings = async(
    email: string
) => {
    try {
        const res = await fetch(`${BASE_URL}/api/listings/user/${email}`);
        if(!res.ok) throw new Error('Failded to fetch user listings');

        const data = res.json();
        return data;
    } catch (error) {
        console.error('Error fetching schools', error);
        throw error;
    }
}