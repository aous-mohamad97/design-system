import { Routes, Route } from 'react-router-dom';


function Home() {
  return (
    <div className="font-sans">
      <h1 className="text-2xl font-heading font-semibold mb-2">Welcome</h1>
      <p className="text-foreground-secondary">Select a module from the navigation.</p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
