let API_KEY = '3f486076dc3e633d2b47ebf092b27963';
let url = 'https://api.themoviedb.org/3/search/movie?api_key=3f486076dc3e633d2b47ebf092b27963';
let IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

function generateUrl(path) {
    let url = `https://api.themoviedb.org/3${path}?api_key=3f486076dc3e633d2b47ebf092b27963`;
    return url;
}

function requestMovies(url, onComplete, onError) {
    fetch(url)
        .then((res) => res.json())
        .then(onComplete)
        .catch(onError);
}

function searchMovie(value) {
    let path = '/search/movie';
    let url = generateUrl(path) + '&query=' + value;
    requestMovies(url, renderSearchMovies, fError);
}

function getUpcomingMovies() {
    let path = '/movie/upcoming';
    let url = generateUrl(path);
    let render = renderMovies.bind({ title: 'Prochainement au cinema' });
    requestMovies(url, render, fError);
}

function getTopRatedMovies() {
    let path = '/movie/top_rated';
    let url = generateUrl(path);
    let render = renderMovies.bind({ title: 'Les Films les mieux noté' });
    requestMovies(url, render, fError);
}


function getNowPlayingMovies() {
    let path = '/movie/now_playing';
    let url = generateUrl(path);
    let render = renderMovies.bind({ title: 'En ce moment au cinéma' });
    requestMovies(url, render, fError);
}

function getPopular() {
    let path = '/movie/popular';
    let url = generateUrl(path);
    let render = renderMovies.bind({ title: 'Les films du moment' });
    requestMovies(url, render, fError);
}