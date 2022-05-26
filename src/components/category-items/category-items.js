import React from "react";

export default function CategoryItems({ item }){
    console.log(item.title);
    let {title,imageUrl} = item;
    return (
        <div className="category-item-container" style={{backgroundImage: `URL(${imageUrl})`}}>
            <div className="category-item-container-body" >
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    )
}