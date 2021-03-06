const initialState = {
  tasks: [
    {
      id: "1",
      name: "Tarea 1",
      boardId: "1",
      listId: "1",
      positionList: 0,
    },
    {
      id: "2",
      name: "Tarea 2",
      boardId: "1",
      listId: "2",
      positionList: 0,
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
  console.log(state.tasks, action);

  switch (action.type) {
    case "ADD_TASK": {
      return {
        tasks: [
          ...state.tasks,
          {
            id: action.id,
            name: action.name,
            boardId: action.boardId,
            listId: action.listId,
            positionList: state.tasks.filter(
              (task) => task.listId === action.listId
            ).length,
          },
        ],
      };
    }

    case "RENAME_TASK": {
      state.tasks.forEach((task) => {
        if (task.id === action.id) {
          task.name = action.name;
        }
      });

      return state;
    }

    case "MOVE_TASK_ON_THE_BOARD":
      state.tasks.forEach((task) => {
        if (task.id === action.id) {
          task.listId = action.listId;
        }
      });

      let numberTasksInList = state.tasks.filter(
        (task) => task.listId === action.listId
      ).length;

      state.tasks.forEach((task) => {
        if (task.id === action.id) {
          task.positionList = numberTasksInList;
        }
      });

      return state;

    case "DELETE_TASK": {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id),
      };
    }

    default:
      return state;
  }
};

export default tasksReducer;
