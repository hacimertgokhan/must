import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Navigation from "./components/Navigation.jsx";
import Settings from "./pages/Settings.jsx";
import {
    SidebarProvider
} from "@/components/ui/sidebar.jsx";
import {AppSidebar} from "@/components/Sidebar.jsx";

function App() {
    return (
        <SidebarProvider>
            <Router>
                <AppSidebar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </Router>
        </SidebarProvider>
    );
}

export default App;
