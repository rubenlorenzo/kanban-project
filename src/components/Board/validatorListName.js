import validator from "validator";

function validatorListName(lists, name, boardId) {
  let message = "";

  let nameToOperate = name.replace(/ /g, "");

  if (validator.isAscii(nameToOperate)) {
    
    let listExist = false;
    lists.forEach((list) => {
      if (list.name === name && list.boardId===boardId) {
        listExist = true;
      }
    });

    if (!listExist) {
      return { result: true, message };
    } else {
      return { result: false, message: "Lista repetida" };
    }
  }

  return {
    result: false,
    message: "Nombre del lista, con valores ASCII",
  };
}

export default validatorListName;
