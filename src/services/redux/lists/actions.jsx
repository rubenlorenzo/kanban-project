const renameListAction = (dispatch, id, name) => {
  dispatch({
    type: "RENAME_LIST",
    id: id,
    name: name,
  });
};

export { renameListAction };