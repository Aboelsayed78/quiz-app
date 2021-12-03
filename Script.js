// Starting Screen
let startBTN = document.querySelector('.start-screen button'),
   myInput = document.querySelector('.start-screen input'),
   userName = document.querySelector('.left h2');
startBTN.onclick = function () {
   // Checking if the input is empty
   if (myInput.value == null || myInput.value == "") {
      // Setting the default username
      userName.innerText = "Guest";
   } else {
      // Setting the username that user choosed
      userName.innerText = myInput.value;
   };
   // Removing the starting screen to start quiz
   document.querySelector('.start-screen').remove();
};

////////////////////////////////////////////////////////////////////////////////////////

// Starting new Xml Http Request (XHR)
let myRequest = new XMLHttpRequest();
// When my request is ready do the next
myRequest.onreadystatechange = function(){
   // Checking if my request is ok and succeded
   if(this.readyState === 4 && this.status === 200){
      // Initialization Of Variables
      let myData = JSON.parse(this.responseText),
      currentQuestion = 0,
      questionCounter = myData.length,
      myUl = document.querySelector('.bullets ul'),
      tabsArr = Array.from(myUl.children),
      myQuestion = document.querySelector('.quiz-block .question'),
      answersArr = document.querySelectorAll('.answers span'),
      answer1 = document.querySelector('.answers .answer1'),
      answer2 = document.querySelector('.answers .answer2'),
      answer3 = document.querySelector('.answers .answer3'),
      questionEnd = document.querySelector('.question-end'),
      quizEnd = document.querySelector('.quiz-end'),
      questionNumber = document.querySelector('.counter .question-num'),
      totalQuestionNumber = document.querySelector('.counter .total-questions'),
      questionResult = document.querySelector('.result'),
      quizResultTrue = document.querySelector('.final-result .true'),
      quizResultFalse = document.querySelector('.final-result .false'),
      resultTrue = 0,
      resultFalse = 0;
      // Settings the default values
      quizResultFalse.innerText = resultFalse;
      quizResultTrue.innerText = resultTrue;
      questionNumber.innerHTML = currentQuestion + 1;
      totalQuestionNumber.innerHTML = questionCounter;

////////////////////////////////////////////////////////////////////////////////////////

      // Creating Questions Tabs
      for(let i = 0; i < questionCounter; i++){
         // Creating the li for the tab
         let questionTab = document.createElement('li'),
         // Putting the tabs in array
         tabsArr = Array.from(myUl.children),
         questionNum = i + 1;
         // Adding the number of questions in tabs
         questionTab.innerText = questionNum;
         myUl.appendChild(questionTab);
         // Adding class active for the tab of current question
         tabsArr.forEach(element => {
            if (element.innerText == currentQuestion + 1) {
               element.classList.add('active');
            };
         });
      };
      // Start getting the data of the first question
      fetchingData(currentQuestion);

////////////////////////////////////////////////////////////////////////////////////////

      // Checking The Answer
      function correctingAnswer(){
         // Putting the tabs in array
         tabsArr = Array.from(myUl.children);
         answersArr.forEach(element => {
            element.onclick = function(){
               // Checking if the answer is true
               if(element.innerText === correctAnswer){
                  // Adding true for the answer
                  element.classList.add('true');
                  // Adding well done text
                  questionResult.innerText = 'welldone';
                  // Adding true for the result
                  questionResult.classList.add('true');
                  // increasing the true answers
                  resultTrue++;
                  // adding number of true answers
                  quizResultTrue.innerText = resultTrue;
                  // Adding class true to the correct tab and remove class active
                  tabsArr.forEach(element => {
                     if (element.innerText == currentQuestion + 1) {
                        // removing active for tabs
                        element.classList.remove('active');
                        // Adding true for tabs
                        element.classList.add('true');
                     };
                  });
               // Checking if the answer is true
               }else if(element.innerText !== correctAnswer) {
                  // Adding false for the answer
                  element.classList.add('false');
                  // Adding opps text
                  questionResult.innerText = 'opps!';
                  // Adding false for the result
                  questionResult.classList.add('false');
                  // increasing the false answers
                  resultFalse++;
                  // adding number of false answers
                  quizResultFalse.innerText = resultFalse;
                  // Adding class false to the wrong tab and remove class active
                  tabsArr.forEach(element => {
                     if (element.innerText == currentQuestion + 1) {
                        // removing active for tabs
                        element.classList.remove('active');
                        // Adding false for tabs
                        element.classList.add('false');
                     };
                  });
               };
               // Adding div on answers after answering question
               // To prevent user from selecting additional answer
               questionEnd.style.display = 'block';
               // checking if the questions ends or not
               if(currentQuestion < 9){
                  // Getting the next question
                  setTimeout(() => {
                     currentQuestion++;
                     fetchingData(currentQuestion);
                  // Time untill showing the next question
                  },800);
               }else{
                  // Time untill final question end
                  setTimeout(() => {
                     // Adding div to show that the quiz end
                     quizEnd.style.display = 'block';
                     // removing the div of question result
                     questionResult.innerText = '';
                     questionResult.classList.remove('true');
                     questionResult.classList.remove('false');
                  },800);
               };
            };
         });
      };

////////////////////////////////////////////////////////////////////////////////////////

      // Getting Questions and Answers from Data.json
      function fetchingData(currentQuestion){
         // Removing div on the answers
         questionEnd.style.display = 'none';
         // Looping over the answers of the next question
         answersArr.forEach(element => {
            if(element.classList.contains('true')){
               // remove class true from the answer of the previous question
               element.classList.remove('true');
               questionResult.classList.remove('true');
            }else if(element.classList.contains('false')){
               // remove class false from the answer of the previous question
               element.classList.remove('false');
               questionResult.classList.remove('false');
            };
            // empty the value of thhe question result
            questionResult.innerText = '';
         });
         // Putting the tabs in array
         tabsArr = Array.from(myUl.children);
         // Adding class active for the tab of current question
         tabsArr.forEach(element => {
            if (element.innerText == currentQuestion + 1) {
               element.classList.add('active');
            };
         });
         // Getting the data from the json Object
         questionImported = myData[currentQuestion].title,
         answer1Imported = myData[currentQuestion].answer1,
         answer2Imported = myData[currentQuestion].answer2,
         answer3Imported = myData[currentQuestion].answer3,
         correctAnswer = myData[currentQuestion].rightAnswer;
         // Refreshing the the number of the current question
         questionNumber.innerHTML = currentQuestion + 1;
         // Adding data in the quiz
         myQuestion.innerText = `${currentQuestion + 1} - ${questionImported}`;
         answer1.innerText = answer1Imported;
         answer2.innerText = answer2Imported;
         answer3.innerText = answer3Imported;
         // Starting the correction function when the user answer
         correctingAnswer();
      };
   };
};
// Selecting the json file that contains the data
myRequest.open('GET', 'data.json', true);
// Sending the request to get the json file
myRequest.send();