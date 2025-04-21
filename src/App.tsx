import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { ConfigProvider, theme } from "antd";
import { ThemeProvider } from "./context/ThemeContext";

const AppRoutes: React.FC = () => {
  const element = useRoutes(routes);
  return element;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ConfigProvider
        theme={{
          algorithm: [theme.defaultAlgorithm, theme.darkAlgorithm],
        }}
      >
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default App;
