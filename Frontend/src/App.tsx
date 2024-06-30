import { ChakraProvider } from '@chakra-ui/react'
import theme from './utils/theme'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Create from './pages/Create'
import Delete from './pages/Delete';
import Update from './pages/Update';

function App() {

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Create />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="/update" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App
