import { useLoaderData, useNavigate } from 'react-router-dom';
import { MdCreate } from 'react-icons/md';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Suspense } from 'react';
import ErrorPage from './ErrorPage';

export default function NoteView() {
  const { note } = useLoaderData();
  const navigate = useNavigate();

  const handleDeleteNote = async () => {
    await fetch(`http://localhost:5001/notes/${note?.id}`, {
      method: 'delete',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });

    navigate('/notes');
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {Object.keys(note).length !== 0 ? (
        <div className="mx-2 flex flex-col">
          <div className="grid grid-cols-5">
            <Link to="/notes">
              <div className="bg-gray-300 max-w-min px-3 mt-2 font-semibold">
                Back
              </div>
            </Link>
            <div className="col-span-3 prose min-w-full max-w-full text-center">
              <h1>{note.name}</h1>
            </div>
            <div className="flex flex-row content-end gap-2 mt-2 ml-auto">
              <Link to={`/editnote/${note?.id}`}>
                <MdCreate />
              </Link>
              <div onClick={handleDeleteNote} className="cursor-pointer">
                <FaRegTrashAlt />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-10">
            <textarea
              placeholder="Note text"
              defaultValue={note.description}
              readOnly={true}
              className="mx-auto border border-black font-serif font-semibold px-2 min-w-1/2 max-w-1/2 h-44 text-start resize-none"
            />
          </div>
        </div>
      ) : (
        <ErrorPage />
      )}
    </Suspense>
  );
}
