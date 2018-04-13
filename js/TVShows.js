
class TVShows {
    constructor(id, name, image) {
        this.id = id;
        this.name = name;
        this.image = image;
    }
}

export const createTVShows = (id, name, image) => {
    const TVShow = new TVShows(id, name, image);
    return TVShow;
}

export const searchedShows = showsData => {
    return showsData.map(showWrap => {
        const { show } = showWrap;
        return new TVShows(show.id, show.name, show.image);
    })
}

