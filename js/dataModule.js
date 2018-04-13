const dataModule = (() => {
    let allShows = [];

    class TVShows {
        constructor(id, name, image) {
            this.id = id;
            this.name = name;
            this.image = image;
        }
    }

    const createTVShows = (id, name, image) => {
        const TVShow = new TVShows(id, name, image);
        allShows.push(TVShow);
        return TVShow;
    }

    const searchedShows = showsData => {
        return showsData.map(showWrap => {
            const { show } = showWrap;
            return new TVShows(show.id, show.name, show.image);
        })
    }


    return {
        createTVShows,
        searchedShows,
        allShows,
    }

})();