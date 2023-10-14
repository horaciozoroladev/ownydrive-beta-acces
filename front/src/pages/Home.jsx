// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { validateToken } from "../services/auth.service";
import { Note } from "../components/Note";
import { Album } from "../components/Album";
import { getTasks } from "../services/tasks.service";
import { getAlbums } from "../services/albums.service";

export const Home = () => {
  const [notes, setNotes] = useState([]);
  const [albums, setAbums] = useState([]);

  useEffect(() => {
    validateToken().then((v) => {
      if (v) {
        setTimeout(() => {
          getTasks().then((data) => {
            setNotes(data);
          });
          getAlbums().then((data) => {
            setAbums(data);
          });
        }, 1500);
      }
    });
  }, []);

  return (
    <div className="grid p-4 m-4">
      <div className="col-12 md:col-6 lg:col-6">
        <h2>
          <i className="pi pi-fw pi-file text-xl"></i>
          My Last 10 Tasks
        </h2>
        {<Note _notes={notes} typeCol={"col"} />}
      </div>
      <div className="col-12 md:col-6 lg:col-6">
        <h2>
          <i className="pi pi-fw pi-images text-xl"></i>
          My Last 10 Albums
        </h2>
        {<Album _albums={albums} typeCol={"col"} />}
      </div>
    </div>
  );
};

export default Home;
