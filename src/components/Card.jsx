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
      <button onClick={() => setCardToogle(!cardToogle)} className="w-60">
        <div className="border-2 rounded-lg p-3 text-left shadow-lg">
          <h1>
            {data.title} ({data.hour}hr)
          </h1>

          <p>{data.description}</p>
        </div>
      </button>
      {cardToogle ? (
        <>
          <Modal>
            <div id="myModal" className="modal">
              <div className="modal-content">
                <div className="flex justify-between">
                  <BiEdit
                    onClick={() => {
                      setCardToogle(false);
                      setEdit(true);
                    }}
                    className="text-xl cursor-pointer mb-3"
                  >
                    Edit
                  </BiEdit>
                  <RxCross1
                    onClick={() => setCardToogle(false)}
                    className="cursor-pointer"
                  />
                </div>
                <h1 className="text-gray-500 font-bold text-xl">
                  {data.title}
                </h1>

                <p className="text-gray-400 text-md mt-2">{data.description}</p>
                <h1 className="text-gray-500 font-bold mt-2 text-lg">
                  Status {data.status}
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
                <RxCross1
                  onClick={() => setEdit(false)}
                  className="cursor-pointer ml-auto"
                />
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (
                      updateData.title.length <= 0 ||
                      updateData.description.length <= 0
                    ) {
                      setError(true);
                    } else {
                      dispatch(updateTask([project, updateData]));
                      setError(false);
                    }
                  }}
                >
                  <label className="text-md mb-2 text-gray-500 font-bold">
                    Title
                  </label>
                  <input
                    name="title"
                    type="text"
                    placeholder="title"
                    value={updateData.title}
                    onChange={handleChange}
                    className="block p-1 mr-3 border-2 border-gray-500 mb-3 w-full rounded-lg"
                  />
                  <label className="text-md mb-2 text-gray-500 font-bold">
                    Description
                  </label>
                  <textarea
                    name="description"
                    type="text"
                    placeholder="description"
                    value={updateData.description}
                    onChange={handleChange}
                    className="block p-1 mr-3 border-2 border-gray-500 rounded-lg mb-3 w-full"
                  ></textarea>
                  <label className="text-md mb-2 text-gray-500 font-bold">
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
                    className="block p-1 mr-3 border-2 border-gray-500 rounded-lg mb-3 w-full"
                  />
                  <label className="text-md mb-2 text-gray-500 font-bold">
                    Status
                  </label>
                  <select
                    name="status"
                    value={updateData.status}
                    onChange={handleChange}
                    className="block p-1 mr-3 border-2 border-gray-500 rounded-lg mb-3 w-full"
                  >
                    <option value="todo">Todo</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                  </select>
                  <button
                    type="submit"
                    className="bg-gray-500 text-white p-1 px-2 rounded-lg"
                  >
                    Rename
                  </button>
                </form>
                {error && <div>Invalid Credential</div>}
              </div>
            </div>
          </Modal>
        </>
      ) : null}
    </>
  );
};

export default Card;
