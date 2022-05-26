import {useContext, Fragment} from "react";
import { categoriesContext } from "../../context/user-context";
import CategoryPreview from "../../category-preview/category-preview";

export function CategoryPreviewRoute(){
    let {categories} = useContext(categoriesContext);
    return (
        
            <Fragment>
                {Object.keys(categories).map((title) => {
                    let productItem = categories[title];
                    console.log(productItem);
                    return (
                        <CategoryPreview key={title} title={title} product={productItem} />
                    )
                })}
            </Fragment>
        
    );
}