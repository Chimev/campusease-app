const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const getSchools = async() => {
    try {
        const res = await fetch(`${BASE_URL}/api/schools`);
        if(!res.ok) throw new Error('Failded to fetch schools');

        const data = res.json();
        return data;
    } catch (error) {
        console.error('Error fetching schools', error);
        throw error;
    }
}