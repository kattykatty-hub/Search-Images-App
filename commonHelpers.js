import{a as h,i,S as m}from"./assets/vendor-8cd2069d.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function c(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=c(t);fetch(t.href,s)}})();function p(o){return o.map(e=>`
      <li class="gallery-item">
        <a href="${e.largeImageURL}">
          <div class="image-container">
            <img src="${e.webformatURL}" alt="${e.tags}" width="360" height="200" loading="lazy">
          </div>
          <ul class="photo-dsc">
            <li>
              <p class="photo-dsc-title">Likes</p>
              <p class="photo-dsc-text">${e.likes}</p>
            </li>
            <li>
              <p class="photo-dsc-title">Views</p>
              <p class="photo-dsc-text">${e.views}</p>
            </li>
            <li>
              <p class="photo-dsc-title">Comments</p>
              <p class="photo-dsc-text">${e.comments}</p>
            </li>
            <li>
              <p class="photo-dsc-title">Downloads</p>
              <p class="photo-dsc-text">${e.downloads}</p>
            </li>
          </ul>
        </a>
      </li>
    `).join("")}h.defaults.baseURL="https://pixabay.com/api/";async function g(o,e=1,c=15){const a=new URLSearchParams({key:"45041443-5e59051ebb139c7689a42bd95",q:o,image_type:"photo",orientation:"horizontal",safesearch:"true",page:e,per_page:c});try{return(await h.get(`?${a}`)).data}catch(t){throw new Error(t.response.status)}}const r={formSearchEl:document.querySelector(".form-search"),galleryListEl:document.querySelector(".gallery-list"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more")};r.loader.classList.add("loader-hidden");r.loadMoreBtn.classList.add("hidden");let l="",n=1,f=0;r.formSearchEl.addEventListener("submit",y);r.loadMoreBtn.addEventListener("click",L);async function y(o){if(o.preventDefault(),l=r.formSearchEl.elements.search.value.trim(),!!l){r.galleryListEl.innerHTML="",r.loader.classList.remove("loader-hidden"),r.loadMoreBtn.classList.add("hidden"),n=1;try{const e=await g(l,n,15);if(f=e.totalHits,e.hits.length===0){i.error({message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"#ef4040",messageColor:"#fafafb",position:"topRight",progressBarColor:"#fafafb"});return}r.galleryListEl.innerHTML=p(e.hits),u.refresh(),e.hits.length===15&&r.galleryListEl.children.length<f&&r.loadMoreBtn.classList.remove("hidden")}catch(e){i.error({message:`Error: ${e.message}`,backgroundColor:"#ef4040",messageColor:"#fafafb",position:"topRight",progressBarColor:"#fafafb"})}finally{r.loader.classList.add("loader-hidden")}r.formSearchEl.elements.search.value=""}}async function L(){n+=1,r.loader.classList.remove("loader-hidden"),r.loadMoreBtn.classList.add("hidden");try{const o=await g(l,n,15);r.galleryListEl.insertAdjacentHTML("beforeend",p(o.hits)),u.refresh();const{height:e}=r.galleryListEl.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"}),r.galleryListEl.children.length>=f?(r.loadMoreBtn.classList.add("hidden"),i.info({message:"We're sorry, but you've reached the end of search results.",backgroundColor:"#00a0dc",messageColor:"#fafafb",position:"topRight",progressBarColor:"#fafafb"})):o.hits.length===15&&r.loadMoreBtn.classList.remove("hidden")}catch(o){i.error({message:`Error: ${o.message}`,backgroundColor:"#ef4040",messageColor:"#fafafb",position:"topRight",progressBarColor:"#fafafb"})}finally{r.loader.classList.add("loader-hidden")}}const u=new m(".gallery-list a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=commonHelpers.js.map
