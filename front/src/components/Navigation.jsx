import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { Menubar } from "primereact/menubar";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../services/auth.service";

export const Navigation = () => {
  const navigate = useNavigate();

  const items = [
    {
      label: "Tasks",
      icon: "pi pi-fw pi-file",
      items: [
        {
          label: "New",
          icon: "pi pi-fw pi-plus",
          command: () => {
            navigate("/notes/new");
          },
        },
        {
          label: "View my tasks",
          icon: "pi pi-fw pi-folder-open",
          command: () => {
            navigate("/notes");
          },
        },
      ],
    },
    {
      label: "Albums",
      icon: "pi pi-fw pi-images",
      items: [
        {
          label: "New",
          icon: "pi pi-fw pi-plus",
          command: () => {
            navigate("/albums/new");
          },
        },
        {
          label: "View my albums",
          icon: "pi pi-fw pi-images",
          command: () => {
            navigate("/albums");
          },
        },
      ],
    },
  ];
  const start = (
    <>
      <Avatar
        className="cursor-pointer"
        image="/imgs/ownydrive.jpg"
        size="xlarge"
        shape="circle"
        onClick={(e) => {
          navigate("/home");
          e.preventDefault();
        }}
      ></Avatar>
      {/* <h2>OwnyDrive</h2> */}
    </>
  );
  const end = (
    <Avatar
      className="cursor-pointer"
      image="/imgs/avatar_male.jpg"
      size="xlarge"
      shape="circle"
      onClick={(event) => menuRight.current.toggle(event)}
    ></Avatar>
  );

  const menuRight = useRef(null);
  const itemsMenuProfile = [
    {
      label: "Profile",
      icon: "pi pi-fw pi-user",
      command: () => {
        profile();
      },
    },
    { separator: true },
    {
      label: "Quit",
      icon: "pi pi-fw pi-power-off",
      command: () => {
        handleLogout();
      },
    },
  ];

  const profile = () => {
    
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return [
    <>
      {getToken() == "" ? (
        <div></div>
      ) : (
        <div className="card">
          <Menubar key={'menubar'} model={items} start={start} end={end} />
          <Menu
            key={"menu"}
            model={itemsMenuProfile}
            popup
            ref={menuRight}
            id="popup_menu_right"
            popupAlignment="right"
          />
        </div>
      )}
    </>,
  ];
};
