import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { BookProvider } from './contexts/BookContext';
import Welcome from './pages/Welcome';
import BookType from './pages/BookType';
import Purpose from './pages/Purpose';
import Audience from './pages/Audience';
import Tone from './pages/Tone';
import Language from './pages/Language';
import GenerateStructure from './pages/GenerateStructure';
import Customize from './pages/Customize';
import GenerateCover from './pages/GenerateCover';
import Result from './pages/Result';
import Generating from './pages/Generating';

const App: React.FC = () => {
  return (
    <BookProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/book-type" element={<BookType />} />
          <Route path="/purpose" element={<Purpose />} />
          <Route path="/audience" element={<Audience />} />
          <Route path="/tone" element={<Tone />} />
          <Route path="/language" element={<Language />} />
          <Route path="/generating" element={<Generating />} />
          <Route path="/generate-structure" element={<GenerateStructure />} />
          <Route path="/customize" element={<Customize />} />
          <Route path="/generate-cover" element={<GenerateCover />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </HashRouter>
    </BookProvider>
  );
};

export default App;