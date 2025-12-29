import { getFavourite } from "@/helpers/getFavourite";
import { getListings } from "@/helpers/getListings";
import { userListings } from "@/helpers/userListings";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuhContext";

export type Listing = {
    _id: string;
    email?: string;
    name?: string;
    category?: string;
    image: [
    {
      url: string,
      publicId: string
    }
  ];
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
    createdAt?: any;
}

type ListingType = {
    listings: Listing[];
    setCategory: any;
    setInstitution: any;
    category: any;
    isLoading: boolean;
    setIsLoading: any;
    recentListing:any[];
    myListings:any[];
    setMyListings: any;
    setSavedListings:any;
    savedListings:any;
    // setRefreshMyListings: any;
    refetchMyListings: any;
    // refreshMyListings:any;
    refetchListings: any;
    refetchRecentListings: any;
}

const ListingContext = createContext<ListingType | null>(null)

export  const ListingProvider = ({children}: {children: React.ReactNode}) => {
    const [listings, setListings] = useState([]);
    const [category, setCategory] = useState('');
    const [institution, setInstitution] = useState<any>('');
    const [isLoading, setIsLoading] = useState(false);;
    const [myListings, setMyListings] =  useState([])
    const [recentListing, setRecentListing] = useState([])
    const [savedListings, setSavedListings] = useState<any[]>([])
    // const [refreshMyListings, setRefreshMyListings] = useState(false);

    const { user } = useAuth();


    // userListing
    useEffect(() => {
        if (!user?.email) return;
        fetchUserListings()
        fetchFavourite();
    },[user?.email])

  
    
    useEffect(() => {
    if (user?.school) setInstitution(user?.school); 
    }, [user?.school]);
    
    //Fetch listings
   useEffect(() => {
     if (!category && !institution) {
      setIsLoading(true);
      setListings([]); // optional: clear any previous listings
      setRecentListing([]);
      return;
    }
        fetchListings();
    }, [category, institution]);

    //fetch recent listings
    useEffect(() => {
        if(!institution) return;
        fetchRecentListing();
    }, [institution]);

     



    // Functions
    async function fetchUserListings(){
            try {
                setIsLoading(true)
                const res = await userListings(user?.email as string);
                setMyListings(res)
            } catch (error) {
                console.error(error)
            }finally{
                setIsLoading(false)
            }
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
    async function fetchFavourite () {
        setIsLoading(true);
        try {
            const data = await getFavourite(user?.email as string) 
            setSavedListings(data)
        } catch (error) {
            console.error('Error fetching saved listings')
        }finally {
            setIsLoading(false);
        }
    }
    async function fetchRecentListing  () {
    setIsLoading(true);
    const noCategory = ""
    try {
        const data = await getListings(noCategory, institution)
        setRecentListing(data)
    } catch (error) {
        console.error('Error fetching listings')
    }finally {
        setIsLoading(false);
    }
    }
    


    const value = {
        category,
        listings,
        recentListing,
        myListings,
        setMyListings,
        setCategory,
        setInstitution,
        isLoading,
        setIsLoading,
        savedListings,
        setSavedListings,
        // setRefreshMyListings,
        // refreshMyListings,
        refetchMyListings: fetchUserListings,
        refetchListings: fetchListings,
        refetchRecentListings: fetchRecentListing
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






//Just keeping this year 
//this is for geting o nly those that in the current month \
//this is for scale

// async function fetchRecentListing() {
//   setIsLoading(true);
//   const noCategory = "";

//   try {
//     console.log("sch", institution, category);
//     const data = await getListings(noCategory, institution);

//     // Get current month and year
//     const now = new Date();
//     const currentMonth = now.getMonth(); // 0-indexed
//     const currentYear = now.getFullYear();

//     // Filter listings created this month
//     const thisMonthListings = data.filter(item => {
//       const createdAt = new Date(item.createdAt);
//       return (
//         createdAt.getMonth() === currentMonth &&
//         createdAt.getFullYear() === currentYear
//       );
//     });

//     // Keep first 3
//     setRecentListing(thisMonthListings.slice(0, 3));
//   } catch (error) {
//     console.error("Error fetching listings", error);
//   } finally {
//     setIsLoading(false);
//   }
// }
