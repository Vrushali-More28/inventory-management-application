'use client'
import React ,{useState,useEffect}from "react"; 
import { collection, addDoc, getDoc, querySnapshot,query,onSnapshot,deleteDoc,doc } from "firebase/firestore";
import {db} from'./firebase'
export default function Home() {
  const [items,setItems]=useState([
  ]);
  const [newItem,setNewItem]=useState({name:'',price:''});
  const [total,setTotal]=useState(0);
  //add item to database

  const addItem= async(e)=>{
     e.preventDefault();
     if(newItem.name!=='' && newItem.price!==''){
      //setItems([...items,newItem]);
      await addDoc(collection(db,'items'),{
       name:newItem.name.trim(),
       price:newItem.price.trim(),

      });
      setNewItem({name:'',price:''});
     }
  }
  //read items from database

  useEffect(()=>{
   const q=query(collection(db,'items'));
   const unsubscribe=onSnapshot(q,(querySnapshot)=>
  {
    let itemsArr=[];
    querySnapshot.forEach((doc) => {
      itemsArr.push({...doc.data(),id:doc.id})
    });
    setItems(itemsArr);
    //read total price of items
    const calculateTotal= ()=>{
      const totalprice=itemsArr.reduce(
        (sum,item)=>sum +parseFloat(item.price),0
      );
      setTotal(totalprice);
    };
    calculateTotal();
    return()=>unsubscribe();
  });
  },[]);
  //delete items from database

  const deleteItem = async (id)=>{
    await deleteDoc(doc(db, 'items',id));
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
       <h1 className="text-4xl p-4 text-center">Pantry Tracker Application</h1>
      
      <div className="bg-slate-800 p-4 rounded-lg">
        <form className="grid grid-cols-6 items-center text-black">
          <input 
          value={newItem.name}
          onChange={(e)=> setNewItem({...newItem,name:e.target.value})}
          className='col-span-3 p-3 border' type="text" placeholder='Enter Item'>
          </input>
          <input 
          value={newItem.price}
          onChange={(e)=> setNewItem({...newItem,price:e.target.value})}
          className='col-span-2 p-3 border mx-3' type="number" placeholder='Enter $'>
          </input>
          <button 
          onClick={addItem}
          className='text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl' type="submit">
            +
          </button>
        </form>
        <ul>
          {items.map((item,id)=>(
             <li key={id} className="my-4 w-fill flex justify-between bg-slate-950">
              <div className="p-4 w-full flex justify-between"> 
                <span className="capitalize">{item.name}</span>
                <span>${item.price}</span>
              </div>
              <button onClick={()=>deleteItem(item.id)} className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 x-16">X</button>
             </li>
          ))}
        </ul>
        {items.length <1 ? ('') :(
          <div className="flex justify-between p-3">
          <span>Total</span>
          <span>${total}</span>
          </div> 
        )}
      </div>

      </div>
    </main>
  );
}
