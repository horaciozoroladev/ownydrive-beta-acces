/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */

import { useNavigate, useParams } from "react-router-dom";
import { getAlbumsById, getPhotosByAlbumId } from "../services/albums.service";
import { useEffect, useState } from "react";

import { Galleria } from "primereact/galleria";
import { Card } from "primereact/card";

/* eslint-disable react/prop-types */
export const AlbumAction = ({ action }) => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [title, setTitle] = useState("New Album");
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (id === "new") {
      setTitle("New Album");
      setPhotos([]);
    } else {
      let _id = Number(id);
      getAlbumsById(_id).then((data) => {
        setTitle(data.title);
      });
      getPhotosByAlbumId(_id).then((data) => {
        setPhotos(data);
      });
    }
  }, [id]);

  const itemTemplate = (item) => {
    return <img src={item.url} alt={item.title} style={{ width: "100%" }} />;
  };

  const thumbnailTemplate = (item) => {
    return <img src={item.thumbnailUrl} alt={item.title} />;
  };

  const responsiveOptions = [
    {
      breakpoint: "991px",
      numVisible: 4,
    },
    {
      breakpoint: "767px",
      numVisible: 3,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
    },
  ];

  return (
    <>
      <div className="p-4 m-4 pb-0 mb-0">
        <h2>
          <div
            className="cursor-pointer"
            onClick={() => {
              navigate("/albums");
            }}
          >
            <i className="pi pi-fw pi-images text-xl"></i>
            My Albums /
          </div>
          <i className="pi pi-fw pi-images text-xl"></i>
          {title}
        </h2>
      </div>
      <div className="grid p-4 m-4">
        {photos.length == 0 ? (
          <Card className="bg-yellow-100">
            <h4>
              😥 Sorry, We are working on this section... so that you can upload your photos, at the moment
              you can only see the ones synchronized to your email
            </h4>
          </Card>
        ) : (
          <Galleria
            value={photos}
            responsiveOptions={responsiveOptions}
            numVisible={5}
            style={{ maxWidth: "640px" }}
            item={itemTemplate}
            thumbnail={thumbnailTemplate}
          />
        )}
      </div>
    </>
  );
};
