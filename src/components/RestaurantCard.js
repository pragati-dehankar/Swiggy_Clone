import {CDN_URL} from "../utils/constants"

const ReataurantCard=(props)=>{
  //console.log(props);
  const {resData}=props;

  const{
    cloudinaryImageId,
    name,
    avgRating,
    sla,
    cuisines,
    costForTwo
  }=resData?.info;


  const styleCard={
    backgroundColor:"#f0f0f0",
  };

  return(
    <div className="m-5 p-5 w-[220px] shadow-xl bg-gray-50 hover:bg-gray-200  rounded-xl">
      <img
      className="res-img  rounded-lg w-[200px] h-40"
      alt="res-logo"
      src={CDN_URL+ cloudinaryImageId}
      />
      
     <h3  className="font-bold py-4 text-lg">{name}</h3>
      <h4>⭐⭐{avgRating}&nbsp;Stars&nbsp;&nbsp;&nbsp;&nbsp;{sla.deliveryTime}mins</h4>
      {cuisines.join(",")}&nbsp;&nbsp;&nbsp;&nbsp;{costForTwo}
   
   
    </div>
  )
};


//Higher order Components

export const withPromotedCard=(ReataurantCard)=>{
  return (props)=>{
    return (
      <div>
        <label className="absolute bg-black text-white m-2 p-2 rounded-lg">Promoted</label>
        <ReataurantCard {...props}/>
      </div>
    )
  }
}

export default ReataurantCard;