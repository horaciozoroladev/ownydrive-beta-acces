import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const Note = ({ _notes, typeCol }) => {
  const navigate = useNavigate();
  let notes = [..._notes].slice(0, 9);

  if (typeCol == "cols") {
    notes = [..._notes];
  }

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
          onClick={() => navigate("/notes/new")}
        ></Button>
      </Card>
    );
  } else {
    return notes.map((n, i) => (
      <div
        key={i}
        className={typeCol == "cols" ? "col-12 md:col-4 lg:col-3" : "col-12"}
      >
        <Card key={i} className="mt-2">
          <div className="flex justify-content-end ">
            <i
              className="cursor-pointer pi pi-fw pi-pencil text-xl text-blue-500"
              onClick={() => navigate("/notes/" + n.id)}
            ></i>
          </div>
          <h4 className={n.completed ? "line-through" : ""}>{n.title}</h4>
          {n.completed ? (
            <Tag severity="success" value="Done"></Tag>
          ) : (
            <Tag severity="warning" value="Pending"></Tag>
          )}
        </Card>
      </div>
    ));
  }
};
