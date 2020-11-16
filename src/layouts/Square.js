import React from "react";

export default function square(props) {
  return (
    <button className={`square-${props.index} square`} onClick={props.onClick}>
      {props.value}
    </button>
  );
}
