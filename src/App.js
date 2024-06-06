import "./App.css";
import MainSection from "./Components/MAinSection/MainSection";
import { RouterProvider, createHashRouter } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import 'font-awesome/css/font-awesome.min.css';
import "./App.css";
import Products from "./Components/Products/Products";
import SellCar from "./Components/SellCar/SellCar";
import Profile from './Components/Profile/Profile';
import SignIn from "./Components/SignIn/SignIn";
import ImportedCars from './Components/ImportedCars/ImportedCars';
import NotFound from "./Components/NotFound/NotFound";
import SignUp from "./Components/SignUp/SignUp";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import StoreContextProvider from "./context/StoreContextProvider";
import ClearData from "./Components/ClearData/ClearData";
import { ToastContainer } from "react-toastify";
import RateCar from "./Components/RateCar/RateCar";
import Auction from "./Components/Auction/Auction"
import UsedCars from "./Components/UsedCars/UsedCars";
import Navigation from "./Components/Navigation/Navigation";
import SellNewCar from "./Components/SellNewCar/SellNewCar";
import ProtectedLayer from "./Components/ProtectedLayer/ProtectedLayer";
import AuctionDetails from "./Components/AuctionDetails/AuctionDetails";
import CreateAuction from "./Components/CreateAuction/CreateAuction";


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
          path: "/usedCar/:id",
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
          element: <Profile/>,
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
