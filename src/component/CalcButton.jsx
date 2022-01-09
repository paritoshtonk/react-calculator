import React from "react";

const CalcButton = ({ action, value, onClick }) => {
  return (
    <div
      className="CalcButton"
      data-type={action}
      onClick={(e) => onClick(action, value)}
    >
      {value}
    </div>
  );
};
export default CalcButton;
