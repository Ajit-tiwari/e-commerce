import React from "react";

import CategoryItems from "../category-items/category-items";

export default function Categories(props){
    return (
        <div className="categoties-container">
            {props.category.map((obj)=>{
              return  <CategoryItems key={obj.id} item={obj} />
            })}
        </div>
    )
}