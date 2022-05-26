
import Home from "./components/routes/home";
import Navigation from "./components/routes/navigation/navigation";
import Auth from "./components/routes/auth/auth";
import {Routes, Route} from "react-router-dom";
import Shop from "./components/routes/shop/shop";
import Checkout from "./components/routes/checkout/checkout";


function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/shop/*" element={<Shop />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
