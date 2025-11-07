
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const getListings = async(
    category? :string,
    institution?: string,
    page= 1,
    limit= 10,
    
) => {
    try {
        let url = `${BASE_URL}/api/listings`;

        if (category && category.trim() !== '') {
            url += `/${category}`;
        }

        if(institution){
            const seperator = '?'
            url += `${seperator}institution=${institution}`
        }
        const res = await fetch(url)

        if(!res.ok) throw new Error('Failed to fetch lisitngs')

        const data = await res.json()
        return data
    } catch (error) {
        console.error('Error fetching Listings', error)
        throw error;
    }
} 

// Alternative: Create a separate function for fetching by ID (recommended)
export const getListingById = async(id: string) => {
    try {
        const url = `${BASE_URL}/api/listings/${id}`;
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Failed to fetch listing: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching listing by ID', error);
        throw error;
    }
}