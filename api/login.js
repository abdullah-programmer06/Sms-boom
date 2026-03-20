export default function handler(req,res){

  const {id,pass}=req.query;

  const LICENSES=[
    {id:"blueanzo حكر",pass:"463910",exp:"2027-03-01",active:true},
    {id:"1",pass:"1",exp:"2027-03-26",active:false},
    {id:"mahabubremon925",pass:"Remon@1200",exp:"2027-03-26",active:true},
    {id:"fahim",pass:"056810",exp:"2027-03-26",active:true},
    {id:"Hasib",pass:"53",exp:"2026-03-17",active:true},
    {id:"client1",pass:"client123",exp:"2026-12-31",active:false}
  ];

  const u = LICENSES.find(x=>x.id===id && x.pass===pass);

  if(!u)
    return res.json({ok:false,msg:"Invalid"});

  if(!u.active)
    return res.json({ok:false,msg:"Account Offline"});

  if(new Date()>new Date(u.exp))
    return res.json({ok:false,msg:"Expired"});

  res.json({ok:true,expires:u.exp});
}