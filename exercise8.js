$(document).ready(function(){
	console.log("immediately before setting listener");
	$("#getQuestionsButton").on('click', getWord);
});

function getWord()
{
	console.log("Inside getXML");
	$.ajax({
        type: "GET",
        url: "ajax/data.xml",
		data: {},
        success: function(xml){
		  console.log(xml);
		  var questions = xml.getElementsByTagName("problem");
		  console.log(questions);
		  var score = 0;
		  var questionsHTML = [];
		  var quizDiv = document.getElementById("quiz");
		  for(i=0;i<questions.length;i++)
		  {
			  console.log(questions[i].childNodes[1].innerHTML);
			  questionsHTML.push();
			  //console.log($("#quiz")[0].innerHTML);
			  questionsHTML[i] = document.createElement("form");
			  questionsHTML[i].id = "question"+i;
			  questionsHTML[i].innerHTML = questions[i].children[0].innerHTML;
			  var answerButton;
			  var correctAns;
			  for(j=1;j<questions[i].children.length-1;j++)
			  {
				  //set the correct answer string so we can compare to that in the grade function
				  correctAns = questions[i].children[questions[i].children.length-1].innerHTML
				  //create the radio buttons first
				  questionsHTML[i].appendChild(document.createElement("br"));
				  answerButton = document.createElement("input");
				  answerButton.type = "radio";
				  answerButton.name = i;
				  if(questions[i].children[j].innerHTML === correctAns)
				  {
					 answerButton.onclick = function(){ 
												score++;
												document.getElementById("feedback").innerHTML ="CORRECT!!! Score is: "+score;
											}
				  }else
				  {
					answerButton.onclick = function(){ 
												score--;
												document.getElementById("feedback").innerHTML ="INCORRECT!!! Score is: "+score;
											} 
				  }
												
				  questionsHTML[i].appendChild(answerButton);
				  //create the text after the radio button
				  questionsHTML[i].appendChild(document.createTextNode(questions[i].children[j].innerHTML));
			  }
			  //append all the questions to the 
			  quizDiv.appendChild(questionsHTML[i]);
			  document.createElement('FORM');
			  questionsHTML[i] = document.createElement('FORM');
			  questionsHTML[i].name = 'form'+i;
			  //questionsHTML[i].createElement("input")
			  
		  }
        }
    });
}

function handleXML(xml)
{
	console.log("handleXML reached");
	console.log(xml);
}
