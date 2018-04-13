import { createTVShows, searchedShows } from './TVShows.js';
import {
    displayShows,
    showSearch,
    displaySingleShow,
    displayCast,
    displaySeasons
} from './UIModule.js';

const initSingleShow = () => {

    let singleShowId = localStorage.getItem("showId");
    const singleShowRequest = `http://api.tvmaze.com/shows/${singleShowId}`;

    fetch(singleShowRequest)
        .then(function (response) {
            return response.json();
        })
        .then(function (show) {
            displaySingleShow(show);
        })


    const allSeasons = `http://api.tvmaze.com/shows/${singleShowId}/seasons`;

    fetch(allSeasons)
        .then(function (response) {
            return response.json();
        })
        .then(function (seasons) {
            seasons.forEach(e => {
                displaySeasons(e);
            })
        })



    const cast = `http://api.tvmaze.com/shows/${singleShowId}/cast`;

    fetch(cast)
        .then(function (response) {
            return response.json();
        })
        .then(function (cast) {
            cast.forEach(response => {
                const { person } = response;
                displayCast(person);
            })
        })


}

const inputDropdown = () => {

    $('#myInput').on('click', () => {
        $('#myDropdown').toggleClass("show");
    })

    $('input').keyup(searched);
}

const allShows = () => {

    const allShowsRequest = `http://api.tvmaze.com/shows`;

    fetch(allShowsRequest)
        .then(function (response) {
            return response.json();
        })
        
        
        .then(function (all) {
            const shows = all.slice(0, 50);
            shows.forEach(show => {
                const singleShow = createTVShows(show.id, show.name, show.image.original);
                displayShows(singleShow);
            })
            $('.showDiv').on('click', switchToSingleShow);
        })

}

const searched = () => {

    const searchedShow = $('input').val();

    var request = `http://api.tvmaze.com/search/shows?q=${searchedShow}`;

    fetch(request)
        .then(function (response) {
            return response.json();
        })
        .then(function (searched) {
            $('#myDropdown').text("");

            const myShows = searchedShows(searched)
            showSearch(myShows)

            $('.searchList').on('click', switchToSingleShow);
        })

}

function switchToSingleShow(event) {

    const showId = $(this).attr('id');
    localStorage.setItem('showId', showId);
}


export {
    inputDropdown,
    allShows,
    switchToSingleShow,
    searched,
    initSingleShow
};