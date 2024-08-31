import { useState } from "react"
import { toppings } from "./data"

function App() {
  const [price,setPrice] = useState(0)
  const [checkList,setcheckList] = useState({
    inputList :[],
    listPrice : [],
    finalList : [],
    finalPrice : [],
    total : 0
  })
  // console.log(toppings)
  console.log(checkList.listPrice)
  console.log(checkList.finalPrice)
  function totalPriceAdjust(price,e){
    if(e.target.checked){
      setcheckList(prv=>({...prv,inputList:[...(prv.inputList),e.target.name],listPrice:[...prv.listPrice,price]}))
      setPrice(prv=>((Math.round((+prv+price)*10)/10).toFixed(2)))
    }
    else {
      setcheckList(prv=>{
        let newArr = [...(prv.inputList)]
        newArr.splice(prv.inputList.findIndex(el=>el==e.target.name),1)
        let priceArr = [...(prv.listPrice)]
        priceArr.splice(prv.inputList.findIndex(el=>el==e.target.name),1)
        return {...prv,inputList :newArr,listPrice:priceArr}
      })
      setPrice(prv=>((Math.round((+prv-price)*10)/10).toFixed(2)))
  }
}

function hdlSubmit(e){
  e.preventDefault();
  setcheckList(prv=>{
    return {...prv,finalList:[...prv.inputList],finalPrice:[...prv.listPrice],total :prv.listPrice.reduce((acc,curr)=>acc+curr) }
  })
}
  return (
    <>
    <div className="flex justify-center flex-col items-center min-h-screen">
    <div className="w-1/4 border px-16 py-8">

    <h1 className="text-3xl">Select Topping...</h1>
    <br/>
    <form className="w-full bg-blue-100 p-4 border-2 border-gray-700" onSubmit={hdlSubmit}>
    {toppings.map((el)=>(<div className="flex justify-between shadow-md border border-black p-1.5">
      <label><input type="checkbox"name={el.name} onChange={(e)=>totalPriceAdjust(el.price,e)}/> {el.name}</label>
      <p>{el.price.toFixed(2)}</p>
      </div>))}
    <div className="flex justify-between"><p>Total</p><p>{price}</p></div>
    <button className="bg-white border-2 border-black w-">Check out</button>
    </form>
    {checkList.finalList.map((el,index)=><div className="flex justify-between shadow-md border border-gray-400 m-1 p-1.5 bg-green-200"><p>{el}</p><p>${checkList.finalPrice[index].toFixed(2)}</p></div>)}
    {checkList.total==0?<></>:<div className="flex justify-between m-2 bg-red-400 p-1.5"><p>Total</p><p>{checkList.total}</p></div>}
    </div>
    </div>
    
    </>
  )
}

export default App
