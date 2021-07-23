console.log(favArray)



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
      document.querySelectorAll("figure").forEach((ev)=>{
        ev.addEventListener("click",(movie)=>{
          ev.classList.toggle("grey");
          console.log(ev.id)
          favArray.push(ev.id)
        })
      })
    });
});