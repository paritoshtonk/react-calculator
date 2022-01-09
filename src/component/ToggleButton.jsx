import React from "react";

const ToggleButton = ({
  title = "untitled",
  options = [1, 2, 3],
  onSelectionChange = console.log,
}) => {
  const [selectedOption, setSelectedOption] = React.useState(options[0]);
  React.useEffect(() => {
    onSelectionChange(selectedOption);
  }, []);
  return (
    <div className="ToggleButton">
      <div className="ToggleButton-title">{title}</div>
      <div className="ToggleButton-label">
        {options.map((option) => (
          <span key={option}>{option}</span>
        ))}
      </div>
      <div className="ToggleButton-toggles">
        {options.map((option) => (
          <input
            key={option}
            type="radio"
            id={title + option}
            name="toggle"
            value={option}
            readOnly
            checked={selectedOption === option}
            onClick={() => {
              setSelectedOption(option);
              onSelectionChange(option);
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default ToggleButton;
