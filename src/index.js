import axios from "axios";
import Notiflix from 'notiflix';

const inputRef = document.querySelector('#search-form');
const submitRef = document.querySelector('.btn-search');



//1. отримати доступ до  Pixabay. через axios
inputRef.addEventListener('submit', onSubimitClick);

function onSubimitClick(e) {
    e.preventDefault();
    const searchQuery = e.currentTarget.elements.searchQuery.value;

// console.log(e.currentTarget.elements.searchQuery.value);
    const searchParams = new URLSearchParams({
        q: searchQuery,
        image_type:"photo",
        oriental:"horizontal",
        per_page: 40,
        safesearch:true,
    })
  
    axios.get(`https://pixabay.com/api/?key=34599665-397fd73b742fe3f801288186c&${searchParams}`).then(response => console.log(response))
    .catch((error) => { console.error(error) });
}