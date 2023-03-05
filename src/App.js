import "./App.css";
import { useState, useEffect } from "react";
import Volume from "./svg/volume.svg";
function App() {
  /* ============ useState ============ */
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState("");
  const [error, setError] = useState();

  /* ============ UserValue ============ */
  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  /* ============ Button ============ */
  const evenHandle = () => {
    if (inputValue === "") {
      return;
    } else {
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`)
        .then((res) => {
          if (!res.ok) {
            throw Error(res.status);
          }
          return res.json();
        })

        .then((resData) => {
          setData(resData);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
    if (error === error) {
      setError("");
    }
  };
  /* ============ useEffect ============ */
  useEffect(() => {
    evenHandle();
  }, []);

  /* ============ Audio ============ */
  const play = () => {
    new Audio(data[0].phonetics[0].audio).play();
  };

  return (
    <div className="container">
      <div className="input-block">
        <input
          type="text"
          placeholder="Enter your word"
          onChange={onChange}
          value={inputValue}
        />
        <button className="btn" onClick={evenHandle}>
          Search
        </button>
      </div>
      {!error ? (
        <div>
          {data && data !== "" && data !== undefined && (
            <>
              <div className="meaning">
                <div className="meaning-grammer">
                  <span className="word-meaning">{data[0].word}</span>
                  <div className="meaning-details">
                    <span className="word-grammar">
                      {data[0].meanings[0].partOfSpeech}
                    </span>
                    <span className="word-grammar2">
                      {data[0].phonetic || "..."}
                    </span>
                  </div>
                </div>
                <div className="voice" onClick={play}>
                  <img src={Volume} />
                </div>
              </div>
              <div className="more-meaning-word">
                <p>{data[0].meanings[0].definitions[0].definition}</p>
              </div>
              <div className="word-detail">
                <p>
                  {data[0].meanings[0].definitions[0].example || "Loading..."}
                </p>
              </div>
            </>
          )}
        </div>
      ) : (
        <div>
          <p className="error">Sorry i couldn't find the word</p>
        </div>
      )}
    </div>
  );
}

export default App;
