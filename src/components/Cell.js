import React from "react";

const Cell = (props) => {
  const event = props.event;
  const cellStyle = {
    gridRow: `${event.start} / ${event.stop}`,
    width: "100%",
    backgroundColor: "aqua",
    border: "solid black 1px",
    borderRadius: "10px",
  };

  return (
    <div style={cellStyle} className="CellDiv">
      <span> {event.id} </span>
    </div>
  );
};

export default Cell;
