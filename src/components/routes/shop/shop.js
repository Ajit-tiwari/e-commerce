import { Routes, Route } from 'react-router-dom';
import { CategoryPreviewRoute } from '../category-preview/category-preview-route';
import Category from '../category/category';

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoryPreviewRoute />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;