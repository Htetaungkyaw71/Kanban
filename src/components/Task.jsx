import Card from "./Card";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "./helpers/StrictModeDroppable";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateChangeIndex, updateIndex } from "../redux/TaskSlice";

/* eslint-disable react/prop-types */
const Task = ({ task, project, theme }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setColumns(task);
  }, [task]);
  const [columns, setColumns] = useState(task);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn];
      const destItems = [...destColumn];
      const [removed] = sourceItems.splice(source.index, 1);
      const newRemoved = { ...removed, status: destination.droppableId };
      destItems.splice(destination.index, 0, newRemoved);

      setColumns({
        ...columns,
        [source.droppableId]: [...sourceItems],
        [destination.droppableId]: [...destItems],
      });
      dispatch(
        updateChangeIndex([
          project,
          source.droppableId,
          destination.droppableId,
          sourceItems,
          destItems,
        ]),
      );
    } else {
      const column = columns[source.droppableId];
      const copyItems = [...column];
      const [removeItem] = copyItems.splice(source.index, 1);
      copyItems.splice(destination.index, 0, removeItem);

      let newObj = {
        ...columns,
        [source.droppableId]: [...copyItems],
      };

      setColumns(newObj);
      dispatch(updateIndex([project, newObj]));
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
                    {id}{" "}
                    {id == "todo" ? " 📋 " : id == "doing" ? " 💪 " : " 🎉 "}(
                    {column.length})
                  </h1>
                  {column.map((data, index) => (
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
