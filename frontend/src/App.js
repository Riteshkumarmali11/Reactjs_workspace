// Filename - App.js
import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { Dashboard, OurAim, OurVision } from "./pages/Dashboard";
import { Events, EventsOne, EventsTwo, } from "./pages/Events";
import Contact from "./pages/ContactUs";
import Support from "./pages/Support";
//import FarmerDetails from './pages/FarmerDetails';
import Login from "./Login";
//import Search from "./pages/Search";
import FarmerData from "./pages/FarmerData";
import Plantation from "./pages/Plantation";
import FarmerDetails from "./pages/FarmerDetails";
import PlantationList from "./pages/PlantationList";
import HarvestingOrderList from "./pages/HarvestingOrderList";
import Login1 from "./Login1";


function App() {

	return (
		<>	
			<Router>


				<Routes>
					<Route path="/" element={<Login1 />} />
					<Route path="/sidebar" element={<Sidebar />} />
					<Route path="/Dashboard" element={<Dashboard />} />
					<Route path="/about-us/aim" element={<OurAim />} />
					<Route path="/about-us/vision" element={<OurVision />} />
					<Route path="/Plantation" element={<Plantation />} />
					<Route path="/FarmerDetails" element={<FarmerDetails />} />
					<Route path="/FarmerData" element={<FarmerData />} />
					<Route path="/PlantationList" element={<PlantationList />} />
					<Route path="/HarvestOrderList" element={<HarvestingOrderList />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/events" element={<Events />} />
					<Route path="/support" element={<Support />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
