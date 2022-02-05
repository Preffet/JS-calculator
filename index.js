
const operators = ["AC", "/", "x", "+", "-", "="];

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const calcValues = [
    { id: "clear", value: "AC" },
    { id: "divide", value: "/" },
    { id: "multiply", value: "x" },
    { id: "seven", value: 7 },
    { id: "eight", value: 8 },
    { id: "nine", value: 9 },
    { id: "subtract", value: "-" },
    { id: "four", value: 4 },
    { id: "five", value: 5 },
    { id: "six", value: 6 },
    { id: "add", value: "+" },
    { id: "one", value: 1 },
    { id: "two", value: 2 },
    { id: "three", value: 3 },
    { id: "equals", value: "=" },
    { id: "zero", value: 0 },
    { id: "decimal", value: "." },
];

/* component for displaying the result and calculations*/
const Display = ({ input, output }) => (
<div className="output">
    <span className="result">{output}</span>
    <span id="display" className="input">{input}</span>
</div>
);


const Key = ({ keyData: { id, value }, handleInput }) => (
<button id={id} onClick={() => handleInput(value)}>
    {value}
</button>
);

/* component for the keypad */
const NumPad = ({ handleInput }) => (
<div className="keys">
    {calcValues.map((key) => (
    <Key key={key.id} keyData={key} handleInput={handleInput} />
    ))}
</div>
);

const App = () => {
const [input, setInput] = React.useState("0");
const [output, setOutput] = React.useState("");
const [CalculatorValues, setCalculatorValues] = React.useState("");

const handleSubmit = () => {
    console.log({ CalculatorValues });

    const total = eval(CalculatorValues);
    setInput(total);
    setOutput(`${total} = ${total}`);
    setCalculatorValues(`${total}`);
};

const Clear = () => {
    setInput("0");
    setCalculatorValues("");
  };

const handleDigits = (value) => {
    if (!CalculatorValues.length) {
        setInput(`${value}`);
        setCalculatorValues(`${value}`);
    } else {
    if (value === 0 && (CalculatorValues === "0" || input === "0")) {
        setCalculatorValues(`${CalculatorValues}`);
    } else {
        const lastChar = CalculatorValues.charAt(CalculatorValues.length - 1);
        const isLastCharOperator =
        lastChar === "*" || operators.includes(lastChar);

        setInput(isLastCharOperator ? `${value}` : `${input}${value}`);
        setCalculatorValues(`${CalculatorValues}${value}`);
    }
    }
};

const dotOperator = () => {
    const lastChar = CalculatorValues.charAt(CalculatorValues.length - 1);
    if (!CalculatorValues.length) {
    /* Stop user from entering multiple 0s as first digits */
    setInput("0.");
    setCalculatorValues("0.");
    } else {
    /* Check if last entered characters are operators */
    if (lastChar === "*" || operators.includes(lastChar)) {
        setInput("0.");
        setCalculatorValues(`${CalculatorValues} 0.`);
    } else {
    /* format valid numbers with . */
        setInput(
        lastChar === "." || input.includes(".") ? `${input}` : `${input}.`
        );
        const formattedValue =
        lastChar === "." || input.includes(".")
            ? `${CalculatorValues}`
            : `${CalculatorValues}.`;
        setCalculatorValues(formattedValue);
    }
    }
};


const handleOperators = (value) => {
    if (CalculatorValues.length) {
    setInput(`${value}`);
    const beforeLastChar = CalculatorValues.charAt(CalculatorValues.length - 2);
    const beforeLastCharIsOperator =
        operators.includes(beforeLastChar) || beforeLastChar === "*";
    const lastChar = CalculatorValues.charAt(CalculatorValues.length - 1);
    const lastCharIsOperator = operators.includes(lastChar) || lastChar === "*";
    const validOp = value === "x" ? "*" : value;
    if (
        (lastCharIsOperator && value !== "-") ||
        beforeLastCharIsOperator && lastCharIsOperator
    ) {
        if (beforeLastCharIsOperator) {
        const updatedValue = `${CalculatorValues.substring(
            0,
            CalculatorValues.length - 2
        )}${value}`;
        setCalculatorValues(updatedValue);
        } else {
        setCalculatorValues(`${CalculatorValues.substring(0, CalculatorValues.length - 1)}${validOp}`);
        }
    } else {
        setCalculatorValues(`${CalculatorValues}${validOp}`);}}};

const handleInput = (value) => {
    const number = digits.find((num) => num === value);
    const operator = operators.find((op) => op === value);
    switch (value) {
    case "=":
        handleSubmit();
        break;
    case "AC":
        Clear();
        break;
    case number:
        handleDigits(value);
        break;
    case ".":
        dotOperator(value);
        break;
    case operator:
        handleOperators(value);
        break;
    default:
        break;
    }};

const handleOutput = () => {
    setOutput(CalculatorValues);};

React.useEffect(() => {
    handleOutput();}, [CalculatorValues]);

return (
    <div className="container">
    <div className="calculator">
        <Display input={input} output={output} />
        <NumPad handleInput={handleInput} />
    </div>
    </div>);}

/* render the calculator*/
ReactDOM.render(<App />, document.getElementById("root"))
