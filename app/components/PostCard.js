export function PostCard(props) {
  
//  console.log(props)
  let { date, id, title,slug,_embedded } = props,
   dateFormat = new Date(date).toLocaleString(),
  urlPoster = _embedded["wp:featuredmedia"][0].source_url;

  // document.addEventListener("click", e =>{
  //   if(!e.target.matches(".post-card a")) return;
  //   localStorage.setItem("wpPostId", e.target.dataset.id);
  // })

  return `
  <article class="post-card">
  <img src="${urlPoster}" alt="Imagen"/>
  <h2>${title.rendered}</h2>
  <p>
  <time datetime="${date}">${dateFormat}</time>
  <a href="#/${slug}" data-id="${id}">Ver mas</a>
  </p>
  
  </article>
  `;
}
