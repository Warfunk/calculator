/* eslint no-eval: 0 */
import React from "react";
import { numbs, operators } from "./arrays";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: "",
      operator: "",
      total: "0",
      operation: "",
    };
    this.handleClear = this.handleClear.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
    this.handleNum = this.handleNum.bind(this);
    this.handleOp = this.handleOp.bind(this);
  }
  handleNum(number) {
    if (
      (this.state.total.includes(".") && number === ".") ||
      this.state.total.length >= 10
    ) {
      return this.setState((state) => ({
        total: state.total,
      }));
    }
    if (
      this.state.total === "+" ||
      (this.state.total === "-" &&
        this.state.operator.length === 0 &&
        this.state.store.length === "0") ||
      this.state.total === "*" ||
      this.state.total === "/"
    ) {
      return this.setState((state) => ({
        operator: state.total,
        total: number,
      }));
    }
    if (this.state.total === "0") {
      this.setState({
        total: number,
      });
    } else {
      this.setState((state) => ({
        total: state.total + number,
      }));
    }
  }
  handleOp(op) {
    if (
      op === "-" &&
      (this.state.total === "-" ||
        this.state.total === "+" ||
        this.state.total === "*" ||
        this.state.total === "/")
    ) {
      return this.setState((state) => ({
        operator: state.total,
        total: op,
      }));
    }
    this.setState((state) => ({
      store: state.total,
      total: op,
    }));
  }
  handleClear() {
    this.setState({
      store: "",
      operator: "",
      total: "0",
      operation: "",
    });
  }
  handleEquals() {
    if (this.state.operator === "-" && this.state.total < 0) {
      this.setState((state) => ({
        operator: "+",
        total: Math.abs(state.total).toString(),
      }));
    }
    this.setState((state) => ({
      operation: state.store + state.operator + state.total,
    }));
    this.setState((state) => ({
      store: eval(state.operation).toString(),
      operator: "",
      total: eval(state.operation).toString(),
    }));
  }
  render() {
    return (
      <div>
        <h1 id="display">{this.state.total}</h1>
        <Numbers handleNum={this.handleNum} />
        <Operators handleOp={this.handleOp} />
        <div className="eq">
          <button id="equals" className="operator" onClick={this.handleEquals}>
            =
          </button>
          <button id="clear" className="clear" onClick={this.handleClear}>
            Clear
          </button>
        </div>
      </div>
    );
  }
}
export default Calculator;

class Numbers extends React.Component {
  render() {
    return (
      <div className="numbers">
        {numbs.map((item) => (
          <button
            className="num"
            id={item.id}
            key={item.number}
            onClick={() => this.props.handleNum(item.number)}
          >
            {item.number}
          </button>
        ))}
      </div>
    );
  }
}

class Operators extends React.Component {
  render() {
    return (
      <div className="operators">
        {operators.map((item) => (
          <button
            className="num"
            id={item.id}
            key={item.op}
            onClick={() => this.props.handleOp(item.op)}
          >
            {item.op}
          </button>
        ))}
      </div>
    );
  }
}
