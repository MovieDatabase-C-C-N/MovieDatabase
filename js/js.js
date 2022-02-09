const glitchURL = "https://tartan-quill-libra.glitch.me/movies";

renderMovies();

function renderMovies() {
    $.get(glitchURL).done(function (data) {
        console.log(data)

        for (i = 0; i < data.length; i++) {
            let filmCard = `<div class="card col-3 p-3 m-3 shadow">
        <img class="card-img-top" src="${data[i].poster}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${data[i].title}</h5>
                <p class="card-text">${data[i].plot} </p>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
            </div>
    </div>`

            $('.movieCard').append(filmCard);
        }

    })
}

$('#wantToWatch').click(function () {
    let movieInput = $('#search').val()
    console.log(movieInput)
    $.get(`https://api.themoviedb.org/3/search/movie?api_key=36bae576330e105013948f7fc0b734c0&language=en-US&query=${movieInput}&page=1&include_adult=false`).done(function (data) {
        console.log(data);

        const newFilmCard = {
            title: data.results[0].title,
            poster: `http://image.tmdb.org/t/p/w154${data.results[0].poster_path}`,
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