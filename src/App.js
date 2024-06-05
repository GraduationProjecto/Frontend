import "./App.css";
import MainSection from "./Components/MAinSection/MainSection";
import { RouterProvider, createHashRouter } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";

import "./App.css";
import Products from "./Components/Products/Products";
import SellCar from "./Components/SellCar/SellCar";
import Cart from "./Components/Cart/Cart";
import Wishlist from "./Components/Wishlist/Wishlist";
import AuthLAyOut from "./Layouts/AuthLAyOut";
import SignIn from "./Components/SignIn/SignIn";
import ImportedCars from './Components/ImportedCars/ImportedCars';
import NotFound from "./Components/NotFound/NotFound";
import SignUp from "./Components/SignUp/SignUp";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import StoreContextProvider from "./context/StoreContextProvider";
import ClearData from "./Components/ClearData/ClearData";
import Footer from './Components/Footer/Footer';
import { ToastContainer } from "react-toastify";
import Address from "./Components/Address/Address";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import RateCar from "./Components/RateCar/RateCar";
import Auction from "./Components/Auction/Auction"
import UsedCars from "./Components/UsedCars/UsedCars";
import Navigation from "./Components/Navigation/Navigation";
import SellNewCar from "./Components/SellNewCar/SellNewCar";
import ProtectedLayer from "./Components/ProtectedLayer/ProtectedLayer";
import AuctionDetails from "./Components/AuctionDetails/AuctionDetails";
import CreateAuction from "./Components/CreateAuction/CreateAuction";
import UserProfile from "./Components/Profile/Profile";


function App() {
  let routes = createHashRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <MainSection />,
        },
        {
          path: "/usedCar",
          element: <UsedCars />,
        },
        {
          path: "newCar",
          element: <Products />,
        },
        {
          path: "RateCar",
          element: <RateCar />,
        },{
          path: "Auction",
          element: <Auction />,
        },
        {
          path: "CreateAuction/:id",
          element: <CreateAuction/>,
        },
        {
          path: "Profile",
          element: <UserProfile/>,
        },

        ,{
          path: "Auction/:id",
          element: <AuctionDetails />,
        },
        {
          path: "importedCar",
          element: <ImportedCars />,
        },
        {
          path: "wishlist",
          element: <Wishlist />,
        },
        {
          path: "SellCar",
          element: <Navigation />,
          children: [
            {
              path: "sell-your-car",
              element: (
                <ProtectedLayer>
                  <SellCar />
                </ProtectedLayer>
              ),
            },
            
            { path: "new", element: (
              <ProtectedLayer>
                <SellNewCar />
              </ProtectedLayer>
            )  },
          ],
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "address/:id",
          element: <Address />,
        },
        {
          path: "wishlist",
          element: <Wishlist />,
        },
        {
          path: "productDetails/:id",
          element: <ProductDetails />,
        },

        { path: "*", element: <NotFound /> },
        {
          path: "signIn",
          element: (
            <ClearData>
              <SignIn />
            </ClearData>
          ),
        },
        { path: "signUp", element: <SignUp /> },
        { path: "forgetPassword", element: <ForgetPassword /> },
        { path: "verifyCode", element: <VerifyCode /> },
        { path: "resetPassword", element: <ResetPassword /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer theme="colored" className="mt-5" autoClose="600" />
      <StoreContextProvider>
        <RouterProvider router={routes} />
      
      </StoreContextProvider>
      
    </>
  );
}

export default App;
