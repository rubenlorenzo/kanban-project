const initialState = {
  tasks: [
    {
      id: "1",
      name: "Tarea 1",
      boardId: "1",
      listId: "1",
      positionList: 2,
    },
    {
      id: "2",
      name: "Tarea 2",
      boardId: "1",
      listId: "2",
      positionList: 1,
    },
    {
      id: "3",
      name: "Tarea 3",
      boardId: "1",
      listId: "3",
      positionList: 0,      
    },
    {
      id: "4",
      name: "Tarea 4",
      boardId: "1",
      listId: "1",
      positionList: 1,      
    },
  ],
};

const tasksReducer = (state = initialState, action) => {
  console.log(state.tasks, action.type, action.boardId);

  switch (action.type) {
    default:
      return state;
  }
};

export default tasksReducer;
