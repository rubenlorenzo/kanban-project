const initialState = {
  lists: [
    {
      id: "1",
      name: "Pendiente",
      boardId: "1",
    },
    {
      id: "2",
      name: "Haciendo",
      boardId: "1",
    },
    {
      id: "3",
      name: "Terminado",
      boardId: "1",
    },
  ],
};

const listsReducer = (state = initialState, action) => {
  console.log(state.lists, action.type, action.id, action.name, action.edit);

  switch (action.type) {
    default:
      return state;
  }
};

export default listsReducer;
