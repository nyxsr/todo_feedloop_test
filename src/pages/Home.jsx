import { useEffect, useState } from "react";
import data from "../mock/data";
import AddItem from "../components/AddItem";
import { useToggleAdd } from "../store/store";

function Home() {
  const { toggleAdd, activeToggle, disableToggle } = useToggleAdd();

  const [dataTodo, setDataTodo] = useState([]);

  const dataLocal = JSON.parse(localStorage.getItem("dataLocal-todo"));

  function doCheck(e, id) {
    let selectedData = dataLocal.filter((item) => item.id === id);

    selectedData[0].isChecked = !selectedData[0].isChecked;

    let newDataLocal = dataLocal.filter((item) => item.id !== id);

    setDataTodo([...newDataLocal, ...selectedData]);
    localStorage.setItem(
      "dataLocal-todo",
      JSON.stringify([...newDataLocal, ...selectedData])
    );
  }

  useEffect(() => {
    if (!dataLocal) {
      localStorage.setItem("dataLocal-todo", JSON.stringify(data));
      setDataTodo(data);
    } else {
      setDataTodo(dataLocal);
    }
  }, []);

  return (
    <section className="w-[60vw] mx-auto min-h-screen py-10 px-12 bg-[#4260d5]">
      <h1 className="text-4xl font-semibold">Todo List</h1>
      <div className="flex flex-col gap-3 mt-5 text-xl">
        {dataTodo?.map((item) => (
          <div key={item.id} className="flex gap-3">
            <input
              type="checkbox"
              className=""
              onChange={(e) => doCheck(e, item.id)}
              checked={item.isChecked}
            />
            <label htmlFor="" className="">
              {item.todo}
            </label>
          </div>
        ))}
        {toggleAdd && (
          <AddItem
            disableToggle={disableToggle}
            dataLocal={dataLocal}
            setDataTodo={setDataTodo}
          />
        )}
        <button
          onClick={() => (toggleAdd ? disableToggle() : activeToggle())}
          className="bg-white rounded-md p-2 text-black w-fit text-sm font-medium"
        >
          {toggleAdd ? "Cancel" : "Add Item"}
        </button>
      </div>
    </section>
  );
}

export default Home;
