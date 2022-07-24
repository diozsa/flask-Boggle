function printMessage(msg) {
    $('.msg').text(msg);
    }

function showWord(word) {
    $(".words").append(`<li> ${ word } </li>`);
    }

async function handleClick(e) {
    e.preventDefault();
    let word = $('#word').val();
    let foundWords = new Set(); 
    
    if (!word) return;
    // if (foundWords.has(word))

    let response = await axios.get("/check-word", { params: { word: word }});
    // why is the query string in the format of
    // "/check-word?word=word" always returns "not-on-board" ???
    // , { params: { word: word }}
    console.log(response.data.result); 
    if (response.data.result === "not-word") {
      printMessage(`${word} is not a valid word`);
    } else if (response.data.result === "not-on-board") {
      printMessage(`${word} is not on the board`);
    } else showWord(word);
  
}

$("#guess-form").on('submit', handleClick);
