import { Outlet } from "react-router-dom"
import NavBar from "../Pages/Shared/NavBar/NavBar"
import Footer from "../Pages/Shared/Footer/Footer"
import { Toaster } from "react-hot-toast";

function Root() {
  return (
    <div>
      <NavBar />
      <div className="max-w-6xl mx-auto">
        <div className="mx-2 lg:mx-0">
          <Outlet />
        </div>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}

export default Root