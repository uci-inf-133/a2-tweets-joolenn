// store written tweets globally so we can search them
let writtenTweets = [];

function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets
	const tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	// Filter to only written tweets (completed events with user-written text)
	writtenTweets = tweet_array.filter(t => t.written);
	
	console.log('Total written tweets:', writtenTweets.length);

	// Set initial values to 0 and empty string
	document.getElementById('searchCount').innerText = '0';
	document.getElementById('searchText').innerText = '';
}

function addEventHandlerForSearch() {
	const searchInput = document.getElementById('textFilter');
	let timeout = null;
	
	searchInput.addEventListener('input', function() {
		// Clear the previous timeout
		clearTimeout(timeout);
		
		// Wait 300ms after user stops typing before searching
		timeout = setTimeout(() => {
			const searchText = this.value.toLowerCase().trim();
			
			// Update the search text span
			document.getElementById('searchText').innerText = searchText || '';
			
			// Clear the table
			const tableBody = document.getElementById('tweetTable');
			tableBody.innerHTML = '';
			
			// If search is empty, show nothing
			if (searchText === '') {
				document.getElementById('searchCount').innerText = '0';
				return;
			}
			
			// Filter tweets that contain the search text
			const matchingTweets = writtenTweets.filter(t => {
				const tweetText = t.writtenText.toLowerCase();
				return tweetText.includes(searchText);
			});
			
			// Update the count
			document.getElementById('searchCount').innerText = matchingTweets.length;
			
			// Limit results to first 100 for performance
			const displayTweets = matchingTweets.slice(0, 100);
			
			// Populate the table with matching tweets
			displayTweets.forEach((tweet, index) => {
				const row = tweet.getHTMLTableRow(index + 1);
				tableBody.innerHTML += row;
			});
			
			// Show message if there are more results
			if (matchingTweets.length > 100) {
				tableBody.innerHTML += `<tr><td colspan="3"><em>Showing first 100 of ${matchingTweets.length} results</em></td></tr>`;
			}
		}, 300);
	});
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});