"use client";

import RecordButton from "@/app/components/Record";
import { useParams } from "next/navigation";

const Home = () => {
  const params = useParams();

  return <RecordButton categoryId={params.id} />;
};
export default Home;
