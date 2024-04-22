import React from "react";
import PropTypes from 'prop-types';

const StatisticCards = ({ title, student, icon,amount }) => {
  return (
    <div className="card-item bg-green-700 flex gap-3 p-8 rounded-3xl my-10 ">
      <div className="flex gap-x-4">
        <div className="rounded-full bg-white size-9 w-16 h-16 p-3 flex items-center">
          {icon}
        </div>
        <div className="text-white flex-col">
          <p className="text-lg font-medium text-gray-200">{title} </p>
          <p className="text-xl font-bold text-gray-200">{student || amount}</p>
        </div>
      </div>
    </div>
  );
};

export default StatisticCards;
StatisticCards.propTypes = {
  title: PropTypes.string,
  student: PropTypes.string,
  icon: PropTypes.element,
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
