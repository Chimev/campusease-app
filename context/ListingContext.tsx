import { getListings } from "@/helpers/getListings";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuhContext";

export type Listing = {
    _id: string;
    email?: string;
    name?: string;
    category?: string;
    image?: string[];
    institution?:string;
    campus?: string;
    type?: string;
    description?:string;
    accommodationTitle?: string;
    videoLink?: string;
    price?: string;
    phone?: string;
    accommodationType?: string;
    service?: string;
    propertyType?: string;
    property?: string;
    roommateName?: string;
    level?: string;
    gender?: string;
    isFavorite?: string;
}

type ListingType = {
    listings: Listing[];
    setCategory: any;
    setInstitution: any;
    category: any;
    isLoading: boolean;
    recentListing:any[];
}

const ListingContext = createContext<ListingType | null>(null)

export  const ListingProvider = ({children}: {children: React.ReactNode}) => {
    const [listings, setListings] = useState([]);
    const [category, setCategory] = useState('');
    const [institution, setInstitution] = useState<any>('');
    const [isLoading, setIsLoading] = useState(false);;
    const [recentListing, setRecentListing] = useState([])

    const { user } = useAuth();

    useEffect(() => {
    if (user?.school) setInstitution(user?.school); 
    }, [user?.school]);
    

   useEffect(() => {
     if (!category && !institution) {
      setIsLoading(true);
      setListings([]); // optional: clear any previous listings
      setRecentListing([]);
      return;
    }

    async function fetchListings  () {
        setIsLoading(true);
        try {
            const data = await getListings(category, institution)
            // console.log( 'data', data)
            setListings(data)
        } catch (error) {
            console.error('Error fetching listings')
        }finally {
            setIsLoading(false);
        }
    }

        fetchListings();
    }, [category, institution]);



    useEffect(() => {
        if(!institution) return;
        
       async function fetchRecentListing  () {
        setIsLoading(true);
        const noCategory = ""
        try {
            console.log("sch",institution, category)
            const data = await getListings(noCategory, institution)
            setRecentListing(data.slice(0, 3))
        } catch (error) {
            console.error('Error fetching listings')
        }finally {
            setIsLoading(false);
        }
       }

        fetchRecentListing();
    }, [institution])

    const value = {
        category,
        listings,
        recentListing,
        setCategory,
        setInstitution,
        isLoading
    }
    
    return (
        <ListingContext.Provider value={value}>
            {children}
        </ListingContext.Provider>
    )
}

export const useListing = () => {
    const context = useContext(ListingContext)
    if(!context) throw new Error('useListing must be used within the ListingProvider')
    return context;
}