class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    // label list:
    // If text contains the word "achieved" -> achievement
    // If text contains the word "live" -> live_event
    // If text contains the word "completed" or "posted" -> completed_event
    // else: -> "miscellaneous"
    get source():string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.

        // case-insensitive matching
        const t = (this.text || "").toLowerCase();
        
        // check for achievements
        if (t.includes('new pb') || t.includes('new pr') || t.includes('personal best') || t.includes('achieved')) {
            return 'achievement';
        }

        // check for live event
        if (t.includes(' live ') || t.includes('rk live') || t.startsWith('watch my run right now') || t.includes('#rklive') || t.includes('runkeeper live')) {
            return 'live_event';
        }

        // check for completed events
        if (t.startsWith('just completed') || t.startsWith('just posted')) {
            return 'completed_event';
        }

        return 'miscellaneous';
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
        if (this.source !== 'completed_event') {
            return false;
        }

        // check if there is a dash separator followed by user text
        // the pattern is: "Just completed/posted a X.XX km/mi activity - USER TEXT https://... # Runkeeper"

        const dashIdx = this.text.indexOf(' - ');
        if (dashIdx == -1) {
            return false;
        }
        
        // extract potential user text (after dash)
        const textAfterDash = this.text.substring(dashIdx + 3);

        const textBeforeUrl = textAfterDash.replace(/https?:\/\/\S+/g, '').replace(/#\w+/g, '').trim();

        // if there is text content after the dash (not just whitespace), then its written by a user!!!
        return textBeforeUrl.length > 0;
        
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        return "";
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        return "";
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        return 0;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}