/* The code is defining a React component called `App`. */

import { Container } from "semantic-ui-react";
import NavBar from "./Navbar";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import { ToastContainer } from "react-toastify";
import { useStore } from "../stores/store";
import { useEffect } from "react";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../api/common/modals/ModalContainer";

//create value
function App() {
  const location = useLocation();

  const { commonStore, userStore } = useStore();

  /* The `useEffect` hook is used to perform side effects in a React component. In this case, it is used
 to fetch user data and set the `appLoaded` flag in the `commonStore` based on the presence of a
 token in the `commonStore`. */

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  /* The code is checking if the `appLoaded` flag in the `commonStore` is `false`. If it is `false`, it
  means that the application is still loading, so it returns a `LoadingComponent` with the content
  "Loading app...". This is a way to display a loading indicator or message while the application is
  fetching data or performing other asynchronous tasks. */
  if (!commonStore.appLoaded)
    return <LoadingComponent content="Loading app..." />;
  return (
    <>
      <ModalContainer />
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container style={{ marginTop: "7em" }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default observer(App);
