import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages }  from "./fetchImages";
// import renderGalleryMarkup from "./addMarkup";


const searchForm = document.querySelector('#search-form');
// const submitRef = document.querySelector('.btn-search');
const galleryRef=document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');


const ligthbox = new SimpleLightbox('.gallery a');
const hideLoadBtn = () => (loadMoreBtn.style.display = 'none');
const showLoadBtn = () => (loadMoreBtn.style.display = 'block');
hideLoadBtn();

let page = 1;
const perPage = 40;


searchForm.addEventListener('submit', onSubimitSearch);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);



async function onSubimitSearch(e) {
  e.preventDefault();
  hideLoadBtn();

  let searchQuery = searchForm.elements.searchQuery.value.trim();
  page = 1;
 galleryRef.innerHTML = '';
  if (searchQuery === "") {
      hideLoadBtn();
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
   }
try {
  const galleryPhotos = await fetchImages(searchQuery, page, perPage);
  const totalPages = galleryPhotos.data.totalHits
  if (galleryPhotos.data.hits.length === 0) {
    cleanGallery();
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
  }
  else if (totalPages >= 40) {
      showLoadBtn();
    }
  renderGalleryMarkup(galleryPhotos.data.hits);
  ligthbox.refresh();
  
} catch (error) {
    console.log(error);
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
     ligthbox.refresh();
}
function addMarkup(photos) {
  return photos
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
          return `<div class="photo-card">
      <a href="${largeImageURL}">
              <img
              class="gallery__image "
              src="${webformatURL}"
              alt="${tags}"
              loading="lazy"
            />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span>${likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
      <span>${views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <span>${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span>${downloads}</span>
    </p>
  </div>
</div>`;
        }
    )
    .join('');

}
 function renderGalleryMarkup(photos) {
  galleryRef.insertAdjacentHTML('beforeend', addMarkup(photos))
}

async function onLoadMoreBtnClick() {
  page += 1;
  
  let searchQuery = searchForm.elements.searchQuery.value.trim();
  try {
    const galleryPhotos = await fetchImages(searchQuery, page, perPage);
    const totalPages = galleryPhotos.data.totalHits / perPage;
    if (totalPages < page) {
       hideLoadBtn();
        Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
    renderGalleryMarkup(galleryPhotos.data.hits);
  } catch (error) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    
  }
   ligthbox.refresh();
}


function cleanGallery() {
    galleryRef.innerHTML = '';
  page = 1;
  hideLoadBtn();
  
}




