import Footer from "./Footer";
import NavBar from "./Navbar";
import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <NavBar></NavBar>
      <div>{children}</div>
      <Footer></Footer>
    </>
  );
}
