// const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&page=1';
// const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
// const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&query=";


// const main = document.getElementById("section");
// const form = document.getElementById("form");
// const search = document.getElementById("query");

// returnMovies(APILINK)
// function returnMovies(url){
//   fetch(url).then(res => res.json())
//   .then(function(data){
//   console.log(data.results);
//   data.results.forEach(element => {
//       const div_card = document.createElement('div');
//       div_card.setAttribute('class', 'card');
      
//       const div_row = document.createElement('div');
//       div_row.setAttribute('class', 'row');
      
//       const div_column = document.createElement('div');
//       div_column.setAttribute('class', 'column');
      
//       const image = document.createElement('img');
//       image.setAttribute('class', 'thumbnail');
//       image.setAttribute('id', 'image');
      
//       const title = document.createElement('h3');
//       title.setAttribute('id', 'title');
      
//       const center = document.createElement('center');

//       title.innerHTML = `${element.title}`;
//       image.src = IMG_PATH + element.poster_path;

//       center.appendChild(image);
//       div_card.appendChild(center);
//       div_card.appendChild(title);
//       div_column.appendChild(div_card);
//       div_row.appendChild(div_column);

//       main.appendChild(div_row);
//   });
// });
// }

// form.addEventListener("submit", (e) => {
// e.preventDefault();
// main.innerHTML = '';

// const searchItem = search.value;

// if (searchItem) {
//   returnMovies(SEARCHAPI + searchItem);
//     search.value = "";
// }
// });


async function returnMovies() {
  try {
      const response = await fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&page=1');
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Process data here
  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
  }
}

returnMovies();


const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&page=1';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

function fetchWithRetry(url, retries = 3) {
  return fetch(url).then(res => {
    if (!res.ok) {
      if (retries > 0) {
        console.warn(`Retrying... (${3 - retries + 1})`);
        return fetchWithRetry(url, retries - 1);
      } else {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    }
    return res.json();
  });
}


returnMovies(APILINK);

function returnMovies(url) {
  fetchWithRetry(url)
    .then(data => {
      console.log(data.results);
      data.results.forEach(element => {
        const div_card = document.createElement('div');
        div_card.setAttribute('class', 'card');

        const div_row = document.createElement('div');
        div_row.setAttribute('class', 'row');

        const div_column = document.createElement('div');
        div_column.setAttribute('class', 'column');

        const image = document.createElement('img');
        image.setAttribute('class', 'thumbnail');
        image.setAttribute('id', 'image');

        const title = document.createElement('h3');
        title.setAttribute('id', 'title');

        const center = document.createElement('center');

        title.innerHTML = `${element.title}`;
        image.src = IMG_PATH + element.poster_path;

        center.appendChild(image);
        div_card.appendChild(center);
        div_card.appendChild(title);
        div_column.appendChild(div_card);
        div_row.appendChild(div_column);

        main.appendChild(div_row);
      });
    })
    .catch(error => {
      console.error('Error fetching the data:', error);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  main.innerHTML = '';

  const searchItem = search.value;

  if (searchItem) {
    returnMovies(SEARCHAPI + searchItem);
    search.value = "";
  }
});
