const renameBoardAction = (dispatch, id, name) => {
  console.log(id);
  dispatch({
    type: "RENAME_BOARD",
    id: id,
    name: name,
  });
};

export { renameBoardAction };
