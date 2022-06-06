import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import IndexPage from "./pages/IndexPage";
import CampaignPage from "./pages/CampaignPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import withContext from "./context"
import { tagManagerArgs } from './constants';
import TagManager from 'react-gtm-module'


const App = () => {

  useEffect(() => {
    TagManager.initialize(tagManagerArgs)
  }, [])

  return (
    <Router>
      <Header />
      <Box mt={Header.HEIGHT} maxW="1440px" mx="auto">
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/campaigns/:id" element={<CampaignPage />} />
        </Routes>
      </Box>
      <Footer />
    </Router>
  );
}


export default withContext(App);
