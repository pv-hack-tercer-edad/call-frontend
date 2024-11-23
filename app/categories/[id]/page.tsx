"use client";

import RecordButton from "@/app/components/Record";

const Home = async ({ params }: any) => {
  console.log(params["id"]);
  return <RecordButton />;
};
export default Home;
