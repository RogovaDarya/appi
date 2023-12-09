import NoteLayout from "../components/NoteLayout";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Note } from "../utils/validation";
import { useSelector } from "react-redux";
import { selectUserId } from "../redux/user/selectors";

export default function CreateNote() {
  let userId = useSelector(selectUserId);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const getRandomString = () => Math.random().toString(36).substring(2);

  const handleCreateNote = async () => {
    try {
      Note.parse({name});

      const note = {
        id: Date.now() + getRandomString(),
        userId,
        name: name.trim(),
        description,
        date: Date.now(),
      };

      await fetch(`http://localhost:5001/notes`, {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
      navigate("/notes");
    } catch (e) {
      if (e instanceof z.ZodError) setError(e.format().name._errors[0]);
    }
  };

  return (
    <NoteLayout
      header="Create new note"
      buttonName={"Create"}
      onButtonClick={handleCreateNote}
      name={name}
      setName={setName}
      description={description}
      setDescription={setDescription}
      error={error}
    />
  );
}
