import { useState,useEffect, useRef } from "react";
import Form from "../form/Form";

function Contain() {
    const [data, setdata] = useState({
        name: "",
        email: "",
        number: ""
    });
    let [datat,setdatat] = useState(0);
   const [loading , setloading] = useState(true);
   const refobj =  useRef(0);
  
    useEffect (()=>{
         async function collectdata(){
           let data  = await fetch('https://api.github.com/users/ayushsnha');
           let res = await data.json();
           console.log(res);

        }
        collectdata();
         setTimeout(()=>{
            
            console.log("component mounted")
            setdata({
                name: "John Doe",
                email: "johndoe@example.com",
                number: "1234567890"
            })
            
            setloading(false);
            
       },3000)
         return ()=>{console.log("component unmounted ")}
        },[])
      
     if(loading){
        return <div>Loading...</div>
     }
     
    function submitData(name) {
        // refobj.current.style.background = 'gray';
        console.log(refobj.current)
        refobj.current = refobj.current + 1;
        // setdatat((sat)=>sat=name);
        // console.log(datat);
    }

    function updatestate(name,value){
        setdata(data => {

            return (
                { ...data,[name]:value,
                }
            )
        })
    }
  
 

    function change(e) {
     let {name , value } = e.target;
     if(name === 'name'){
       
        const isValid =  /^(?!.*\s{2,})[a-zA-Z\s]*$/.test(value);
        console.log(value)
        isValid ?  updatestate(name,value) : console.log("enter valid name")
     }else if(name === 'email'){
         updatestate(name,value);

     }else{
        const isValid = /^[0-9]*$/.test(value); 
        isValid ?  updatestate(name,value) : console.log("enter valid number")
     }
       
    }
    return (
        <>
            <div className="outer-div">
                <div className="center-div">
                    <h1 >
                        useRef valu{refobj.current}
                        Log in {datat}
                    </h1>
                    <Form  data = {data} submitData = {submitData} change = {change}/>
                </div>
            </div>
        </>


    )
}

export default Contain;