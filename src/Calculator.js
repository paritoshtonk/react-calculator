import React from "react";
import './App.css';
import ToggleButton from './component/ToggleButton';
import CalcButton from './component/CalcButton';

function Calculator() {

  const keypadButtons = [
    { action: "number", value: 7 },
    { action: "number", value: 8 },
    { action: "number", value: 9 },
    { action: "delete", value: "D" },
    { action: "number", value: 4 },
    { action: "number", value: 5 },
    { action: "number", value: 6 },
    { action: "operator", value: "+" },
    { action: "number", value: 1 },
    { action: "number", value: 2 },
    { action: "number", value: 3 },
    { action: "operator", value: "-" },
    { action: "number", value: "." },
    { action: "number", value: 0 },
    { action: "operator", value: "/" },
    { action: "operator", value: "x" },
    { action: "reset", value: "RESET" },
    { action: "equal", value: "=" }
  ];
  const emptyState = {
    operand1: null,
    operand2: null,
    operator: null,
    value: "0",
    showResult: false,
    equated: false
  };
  const [state, setState] = React.useState(emptyState);
  const evaluate = (operand1, operand2, operator) => {
    if (operand1 === null)
      operand1 = 0;
    if (operand2 === null)
      operand2 = 0;
    switch (operator) {
      case "+":
        return parseFloat(operand1) + parseFloat(operand2);
      case "-":
        return parseFloat(operand1) - parseFloat(operand2);
      case "x":
        return parseFloat(operand1) * parseFloat(operand2);
      case "/":
        if (parseFloat(operand2) === 0)
          return 0;
        return parseFloat(operand1) / parseFloat(operand2);
    }
  }
  const onCalcButtonClick = (action, value) => {
    switch (action) {
      case "number":
        if (state.value === "." && state.value.indexOf("."))
          break;
        let newState = state;
        if (state.equated) {
          newState = emptyState;
        }
        setState({
          ...newState,
          value: state.value === "0" ? value + "" : state.value + value,
          showResult: false,
          equated: false
        })
        break;
      case "operator":
        if (parseFloat(state.value) == NaN)
          break;
        if (state.operand1 === null) {
          setState({
            ...state,
            operand1: parseFloat(state.value),
            operator: value,
            value: "0",
            showResult: true
          })
        } else {
          setState({
            operand1: evaluate(state.operand1, state.value, state.operator),
            operand2: parseFloat(state.value),
            operator: value,
            value: "0",
            showResult: true
          })
        }
        break;
      case "equal":
        if (!state.operand1)
          break;
        let operand2 = state.value;
        if (state.value == "0" && state.showResult)
          operand2 = state.operand2;
        setState({
          ...state,
          operand1: evaluate(state.operand1, operand2, state.operator),
          operand2: parseFloat(operand2),
          value: "0",
          showResult: true,
          equated: true
        })
        break;
      case "delete":
        setState({
          ...state,
          showResult: false,
          value: state.value.length === 1 ? "0" : state.value.substring(0, state.value.length - 1)
        })
        break;
      case "reset":
        setState(emptyState);
        break;
    }
  }
  return (
    <div className="Calculator">
      <div className="Calculator-Container">
        <header>
          <h1 className="title">calc</h1>
          <ToggleButton title="THEME" />
        </header>
        <div className="ScrollableDiv">{state.showResult ? state.operand1 : state.value}</div>
        <div className='keypad'>
          {keypadButtons.map(button => <CalcButton key={button.value} action={button.action} value={button.value} onClick={onCalcButtonClick} />)}
        </div>
      </div>
    </div>
  );
}

export default Calculator;
