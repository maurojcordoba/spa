import api from '../helpers/wp_api.js';
import { ajax } from '../helpers/ajax.js';
import { PostCard } from './PostCard.js';
import { SearchCard } from './SearchCard.js';
import { Post } from './Post.js';

export async function Router() {
  const d = document,
    w = window,
    $main = d.getElementById('main');

  let { hash } = location;

  if (!hash || hash === '#/') {
    await ajax({
      url: api.POSTS,
      cbSuccess: (posts) => {
        let html = '';
        posts.forEach((post) => (html += PostCard(post)));
        $main.innerHTML = html;
      },
    });
  } else if (hash.includes('#/search')) {
    let query = localStorage.getItem('wpSearch');
    if (!query) {
      d.querySelector('.loader').style.display = 'none';
      return false;
    }

    await ajax({
      url: `${api.SEARCH}${query}`,
      cbSuccess: (search) => {
        let html = '';
        if (search.length === 0) {
          html = `<p class="error">No hay resultados para <mark>${query}</mark></p>`;
        } else {
          search.forEach((post) => (html += SearchCard(post)));
        }
        $main.innerHTML = html;
      },
    });
  } else if (hash === '#/contact') {
    $main.innerHTML = 'contacto';
  } else {
    await ajax({
      url: `${api.POST}?slug=${hash.substring(2)}`,
      cbSuccess: (post) => {
        let html = '';
        html = Post(post[0]);
        $main.innerHTML = html;
      },
    });
    // await ajax({
    //   url: `${api.POST}/${localStorage.getItem("wpPostId")}`,
    //   cbSuccess: (post) => {
    //     let html = '';
    //     html = Post(post);
    //     $main.innerHTML = html;
    //   },
    // });
    //$main.innerHTML = 'post seleccionado';
  }

  d.querySelector('.loader').style.display = 'none';
}
