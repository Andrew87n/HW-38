let e="",t=1,a={searchForm:document.getElementById("search-form"),gallery:document.querySelector(".gallery"),loadMoreBtn:document.getElementById("load-more-btn")};async function r(r){r.preventDefault(),(e=r.currentTarget.elements.query.value.trim())&&(t=1,a.gallery.innerHTML="",a.loadMoreBtn.classList.add("hidden"),await s())}async function o(){t+=1,await s()}async function s(){try{let r,o=await i(e,t);if(0===o.hits.length)return void alert("Нічого не знайдено за цим запитом.");r=o.hits.map(({webformatURL:e,largeImageURL:t,likes:a,views:r,comments:o,downloads:s,tags:i})=>`
      <li>
        <div class="photo-card">
          <a href="${t}" target="_blank" rel="noopener noreferrer">
            <img src="${e}" alt="${i}" loading="lazy" />
          </a>
          <div class="stats">
            <p class="stats-item">
              <i class="material-icons">thumb_up</i>
              ${a}
            </p>
            <p class="stats-item">
              <i class="material-icons">visibility</i>
              ${r}
            </p>
            <p class="stats-item">
              <i class="material-icons">comment</i>
              ${o}
            </p>
            <p class="stats-item">
              <i class="material-icons">cloud_download</i>
              ${s}
            </p>
          </div>
        </div>
      </li>
    `).join(""),a.gallery.insertAdjacentHTML("beforeend",r),a.loadMoreBtn.classList.remove("hidden"),a.loadMoreBtn.scrollIntoView({behavior:"smooth",block:"end"})}catch(e){console.error("Сталася помилка при завантаженні даних:",e),alert("Не вдалося завантажити зображення. Спробуйте пізніше.")}}async function i(e,t){let a=`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${encodeURIComponent(e)}&page=${t}&per_page=12&key=55677073-704cce82e77e75776fe73cc92`;try{let e=await fetch(a);if(!e.ok)throw Error(`HTTP error! status: ${e.status}`);return await e.json()}catch(e){throw e}}a.searchForm.addEventListener("submit",r),a.loadMoreBtn.addEventListener("click",o);
//# sourceMappingURL=HW-38.192de11f.js.map
