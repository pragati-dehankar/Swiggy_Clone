import ReataurantCard,{withPromotedCard} from "./RestaurantCard";
import { useEffect, useState } from "react";   //Hooks
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import CircleRes from "./CircleRes";


const Body=()=>{
   //Local state variable 
  const[listOfRestaurants,setListOfRestaurants]=useState([]);
  //console.log("rendered");
  const[filteredRestaurant,setFilteredRestaurant]=useState([]);
  const[searchText,setSearchText]=useState("");
 

  const RestaurantCardPromoted=withPromotedCard(ReataurantCard)

  useEffect(()=>{
      fetchData();
  },[]);

  const fetchData=async()=>{
    const data= await fetch(
     "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
     //"https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
    );
    const json=await data.json();

   // console.log(json);

setListOfRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
//console.log(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  };
  //conditional rendering.
  // if(ListOfRestaurants.length===0){
  //   return <Shimmer/>
  // }


// normal js var.
  let listOfRestaurantsJS=[]//unused just for understand.

  const onlineStatus=useOnlineStatus();
  if(onlineStatus===false) return (<h1>!!_Please check your Internet connection_!!</h1>)

  return  listOfRestaurants.length===0 ? (
  <Shimmer/>
  ):(
    <div className="body">
     <div>
      <CircleRes/>
     </div>


      <div className="filter flex">
        <div className="search m-4 p-4">
          <input type="searchBar" className="border border-solid border-black" placeholder="what you want to eat" value={searchText} 
          onChange={(e)=>{
            setSearchText(e.target.value);//e=>event
          }}
          />
        <button  className="px-4 py-1 bg-green-200 m-4 rounded-lg"
        onClick={()=>{
          //filter the Restaurants cards and update the UI.
          console.log(searchText);
         const filteredRestau= listOfRestaurants.filter((res)=>res.info.name.toLowerCase().includes(searchText.toLowerCase()));
          setFilteredRestaurant(filteredRestau);
        }}
          >Search</button> 
        </div>

        <div className="m-4 p-4 flex items-center" >
        <button className="px-4 py-2 bg-black text-red-800 rounded-lg"  
        onClick={()=>{
          const filteredList= listOfRestaurants.filter(
            (res)=> res.info.avgRating>4
            )
            setListOfRestaurants(filteredList);
          //console.log(ListOfRestaurants);
        }}>
          Top Rated Restaurants
          </button>
          </div>
    
      </div>
         <div className="res-container flex flex-wrap">
          {
            filteredRestaurant.map(restaurant=> (
           <Link 
           key={restaurant.info.id}
           to={"/restaurants/"+restaurant.info.id}>
           {
            restaurant.info.promoted ? (<RestaurantCardPromoted resData={restaurant}/>) : (<ReataurantCard resData={restaurant}/>)
           }
           
            </Link> 
            ))
          }
              

            {/* <ReataurantCard resData={resList[0]}/>
            <ReataurantCard resData={resList[1]}/>
            <ReataurantCard resData={resList[2]}/>
            <ReataurantCard resData={resList[3]}/>
            <ReataurantCard resData={resList[4]}/>
            <ReataurantCard resData={resList[5]}/>
            <ReataurantCard resData={resList[6]}/>
            <ReataurantCard resData={resList[7]}/>
            <ReataurantCard resData={resList[8]}/>
            <ReataurantCard resData={resList[9]}/>
            <ReataurantCard resData={resList[10]}/>
            <ReataurantCard resData={resList[11]}/>
          */}

         </div>
    </div>
  );
};

export default Body;