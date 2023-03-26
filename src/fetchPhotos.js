import axios from "axios";

export default async function fetchPhotos(searchQuery) {
    
    
    const searchParams = new URLSearchParams({
        key: "34599665-397fd73b742fe3f801288186c",
        q:searchQuery,
        image_type: "photo",
        oriental: "horizontal",
        per_page: 40,
        page:1,
        safesearch: true,
        
    })
  
    try {
        const result = await axios.get(`https://pixabay.com/api/?${searchParams}`);
    
        return result;
        
    }
    catch (error) {
        console.error(error);
    }
}