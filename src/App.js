import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

// Components
import Input from "./components/Input";
import Button from "./components/Button";
import DisplayDate from "./components/DisplayDate";
import TodoList from "./components/TodoList";
import { FiAlertCircle } from "react-icons/fi";

// Style
import "./style/style.css";

const App = () => {
  // Date
  let current = new Date();
  let yearNow = `${current.getFullYear()}`;
  let monthNow = `0${current.getMonth() + 1}`;
  let dayNow = `${current.getDate()}`;
  if (monthNow === "10" || monthNow === "11" || monthNow === "10")
    monthNow = `${current.getMonth() + 1}`;
  const dateNow = yearNow + "-" + monthNow + "-" + dayNow;

  // States
  const [todoList, setTodoList] = useState(() => {
    const localData = localStorage.getItem("todoList");
    return localData ? JSON.parse(localData) : [];
  });
  const [todoName, setTodoName] = useState("");
  const [todoDate, setTodoDate] = useState(dateNow);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDate, setFilterDate] = useState("Today");

  // Functions
  const addTodoHandler = (e) => {
    e.preventDefault();
    let newTodo = [
      ...todoList,
      {
        id: uuidv4(),
        name: todoName,
        date: todoDate,
        completed: false,
      },
    ];
    setTodoList(newTodo);
  };

  const deleteHandler = (_index) => {
    setTodoList(todoList.filter((_, index) => index !== _index));
  };

  const completedHandler = (_id) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === _id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filterHandler = () => {
    let todos = [];

    todoList.forEach((todo) => {
      if (filterStatus === "inProgress") {
        todos = todoList.filter((todo) => !todo.completed);
      } else if (filterStatus === "Completed") {
        todos = todoList.filter((todo) => todo.completed);
      } else {
        todos = [...todoList];
      }
    });
    let finalTodos = [];
    todos.forEach((_val) => {
      if (filterDate === "upcoming") {
        finalTodos = todos.filter((_val) => _val.date > dateNow);
      } else if (filterDate === "past") {
        finalTodos = todos.filter((_val) => _val.date < dateNow);
      } else {
        finalTodos = todos.filter((_val) => _val.date === dateNow);
      }
    });
    return finalTodos;
  };

  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newList = Array.from(todoList);
    const [draggableItem] = newList.splice(source.index, 1);
    newList.splice(destination.index, 0, draggableItem);

    setTodoList(newList);
  };

  // Notice
  const [showNotice, setShowNotice] = useState(false);

  const noticeHandler = () => {
    setShowNotice(!showNotice);
  };

  const NoticeModal = () => {
    return (
      <div className="notice-modal">
        <div className="modal-icon">
          <FiAlertCircle />
        </div>
        <div className="modal-text">
          <h1>Notice!</h1>
          <p>Rearranging todo cards not working due to a filtered list.</p>
        </div>
      </div>
    );
  };

  // Effect
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <>
      <Button
        label={<FiAlertCircle />}
        className="notice-button"
        clickHandle={noticeHandler}
      />
      {showNotice ? <NoticeModal /> : null}
      <div className="container">
        <div className="title">
          <h1> todoit </h1>
          <DisplayDate />
        </div>
        <div>
          <div className="addTaskWrapper">
            <h1>Add Todo</h1>
            <form className="form" onSubmit={addTodoHandler}>
              <Input
                label="Todo Name"
                type="text"
                placeholder="Enter task name"
                name={todoName}
                handleChange={setTodoName}
              />
              <Input
                label="Date"
                type="date"
                value={todoDate}
                name={todoDate}
                handleChange={setTodoDate}
              />
              <Button label="Add" type="submit" className="button" />
            </form>
          </div>
          <div className="taskListWrapper">
            <h1> List </h1>
            <div className="filter-container">
              <select
                onChange={(e) => {
                  const selectedDate = e.target.value;
                  setFilterDate(selectedDate);
                }}
              >
                <option value="today"> Today </option>
                <option value="upcoming"> Upcoming </option>
                <option value="past"> Past </option>
              </select>
              <select
                onChange={(e) => {
                  const selectedFilter = e.target.value;
                  setFilterStatus(selectedFilter);
                }}
              >
                <option value="All"> All </option>
                <option value="Completed"> Completed </option>
                <option value="inProgress"> In Progress </option>
              </select>
            </div>
            <div className="listContainer">
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <div>
                  <Droppable droppableId="droppable-1">
                    {(provided, _) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        <TodoList
                          todos={filterHandler()}
                          deleteHandler={deleteHandler}
                          completedHandler={completedHandler}
                          filterStatus={filterStatus}
                          filterDate={filterDate}
                        />
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </DragDropContext>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <span> Designed and Developed by Orvi Vilches. </span>
      </div>
    </>
  );
};

export default App;
