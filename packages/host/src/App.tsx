import { Suspense, lazy } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";

import { Home, CardProfile } from "./pages";

import useChannels from "./useChannels";

const RegistryProfile = lazy(() => import("@registries/RegistryProfile"));

function App() {
  useChannels();

  return (
    <Box sx={{ padding: 2, display: "grid", gap: 2 }}>
      <Box component="header">
        <p>Host</p>
        <Link to="..">Back</Link>
      </Box>
      <Routes>
        <Route path="/" element={<Home />} index />
        <Route
          path="/profiles"
          element={
            <Suspense fallback="Loading...">
              <RegistryProfile />
            </Suspense>
          }
        />
        <Route path="/profiles/:id" element={<CardProfile />} />
      </Routes>
    </Box>
  );
}

export default App;
