// import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { CONFIG_FRONT } from "../config";

import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
// import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { getToken, validateToken } from "../services/auth.service";

export const Home = () => {
  const [notes, setNotes] = useState([]);
  const [albums, setAbums] = useState([]);

  useEffect(() => {
    validateToken().then((v) => {
      if (v) {
        getNotes();
        getAlbums();
      }
    });
  }, []);

  // validateToken().then((v) => {
  //   getNotes().then();
  //   getAlbums().then();
  // });

  const getNotes = async () => {
    const response = await axios.get(`${CONFIG_FRONT.API_URL}/api/todos`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    setNotes(response.data);
  };

  const getAlbums = async () => {
    const response = await axios.get(`${CONFIG_FRONT.API_URL}/api/albums`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    setAbums(response.data);
  };

  return (
    <div className="grid p-4 m-4">
      <div className="col-12 md:col-6 lg:col-6">
        <h2>
          <i className="pi pi-fw pi-file text-xl"></i>
          My Last Tasks
        </h2>
        {<Note _notes={notes} />}
      </div>
      <div className="col-12 md:col-6 lg:col-6">
        <h2>
          <i className="pi pi-fw pi-images text-xl"></i>
          My Last Albums
        </h2>
        {<Album _albums={albums} />}
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
export const Note = ({ _notes }) => {
  console.log(_notes);
  let notes = [..._notes].slice(0, 9);

  if (notes.length == 0) {
    return (
      <Card className="text-center">
        <p>Nothing wrote yet 😔</p>
        <Button
          text
          raised
          severity="success"
          icon="pi pi-plus"
          label="Add your first note!"
        ></Button>
      </Card>
    );
  } else {
    console.log(notes);
    return notes.map((n, i) => (
      <Card key={i} className="mt-2">
        <div className="flex justify-content-end ">
          <i className="cursor-pointer pi pi-fw pi-pencil text-xl text-blue-500"></i>
        </div>
        <h5 className={n.completed ? "line-through" : ""}>{n.title}</h5>
        {n.completed ? (
          <Tag severity="success" value="Done"></Tag>
        ) : (
          <Tag severity="warning" value="Pending"></Tag>
        )}
      </Card>
    ));
  }
};
// eslint-disable-next-line react/prop-types
export const Album = ({ _albums }) => {
  const albums = [..._albums].slice(0, 9);

  if (albums.length == 0) {
    return (
      <Card className="text-center">
        <p>No albums to show 😔</p>
        <Button
          text
          raised
          severity="success"
          icon="pi pi-plus"
          label="Create your first album!"
        ></Button>
        {/* <p>Create your first album!</p> */}
      </Card>
    );
  } else {
    return albums.map((n, i) => (
      <Card key={i} className="mt-2">
        <div className="flex justify-content-end ">
          <i className="pi pi-fw pi-arrow-up-right text-xl text-blue-500"></i>
        </div>
        <h3>Album title:</h3>
        <h4>{n.title}</h4>
      </Card>
    ));
  }
};

export default Home;
