import api from '../helpers/wp_api.js';
import { ajax } from '../helpers/ajax.js';
import { PostCard } from './PostCard.js';
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
    $main.innerHTML = 'search';
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
