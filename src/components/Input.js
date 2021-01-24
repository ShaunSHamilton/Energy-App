import React, { useState } from "react";
import { TYPES } from "../redux";
import { connect } from "react-redux";

// const mapStateToProps = (state) => {
//   return {
//     location: locationSelector(state),
//   };
// };

const mapDispatchToProps = {
  setName: (payload) => ({ type: TYPES.setName, payload }),
  setAllData: (payload) => ({ type: TYPES.setAllData, payload }),
};

const Input = ({ closeInput, setName, setAllData, setIsOpenInput }) => {
  const [value, setValue] = useState("");
  const [loginAttempt, setLoginAttempt] = useState({ text: "", error: "" });

  const verifyAndLogin = (input) => {
    setLoginAttempt({ text: "Attempting to verify...", error: "" });
    (async () => {
      try {
        const res = await (
          await fetch("https://energy-app-api.herokuapp.com/", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({ input }),
            headers: {
              "Content-Type": "application/json",
            },
          })
        ).json();
        if (res.verified) {
          setIsOpenInput(false);
          setName(res.name);
          setAllData(res.data);
        } else {
          setLoginAttempt({ text: res.error, error: "" });
        }
      } catch (err) {
        console.error(err);
        setLoginAttempt({ text: "Failed to verify password...", error: err });
      }
    })();
  };

  const onChange = (e) => {
    e.preventDefault();
    setValue(e?.target?.value);
  };
  return (
    <form id="input" onSubmit={(e) => e.preventDefault()}>
      <button onClick={() => setIsOpenInput(false)}>X</button>
      <h3>{loginAttempt.text}</h3>
      <label htmlFor="pass">Password</label>
      <input
        autoComplete="off"
        id="pass"
        type="password"
        onChange={onChange}
        value={value}
        placeholder="Enter Password..."
      />
      <button id="submitBtn" onClick={() => verifyAndLogin(value)}>
        Submit
      </button>
      {loginAttempt.error && <FullLogs error={loginAttempt.error} />}
    </form>
  );
};

const FullLogs = ({ error }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "1em",
          height: "30px",
        }}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ marginLeft: "0px", marginRight: "5px" }}
        >
          {isExpanded ? "-" : "+"}
        </button>
        <p style={{ height: "30px", margin: "0px" }}>Full error...</p>
      </div>
      {isExpanded && <p>{`${error}`}</p>}
    </>
  );
};

export default connect(null, mapDispatchToProps)(Input);
