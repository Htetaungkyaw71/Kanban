import Card from "./Card";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "./helpers/StrictModeDroppable";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

/* eslint-disable react/prop-types */
const Task = ({ task, project, theme }) => {
  let todo = task.filter((t) => t.status === "todo");
  // let doing = task.filter((t) => t.status === "doing");
  // let done = task.filter((t) => t.status === "done");

  let columnsfromBackend = {
    [uuidv4()]: {
      name: "todo",
      items: todo,
    },
    // [uuidv4()]: {
    //   name: "doing",
    //   items: doing,
    // },
    // [uuidv4()]: {
    //   name: "done",
    //   items: done,
    // },
  };
  const [columns, setColumns] = useState(columnsfromBackend);

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
    const column = columns[source.droppableId];
    console.log(column);
    const copyItems = [...column.items];
    console.log(copyItems);

    const [removeItem] = copyItems.splice(source.index, 1);

    copyItems.splice(destination.index, 0, removeItem);
    console.log(copyItems);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copyItems,
      },
    });
    console.log(columns);
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
                    snapshot.isDraggingOver ? "bg-gray-50" : "bg-white"
                  }`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h1 className="text-lg font-bold text-gray-500 ml-3 mb-3">
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
// <div key={t.id} className="mb-3">
//   <Card data={t} project={project} theme={theme} />
// </div>
{
  /* <div className="p-3 border-2  sm:border-y-2 sm:border-x-2 md:border-r-2 md:border-l-0 lg:border-y-2 lg:border-x-0 xl:border-y-2 xl:border-x-0">
              <h1 className="text-lg font-bold text-gray-500 ml-3 mb-3">
                Doing 💪 ({doing.length})
              </h1>
              {doing.map((t) => (
                <div key={t.id} className="mb-3">
                  <Card data={t} project={project} theme={theme} />
                </div>
              ))}
            </div>
            <div className="p-3 border-2 sm:border-2 sm:border-t-0 md:border-t-0 lg:border-2 xl:border-2">
              <h1 className="text-lg font-bold text-gray-500 ml-3 mb-3">
                Done 🎉 ({done.length})
              </h1>
              {done.map((t) => (
                <div key={t.id} className="mb-3">
                  <Card data={t} project={project} />
                </div>
              ))}
            </div> */
}
