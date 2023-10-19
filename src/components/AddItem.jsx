/* eslint-disable react/prop-types */
import { useState } from "react";

function AddItem({disableToggle,dataLocal,setDataTodo}) {

    const [item,setItem] = useState({
        id:'',
        todo:'',
        isChecked:false
    });

    function addItem() {
        let newItem = item
        item.id = crypto.randomUUID()
        
        let newDataLocal = [...dataLocal,newItem]

        setDataTodo(newDataLocal)
        localStorage.setItem('dataLocal-todo',JSON.stringify(newDataLocal))
        disableToggle()
    }

  return (
    <div className="flex gap-3">
      <input
        value={item.todo}
        onChange={(e)=>setItem({...item,todo:e.target.value})}
        type="text"
        placeholder="Add your todo item..."
        className="text-base p-2 rounded-md text-black"
      />
      <button onClick={addItem} className="px-2 bg-white rounded-md">✔</button>
    </div>
  );
}

export default AddItem;
