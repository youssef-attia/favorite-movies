let searchButton = document.querySelector("#searchButton");
let searchField = document.querySelector("#searchField");
let container = document.querySelector("#tempContainer");

let favArray = [];

let genres = [{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]

// function newMovie(movie) {
//   let div = document.createElement("div");
//   div.id = movie.id
//   div.classList.add("movie");
//   let title = document.createElement("h2");
//   title.innerHTML = movie.title;
//   console.log(title);
//   let score = document.createElement("h3");
//   score.innerHTML = movie.vote_average;
//   console.log(score);
//   let poster = document.createElement("img");
//   poster.src = "https://image.tmdb.org/t/p/w500/"+movie.poster_path;
//   div.appendChild(title);
//   div.appendChild(score);
//   div.appendChild(poster);
//   document.querySelector("#tempContainer").appendChild(div);
// }

const createMovieCard = (movie) =>{
  let bulmaElement = `<div class="card">
  <div id=${movie.id} class="card-image movie">
    <figure class="image">
      <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="Placeholder image">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
      </div>
      <div class="media-content">
        <p class="title is-4">${movie.title}</p>
        <p class="subtitle is-6">${movie.vote_average}</p>
      </div>
           <figure class="image is-48x48">
          <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
      </figure>
    </div>
    
    </div>
  </div>
</div>`
  return bulmaElement;
}

function newMovie(movie) {
  let card = createMovieCard(movie)
  document.querySelector("#tempContainer").innerHTML+=(card);
}


searchButton.addEventListener("click", e => {
  container.innerHTML = '';
  let myKey = "675a392efcbaf5cf5863369b162952f7";
  var result = genres.filter(obj => {
    return obj.name.toLowerCase() === searchField.value.toLowerCase();
  })[0]
  let topic = encodeURIComponent(searchField.value);
  console.log(result);
  
  let myQuery = `https://api.themoviedb.org/3/discover/movie?api_key=${myKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${result.id}&with_watch_monetization_types=flatrate`;
  // let myQuery = `https://api.themoviedb.org/3/movie/550?api_key=${myKey}`;
  console.log(myQuery);

  fetch(myQuery)
    .then(response => response.json())
    .then(myjson => {
      for (let movie in myjson.results) {
        let movieData = myjson.results[movie];
        console.log(movieData);
        newMovie(movieData);
      }
      document.querySelectorAll(".movie").forEach((e)=>{
          e.addEventListener("click",(movie)=>{
          console.log(e.id);
          favArray.push(e.id);
          e.classList.add("favorited");
        })
      })
    });
});

