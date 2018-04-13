
const displayShows = singleShow => {
    let div = $(`<div id="${singleShow.id}" class="col-md-4 showDiv">`);
    let img = $(`<img class="img-fluid" src="${singleShow.image}">`);
    let title = $(`<a href="showInfoPage.html"><p>${singleShow.name}</p></a>`);
    let link = $(`<a href="showInfoPage.html"></a>`);
    link.append(img);
    div.append(link);
    div.append(title);

    $('div.row').append(div);
};

const showSearch = foundShow => {

    foundShow.forEach(show => {
        let liSearch = $(`<a id="${show.id}" class="searchList" href="showInfoPage.html">${show.name}</a>`);
        $('#myDropdown').append(liSearch);
    });
}

const displaySingleShow = show => {
    let poster = $(`<img class="col-md-12" src="${show.image.original}">`);
    $('#poster').append(poster);
    $('#summary').append(`${show.summary}`);
    $('h1').append(`${show.name}`);
}

const displaySeasons = season => {

    let li = $(`<li>${season.premiereDate} - ${season.endDate}</li>`);
    $('#seasons').append(li);
    let count = $('#number').text();
    count++;
    $('#number').text(count);
}

const displayCast = person => {

    let li = $(`<li>${person.name}</li>`);
    $('#cast').append(li);
}

export {
    displayShows,
    showSearch,
    displaySingleShow,
    displayCast,
    displaySeasons
};