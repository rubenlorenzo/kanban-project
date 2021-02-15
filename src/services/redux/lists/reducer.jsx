const initialState = {
  lists: [
    {
      id: "1",
      name: "Pendiente",
      boardId: "1",
      position: 0,
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
      position: 2,
    },
  ],
};

const listsReducer = (state = initialState, action) => {
  console.log(state.lists, action.type);

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

    default:
      return state;
  }
};

export default listsReducer;
