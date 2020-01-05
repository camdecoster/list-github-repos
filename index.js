'use strict';

// Consider specifying v3 in header: application/vnd.github.v3+json
const repoUrl = 'https://api.github.com/users/GHUSERNAME/repos';

// Watch for form submittals
function watchForm() {
    console.log('`watchForm` ran');
    $('#js-form').submit(function () {
        event.preventDefault();

        // Grab username from input field
        const username = $('#js-username').val();
        //console.log(`Username is ${username}`);
        getRepos(username);
    })
}

function displayResults(results) {
    console.log('`displayResults` ran');

    // Clear out previous results
    $('#js-results-list').empty();

    // Only add results if user has repos
    if (results.length > 0) {
        // For each item in results, extract name and repo URL,
        // create string with that info, add that info to results
        // list in DOM
        for (let i = 0; i < results.length; i++) {
            $('#js-results-list').append(
                `<li>${results[i].name}<br>
            <a href="${results[i].html_url}">${results[i].html_url}</a></li>`
            );
        }
    }
    // Otherwise state no repos exist
    else {
        $('#js-results-list').append('<li>User has no public repositories</li>');
    }
    // Change class to display results list
    $('#js-results').removeClass('hidden'); 
}

function getRepos(username) {
    console.log('`getRepos` ran');

    // Clear out previous error message
    $('#js-error-message').empty();

    // Hide results list
    $('#js-results').addClass('hidden');

    // Create API call URL
    const url = repoUrl.replace('GHUSERNAME', username);
    console.log(url);

    // Call API
    fetch(url)
        // Do I need to handle a user with no repos?
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error(response.statusText);
            }
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`There was an error: ${err.message}`)
        });
}

$(watchForm);