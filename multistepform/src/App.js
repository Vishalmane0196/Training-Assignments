// import logo from './logo.svg';
import {  useEffect,useState } from 'react';
import './App.css';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from 'react-hook-form'
import Formone from './components/From/Formone.js';
import Formfour from './components/From/Formfour.js';
import Fromtwo from './components/From/Fromtwo.js';
import Formthree from './components/From/Formthree.js';
import ThankU from './components/From/ThankU.js';
import { sidebarinfo } from './data/Info.js';
import Side from './components/card/Side.js';
function App() {
   let localData = JSON.parse(localStorage.getItem('data')) || {};
   const schema = yup.object({
      name: yup.string().trim().required().max(30).matches(/^[a-zA-Z\s]{1,30}$/, "Name can only contain letters and spaces").matches(/^(?!.*\s{3,}).*$/,'not have more than two consecutive spaces'),
      phone: yup.number().positive().integer().required().test('len', 'Must be exactly 10 digits', val => val && val.toString().length === 10),
      email: yup.string().trim().email().required(),
      
   }).required()

   const [state, setState] = useState(1);
   const [selectedCard, setSelectedCard] = useState('Arcade');
   const { register, handleSubmit,setValue, formState: {errors } ,getValues} = useForm({resolver : yupResolver(schema)});
   
   const [flag, setflag] = useState(false);
   const [addons, setAddOns] = useState([]);
   // Monthly Yearly Switch
   async function togglefun() {
      await setflag((flag)=>{
         localData.monthlyYearlySwitch =!flag;
         localStorage.setItem('data',JSON.stringify(localData))
         return !flag;
      });
      
   }
   // Increment the Stage
   const handleClick =  () => {
   setState((pre)=>{
      localData.step = pre+1;
      localStorage.setItem('data', JSON.stringify(localData))
      return localData.step ;
   })

   }
   // Decrement the Stage
   const handleClickback = () => {
     setState((prevState) => {

      localData.step =  prevState - 1;
      localStorage.setItem('data', JSON.stringify(localData));
      return localData.step ;
   });
   }
   // Submit form data
   function sumitcallback(data) {
      
        if(data?.name){
         localData.personal = data;
         localStorage.setItem('data',JSON.stringify(localData));
        }
         handleClick();
   }
    useEffect(()=>{
            
            if(localData.length === 0) return;
            async function loadDataToInForm(){
                 await setState(localData.step || 1);
                 await setValue('name',localData.personal?.name);
                 await setValue('email',localData.personal?.email);
                 await setValue('phone',localData.personal?.phone);
                 await setSelectedCard(localData.plan || 'Arcade');
                 await setflag(localData.monthlyYearlySwitch || false);
                 await setAddOns( localData.addAddon || []);
             }
             loadDataToInForm();
    },[])
   
   function checkState() {
      switch (state) {
         case 1:
            return <Formone errors={errors} register={register} handleSubmit={handleSubmit} sumitcallback={sumitcallback} />;
         case 2:
            return <Fromtwo setSelectedCard={setSelectedCard} selectedCard={selectedCard} handleClickback={handleClickback} togglefun={togglefun} flag={flag} sumitcallback={sumitcallback} />;

         case 3:
            return <Formthree handleSubmit={handleSubmit} handleClickback={handleClickback} sumitcallback={sumitcallback} flag={flag} addons={addons} setAddOns={setAddOns} />;
         case 4:
            return <Formfour  selectedCard={selectedCard} handleClickback={handleClickback} sumitcallback={sumitcallback} flag={flag} setState={setState} addons={addons} />;

         default:
            return <ThankU />
      }
   }

   return (
      <>
         <div className="cantainer">
            <div className="content">
               <div className="content-tab">
                  <div className="process-status">
                     {sidebarinfo.map((e, i) => {
                        return (
                           <Side key={i} setState={setState} getValues={getValues} step={e.step} name={e.name} state={state} />
                        )
                     })}
                  </div>
               </div>
               <div className="content-form">
                  <div className="from-div">
                     {/* {form Space} */}

                     {checkState()}

                  </div>
               </div>
            </div>
         </div>

      </>

   );
}




export default App;