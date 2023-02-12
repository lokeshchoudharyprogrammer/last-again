import React from "react";

import { AppContext } from "../Components/Context";
import { useContext } from "react";
const Home = () => {
  const { login, Auth ,token } = useContext(AppContext);
  console.log(token)
  console.log(Auth)
  return <div style={{marginTop:"50px"}}> {<b>Token :</b>}  {token}</div>;
};
export default Home;
 