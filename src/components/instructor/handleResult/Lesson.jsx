import React from "react";
import StatisticCards from "./StatisticCards";
import { useParams } from "react-router-dom";
import ResultTable from "./ResultTable";
import { GiTrophyCup } from "react-icons/gi";
import { PiStudentBold } from "react-icons/pi";
import { AiOutlinePercentage } from "react-icons/ai";

const Lesson = () => {
  const { categoryName } = useParams();

  return (
    <div className="mt-[70px] w-full flex flex-col wrap gap-4 justify-center items-center mx-auto">
      <h1 className=" mt-5 uppercase font-bold ">lesson {categoryName} result</h1>
      <div className="flex flex-wrap gap-5 justify-center items-center">
        <StatisticCards
          title="En İyi Derece"
          student="Ahmet Yılmaz"
          icon={<GiTrophyCup size={50} />}
          amount="95"
        />
        <StatisticCards
          title="Sınıf Ortalaması"
          amount="85"
          icon={<AiOutlinePercentage size={50} />}
        />
        <StatisticCards
          title="Katılımcı Sayısı"
          amount="30"
          icon={<PiStudentBold size={50} />}
        />
      </div>
      <div className="w-full px-24 ">
        <ResultTable />
      </div>
    </div>
  );
};

export default Lesson;
