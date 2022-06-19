$(document).ready(() => {

    if (selectedTab === "replies") {
        loadFollowers()
    }
    else {
        loadFollowing();
    }

});


function loadFollowers() {
    $.get(`/api/users/${profileUserId}/followers`, results => {
        outputUsers(results.followers, $(".resultsContainer"));
    })
}

function loadFollowing() {
    $.get(`/api/users/${profileUserId}/following`, results => {
        outputUsers(results.following, $(".resultsContainer"));
    })
}