import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import IndexPage from "./pages/IndexPage";
import CampaignPage from "./pages/CampaignPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import withContext from "./context";

const App = () => (
  <Router>
    <Header />
    <Box mt={Header.HEIGHT}>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/campaigns/:id" element={<CampaignPage />} />
      </Routes>
    </Box>
    <Footer />
  </Router>
);

export default withContext(App);
