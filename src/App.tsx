import React, { useState, ChangeEvent } from "react";

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.toUpperCase());
  };

  const convertToRoman = (number: number): string => {
    const romanNumerals: { [key: string]: number } = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    };

    let roman = "";
    for (let numeral in romanNumerals) {
      while (number >= romanNumerals[numeral]) {
        roman += numeral;
        number -= romanNumerals[numeral];
      }
    }

    return roman;
  };

  const convertToArabic = (roman: string): number => {
    const romanNumerals: { [key: string]: number } = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    };

    let arabic = 0;
    let previousValue = 0;

    for (let i = 0; i < roman.length; i++) {
      const currentValue = romanNumerals[roman[i]];

      if (i > 0 && currentValue > previousValue) {
        arabic += currentValue - 2 * previousValue;
      } else {
        arabic += currentValue;
      }

      previousValue = currentValue;
    }

    return arabic;
  };

  const handleConvert = () => {
    if (inputValue === "") {
      setResult("");
      return;
    }

    if (isNaN(parseInt(inputValue))) {
      const roman = inputValue.trim();
      const arabic = convertToArabic(roman);
      setResult(`Número arábico correspondente: ${arabic}`);
    } else {
      const arabic = parseInt(inputValue, 10);
      if (arabic >= 1 && arabic <= 3999) {
        const roman = convertToRoman(arabic);
        setResult(`Número romano correspondente: ${roman}`);
      } else {
        setResult("Insira um número arábico válido (entre 1 e 3999).");
      }
    }

    setInputValue("");
  };

  return (
    <div>
      <h1 className="title">Conversor de Números Romanos</h1>
      <div className="container-input">
        <input
          type="text"
          placeholder="Insira o valor que deseja converter..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleConvert} className="search-btn">
          Converter
        </button>
      </div>
      {result && (
        <div className="result">
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default App;
