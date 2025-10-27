function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	// adding date-formatting code for finding the earliest and latest tweet. updating the spans here:

	// here we collect the times from tweets
	const times = tweet_array.map(t => t.time.getTime());

	// date format:
	const dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}; // Ex: Monday, January 18, 2021
	// weekday long gives full weekday name
	// month long gives full month name

	if (times.length > 0) {
		const earliestTwt = new Date(Math.min(...times));
		const latestTwt = new Date(Math.max(...times));

		document.getElementById('firstDate').innerText = earliestTwt.toLocaleDateString(undefined, dateOptions); // use defined so weekday and month are localizeedddd

		document.getElementById('lastDate').innerText = latestTwt.toLocaleDateString(undefined, dateOptions);

	} else {
		document.getElementById('firstDate').innerText = 'N/A';
		document.getElementById('lastDate').innerText = 'N/A';
	}
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;	
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});