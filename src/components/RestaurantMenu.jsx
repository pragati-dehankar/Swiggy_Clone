import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { useEffect, useState } from "react";
import { MENU_API } from "../utils/constants";
import ResCategory from "./ResCategory";

const RestaurantMenu=()=>{

  const [resInfo,setResInfo]=useState(null);


  const {resId}=useParams();

  const [showIndex,setShowIndex]=useState();


useEffect(()=>{
  fetchMenu();
},[]);

const fetchMenu=async()=>{
  const data=await fetch(MENU_API+resId)
  const json=await data.json();
  console.log(json);
  setResInfo(json.data);
};

if(resInfo===null) return <Shimmer/>


  const {name,cuisines,
  cloudinaryImageId,
  costForTwoMessage}=resInfo?.cards[0]?.card?.card?.info;

  const{itemCards}=resInfo?.cards[2]?.groupedCard?.cardGroupMap?.
  REGULAR?.cards[1]?.card?.card;

  const categories=resInfo?.cards[2]?.groupedCard?.cardGroupMap?.
    REGULAR?.cards.filter(c=>c.card?.card?.["@type"]==="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");

   console.log(categories);
return (
    <div className="text-center">
       <h1 className="font-bold my-5 text-2xl">{name}</h1>
     <p className="font-bold text-lg">
        {cuisines.join(",")}-{costForTwoMessage}
      </p>
      {categories.map((category,index)=>(
        <ResCategory key={category?.card?.card?.title} data={category?.card?.card} 
        showItems={index === showIndex?true:false}
        setShowIndex={()=>setShowIndex(index)}/>
      ))} 
      </div>
       );
      };






  //  <ul>
  //       {itemCards.map((item)=> (
  //       <li key={item.card.info.id}>
  //         {item.card.info.name}-{"Rs."}
  //       {item.card.info.price/100   || item.card.info.defaultPrice/100 } 
  //       </li>
  //       ))}
  //     </ul> 
   
 

export default RestaurantMenu;