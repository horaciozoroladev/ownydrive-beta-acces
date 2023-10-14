import { useEffect, useState } from "react";
import { getTasks } from "../services/tasks.service";
import { Note } from "../components/Note";

export const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getTasks().then((data) => {
      setNotes(data);
    });
  }, []);

  return (
    <>
      <div className="p-4 m-4 pb-0 mb-0">
        <h2>
          <i className="pi pi-fw pi-file text-xl"></i>
          My Tasks
        </h2>
      </div>

      <div className="grid p-4 m-4">
        {<Note _notes={notes} typeCol={"cols"} />}
      </div>
    </>
  );
};
