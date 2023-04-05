
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
  const response = await axios(
    `?key=${KEY}&q=${query}&${searchParams}&page=${page}&per_page=${perPage}`,
  );
  return response;
}


