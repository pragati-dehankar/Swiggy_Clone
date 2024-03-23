import {IMG_ID, RES_API} from "../utils/constants";
import { useEffect, useState } from "react";

const CircleRes=()=>{

  const [homeInfo,setHomeInfo]=useState();

  useEffect(()=>{
    fetchRes();
  },[]);

const fetchRes=async()=>{
 const data=await fetch(RES_API);
 const json=await data.json();
 console.log(json);
 setHomeInfo(json.data)
}

// const{imageId}=homeInfo?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info
// ?.frequencyCapping;


  return(
    <div>
     hey
    </div>
  )
};

export default CircleRes;