import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LoginContextProvider } from "../contexts/LoginProvider";
import { ThemeProvider } from "../contexts/ThemeProvider";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <>
      <ToastContainer />
      <LoginContextProvider>
        <ThemeProvider>
          <div
            className="flex h-full min-h-screen flex-col items-center justify-start gap-24 bg-neutral-100
            text-neutral-900
            transition-colors duration-300 
            selection:bg-neutral-300 dark:bg-neutral-900 dark:text-neutral-100 dark:selection:bg-neutral-600"
          >
            <Navbar />
            <main className="flex h-full min-h-full max-w-6xl  flex-col items-start justify-start gap-24 px-5">
              <Outlet />
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </LoginContextProvider>
    </>
  );
};
export default Layout;
