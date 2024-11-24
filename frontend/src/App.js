import {useState} from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx'

function App()
{

   const [msg,setmsg] = useState("")
   const [status,setstatus] = useState(false)
   const [emailList,setemailList] = useState([])

   const handlevalue =(evt) =>{
   setmsg(evt.target.value)
   }

   const handlefile=(event)=>
   {
    const file = event.target.files[0]
    console.log(file)

    const reader = new FileReader(); 
    reader.onload = function(e){
     const data = e.target.result;
     const workbook = XLSX.read(data, {type: 'binary'})
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const emailList = XLSX.utils.sheet_to_json(worksheet,{header:'A'})
    const totalemail = emailList.map(function(item){return item.A})
    console.log(totalemail)
    setemailList(totalemail)
    }

    reader.readAsBinaryString(file);
   }

   const send=()=>
   {
     setstatus(true)
     axios.post("http://localhost:5000/sendmail",{msg:msg,emailList:emailList})
     .then(function(data)
     {
       if(data.data === true)
       {
          alert("Email Sent Successfully") 
          setstatus(false)
       }
       else{
           alert("Failed")
           
       }
     })
   }

  return(

    <div>
       <div className="bg-blue-950 text-white text-center">
       <h1 className="text-2xl font-medium px-5 py-3">BulkMail</h1>
       </div>
     
       <div className="bg-blue-800 text-white text-center">
       <h1 className=" font-medium px-5 py-3">We can help your business with sending multiple emails at once</h1>
       </div>

       <div className="bg-blue-600 text-white text-center">
       <h1 className="font-medium px-5 py-3">Drag and Drop</h1>
       </div>
       
       <div className="bg-blue-400 flex flex-col items-center text-black px-5 py-3">
        <textarea onChange={handlevalue} value={msg} className="w-[80%] h-32 py-2 outline-none px-2 border border-black rounded-md" placeholder="Enter the email text ..."></textarea>
       
        <div>
        <input type="file" onChange={handlefile} className="border-4 border-dashed py-4 px-4 mt-5 mb-5"/>   
       </div>

       <p>Total Emails in the file: {emailList.length}</p>  
     
       <button onClick={send} className="bg-blue-950 mt-2 py-2 px-2 text-white font-medium rounded-md  w-fit">{status?"Sending...":"Send"}</button>


       </div>
      
       <div className="bg-blue-300 p-8 text-white text-center">
       
       </div>

       <div className="bg-blue-200 p-8 text-white text-center">
       
       </div>


    </div>

  );
}


export default App;