const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const getUser = async(email:string) => {
    try {
        const res = await fetch(`${BASE_URL}/api/user/${email}`)
        const data = res.json()
        return data;
    } catch (error) {
        console.error('Error fetching user profile', error);
        throw error;
    }
}