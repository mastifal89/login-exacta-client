import React, { useState, useEffect } from "react";
import { Grid, Header, Image } from "semantic-ui-react";
import Login from "./Auth/Login";
import Register from "./Auth/Register";

export default function Landing() {
  const [login, setLogin] = useState(true);

  return (
    <div>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header className="header" as="h2" color="blue" textAlign="center">
            <Image className="imageHeader" src="/images/pngwing.com.png" />
            EXACTA EDUCATION
          </Header>
          {login ? (
            <Login setLogin={setLogin} />
          ) : (
            <Register setLogin={setLogin} />
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
}
