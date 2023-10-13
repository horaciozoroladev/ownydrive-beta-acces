import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { Menubar } from "primereact/menubar";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../services/auth.service";

export const Navigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // if (getToken() == "") {
    //   navigate("/");
    // }
  });

  const items = [
    {
      label: "Notes",
      icon: "pi pi-fw pi-file",
      items: [
        {
          label: "New",
          icon: "pi pi-fw pi-plus",
        },
        {
          label: "View my notes",
          icon: "pi pi-fw pi-folder-open",
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
        },
        {
          label: "View my albums",
          icon: "pi pi-fw pi-images",
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
        // onClick={(event) => menuRight.current.toggle(event)}
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

  const profile = (e) => {
    e.preventDefault();
  };

  // handleLogout
  const handleLogout = (e) => {
    localStorage.clear();
    navigate("/");
    e.preventDefault();
  };

  return [
    <>
      {getToken() == "" ? (
        <div></div>
      ) : (
        <div className="card">
          <Menubar model={items} start={start} end={end} />
          <Menu
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
