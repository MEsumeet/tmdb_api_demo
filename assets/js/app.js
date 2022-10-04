
// all declarations

const apiKey = `3fd2be6f0c70a2a598f084ddfb75487c`;
const base_url = 'https://api.themoviedb.org/3';
const api_page_url = `/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`;
const api_search_url = `/search/movie?api_key=${apiKey}&query=`;
const img_path = 'https://image.tmdb.org/t/p/w1280';

const movies = document.getElementById("movies");
const searchInput = document.getElementById("searchInput");
const pageInput = document.getElementById("pageInput");
const btn = document.getElementById("btn-go");




// functions
// api call function: "GET"
async function getApiCall(url){
    try{
        let response = await fetch(url, {
            method: "GET",
            headers: {
                "content-type" : "application/json; charset=UTF-8"
            } 
        })
        return response.json()
    }catch(error){
        console.log(error);
    }
}

const templating = (arr) => {
    let final = '';
    arr.forEach(ele => {
        final += `
        <div class="col-md-3">
            <div class="card">
                <div class="card-body">
                    <figure class="poster">
                        <img src="${img_path}${ele.poster_path}" alt="${ele.title}" class="img-fluid">
                        <figcaption class="movie-content">
                            <h3 class="title">${ele.title}</h3>
                            <span class="${colors(ele.vote_average)}">${ele.vote_average}</span>
                        </figcaption>
                        <div class="movie-info">
                            <h4 class="overview">overview</h4>
                            <p class="overview-content">${ele.overview}</p>
                        </div>
                    </figure>
                </div>
            </div>
        </div>
        `;
        movies.innerHTML = final;
    });
}

// page button: event callback
const onBtnClick = (e) => {
    let page_no = pageInput.value;
    let page_url = `${api_page_url}&page=${page_no}`;

    getApiCall(base_url + page_url)
        .then(data => templating(data.results))
        .catch(err => alert("page number does not exist."));
}

// search input: event callback
const onSearch = (e) => {
    let search_value = (e.target.value).toLowerCase().trim();
    let search_url = `${api_search_url}${search_value}`;

    if(e.key === "Enter"){
        getApiCall(base_url + search_url)
        .then(data => templating(data.results))
        .catch(err => alert('invalid query.'));
    }
}

// to give color for ratings
function colors(rating){
    if(rating >= 8){
        return "green"
    }else if(rating >= 6){
        return "yellow"
    }else if( rating >= 4){
        return "orange"
    }else{
        return "red"
    }
}

// main page api call
getApiCall(base_url + api_page_url)
    .then(data => {
        templating(data.results);
        searchInput.value = '';
        pageInput.value = '';
    })
    .catch(err => console.log("error during data fetch."))

// events 

btn.addEventListener("click", onBtnClick);
searchInput.addEventListener("keyup", onSearch);




