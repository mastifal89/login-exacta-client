import React, { useState, useEffect } from "react";
import { Menu } from "semantic-ui-react";
import firebase from "firebase/app";
import "./TopBar.css";

export default function TopBar(props) {
  require("firebase/auth");

  const { userInfo, setShowReport } = props;

  return (
    <div>
      <Menu className="topBar" inverted>
        <Menu.Menu position="right">
          {userInfo?.email === "admin@admin.com" ? (
            <Menu.Item onClick={() => setShowReport(true)}>
              Ver informes
            </Menu.Item>
          ) : null}
          <Menu.Item>Bienvenido {userInfo?.displayName}</Menu.Item>
          <Menu.Item name="logout" onClick={logout} />
        </Menu.Menu>
      </Menu>
    </div>
  );
}

const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(function () {})
    .catch(function (error) {});
};
