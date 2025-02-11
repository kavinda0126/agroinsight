import React from "react";
import Header from "../Header/Header";
import SideBar from "./AgriSidebar/AgriSideBar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import AgriMain from "./Main/AgriMain";
import CropRotator from "./CropRotator/CropRotator";
import DiseaseTracker from "./DiseaseTracker/DiseaseTracker";
import AddNewAlert from "./DiseaseTracker/Pages/AddNewAlert";
import FertilizeGuidance from "./FertilizerTracker/FertilizeGuidance";
import NewRotatorModel from "./CropRotator/Pages/NewRotatorModel";
import RotatorModel from "./CropRotator/Pages/RotatorModel";
import NewRotatorAlert from "./CropRotator/Pages/NewRotatorAlert";

export default function AgriAdmin({ toggleLoading }) {
  return (
    <div>
      <>
        <Header />
        <SideBar />
        <Routes>
          <Route
            path="/"
            element={<AgriMain toggleLoading={toggleLoading} />}
          />

          {/** crop rotation routes */}
          <Route path="crops" element={<CropRotator />} />
          <Route path="crops/addmodel" element={<NewRotatorModel />} />
          <Route path="crops/rotator" element={<RotatorModel />} />
          <Route path="crops/rotator-alert" element={<NewRotatorAlert />} />

          {/* Disease Routes */}
          <Route path="diseases" element={<DiseaseTracker />} />
          <Route path="diseases/addalert" element={<AddNewAlert />} />

          <Route
            path="fertilizers&pesticides/*"
            element={<FertilizeGuidance toggleLoading={toggleLoading} />}
          />
        </Routes>
      </>
    </div>
  );
}
