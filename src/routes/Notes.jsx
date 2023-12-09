import { Link, useNavigate } from "react-router-dom";
import { MdCreate } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { Suspense, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { selectNotesError, selectNotesLoading } from "../redux/notes/selectors";
import { getNotes } from "../redux/notes/actions";
import { selectUserId } from "../redux/user/selectors";

function Notes({ notes }) {
  const userId = useSelector(selectUserId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotes(userId));
  }, [dispatch, userId]);

  const loading = useSelector(selectNotesLoading);
  const error = useSelector(selectNotesError);

  const handleDeleteNote = async (id) => {
    await fetch(`http://localhost:5001/notes/${id}`, {
      method: "delete",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });

    const updatedNotes = await notes.filter((note) => note.id !== id);

    dispatch({ type: "NOTES/DELETE", payload: updatedNotes });
  };

  if (loading) {
    return (
      <div className="prose text-center min-w-full max-w-ful">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    <div className="text-red-500 text-center font-medium text-2xl">
      {error}
    </div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="prose text-center min-w-full max-w-full">
        <h1>Notes</h1>
        <button
          className="bg-gray-300 py-1 px-4 mt-2 font-semibold font-serif text-xl"
          onClick={() => navigate("/createnote")}
        >
          Add new note
        </button>
      </div>
      {Object.keys(notes).length != 0 ? (
        notes?.map?.((note) => (
          <div
            className="flex flex-row max-w-4/5 min-w-4/5 font-normal font-serif text-xl mb-2 justify-between bg-gray-300 mx-auto mt-4 px-4 items-center py-2"
            key={note.id}
          >
            <Link to={`/notes/${note.id}`}>
              <div className="flex flex-row gap-2 font-sans items-center">
                <div className="font-bold text-xl">{note?.name}</div>
                <div className="text-lg font-semibold text-gray-700">
                  {new Date(note?.date)
                    .toJSON()
                    .slice(0, 10)
                    .replaceAll("-", ".")}
                </div>
              </div>
            </Link>
            <div className="flex flex-row gap-2">
              <Link to={`/editnote/${note?.id}`}>
                <MdCreate />
              </Link>
              <div
                onClick={() => handleDeleteNote(note.id)}
                className="cursor-pointer"
              >
                <FaRegTrashAlt />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center min-w-full max-w-full mt-10 text-2xl font-bold">
          <h1>Theres nothing here yet</h1>
        </div>
      )}
    </Suspense>
  );
}

const mapStateToProps = (state) => {
  const notesFromState = state.notes.data;
  const notesToReturn = notesFromState.filter(
    (note) => note.userId === state.user.data.id
  );

  return {
    notes: notesToReturn,
  };
};

export default connect(mapStateToProps)(Notes);
