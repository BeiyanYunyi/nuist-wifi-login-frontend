import React, { useEffect } from "react";
import Login from "./components/Login.js";
import getLoginStatus from "./controllers/getLoginStatus";
import InfoPanel from "./components/InfoPanel";
import {
  Container,
  Card,
  CardContent,
  Grid,
} from "@material-ui/core";
import StatusTab from "./components/StatusTab";

const App = () => {
  const [status, setstatus] = React.useState({ info: "connecting" });
  useEffect(() => {
    getLoginStatus()
      .then((stat) => {
        setstatus(stat.data);
      })
      .catch((err) => console.error(`错误${err}`));
  }, []);

  return (
    <Container style={{ maxWidth: "100%" }}>
      <Grid container spacing={1} style={{ marginTop: 5 }}>
        <Login status={status} setstatus={setstatus} />
        <Card style={{ marginTop: 50, width: "100%", height: 312 }}>
          <CardContent>
            <StatusTab status={status} setstatus={setstatus} />
            <InfoPanel status={status} setstatus={setstatus} />
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
};

export default App;
