import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import TopBar from "./TopBar";
import "./Home.css";
import FinishPage from "./FinishPage";
import Reports from "./Reports";
import RegisterForm from "./RegisterForm";

export default function Home() {
  const [finish, setFinish] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    setUserInfo(user);

    setTimeout(() => {
      if (user.email === "admin@admin.com") {
        setAdmin(true);
      }
    });
  }, []);

  if (admin) {
    return (
      <div>
        <TopBar setShowReport={setShowReport} userInfo={userInfo} />
        <Reports />
      </div>
    );
  }

  return (
    <div>
      <TopBar setShowReport={setShowReport} userInfo={userInfo} />
      {showReport ? (
        <Reports />
      ) : !finish ? (
        <RegisterForm setFinish={setFinish} userInfo={userInfo} />
      ) : (
        <FinishPage />
      )}
    </div>
  );
}
