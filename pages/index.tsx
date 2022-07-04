import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import NetworkSim from "../components/NetworkSim/NetworkSim";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <NetworkSim></NetworkSim>
    </>
  );
};

export default Home;
