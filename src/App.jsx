import { useState } from 'react'
import './App.css'

const initialRes = [
  {
    id: 2244,
    resName: "Baran",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20
  },
  {
    id: 3344,
    resName: "FoodHunter",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: -56
  },
  {
    id: 4466,
    resName: "ChickenFamily",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 43
  }
]

function App() {
  const [resturantsInfo, setResturantsInfo] = useState(initialRes);
  const [selectRes, setSelectRes] = useState(null);

  function SelectedRes(SelectedRes) {
    setSelectRes(prevRes =>
      prevRes?.id == SelectedRes.id ? null : SelectedRes
    )
  }

  return (
    <div className='app'>
      <div className='sidebar'>
        <Resturants onResInfo={resturantsInfo} onSelect={SelectedRes} selectRes={selectRes} />
        <FormAddResturant />
      </div>
      {selectRes && <SplitBillFrom />}
    </div>
  )
}

export default App

function Resturants({ onResInfo, onSelect, selectRes }) {

  return (
    <ul>
      {onResInfo.map(resInfo => <ResturantInfo info={resInfo} onSelect={onSelect} selectRes={selectRes} />)}
    </ul>
  )
}

function ResturantInfo({ info, onSelect, selectRes }) {
  const isSelected = selectRes?.id === info.id

  return (
    <li>
      <img src={info.image} alt={info.resName} />
      <h4>{info.resName}</h4>

      {info.balance == 0 && <p>{`${info.resName} is even with you`}</p>}
      {info.balance > 0 && <p className='green'>{`${info.resName} ows you ${Math.abs(info.balance)})`}</p>}
      {info.balance < 0 && <p className='red'>{`You owe ${info.resName} ${Math.abs(info.balance)}`}</p>}


      <Button clickIt={() => onSelect(info)}>{isSelected ? "Close" : "Select"}</Button>
    </li>
  )
}

function Button({ children, clickIt }) {
  return <button className='button' onClick={clickIt}>{children}</button>
}

function FormAddResturant() {
  function handleAdd(e) {
    e.preventDefault();
  }
  return (
    <form className='form-add-friend'>
      <label>Resturant name</label>
      <input type="text" />

      <label>Resturant Image</label>
      <input type="text" />

      <Button clickIt={handleAdd}>Add form</Button>
    </form>
  )
}

function SplitBillFrom() {
  function handleSubmit() {

  }
  return (
    <form className='form-split-bill' onSubmit={handleSubmit}>
      <h2>Split title with X</h2>

      <label>Bill value</label>
      <input type="text" />

      <label>Your expense</label>
      <input type="text" />

      <label>X's expense</label>
      <select>
        <option value="user">You</option>
        <option value="resturant">X</option>
      </select>


      <Button type="submit">Split bill</Button>

    </form>
  )
}