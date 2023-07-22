/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { removeTask } from "../redux/TaskSlice";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import Modal from "./Modal";
import { BiEdit } from "react-icons/bi";

const Card = ({ data, project }) => {
  const [cardToogle, setCardToogle] = useState(false);
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();
  return (
    <>
      <button onClick={() => setCardToogle(!cardToogle)} className="w-60">
        <div className="border-2 rounded-lg p-3 text-left">
          <h1>{data.title}</h1>

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
                  {/* <h1 className="mb-3 text-xl font-bold text-gray-500">
                    Detail Task
                  </h1> */}
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
                  className="bg-red-500 p-3 rounded-lg text-white mt-5"
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
                  className="cursor-pointer"
                />
                Hello world
              </div>
            </div>
          </Modal>
        </>
      ) : null}
    </>
  );
};

export default Card;

{
  /* <form
    onSubmit={(e) => {
      e.preventDefault();
      data.id = task.id;
      updateTask([project, data]);
    }}
  >
    <input
      name="title"
      type="text"
      placeholder="title"
      value={data.title}
      onChange={handleChange}
    />
    <input
      name="description"
      type="text"
      placeholder="description"
      value={data.description}
      onChange={handleChange}
    />
    <select name="status" value={data.status} onChange={handleChange}>
      <option value="todo">Todo</option>
      <option value="doing">Doing</option>
      <option value="done">Done</option>
    </select>
    <button type="submit">rename</button>
  </form> */
}
