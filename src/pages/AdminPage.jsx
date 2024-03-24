import { Outlet } from "react-router-dom";
import NavBar from "../components/Admin/NavBar/NavBar";

const AdminPage = () => {
  return (
    <div>
      <NavBar />

      <main className="ml-[10rem]">
        <Outlet />
      </main>
    </div>
  );
};
export default AdminPage;
