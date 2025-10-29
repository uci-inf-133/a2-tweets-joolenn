function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	})

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.

	// filter only completed events with valid activity types
	const completed_tweets = tweet_array.filter(t => t.source === 'completed_event' && t.activityType !== 'unknown');

	// count activities by type
	const activityCounts = {};
	completed_tweets.forEach(t => {
		const type = t.activityType;
		activityCounts[type] = (activityCounts[type] || 0) + 1;
	});

	// convert to array for Vega-lite
	const activityData = Object.keys(activityCounts).map(type => ({
		activity: type,
		count: activityCounts[type]
	}))

	// sort by count to find top 3
	activityData.sort((a, b) => b.count - a.count);

	// update the spans for num of activities and top 3
	document.getElementById('numberActivities').innerText = activityData.length;

	document.getElementById('firstMost').innerText = activityData[0].activity;

	document.getElementById('secondMost').innerText = activityData[1].activity;

	document.getElementById('thirdMost').innerText = activityData[2].activity;
	
	// bar chart of activity counts
	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": activityData
	  },
	  //TODO: Add mark and encoding
	  "mark": "bar",
	  "encoding": {
		"x": {
			"field": "activity",
			"type": "nominal",
			"title": "Activity Type",
			"sort": "-y"
		},
		"y": {
			"field": "count",
			"type": "quantitative",
			"title": "Number of tweets"
		}
	  }
	}
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.

	// Get top 3 activities
	const top3 = [activityData[0].activity, activityData[1].activity, activityData[2].activity];

	// filter tweets to top 3 activities and add day of the week
	const top3Tweets = completed_tweets
	.filter(t => top3.includes(t.activityType) && t.distance > 0)
	.map(t => ({
		activity: t.activityType,
		distance: t.distance,
		day: t.time.toLocaleDateString('en-US', { weekday: 'long' })
	}));

	// ADD THESE DEBUG LINES:
console.log('Top 3 activities:', top3);
console.log('Completed tweets count:', completed_tweets.length);
console.log('Top3Tweets count:', top3Tweets.length);
console.log('Sample top3Tweets:', top3Tweets.slice(0, 5));
console.log('Sample distances:', completed_tweets.slice(0, 5).map(t => ({
	activity: t.activityType,
	distance: t.distance,
	text: t.text
})));

	// create a scatter plot of distance by day of week (raw data)
// 	const distance_vis_spec = {
// 	"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
// 	"description": "Distance by day of week for top 3 activities",
// 		"data": {
// 			"values": top3Tweets
// 		},
// 		"mark": "point",
// 		"encoding": {
// 		"x": {
// 			"field": "day",
// 			"type": "nominal",
// 			"title": "Time (Day of Week)",
// 			"sort": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
// 		},
// 		"y": {
// 			"field": "distance",
// 			"type": "quantitative",
// 			"title": "Distance (miles)"
// 		},
// 		"color": {
// 			"field": "activity",
// 			"type": "nominal",
// 			"title": "Activity Type"
// 		}
// 	}
// }

// // Create aggregated mean plot
// const distance_vis_aggregated_spec = {
// 	"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
// 	"description": "Mean distance by day of week for top 3 activities",
// 	"data": {
// 		"values": top3Tweets
// 	},
// 	"mark": "point",
// 	"encoding": {
// 		"x": {
// 			"field": "day",
// 			"type": "nominal",
// 			"title": "Time (Day of Week)",
// 			"sort": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
// 		},
// 		"y": {
// 			"field": "distance",
// 			"type": "quantitative",
// 			"title": "Average Distance (miles)",
// 			"aggregate": "mean"
// 		},
// 		"color": {
// 			"field": "activity",
// 			"type": "nominal",
// 			"title": "Activity Type"
// 		}
// 	}
// };

// // Initially show the non-aggregated plot
// vegaEmbed('#distanceVis', distance_vis_spec, {actions:false});
// document.getElementById('distanceVisAggregated').style.display = 'none';

// // Add button toggle functionality
// let showingAggregate = false;
// document.getElementById('aggregate').addEventListener('click', function() {
// 	if (showingAggregate) {
// 		// Show raw data
// 		document.getElementById('distanceVis').style.display = 'block';
// 		document.getElementById('distanceVisAggregated').style.display = 'none';
// 		this.innerText = 'Show means';
// 		showingAggregate = false;
// 	} else {
// 		// Show aggregated data
// 		document.getElementById('distanceVis').style.display = 'none';
// 		document.getElementById('distanceVisAggregated').style.display = 'block';
// 		vegaEmbed('#distanceVisAggregated', distance_vis_aggregated_spec, {actions:false});
// 		this.innerText = 'Show raw data';
// 		showingAggregate = true;
// 	}
// })

// Fill in these spans based on the visualizations
// Look at your aggregated chart to determine these values
document.getElementById('longestActivityType').innerText = '???'; // Replace with what you see
document.getElementById('shortestActivityType').innerText = '???'; // Replace with what you see
document.getElementById('weekdayOrWeekendLonger').innerText = '???'; // 'weekdays' or 'weekends'

// BONUS: Dynamic single chart using Vega-Lite data streaming
const distance_vis_spec = {
	"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	"description": "Distance by day of week for top 3 activities",
	"data": {
		"values": top3Tweets  // Start with actual data instead of named dataset
	},
	"mark": "point",
	"encoding": {
		"x": {
			"field": "day",
			"type": "nominal",
			"title": "Time (Day of Week)",
			"sort": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
		},
		"y": {
			"field": "distance",
			"type": "quantitative",
			"title": "Distance (miles)"
		},
		"color": {
			"field": "activity",
			"type": "nominal",
			"title": "Activity Type"
		}
	}
};

vegaEmbed('#distanceVis', distance_vis_spec, {actions:false}).then(result => {
	const view = result.view;
	
	// Button toggle
	let showingAggregate = false;
	document.getElementById('aggregate').addEventListener('click', function() {
		if (showingAggregate) {
			// Show raw data
			view.data('source_0', top3Tweets).run();  // 'source_0' is Vega's default data name
			this.innerText = 'Show means';
			showingAggregate = false;
		} else {
			// Calculate and show aggregated data
			const aggregated = {};
			top3Tweets.forEach(t => {
				const key = `${t.activity}-${t.day}`;
				if (!aggregated[key]) {
					aggregated[key] = { activity: t.activity, day: t.day, distances: [] };
				}
				aggregated[key].distances.push(t.distance);
			});
			
			const meanData = Object.values(aggregated).map(item => ({
				activity: item.activity,
				day: item.day,
				distance: item.distances.reduce((a, b) => a + b, 0) / item.distances.length
			}));
			
			view.data('source_0', meanData).run();
			this.innerText = 'Show raw data';
			showingAggregate = true;
		}
	});
});

// Hide the aggregated div
document.getElementById('distanceVisAggregated').style.display = 'none';

// Fill in these spans based on the visualizations
document.getElementById('longestActivityType').innerText = 'bike'; 
document.getElementById('shortestActivityType').innerText = 'walk';
document.getElementById('weekdayOrWeekendLonger').innerText = 'Sunday';

}  // Closing brace for parseTweets function


//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});
