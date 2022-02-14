const glitchURL = "https://tartan-quill-libra.glitch.me/movies";

setTimeout(function(){
    let myGlitchRequest = fetch(glitchURL)
        .then(response => response.json())
        .then(db => {
            console.log(db)
            renderMovies(db)
            $('#loader').toggleClass('load-man')
        })
}, 3000)


// GENERATE MOVIE CARDS
function renderMovies(db) {

    for (let i = 0; i < db.length; i++) {
        let filmCard = `
                                    <div class="flip-card">
                                        <div class="flip-card-inner">
                                            <div class="flip-card-front">
                                                <img class="card-img-top" src="http://image.tmdb.org/t/p/original/${db[i].poster_path}" alt="">
                                            </div>
                                            <div class="flip-card-back">
                                                <h5 class="movieTitle">${db[i].title}</h5>
                                                <p class="date" >Release date : ${db[i].release_date}</p>
                                                <p class="movieText">${db[i].overview} </p>
                                                <button type="button" data-value=${db[i].id} class="edit modal-button" data-toggle="modal" data-target="#Modal">EDIT</button>
                                                <button id="${db[i].id}" type="button" onclick="deleteMe(${db[i].id})">DELETE</button>
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


        $(`#modal${db[i].id}`).on('click', function (){
            $(`#title`).attr('placeholder', `${db[i].original_title}`)
            $('#description').val(`${db[i].overview}`)
        })

    }

    $('.edit').click( function (e){
        e.preventDefault()
        id = $(this).attr('data-value')
        $('.createModals').append(`
<div class="modal fade" id="Modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit This Movie</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="title" class="col-form-label">Title: </label>
                        <input type="text" class="form-control" id="title" placeholder="">
                    </div>
                    <div class="form-group">
                        <label for="description" class="col-form-label">Description: </label>
                        <input type="text" class="form-control" id="description"></input>
                    </div>
                </form>
            </div>
            <div class="modal-footer">

                <button type="button" class="btn btn-dark" data-dismiss="modal" onclick='$("form").trigger("reset")'>Nevermind</button>
                <button type="button" class="btn btn-primary" id="edit" data-value=${id}>Complete Edit</button>

            </div>
        </div>
    </div>
</div>`)

        $('#edit').click(function (){
    let ID = $(this).attr('data-value')
    let title = $('#title').val()
    let description = $('#description').val()
    console.log(title)
    console.log(description)
            console.log(ID)



        // sending PUT request with fetch API in javascript
        fetch(`${glitchURL}/${ID}` , {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "PATCH",

            // Fields that to be updated are passed
            body: JSON.stringify({
                title: title,
                overview: description
            })
        })
            .then(function (response) {

                // console.log(response);
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                location.reload()
            })
        })
    })
}






// GET ADDED MOVIE OBJECT FROM API
$('#addMovie').on('click', function (e) {
    e.preventDefault()
    let movieInput = $('#addName').val()
    console.log(movieInput)

    let tmdbRequest = fetch(`https://api.themoviedb.org/3/search/movie?api_key=36bae576330e105013948f7fc0b734c0&language=en-US&query=${movieInput}&page=1&include_adult=false`)
        .then(response => response.json())
        .then(db => {
            console.log(db)
            fetch(glitchURL, {
                method: 'POST',
                body: JSON.stringify(db.results[0]),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(function () {
                    let myGlitchRequest = fetch(glitchURL)
                        .then(response => response.json())
                        .then(db => {
                            console.log(db)
                            $('.movieCards').empty()
                            renderMovies(db)
                        })
                })

        })

})


// DELETE BUTTON FUNCTIONALITY
function deleteMe(id){
    console.log("hello")
    console.log(id)
    fetch(`${glitchURL}/${id}`, {
        method: 'DELETE',

    }).then(response => {
        console.log(response.json())
    })
        .then(function () {
            let myGlitchRequest = fetch(glitchURL)
                .then(response => response.json())
                .then(db => {
                    console.log(db)
                    // renderMovies(db)
                    location.reload()
                })
            })
}





// function getInfoFromModal(id){
//
//     let title = $('#title').val()
//     let description = $('#description').val()
//     console.log(title)
//     console.log(description)
//
//
//
//         // sending PUT request with fetch API in javascript
//         fetch(`${glitchURL}/${id}` , {
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json"
//             },
//             method: "PATCH",
//
//             // Fields that to be updated are passed
//             body: JSON.stringify({
//                 title: title,
//                 description: description
//             })
//         })
//             .then(function (response) {
//
//                 // console.log(response);
//                 return response.json();
//             })
//             .then(function (data) {
//                 console.log(data);
//             });
//     }









