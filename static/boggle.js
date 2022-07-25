let score = 0;
let foundWords = new Set(); 
let timer = setInterval(runClock(60), 1000);
$("#start").hide()
function printMessage(msg) {
    $('.msg').text(msg);
    }

function showWord(word) {
    $(".words").append(`<li> ${ word.toUpperCase() } (${word.length})</li>`)    
    }

function showScore(score) {
  $(".score").text(score)
}

async function handleClick(e) {
    e.preventDefault();
    let word = $('#word').val();
    $("#word").val("");    //clear input field
    if (!word)
      return;
    
    if (foundWords.has(word)) {
      printMessage(`Already found ${word}`);
      return;
    }

    let response = await axios.get(`/check-word?word=${word}`);
    //OR let response = await axios.get("/check-word" , { params: { word: word }})
    console.log(response.data.result); 
    if (response.data.result === "not-word") {
      printMessage(`${word} is not a valid word`);
    } else if (response.data.result === "not-on-board") {
      printMessage(`${word} is not on the board`);
    } else {
      $('.msg').text("");
      showWord(word);
      foundWords.add(word);
      score += word.length;
      showScore(score)
    }
}

function runClock (count) {
             
  setInterval(function (){
      if (count > 0) {
        $(".clock").text(count);  
        count--;
      }
      else {
          clearInterval(1);
          finalizeGame();
          
      }
  }, 1000);
}

function finalizeGame(){
  $("#guess").prop('disabled', true);
  $("#start").show()
  axios.post("/finalize", {score: score})
}


$("#guess-form").on('submit', handleClick);
