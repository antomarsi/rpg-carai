import React from "react";
import { HashRouter, Routes as ReactRoutes, Route } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ServerList from "../components/ServerList";
import { styled } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { Home, ViewAgenda } from "@mui/icons-material";
import HomePage from "./HomePage";
import EditorPage from "./EditorPage";

const PageContentBox = styled(Box)({
  gridArea: "PC",
});

export interface RouteItem {
  path: string;
  content: React.ReactNode;
  icon: React.ReactNode;
  isHome?: boolean;
}

const routes: RouteItem[] = [
  {
    path: "/",
    content: <HomePage />,
    icon: <Home />,
    isHome: true,
  },
  {
    path: "/editor",
    content: <EditorPage />,
    icon: <ViewAgenda />,
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
      <ServerList items={routes} />
      <ReactRoutes>
        {routes.map((r, index) => (
          <Route
            key={index}
            path={r.path}
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
