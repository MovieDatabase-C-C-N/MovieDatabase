const glitchURL = "https://tartan-quill-libra.glitch.me/movies";

renderMovies();

// GENERATE MOVIE CARDS
function renderMovies() {
    $.get(glitchURL).done(function (data) {
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            let filmCard = `
                                    <div class="flip-card">
                                        <div class="flip-card-inner">
                                            <div class="flip-card-front">
                                                <img class="card-img-top" src="http://image.tmdb.org/t/p/original/8c4a8kE7PizaGQQnditMmI1xbRp.jpg" alt="">
                                            </div>
                                            <div class="flip-card-back">
                                                <h5 class="movieTitle">${data[i].title}</h5>
                                                <p class="movieText">${data[i].plot} </p>
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
    });
}




$('#wantToWatch').click(function () {
    let movieInput = $('#search').val()
    console.log(movieInput)
    $.get(`https://api.themoviedb.org/3/search/movie?api_key=36bae576330e105013948f7fc0b734c0&language=en-US&query=${movieInput}&page=1&include_adult=false`).done(function (data) {
        console.log(data);

        const newFilmCard = {
            title: data.results[0].title,
            poster: `http://image.tmdb.org/t/p/original${data.results[0].poster_path}`,
            plot: data.results[0].overview,
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFilmCard),
        }
        fetch(glitchURL, options)
    })
})