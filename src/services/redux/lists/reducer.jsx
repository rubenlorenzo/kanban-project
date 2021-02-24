const initialState = {
  lists: [
    {
      id: "1",
      name: "Pendiente",
      boardId: "1",
      position: 2,
    },
    {
      id: "2",
      name: "Haciendo",
      boardId: "1",
      position: 1,
    },
    {
      id: "3",
      name: "Terminado",
      boardId: "1",
      position: 0,
    },
  ],
};

const listsReducer = (state = initialState, action) => {
  console.log(state.lists, action);

  switch (action.type) {
    case "REPLACE_POSITIONS_LISTS":
      state.lists.forEach((list) => {
        if (list.id === action.startId) {
          list.position = action.endPosition;
        } else if (list.id === action.endId) {
          list.position = action.startPosition;
        }
      });

      return state;

    case "ADD_LIST":
      return {
        lists: [
          ...state.lists,
          {
            id: action.id,
            name: action.name,
            boardId: action.boardId,
            position: state.lists.length,
          },
        ],
      };

    case "RENAME_LIST":
      state.lists.forEach((list) => {
        if (list.id === action.id) {
          list.name = action.name;
        }
      });

      return state;

    case "DELETE_LIST":
      return {
        ...state,
       lists: reorderListsAndDelete(state.lists, action.id, action.boardId),
      };

    default:
      return state;
  }
};

const reorderListsAndDelete = (lists,id, boardId) =>{
  let i=0;
  
  lists.sort((a, b) => {
    return  a.position - b.position;
  }).filter(
    (list) => list["boardId"] === boardId
  ).forEach((list) =>{ 
    if(list.id !== id){
      list.position = i;
      i++;
    }else{
      list.position = -1;
    }
  })
  
  return lists.filter((list) => list.id !== id);
}

export default listsReducer;
