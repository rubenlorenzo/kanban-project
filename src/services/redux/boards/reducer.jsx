const initialState = {
  boards: [
    {
      text: "Programación",
      id: 1,
    },
    {
      text: "Casa",
      id: 2,
    },
    {
      text: "Tareas Pendientes",
      id: 3,
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
