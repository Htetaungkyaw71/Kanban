/* eslint-disable react/prop-types */
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addTask } from "../redux/TaskSlice";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import { RxCross1 } from "react-icons/rx";

const AddTask = ({ project }) => {
  const dispatch = useDispatch();

  const [error, setError] = useState(false);
  const [add, setAdd] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = new FormData(e.target);
    let formdata = {
      id: uuidv4(),
      title: obj.get("title") ?? "",
      description: obj.get("description") ?? "",
      hour: obj.get("hour") ?? "",
      status: obj.get("status") ?? "",
      priority: obj.get("priority") ?? "",
    };
    if (
      formdata.title.length <= 0 ||
      formdata.description.length <= 0 ||
      formdata.hour.length <= 0
    ) {
      setError(true);
    } else {
      dispatch(addTask([project, formdata, formdata.status]));
      setError(false);
      e.target.title.value = "";
      e.target.description.value = "";
      e.target.hour.value = "";
      e.target.status.value = "todo";
      e.target.priority.value = "⚪";
    }
  };

  return (
    <>
      <button
        className="rounded-3xl bg-blue-500 p-2 px-3 text-white font-semibold"
        onClick={() => setAdd(!add)}
      >
        +Add New Task
      </button>
      {add ? (
        <Modal>
          <div id="myModal" className="modal">
            <div className="modal-content">
              <div className="">
                {error ? (
                  <div className="text-center text-red-500  mb-3">
                    Invalid Credential
                  </div>
                ) : null}
                <form onSubmit={handleSubmit}>
                  <div className="flex justify-between items-center mb-3">
                    <h1 className="text-xl font-bold text-gray-500">
                      Add New Task
                    </h1>
                    <RxCross1
                      onClick={() => setAdd(false)}
                      className="cursor-pointer"
                    />
                  </div>

                  <label className="text-md  text-gray-500 font-semibold">
                    Title
                  </label>
                  <input
                    name="title"
                    type="text"
                    placeholder="title"
                    className="block p-1 mr-3 mt-1 border-2 border-gray-500 rounded-xl mb-5 w-full"
                  />
                  <label className="text-md text-gray-500 font-semibold">
                    Description
                  </label>
                  <textarea
                    name="description"
                    type="text"
                    placeholder="description"
                    className="block p-1 mr-3 mt-1 border-2 border-gray-500 rounded-xl mb-5 w-full"
                  ></textarea>
                  <label className="text-md text-gray-500 font-semibold">
                    Hour (please type number only)
                  </label>
                  <input
                    name="hour"
                    type="number"
                    step="0.01"
                    min={0}
                    placeholder="hour (eg 30min = 0.5)"
                    className="block p-1 mr-3 mt-1 border-2 border-gray-500 rounded-xl mb-5 w-full"
                  />
                  <label className="text-md mb-2 text-gray-500 font-semibold">
                    Status
                  </label>
                  <select
                    name="status"
                    className="block p-1 mr-3 mt-1 border-2 border-gray-500 rounded-xl mb-6 w-full"
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
                    className="block p-1 mr-3 mt-1 border-2 border-gray-500 rounded-xl mb-6 w-full"
                  >
                    <option value="🔴">🔴 priority 1</option>
                    <option value="🟠">🟠 priority 2</option>
                    <option value="🔵">🔵 priority 3</option>
                    <option value="⚪">⚪ priority 4</option>
                  </select>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 px-2 rounded-2xl w-full"
                  >
                    Create Task
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default AddTask;
