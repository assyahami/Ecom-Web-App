import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import HomePage from "../components/home/index";
import Header from "../components/home/Sidebar";
import Subnav from "../components/home/subnav";

import axios from "axios";

import baseUrl from "../utils/baseUrl";

function Home({ user, productsData, errorLoading }) {
  console.log("user detils passed : ", user);
  console.log("products : ", productsData);
  return (
    <main>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.icon" />
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <header>
        <nav className="navbars">
          <Header />
          <Subnav />
        </nav>
      </header>
      <HomePage />
    </main>
  );
}

// export const getSerevrSideProps = async (ctx) => {
Home.getInitialProps = async (ctx) => {
  try {
    const res = await axios.get(`${baseUrl}/api/products`);

    return { props: { productsData: res.data } };
  } catch (error) {
    return { props: { errorLoading: true } };
  }
};

export default Home;
