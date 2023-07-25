import Card from "./Card";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "./helpers/StrictModeDroppable";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { updateTask } from "../redux/TaskSlice";

/* eslint-disable react/prop-types */
const Task = ({ task, project, theme }) => {
  const dispatch = useDispatch();
  let todo = task.filter((t) => t.status === "todo");
  let doing = task.filter((t) => t.status === "doing");
  let done = task.filter((t) => t.status === "done");

  let todo_id = uuidv4();
  let doing_id = uuidv4();
  let done_id = uuidv4();
  let columnsfromBackend = {
    [todo_id]: {
      name: "todo",
      items: todo,
    },
    [doing_id]: {
      name: "doing",
      items: doing,
    },
    [done_id]: {
      name: "done",
      items: done,
    },
  };

  const [columns, setColumns] = useState(columnsfromBackend);

  useEffect(() => {
    setColumns(columnsfromBackend);
  }, [task]);

  if (task.length === 0) {
    return (
      <div className="text-center pt-40 text-2xl font-bold text-gray-500">
        No Task
      </div>
    );
  }

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      console.log(destination.index);
      let obj = { ...destItems[destination.index], status: destColumn.name };
      dispatch(updateTask([project, obj]));
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copyItems = [...column.items];
      const [removeItem] = copyItems.splice(source.index, 1);
      copyItems.splice(destination.index, 0, removeItem);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copyItems,
        },
      });
    }
  };

  return (
    <div className="h-screen grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([id, column]) => {
          return (
            <Droppable droppableId={id} key={id} type="group">
              {(provided, snapshot) => (
                <div
                  className={`p-3 border-2 sm:border-b-0 md:border-b-2 lg:border-b-2 xl:border-b-2 ${
                    theme === "light"
                      ? snapshot.isDraggingOver
                        ? "bg-gray-50"
                        : "bg-white"
                      : snapshot.isDraggingOver
                      ? "bg-gray-700"
                      : "dark"
                  }`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h1 className="text-lg font-bold text-gray-500 ml-3 mb-3 capitalize">
                    {column.name} 📋 ({column.items.length})
                  </h1>
                  {column.items.map((data, index) => (
                    <Draggable
                      key={data.id}
                      draggableId={data.id}
                      index={index}
                      disableInteractiveElementBlocking={true}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-3"
                        >
                          <Card
                            data={data}
                            project={project}
                            theme={theme}
                            snapshot={snapshot}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default Task;
