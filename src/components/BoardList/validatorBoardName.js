import validator from "validator";

function validatorBoardName(boards, name) {
  let message = "";

  let nameToOperate = name.replace(/ /g, "");

  if (validator.isAlpha(nameToOperate)) {
    
    let boardExist = false;
    boards.forEach((board) => {
      if (board.name.toLowerCase() === name.toLowerCase()) {
        boardExist = true;
      }
    });

    if (!boardExist) {
      return { result: true, message };
    } else {
      return { result: false, message: "Tablero repetido" };
    }
  }

  return {
    result: false,
    message: "Nombre del tablero, con solo letras del alfabeto",
  };
}

export default validatorBoardName;
