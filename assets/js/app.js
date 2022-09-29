

const base_url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c';
const img_path = 'https://image.tmdb.org/t/p/w1280';

const movies = document.getElementById("movies");
const searchInput = document.getElementById("searchInput");
const pageInput = document.getElementById("pageInput");
const btn = document.getElementById("btn-go");




// functions

async function getCall(url){
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

// to give color range for ratings
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

const onSearch = (e) => {
    let search_value = (e.target.value).toLowerCase().trim();
    // console.log(search_value);
    let temp = [];
    for (let i = 1; i <= 2; i++) {
        let search_url = `${base_url}&page=${i}`
        getCall(search_url)
            .then(data => {
               temp.push(...data.results);
            })
            .catch(err => console.log(err));
    }
    // console.log(temp);
    // console.log(temp.find(ele => ele==search_value));
    
    // -----------------not working
    let filter_arr = temp.filter(ele => {
        ele.title.toLowerCase().includes(search_value);
        // ele.original_title == 'Prey';
        console.log(ele);
    });
    console.log(filter_arr);
   
}

const onBtnClick = (e) => {
    let page_no = pageInput.value;
    // console.log(page_no);
    
    let page_url = `${base_url}&page=${page_no}`;
    getCall(page_url)
        .then(data => templating(data.results))
        .catch(err => alert("page number does not exist."));
}

getCall(base_url)
    .then(data => {
        templating(data.results);
        searchInput.value = '';
        pageInput.value = '';
    })
    .catch(err => console.log("error during data."))

// events 

btn.addEventListener("click", onBtnClick);
searchInput.addEventListener("keyup", onSearch);


// https://developers.themoviedb.org/3/discover/movie-discover   ---------- search query pattern