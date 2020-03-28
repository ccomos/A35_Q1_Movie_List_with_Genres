(function () {
  // write your code here
  // new variable
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const data = []
  const dataPanel = document.getElementById('data-panel')
  const genresList = document.getElementById('genres-list')
  const genresIdx = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }

  function showGenres(data) {
    let htmlContent = ''
    for (let idx in data) {
      htmlContent += `
        <button type="button" class="list-group-item list-group-item-action" id="${idx}">${genresIdx[idx]}</button>
        `
    }
    genresList.innerHTML = htmlContent
    //console.log(genresList.innerHTML)
  }

  showGenres(genresIdx)

  function displayDataList(data) {
    let htmlContent = ''
    data.forEach(function (item, index) {
      movieGenres = item.genres
      let genresContent = ''
      for (let idx of movieGenres) {
        //console.log(genresIdx[idx])
        genresContent += `
          <a class="badge badge-light m-1">${genresIdx[idx]}</a>
        `
      }
      htmlContent += `
        
          <div class="col-3 col-sm-3 card p-0 m-1" >
            <img src="${POSTER_URL}${item.image}" class="card-img-top"
              alt="...">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <div class="row">${genresContent}</div>
            </div>
          </div>
        
      `
    })
    dataPanel.innerHTML = htmlContent
  }

  //add genres listener
  genresList.addEventListener('click', event => {
    //console.log(event.target.id)
    let results = []
    let genresIdx = Number(event.target.id)
    results = data.filter(function (movie) {
      return movie.genres.includes(genresIdx)
    })
    //console.log(typeof genresIdx)
    //console.log(results)
    displayDataList(results)

  })


  axios.get(INDEX_URL).then((response) => {
    data.push(...response.data.results)
    //getTotalPages(data)
    //getPageData(1, data)
    displayDataList(data)

  }).catch((err) => console.log(err))

})()