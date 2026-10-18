import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Archive from "./pages/Archive";
import ArticlePage from "./pages/ArticlePage";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Topics from "./pages/Topics";

function Router() {
  return <WouterRouter base={import.meta.env.BASE_URL}><Switch><Route path="/" component={Home} /><Route path="/articles/:slug" component={ArticlePage} /><Route path="/archive" component={Archive} /><Route path="/topics" component={Topics} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch></WouterRouter>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
