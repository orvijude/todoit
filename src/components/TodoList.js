import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import Button from "./Button";
import DragHandle from "./DragHandle";

// Icon
import { FiX } from "react-icons/fi";

const TodoList = ({
  todos,
  deleteHandler,
  completedHandler,
  filterStatus,
  filterDate,
}) => {

  return (
    <>
      {todos.map((item, i) => (
        <Draggable key={item.id} draggableId={item.id} index={i}>
          {(provided, snapshot) => (
            <div
              className= { item.completed ? "todo-card todo-completed" : "todo-card" }
              ref={provided.innerRef}
              {...provided.draggableProps}
              style={{
                ...provided.draggableProps.style,
                boxShadow: snapshot.isDragging ? "0 0 .4rem #666" : "none",
              }}
            >
              <div className="todo-details">
                <DragHandle {...provided.dragHandleProps} />
                <Button
                  className={item.completed ? "completed true" : "completed"}
                  clickHandle={() => completedHandler(item.id)}
                />
                <div className="todo-name">
                  <h1>{item.name}</h1>
                  <p>{item.date}</p>
                </div>
              </div>
              <button className="option-item" onClick={() => deleteHandler(i)}>
                <FiX />
              </button>
            </div>
          )}
        </Draggable>
      ))}
    </>
  );
};

export default TodoList;
