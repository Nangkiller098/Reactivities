import { Container } from "semantic-ui-react";
import NavBar from "./Navbar";
import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";

//create value
function App() {
  return (
    <div>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Outlet />
      </Container>
    </div>
  );
}

export default observer(App);
