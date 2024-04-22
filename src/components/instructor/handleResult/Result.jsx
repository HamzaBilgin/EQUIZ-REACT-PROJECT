import React from "react";
import ResultLessons from "./ResultLessons";

const Result = () => {
  return (
    <div className="mt-[70px] w-full flex flex-col justify-center items-center">
      <h1 className="uppercase bold font-bold mt-7">genel sonuçlar</h1>
      <ResultLessons />
    </div>
  );
};

export default Result;
