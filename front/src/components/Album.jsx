import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const Album = ({ _albums, typeCol }) => {
  const navigate = useNavigate();
  let albums = [..._albums].slice(0, 9);
  if (typeCol == "cols") {
    albums = [..._albums];
  }

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
          onClick={() => navigate("/albums/new")}
        ></Button>
        {/* <p>Create your first album!</p> */}
      </Card>
    );
  } else {
    return albums.map((n, i) => (
      <div
        key={i}
        className={typeCol == "cols" ? "col-12 md:col-4 lg:col-3" : "col-12"}
      >
        <Card key={i} className="m-2">
          <div className="flex justify-content-end ">
            <i
              className="cursor-pointer pi pi-fw pi-arrow-up-right text-xl text-blue-500"
              onClick={() => navigate("/albums/" + n.id)}
            ></i>
          </div>
          <h3>Album title:</h3>
          <h4>{n.title}</h4>
        </Card>
      </div>
    ));
  }
};
