import React, { Component, useState } from "react";
// import "font-awesome/css/font-awesome.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import * as constants from "../../config/constants";


function Product(props) {
  const [tag, setTag] = useState(props.tag);
  console.log("tag in card is : " + tag);
  const navigate = useNavigate();
 
  const handleAddToFav = (e)=>{
    const newItem = {
      email_id : localStorage.getItem('username'),
      name: tag.name,
      description: tag.description,
      price: tag.price,
      shop_name: tag.shop_name,
      category: tag.category,
      quantity: tag.quantity,
      image: tag.image,
    };
    //code to add user object
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');

    axios
      .post("/favourites/addTofavourites", newItem)
      .then((response) => {
        console.log("Status Code : ", response.status);
        // if (
        // //   response.status === 200 &&
        // //   response.data === constants.ITEM_ADDED_SUCCESSFULLY
        // ) {
        //   alert("Item added to Favourites succussesfully.");
        // }
      });
    alert("Item added to Favourites")
    //todo add handling for fav
  }
  return (
    <div className="card m-2">
      <div className="card-body">
        
        {/* <img src="https://picsum.photos/id/1010/200" alt="Customer" /> */}
        {/* <img src={tag.image} alt="Customer" width="200" height="200"/> */}
        <div>
          {/* Product Id is {product.id} */}
          <span className="pull-right hand-icon">
            <i className="fa fa-times"></i>
          </span>
        </div>
        <button class="col-md-auto tagblock"><p>{tag.tagName}</p></button>
        <h5 className="pt-2">{tag.tagName} </h5>
        <div>Description : {tag.description} </div>
        {/* <div>Available Quantity : {product.quantity}</div> */}
      </div>
      <div className="card-footer">
        {tag.quantity<1 && <div><div>Item Out of stock</div><button className="btn btn-primary"  >View Item</button><br /><br /></div>}
        {tag.quantity>0 && <div><button className="btn btn-primary"  >Buy Now</button><br /><br /></div>}
        
        {/* <button className="btn btn-primary" onClick={handleAddToFav}>Add to Fav</button> */}
      </div>
    </div>
  );
}

export default Product;
