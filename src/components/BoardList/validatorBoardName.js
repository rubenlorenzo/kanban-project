import validator from "validator";

function validatorBoardName(boards, name) {
  let message = "";
  console.log(name);
  if (validator.isAlpha(name.replace(/ /g, ""))) {
    let sentence = "";
    let words = name.split(" ");

    for (let i = 0; i < words.length; i++) {
      if (i >= 0 && i < words.length - 1) {
        sentence = sentence + words[i] + " ";
      } else {
        sentence = sentence + words[i];
      }
    }

    let boardExist = false;
    boards.forEach((board) => {
      if (board.name.toLowerCase() === name.toLowerCase()) {
        boardExist = true;
      }
    });

    if (!boardExist) {
      return { result: true, message };
    }else{
      return { result: false, message: "Tablero repetido" };
    }
  }

  return { result: false, message: "Nombre del tablero, con solo letras del alfabeto"};
}

export default validatorBoardName;
