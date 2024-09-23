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
  const [showAddFriend, setShowAddFriend] = useState(false);

  function SelectedRes(SelectedRes) {
    setSelectRes(prevRes =>
      prevRes?.id == SelectedRes.id ? null : SelectedRes
    )
  }

  function addresturant(res) {
    setResturantsInfo(prev => [...prev, res])
    setShowAddFriend(false)
  }

  function handleSplitBill(value) {
    setResturantsInfo(prev => prev.map(res => res.id === selectRes.id ? { ...res, balance: res.balance + value } : res))
    setSelectRes(null)
  }

  return (
    <div className='app'>
      <div className='sidebar'>
        <Resturants onResInfo={resturantsInfo} onSelect={SelectedRes} selectRes={selectRes} />
        {showAddFriend && <FormAddResturant onAddRes={addresturant} />}
        <div style={{ marginTop: "10px" }}>
          <Button clickIt={() => setShowAddFriend(show => !show)}>{showAddFriend ? "Close" : "Add resturant"}</Button>
        </div>
      </div>
      {selectRes && <SplitBillFrom info={selectRes} onSplit={handleSplitBill} />}
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
      {info.balance > 0 && <p className='green'>{`${info.resName} ows you ${Math.abs(info.balance)}`}</p>}
      {info.balance < 0 && <p className='red'>{`You owe ${info.resName} ${Math.abs(info.balance)}`}</p>}


      <Button clickIt={() => onSelect(info)}>{isSelected ? "Close" : "Select"}</Button>
    </li>
  )
}

function Button({ children, clickIt }) {
  return <button className='button' onClick={clickIt}>{children}</button>
}

function FormAddResturant({ onAddRes }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  function handleAdd(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newResturant = {
      resName: name,
      image: `${image}?=${id}`,
      balance: 0,
      id
    }

    onAddRes(newResturant)
    setName("")
    setImage("https://i.pravatar.cc/48")
  }
  return (
    <form className='form-add-friend' onSubmit={handleAdd}>
      <label>Resturant name</label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />

      <label>Resturant Image</label>
      <input type="text" value={image} onChange={e => setImage(e.target / value)} />

      <Button>Add form</Button>
    </form>
  )
}

function SplitBillFrom({ info, onSplit }) {
  const [paidByUser, setPaidByUser] = useState("");
  const [bill, setBill] = useState();
  const friendPaid = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");


  function handleSubmit(e) {
    e.preventDefault();
    onSplit(whoIsPaying === "user" ? friendPaid : -paidByUser)

  }
  return (
    <form className='form-split-bill' onSubmit={handleSubmit}>
      <h2>Split title with {info.resName}</h2>

      <label>Bill value</label>
      <input type="text" value={bill} onChange={e => setBill(Number(e.target.value))} />

      <label>Your expense</label>
      <input type="text" value={paidByUser} onChange={e => setPaidByUser(Number(e.target.value > bill ? paidByUser : e.target.value))} />

      <label>{info.resName}'s expense</label>
      <input type="text" disabled value={friendPaid} />

      <label>Who is paying the bill</label>
      <select onChange={e => setWhoIsPaying(e.target.value)}>
        <option value="user">You</option>
        <option value="resturant">{info.resName}</option>
      </select>


      <Button type="submit">Split bill</Button>

    </form>
  )
}