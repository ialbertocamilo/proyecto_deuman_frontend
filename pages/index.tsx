import { GetServerSideProps } from "next";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: "/create-company",
      permanent: false,
    },
  };
};

export default function Home() {
  return null;
}
