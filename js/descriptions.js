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
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	
	const searchInput = document.getElementById('textFilter');

	searchInput.addEventListener('input', function() {
		const searchTxt = this.value.toLowerCase();

		// update the search text span
		document.getElementById('searchText').innerText = searchTxt || '';

		// clear the table
		const tableBody = document.getElementById('tweetTable');
		tableBody.innerHTML = '';

		// if the search is empty, don't show anything!
		if (searchTxt === '') {
			document.getElementById('searchCount').innerText = 0;
			return;
		}

		// filter tweets that contain the search text
		const matchingTwts = writtenTweets.filter(t => {
			const tweetTxt = t.writtenText.toLowerCase();
			return tweetTxt.includes(searchTxt);
		});

		// update the count bro!
		document.getElementById('searchCount').innerText = matchingTwts.length;

		// populate the table with matching tweets
		matchingTwts.forEach((tweet, index) => {
			const row = tweet.getHTMLTableRow(index + 1);
			tableBody.innerHTML += row;
		});
	});
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});