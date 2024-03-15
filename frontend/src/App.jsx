import { useEffect, useState } from 'react'
import './App.css'
import io from 'socket.io-client'
const socket = io("/"); 


function App() {
  const [message, setMessage] = useState(""); 
  const [messages, setMessages] = useState([]); 
  const handleSubmit = (e) =>{
    e.preventDefault(); 
    console.log(message);
    const newMessage = {
      data: message,
      user: "Me"
    }
    setMessages([...messages, newMessage]); 
    socket.emit("message", message ); 
    e.target.reset(); 
  }

  useEffect(()=>{
    socket.on("message_response" ,reciveMessage)
    return ()=>{
      socket.off("message_response" ,reciveMessage); 
    }
  },[])
  const reciveMessage = (message) =>{
    setMessages((state)=>{return [...state, message]})
  } 
  return (
    <div className='h-screen w-full  text-white flex items-center justify-center flex-col'>
    <form action="" onSubmit={handleSubmit} className='bg-zinc-900 p-10 '>
      <h1 className='text-2xl font-bold  my-2'>Chat React</h1>
      <input type="text" placeholder='Write your message...' 
      className='border-2 border-zinc-500 p-2 w-full text-black'
      onChange={(e) => {setMessage(e.target.value)}} />
    <ul>
      {
        messages?.map((message,index)=>{
          return <li key={index} className={`my-2 p-2 table  rounded-md  ${
            message.user === "Me" ? "bg-sky-700 " : "bg-black ml-auto"
          }`}
          
          > <span className='text-xs text-slate-500 font-bold block'> {message.user} : </span>  <span className='text-sm'>{message.data}</span></li>
        }) 
      }
    </ul>
    </form>
    </div>
  )
}

export default App
