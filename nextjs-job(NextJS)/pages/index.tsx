import Button from "@mui/joy/Button";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <Button
        variant="solid"
        sx={{
          mt: 10,
          mr: 1,
        }}
        onClick={() => router.push("/auth/sign-in")}
      >
        sign in page
      </Button>

      <Button
        variant="solid"
        sx={{
          mt: 10,
          mr: 1,
        }}
        onClick={() => router.push("/auth/sign-up")}
      >
        sign up page
      </Button>
    </div>
  );
};

export default Home;
