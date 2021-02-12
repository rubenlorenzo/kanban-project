const renameBoardAction = (dispatch, id, name) => {
  dispatch({
    type: "RENAME_BOARD",
    id: id,
    name: name,
  });
};

export { renameBoardAction };
