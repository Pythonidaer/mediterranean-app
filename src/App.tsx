import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import HomePage from "./pages/HomePage";
import RecipesPage from "./pages/RecipesPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import IngredientSearchPage from "./pages/IngredientSearchPage";
import MealPrepPage from "./pages/MealPrepPage";
import ExternalRecipeDetailPage from "./pages/ExternalRecipeDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/recipes/:slug" element={<RecipeDetailPage />} />
            <Route path="/what-can-i-make" element={<IngredientSearchPage />} />
            <Route path="/meal-prep" element={<MealPrepPage />} />
            <Route
              path="/external-recipes/themealdb/:id"
              element={<ExternalRecipeDetailPage />}
            />
            <Route path="/not-found" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </HashRouter>
  );
}
