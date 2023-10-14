import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Message } from "primereact/message";
import { useNavigate } from "react-router-dom";
import { validateToken } from "../services/auth.service";
import { classNames } from "primereact/utils";

export const Page404 = () => {
  const navigate = useNavigate();
  const cardClassName = classNames(
    "bg-signin",
    "pt-4",
    "p-d-flex",
    "p-jc-center",
    "p-ai-center",
    "p-flex-column",
    "p-m-4"
  );
  return (
    <div className={cardClassName} style={{ height: "100vh" }}>
      <div className="flex justify-content-center flex-wrap card-container yellow-container">
        <Card
          className="p-text-center p-card-shadow"
          style={{ width: "300px" }}
        >
          <Message severity="error" text="404" />
          <h2>Oops! Page Not Found</h2>
          <p>
            The page you are looking for might have been removed or does not
            exist.
          </p>
          <Button
            label="Go Back to Home"
            icon="pi pi-home"
            onClick={() => {
              validateToken()
                .then((v) => {
                  if (v) navigate("/home");
                })
                .catch((err) => {
                  if (err) navigate("/");
                });
            }}
          />
        </Card>
      </div>
    </div>
  );
};