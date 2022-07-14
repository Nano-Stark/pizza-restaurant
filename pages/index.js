import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Add from "../components/Add";
import AddButton from "../components/AddButton";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";
// import dbConnect from "../utils/mongo";

export default function Home({ pizzaList, admin }) {
  const [close, setClose] = useState(true);
  const [pizza, setPizza] = useState(pizzaList);
  // const pizzaList = [
  //   {
  //     title: "pizza3",
  //     img: "/img/pizza.png",
  //     desc: "desc3",
  //     price: [12, 13, 14],
  //     extraOption: [
  //       {
  //         text: "Pepperoni Sauce",
  //         price: 9,
  //       },
  //     ],
  //   },
  // ];
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("http://localhost:3000/api/products");
      setPizza(res.data);
    }
    fetchData();
  }, [close]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Resturant</title>
      </Head>
      <Featured />
      {admin && <AddButton setClose={setClose} />}
      <PizzaList pizzaList={pizza} />
      {!close && <Add setClose={setClose} />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  // await dbConnect();
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }
  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      pizzaList: res.data,
      admin,
    },
  };
};
