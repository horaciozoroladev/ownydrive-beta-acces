import { Card } from "primereact/card";

export const Profile = () => {
  return (
    <>
      <div className="p-4 m-4 pb-0 mb-0">
        <h2>
          <i className="pi pi-fw pi-file text-xl"></i>
          My Profile
        </h2>
      </div>

      <div className="grid p-4 m-4">
        <Card className="bg-yellow-100">
          <h4>
            😥 Sorry, We are working on this section... so that you can view and modify your account info
          </h4>
        </Card>
      </div>
    </>
  );
};
