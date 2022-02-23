import React from "react";
import { HashRouter, Routes as ReactRoutes, Route } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ServerList from "../components/ServerList";
import { styled } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { Home } from "@mui/icons-material";

const PageContentBox = styled(Box)({
  gridArea: "PC",
});

export interface RouteItem {
    path: string;
    content: React.ReactNode;
    icon: React.ReactNode;
    isHome?: boolean
}

const routes: RouteItem[] = [
  {
    path: "/",
    content: <Box></Box>,
    icon: <Home />,
    isHome: true
  },
];

const Loading: React.FC = () => {
  return (
    <PageContentBox>
      <CircularProgress />
    </PageContentBox>
  );
};

const Routes: React.FC = () => {
  return (
    <HashRouter>
      <ServerList />
      <ReactRoutes>
        {routes.map((r) => (
          <Route
            path="/"
            element={
              <React.Suspense fallback={<Loading />}>
                <PageContentBox>{r.content}</PageContentBox>
              </React.Suspense>
            }
          />
        ))}
        <Route
          path="*"
          element={
            <PageContentBox>
              <Typography>Page not found. How did you get here?</Typography>
            </PageContentBox>
          }
        />
      </ReactRoutes>
    </HashRouter>
  );
};

export default Routes;
