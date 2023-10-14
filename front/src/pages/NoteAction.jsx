/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { InputSwitch } from "primereact/inputswitch";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import {
  createTask,
  getTasksById,
  updateTaskById,
} from "../services/tasks.service";
import { Toast } from "primereact/toast";

/* eslint-disable react/prop-types */
export const NoteAction = () => {
  const toast = useRef(null);
  const navigate = useNavigate();
  let { id } = useParams();
  let location = useLocation();
  const [title, setTitle] = useState("New Task");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (id == "new") {
      setTitle("New Task");
      setCompleted(false);
    } else {
      let _id = Number(id);
      getTasksById(_id).then((data) => {
        setTitle(data.title);
        setCompleted(data.completed);
      });
    }
  }, [id]);

  const save = () => {
    createTask({
      title: title,
      completed: false,
    }).then((data) => {
      toast.current.show({
        severity: "success",
        summary: "Created",
        detail: `Created: ${data.title}, as ${data.completed ? 'Done' : 'Pending'}`,
        life: 3000,
      });
    });
  };

  const update = () => {
    updateTaskById(id, {
      title: title,
      completed: completed,
    }).then((data) => {
      toast.current.show({
        severity: "success",
        summary: "Updated",
        detail: `Updated: ${data.title}, as ${data.completed ? 'Done' : 'Pending'}`,
        life: 3000,
      });
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="p-4 m-4 pb-0 mb-0">
        <h2>
          <div
            className="cursor-pointer"
            onClick={() => {
              navigate("/notes");
            }}
          >
            <i className="pi pi-fw pi-file text-xl"></i>
            My Tasks /
          </div>
          <i className="pi pi-fw pi-file text-xl"></i>
          {title}
        </h2>
      </div>
      <div className="grid p-4 m-4">
        <div className="col-12 md:col-4 lg:col-4">
          <p className="flex align-content-center">
            Done
            <InputSwitch
              className="ml-2"
              checked={completed}
              onChange={(e) => {
                e.preventDefault();
                setCompleted(e.value);
              }}
            />
          </p>
        </div>
        <div className="col-12 md:col-4 lg:col-4">
          <InputTextarea
            rows={5}
            placeholder="Description"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></InputTextarea>
        </div>
        <div className="col-12 md:col-4 lg:col-4">
          {id == "new" ? (
            <Button
              icon="pi pi-plus"
              severity="success"
              onClick={() => {
                save();
              }}
            />
          ) : (
            <Button
              icon="pi pi-save"
              severity="success"
              onClick={() => {
                update();
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};
