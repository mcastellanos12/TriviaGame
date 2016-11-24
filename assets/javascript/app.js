    var mins = 1;  //Set the number of minutes you need
    var secs = mins * 60;
    var currentSeconds = 0;
    var currentMinutes = 0;
    /* 
     * The following line has been commented out due to a suggestion left in the comments. The line below it has not been tested. 
     * setTimeout('Decrement()',1000);
     */
    setTimeout(Decrement,1000); 

    function Decrement() {
        currentMinutes = Math.floor(secs / 60);
        currentSeconds = secs % 60;
        if(currentSeconds <= 9) currentSeconds = "0" + currentSeconds;
        secs--;
        document.getElementById("timerText").innerHTML = currentMinutes + ":" + currentSeconds; //Set the element id you need the time put into.
        if(secs !== -1) setTimeout('Decrement()',1000);
        if(secs === 0) alert("YOU RAN OUT OF TIME");
       
    }

function onSubmit(){
	var score = 0;
	var numOfQuestions = 5;
	var ansArr = ['d','a','d','a','c'];

	var q1 = document.forms['quiz']['q1'].value;
	var q2 = document.forms['quiz']['q2'].value;
	var q3 = document.forms['quiz']['q3'].value;
	var q4 = document.forms['quiz']['q4'].value;
	var q5 = document.forms['quiz']['q5'].value;

	for(var i = 1; i <= numOfQuestions; i++){
		if(eval('q' + i) == ''){
			alert("You missed question number " + i);
		}
	}
	

	for(var i = 1; i <= numOfQuestions; i++){
		if(eval('q' + i) == ansArr[i - 1]){
			score++;
		}
	}

	var results = document.getElementById("results");
	results.innerHTML = "<h2> You Scored " + score + " points out of " + numOfQuestions + "</h2>";
	alert("You scored " + score + " out of " + numOfQuestions);
	return false;
	}

