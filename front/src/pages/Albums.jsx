import { useEffect, useState } from "react";
import { getAlbums } from "../services/albums.service";
import { Album } from "../components/Album";

export const Albums = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    getAlbums().then((data) => {
      setAlbums(data);
    });
  }, []);

  return (
    <>
      <div className="p-4 m-4 pb-0 mb-0">
        <h2>
          <i className="pi pi-fw pi-file text-xl"></i>
          My Albums
        </h2>
      </div>

      <div className="grid p-4 m-4">
        {<Album _albums={albums} typeCol={"cols"} />}
      </div>
    </>
  );
};
