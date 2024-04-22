import React from "react";
import { lessons } from "../../../mockData/result/lessons";
import { Link } from "react-router-dom";

const ResultLessons = () => {
  const formatCategoryNameForURL = (categoryName) => {
    return categoryName.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <div className="mt-[6px] w-full flex flex-row gap-6 flex-wrap justify-center items-center">
      {lessons.map((lesson) => (
        <div
          key={lesson.id}
          className=" bg-green-700 w-[300px] flex gap-3 p-8 rounded-3xl my-10"
        >
          <div className="rounded-full bg-white w-24 h-24 flex justify-center items-center">
            {lesson.image ? (
              <img
                src={lesson.image}
                alt={lesson.category_name}
                className="w-full h-full object-cover rounded-full"
              />
            ) : null}
          </div>
          <div className="text-white flex items-center text-lg font-medium">
            <Link
              to={`/instructor/lesson/${formatCategoryNameForURL(
                lesson.category_name
              )} `}
              relative="path"
            >
              {lesson.category_name}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultLessons;
