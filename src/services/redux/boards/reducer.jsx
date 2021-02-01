const initialState = {
  boards: [
    {
      name: "Programación",
      id: "1",
    },
    {
      name: "Casa",
      id: "2",
    },
    {
      name: "Tareas Pendientes",
      id: "3",
    },
  ],
};

const boardsReducer = (state = initialState, action) => {
  console.log(state, action.id);
  switch (action.type) {
    case "ADD_BOARD":
      return {
        ...state,
        boards: [
          ...state.boards,
          {
            name:action.payload,
            id:""+action.id
          },
        ]
      }

    default:
      return state;
  }
};

export default boardsReducer;
