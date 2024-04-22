import React from "react";
import { PiStudentBold } from "react-icons/pi";
import { studentList } from "../../../mockData/quiz/studentList";

const QuizDetail = () => {
  const topStudents = studentList.sort((a, b) => b.score - a.score).slice(0, 3);
  const goldCup = "../../../.././public/gold.png";
  const silverCup = "../../../.././public/gumus-cup-1.png";
  const bronzeCup = "../../../.././public/bronz-1.png";
  return (
    <div className="mt-[70px] w-[90%] h-full mx-auto flex flex-row">
      {/* sol ekran */}
      <div
        className="flex flex-col w-1/3 overflow-y-auto border-r-2 "
        style={{ maxHeight: "calc(100vh - 70px)" }}
      >
        <h2 className="uppercase font-extrabold w-full my-5 text-center sticky top-0 bg-white py-3 z-10">
          Student List
        </h2>
        {studentList.map((student) => (
          <div
            key={student.id}
            className="flex flex-row place-items-center justify-between px-4 mr-3 my-2 gap-1"
          >
            <div
              className="border rounded-full size-12 grid place-items-center"
              style={{ boxShadow: "0 8px 6px rgba(0, 0, 0, 0.2)" }}
            >
              <PiStudentBold size={30} />
            </div>
            <span>{student.studentName} </span>
            <span
              className="border w-14 h-9 grid place-items-center font-extrabold rounded-2xl"
              style={{ boxShadow: "0 8px 6px rgba(0, 0, 0, 0.5)" }}
            >
              {student.score}
            </span>
          </div>
        ))}
      </div>
      {/* sağ ekran */}
      <div className="w-2/3 h-screen flex flex-col gap-y-8 pl-5">
        {/* üst ekran foto */}
        <div className="w-full h-1/3">
          <img
            className="w-full h-full object-cover rounded-xl"
            src="../../../../public/students.webp"
            alt=""
          />
        </div>
        {/* quiz sayısal detaylar alanı  */}
        <div className="w-full h-24 flex">
          <span className="w-1/4 flex flex-col gap-y-2 h-auto border-r-2 size-14 text-center content-center">
            <p className="text-xs">
              Quiz <br /> Takers
            </p>
            <b className="text-4xl">50</b>
          </span>
          <span className="w-1/4 flex flex-col gap-y-2 h-auto border-r-2 size-14 text-center content-center">
            <p className="text-xs">
              Success <br /> Percentage
            </p>
            <b className="text-4xl">%60</b>
          </span>
          <span className="w-1/4 flex flex-col gap-y-2 h-auto border-r-2 size-14 text-center content-center">
            <p className="text-xs">
              Successful <br /> Student
            </p>
            <b className="text-4xl">30</b>
          </span>
          <span className="w-1/4 flex flex-col gap-y-2 h-auto size-14 text-center content-center">
            <p className="text-xs">
              Unsuccessful <br /> Students
            </p>
            <b className="text-4xl">20</b>
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <hr style={{ width: "80%", borderTop: "1px solid #C0C0C0" }} />
        </div>
        {/* en iyi derece yapan öğrenci */}
        <div className="w-full h-auto gap-x-4 flex">
          {topStudents.map((student, index) => (
            <span
              key={student.id}
              className="w-1/3 h-16 rounded-2xl mt-6 border flex items-center"
              style={{ boxShadow: "0 8px 6px rgba(0, 0, 0, 0.2)" }}
            >
              <i className="rounded-full size-14 grid place-items-center mr-6">
                {index === 0 && <img src={goldCup} alt="Gold Cup" />}
                {index === 1 && <img src={silverCup} alt="Silver Cup" />}
                {index === 2 && <img src={bronzeCup} alt="Bronze Cup" />}
              </i>
              <b className="flex text-center">
                {student.studentName} <br /> {student.score}
              </b>
            </span>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <hr style={{ width: "80%", borderTop: "1px solid #C0C0C0" }} />
        </div>
      </div>
    </div>
  );
};

export default QuizDetail;
