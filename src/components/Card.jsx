/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { removeTask, updateTask } from "../redux/TaskSlice";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import Modal from "./Modal";
import { BiEdit } from "react-icons/bi";

const Card = ({ data, project }) => {
  const [cardToogle, setCardToogle] = useState(false);
  const [error, setError] = useState(false);
  const [edit, setEdit] = useState(false);
  const [updateData, setUpdateData] = useState({
    id: data.id,
    title: data.title,
    description: data.description,
    hour: data.hour,
    status: data.status,
    priority: data.priority,
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setUpdateData({
      ...updateData,
      [e.target.name]: value,
    });
  };
  const dispatch = useDispatch();
  return (
    <>
      <button
        onClick={() => setCardToogle(!cardToogle)}
        className="w-64 sm:w-64 md:w-72 lg:w-56 xl:w-64"
      >
        <div className="border-2 rounded-lg p-3 text-left shadow-lg">
          <h1 className="text-lg font-semibold text-gray-500">
            <span className="mr-2">{data.priority && data.priority}</span>
            {data.title.substr(0, 14)}
            {data.title.length > 14 && "..."} ({data.hour}hr)
          </h1>

          <p className="text-md font-semibold text-gray-400">
            {data.description.substr(0, 20)}
            {data.description.length > 20 && "..."}
          </p>
        </div>
      </button>
      {cardToogle ? (
        <>
          <Modal>
            <div id="myModal" className="modal">
              <div className="modal-content">
                <div className="flex justify-between items-center mb-3">
                  <BiEdit
                    onClick={() => {
                      setCardToogle(false);
                      setEdit(true);
                    }}
                    className="text-xl cursor-pointer "
                  ></BiEdit>
                  <RxCross1
                    onClick={() => setCardToogle(false)}
                    className="cursor-pointer"
                  />
                </div>
                <h1 className="text-gray-500 font-bold text-xl">
                  {data.title}
                </h1>

                <p className="text-gray-400 text-md mt-4">{data.description}</p>
                <h1 className="text-gray-500 font-bold mt-4 text-md">
                  Status -
                  <span className="text-gray-400 ml-3 text-md mt-2">
                    {data.status}
                  </span>
                </h1>
                <h1 className="text-gray-500 font-bold mt-4 text-md">
                  Duration -
                  <span className="text-gray-400 ml-3 text-md mt-2">
                    {data.hour}hr
                  </span>
                </h1>
                <h1 className="text-gray-500 font-bold mt-4 text-md">
                  Priority -
                  <span className="text-gray-400 ml-3 text-md mt-2">
                    {data.priority}
                  </span>
                </h1>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(removeTask([project, data]));
                  }}
                  className="bg-red-500 p-2 rounded-lg text-white mt-5"
                >
                  Delete
                </button>
              </div>
            </div>
          </Modal>
        </>
      ) : null}
      {edit ? (
        <>
          <Modal>
            <div id="myModal" className="modal">
              <div className="modal-content">
                {error && (
                  <div className="text-center text-red-500 mb-3">
                    Invalid Credential
                  </div>
                )}
                <div className="flex justify-between items-center mb-3">
                  <h1 className="font-bold text-gray-500 text-xl">Edit Task</h1>
                  <RxCross1
                    onClick={() => setEdit(false)}
                    className="cursor-pointer"
                  />
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (
                      updateData.title.length <= 0 ||
                      updateData.description.length <= 0 ||
                      updateData.hour.length <= 0
                    ) {
                      setError(true);
                    } else {
                      dispatch(updateTask([project, updateData]));
                      setError(false);
                    }
                  }}
                >
                  <label className="text-md text-gray-500 font-semibold">
                    Title
                  </label>
                  <input
                    name="title"
                    type="text"
                    placeholder="title"
                    value={updateData.title}
                    onChange={handleChange}
                    className="block p-1 mr-3 mt-1 border-2 border-gray-500 mb-4 w-full rounded-lg"
                  />
                  <label className="text-md text-gray-500 font-semibold">
                    Description
                  </label>
                  <textarea
                    name="description"
                    type="text"
                    placeholder="description"
                    value={updateData.description}
                    onChange={handleChange}
                    className="block p-1 mr-3 mt-1 border-2 border-gray-500 rounded-lg mb-4 w-full"
                  ></textarea>
                  <label className="text-md mb-2 text-gray-500 font-semibold">
                    Hour (please type number only)
                  </label>
                  <input
                    name="hour"
                    type="number"
                    step="0.01"
                    min={0}
                    value={updateData.hour}
                    onChange={handleChange}
                    placeholder="hour (eg 30min = 0.5)"
                    className="block p-1 mr-3 mt-1 border-2 border-gray-500 rounded-lg mb-4 w-full"
                  />
                  <label className="text-md mb-2 text-gray-500 font-semibold">
                    Status
                  </label>
                  <select
                    name="status"
                    value={updateData.status}
                    onChange={handleChange}
                    className="block p-1 mr-3 mt-1 border-2 border-gray-500 rounded-lg mb-4 w-full"
                  >
                    <option value="todo">Todo</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                  </select>
                  <label className="text-md mb-2 text-gray-500 font-semibold">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={updateData.priority}
                    onChange={handleChange}
                    className="block p-1 mr-3 mt-1 border-2 border-gray-500 rounded-xl mb-6 w-full"
                  >
                    <option value="🔴">🔴 priority 1</option>
                    <option value="🟠">🟠 priority 2</option>
                    <option value="🔵">🔵 priority 3</option>
                    <option value="⚪">⚪ priority 4</option>
                  </select>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-1 px-2 rounded-2xl w-full"
                  >
                    Edit Task
                  </button>
                </form>
              </div>
            </div>
          </Modal>
        </>
      ) : null}
    </>
  );
};

export default Card;
