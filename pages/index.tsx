import type { NextPage } from "next";
import Head from "next/head";
import Tasks from "../components/Tasks";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Task manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Tasks />
      </main>
    </div>
  );
};

export default Home;
