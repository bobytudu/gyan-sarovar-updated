import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { ConfigProvider, theme } from "antd";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

const AppRoutes: React.FC = () => {
  const element = useRoutes(routes);
  return element;
};

const ThemedApp: React.FC = () => {
  const { theme: currentTheme } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm:
          currentTheme === "dark"
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
      }}
    >
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ConfigProvider>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
};

export default App;
