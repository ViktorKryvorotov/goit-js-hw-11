// import axios from "axios";

// export default async function fetchPhotos(searchQuery,) {
    
//     const baseURL=`https://pixabay.com/api/`
//     const searchParams = new URLSearchParams({
//         key: "34599665-397fd73b742fe3f801288186c",
//         q: searchQuery,
//         image_type: "photo",
//         oriental: "horizontal",
//         per_page: 40,
//         page: 1,
//         safesearch: true,
        
//     });
  
//     try {
//         const response = await axios.get(`${baseURL}?${searchParams}`);
//         return response; 
//     }
//     catch (error) {
//         console.error(error);
//     }
// }

import axios from 'axios';
export { fetchImages };

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '25766392-01b12b6ed5ab34bc2910d9c3e';

const searchParams = new URLSearchParams({   
    image_type: "photo",
    oriental: "horizontal",
  safesearch: true,
    
})

async function fetchImages(query, page, perPage) {
  const response = await axios.get(
    `?key=${KEY}&q=${query}&${searchParams}&page=${page}&per_page=${perPage}`,
  );
  return response;
}


