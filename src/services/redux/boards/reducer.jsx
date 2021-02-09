const initialState = {
  boards: [
    {
      name: "Programación",
      id: "1",
      edit: false,
    },
    {
      name: "Casa",
      id: "2",
      edit: false,
    },
    {
      name: "Tareas Pendientes",
      id: "3",
      edit: false,
    },
  ],
};

const boardsReducer = (state = initialState, action) => {
  console.log(state.boards, action.type,action.id, action.payload, action.edit);
  switch (action.type) {
    case "ADD_BOARD":
      return {
        ...state,
        boards: [
          ...state.boards,
          {
            name:action.payload,
            id:""+action.id,
            edit: action.edit
          },
        ]
      }
    
    case "RENAME_BOARD":
      state.boards.forEach((board) => {
        if(board.id === action.id){
          board.name = action.name;
        }
      });

      return state
        
      
 
    default:
      return state;
  }
};

export default boardsReducer;
