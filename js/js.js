const glitchURL = "https://tartan-quill-libra.glitch.me/movies";

let movieDB = $.get(glitchURL);
    movieDB.done(function(data){
    console.log(data)
        renderMovies(data)
})


// GENERATE MOVIE CARDS
function renderMovies(db) {

        for (let i = 0; i < db.length ; i++) {
            let filmCard = `
                                    <div class="flip-card">
                                        <div class="flip-card-inner">
                                            <div class="flip-card-front">
                                                <img class="card-img-top" src="http://image.tmdb.org/t/p/original/${db[i].poster_path}" alt="">
                                            </div>
                                            <div class="flip-card-back">
                                                <h5 class="movieTitle">${db[i].original_title}</h5>
                                                <p class="date" >Release date : ${db[i].release_date}</p>
                                                <p class="movieText">${db[i].overview} </p>
                                                <button id="edit" type="button">EDIT</button>
                                                <button id="delete" type="button">DELETE</button>
                                                <button id="watch" type="button">ADD TO WATCH</button>
                                                <div class="stars">
                                                     <span class="fa fa-star checked"></span>
                                                     <span class="fa fa-star checked"></span>
                                                     <span class="fa fa-star checked"></span>
                                                     <span class="fa fa-star"></span>
                                                     <span class="fa fa-star"></span>
                                                </div>
                                            </div>
                                        </div>
                                   </div>`
            $('.movieCards').append(filmCard);
        }
}





// GET ADDED MOVIE OBJECT FROM API
$('#addMovie').on ('click', function () {
    let movieInput = $('#addName').val()
    console.log(movieInput)

    $.get(`https://api.themoviedb.org/3/search/movie?api_key=36bae576330e105013948f7fc0b734c0&language=en-US&query=${movieInput}&page=1&include_adult=false`).done(function (db) {
        console.log(db);

    })
})