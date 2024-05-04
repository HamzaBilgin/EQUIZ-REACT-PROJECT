import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const InstructorInfo = () => {
  const params = useParams();
  console.log(params.instructorId);
  useEffect(() => {
    // console.log(params.intructorId);
  }, []);
  return (
    <div className="mt-[70px] max-w-screen-xl w-full m-auto">
      InstructorInfo
    </div>
  );
};

export default InstructorInfo;
