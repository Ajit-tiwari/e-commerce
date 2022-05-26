import React from "react";
import {Link} from "react-router-dom";
import ProductCard from "../product-card/product-card"

export default function CategoryPreview({title, product}){
    console.log(title,product);
    return (
        <div className="category-preview-container">
            <h2 className="title">
                <Link to={title}>{title.toUpperCase()}</Link>
            </h2>
            <div className="product-card-container">
                {
                    product
                     .filter((_,idx) => idx < 4)
                     .map((item)=>{
                        return <ProductCard key={item.id} product={item} />
                     })
                }
            </div>
        </div>
    )
}