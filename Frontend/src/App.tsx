import { ChakraProvider } from "@chakra-ui/react";
import theme from "./utils/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Show from "./pages/Show";
import { useEffect, useState } from "react";
import { GymRecord } from "./utils/GymRecords";

function App() {

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Create />} />
          <Route path="/show" element={<Show />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
