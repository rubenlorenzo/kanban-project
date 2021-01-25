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
  switch (action.type) {
    default:
      return state;
  }
};

export default boardsReducer;
