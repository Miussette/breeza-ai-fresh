import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./pages/WelcomeScreen";
import MindBuddyChat from "./pages/MindBuddyChat";
import ReduceStressPage from "./pages/ReduceStressPage";
import SelfCarePage from "./pages/SelfCarePage";
import LearnSkillPage from "./pages/LearnSkillPage";
import PerformancePage from "./pages/PerformancePage";
import TestimonyPage from "./pages/TestimonyPage";
import MindfulnessPage from "./pages/MindfulnessPage";
import "./styles/theme.css";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Pantalla de bienvenida */}
        <Route path="/" element={<WelcomeScreen />} />

        {/* Pantalla de sesión con el chatbot */}
        <Route path="/session" element={<MindBuddyChat />} />

        {/* Pantallas secundarias de opciones */}
        <Route path="/reduce-stress" element={<ReduceStressPage />} />
        <Route path="/self-care" element={<SelfCarePage />} />
        <Route path="/learn-skill" element={<LearnSkillPage />} />
        <Route path="/mindfulness" element={<MindfulnessPage />} />
        
        {/* Páginas de navegación */}
        <Route path="/performance" element={<PerformancePage />} />
        <Route path="/testimony" element={<TestimonyPage />} />
      </Routes>
    </Router>
  );
}