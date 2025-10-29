--Readme document for Julianna Nacorda, jmnacord@uci.edu*--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

11/10
- 3/3 Summarizing tweets
- 4/4 Identifying the most popular activities
- 3/3 Adding a text earch interface
- 1/1 BONUS FEATURE(!!!): used Vega-lite’s streaming API to dynamically change one chart when the aggregate button is pressed.

2. How long, in hours, did it take you to complete this assignment?
It took me around 16 hours to complete this assignment.


3. What online resources did you consult when completing this assignment? (list sites like StackOverflow or specific URLs for tutorials; describe queries to Generative AI or use of AI-based code completion)
I reviewed some online resources, such as:
    - Vega-lite's Streaming Data: https://vega.github.io/vega-lite/tutorials/streaming.html
    - Vega-lite's Interactive Charts: https://vega.github.io/vega-lite/tutorials/streaming.html
    - JS String Methods:
        - indexOf(): https://www.w3schools.com/jsref/jsref_indexof.asp
        - search(): https://www.w3schools.com/jsref/jsref_search.asp
        - toLocaleDataString(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
        - startsWith(): https://www.w3schools.com/jsref/jsref_startswith.asp
        - endsWith(): https://www.w3schools.com/jsref/jsref_endswith.asp
        - includes(): https://www.w3schools.com/jsref/jsref_includes.asp
        - format(): http://mathjs.org/docs/reference/functions/format.html


4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?
N/A


5. Is there anything special we need to know in order to run your code?
No, there's nothing special needed to run my code. However, I did include a bonus feature which dynamically updates the data in the same chart using Vega-Lite's data streaming API when you click the button. Instead of two charts, there is only one, which uses view.data('source_0', newData).run() to replace the data without re-rendering the entire chart.
