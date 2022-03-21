import React from "react";

const DragHandle = (props) => {
  return (
    <div className="handle" {...props}>
      <div className="line-1"></div>
      <div className="line-2"></div>
    </div>
  );
}

export default DragHandle