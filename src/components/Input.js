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
};

const Input = ({ closeInput, setName }) => {
  const [value, setValue] = useState("");

  const verifyAndLogin = (input) => {
    (async () => {
      try {
        const res = await (
          await fetch("http://localhost:8000/", {
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
        }
      } catch (err) {
        console.error(err);
      }
    })();
  };

  const onChange = (e) => {
    e.preventDefault();
    setValue(e?.target?.value);
  };
  return (
    <form id="input" onSubmit={(e) => e.preventDefault()}>
      <button onClick={closeInput}>X</button>
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
    </form>
  );
};

export default connect(null, mapDispatchToProps)(Input);
