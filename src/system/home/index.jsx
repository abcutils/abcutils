import Header from "./components/header";
import Footer from "./components/footer";
import Main from "./components/main";
import { Baffle } from "$src/components";

export default function () {
  return (
    <>
      <Baffle></Baffle>
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </>
  );
}
