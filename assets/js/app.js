let buttonElement = document.querySelector('#search');
let inputElement = document.querySelector('#inputValue');
let movieSearchable = document.querySelector('#movies-searchable');
let imgElement = document.querySelector('img');
let moviesContainer = document.querySelector('#movies-container');


function movieSection(movies) {
    let section = document.createElement('section');
    section.classList = 'sectionb';
    movies.map((movie) => {
        if (movie.poster_path) {
            let img = document.createElement('img');
            img.src = IMAGE_URL + movie.poster_path;
            img.setAttribute('data-movie-id', movie.id);
            section.appendChild(img);
        }
    })
    return section;
}

function fError(error) {
    console.log('ERROR :', error);
}

function createMovieContainer(movies, title = ' ') {
    let movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    let header = document.createElement('h2');
    header.innerHTML = title;

    let content = document.createElement('div');
    content.classList = 'content';

    let contentClose = `<p id="content-close">X</p>`;
    content.innerHTML = contentClose;

    let section = movieSection(movies);

    movieElement.appendChild(header);
    movieElement.appendChild(section);
    movieElement.appendChild(content);
    return movieElement;
}

function renderSearchMovies(data) {

    movieSearchable.innerHTML = '';
    let movies = data.results;
    let movieBlock = createMovieContainer(movies);
    movieSearchable.appendChild(movieBlock);
}

function renderMovies(data) {
    let movies = data.results;
    let movieBlock = createMovieContainer(movies, this.title);
    moviesContainer.appendChild(movieBlock);

}

buttonElement.onclick = function(event) {
    event.preventDefault();
    let value = inputElement.value;

    searchMovie(value);

    inputElement.value = '';
}

function createIframe(video) {
    let iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.width = 360;
    iframe.height = 315;
    iframe.allowFullscreen = true;

    return iframe;

}

function createVideoTemplate(data, content) {

    content.innerHTML = '<p id="content-close">X</p>';
    let videos = data.results;
    let length = videos.length > 4 ? 4 : videos.length;
    let iframeContainer = document.createElement('div');

    for (let i = 0; i < videos.length; i++) {
        let video = videos[i];
        let iframe = createIframe(video);
        iframeContainer.appendChild(iframe);
        content.appendChild(iframeContainer);
    }

}

document.onclick = function(event) {

    let target = event.target;

    if (target.tagName.toLowerCase() === 'img') {

        let movieId = target.dataset.movieId;
        let section = event.target.parentElement;
        let content = section.nextElementSibling;
        content.classList.add('content-display');

        let path = `/movie/${movieId}/videos`;
        let url = generateUrl(path);
        fetch(url)
            .then((res) => res.json())
            .then((data) => createVideoTemplate(data, content))
            .catch((error) => {
                console.log('Error: ', error);
            });
    }

    if (target.id === 'content-close') {

        let content = target.parentElement;
        content.classList.remove('content-display');
    }
}


searchMovie('');

getPopular();

getNowPlayingMovies();

getUpcomingMovies();

getTopRatedMovies();