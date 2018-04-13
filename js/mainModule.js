const mainModule = (() => {

    const initSingleShow = () => {

        let singleShowId = localStorage.getItem("showId");
        const singleShowRequest = $.get({
            url: `http://api.tvmaze.com/shows/${singleShowId}`
        })
        
        singleShowRequest.done(response => {
            UIModule.displaySingleShow(response);
        })

        const allSeasons = $.get({
            url: `http://api.tvmaze.com/shows/${singleShowId}/seasons`
        })
        
        allSeasons.done(response => {

            response.forEach(response => {
                UIModule.displaySeasons(response);
            })

        })

        const cast = $.get({
            url: `http://api.tvmaze.com/shows/${singleShowId}/cast`
        })
        
        cast.done(response => {
            
            response.forEach(response => {
                const { person } = response;
                UIModule.displayCast(person);
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

        const allShowsRequest = $.get({
            url: `http://api.tvmaze.com/shows`
        })

        allShowsRequest.done(response => {
            const shows = response.slice(0, 50);

            shows.forEach(show => {
                const singleShow = dataModule.createTVShows(show.id, show.name, show.image.original);
                UIModule.displayShows(singleShow);
            })

            $('.showDiv').on('click', switchToSingleShow);
        })
    }

    const searched = () => {

        const searchedShow = $('input').val();

        var request = $.get({
            url: `http://api.tvmaze.com/search/shows?q=${searchedShow}`
        });

        request.done(response => {
            $('#myDropdown').text("");

            const myShows = dataModule.searchedShows(response)
            UIModule.showSearch(myShows)

            $('.searchList').on('click', switchToSingleShow);
        });
    }

    function switchToSingleShow(event) {

        const showId = $(this).attr('id');
        localStorage.setItem('showId', showId);
    }


    return {
        inputDropdown,
        allShows,
        switchToSingleShow,
        searched,
        initSingleShow
    }

})(dataModule, UIModule);
