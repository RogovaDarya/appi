export const getNotes = (userId) => async (dispatch) => {
  try {
    dispatch({ type: 'NOTES/LOADING' });
    const params = new URLSearchParams({ userId }).toString();

    const notes = await fetch(`http://localhost:5001/notes?${params}`).then(
      (r) => r.json()
    );

    dispatch({ type: 'NOTES/SET', payload: notes });
  } catch (err) {
    dispatch({ type: 'NOTES/ERROR', payload: err });
  }
};
