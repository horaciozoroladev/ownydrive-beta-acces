import { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Message } from "primereact/message";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Avatar } from "primereact/avatar";
import { getToken, login } from "../services/auth.service";

export const SignIn = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const toast = useRef(null);

  useEffect(() => {
    if (getToken() !== "") {
      navigate("/home");
    }
  });

  const handleLogin = async (e) => {
    if (username.length != 0 && email.length != 0) {
      login({ username, email })
        .then((res) => {
          localStorage.session = JSON.stringify(res.data);
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Login successfully",
            life: 3000,
          });
          navigate("/home");
        })
        .catch((err) => {
          const data = err.response.data;
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: data.message,
            life: 3000,
          });
        });
    } else {
      toast.current.show({
        severity: "info",
        summary: "Info",
        detail: "Please fill the inputs",
        life: 3000,
      });
    }
    e.preventDefault();
  };

  const cardClassName = classNames(
    "pt-4",
    "mt-4",
    "p-d-flex",
    "p-jc-center",
    "p-ai-center",
    "p-flex-column",
    "p-m-4",
    {
      "p-p-4": !username && !email,
      "p-p-2": username || email,
    }
  );

  return (
    <>
      <div className={cardClassName} style={{ height: "100vh" }}>
        <Toast ref={toast} />
        <div className="flex justify-content-center flex-wrap card-container yellow-container">
          <Card
            title="OwnyDrive"
            subTitle="(beta)"
            className="text-center"
            style={{ width: "100%", maxWidth: "400px" }}
          >
            <Avatar
              className="cursor-pointer"
              image="/imgs/ownydrive.jpg"
              size="xlarge"
              shape="circle"
            ></Avatar>
            <h2>Sign In</h2>
            <form>
              <div className="p-field">
                <InputText
                  placeholder="Username"
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="p-field">
                <InputText
                  placeholder="Email"
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button className="mt-4" icon="pi pi-arrow-right" onClick={handleLogin} />
              <Divider />
              <Message
                severity="info"
                text="Sign in with the credentials given by your OwnyDrive Provider."
              />
            </form>
          </Card>
        </div>
      </div>
    </>
  );
};
