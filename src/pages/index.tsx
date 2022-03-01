import React from "react";
import {
  BrowserRouter,
  Routes as ReactRoutes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ServerList from "../components/ServerList";
import { styled } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { Home, ViewAgenda } from "@mui/icons-material";
import HomePage from "./HomePage";
import EditorPage from "./EditorPage";
import { UserContext } from "../lib/firebase/context";
import Layout from "../components/Layout/index";
import LoginPage from "./LoginPage";

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

const RequireAuth: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { user } = React.useContext(UserContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <React.Fragment>
      <ServerList items={routes} />
      {children}
    </React.Fragment>
  );
};

const Routes: React.FC = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <BrowserRouter>
        <ReactRoutes>
          {routes.map((r, index) => (
            <Route
              key={index}
              path={r.path}
              element={
                <React.Suspense fallback={<Loading />}>
                  <Layout>
                    <RequireAuth>
                      <PageContentBox>{r.content}</PageContentBox>
                    </RequireAuth>
                  </Layout>
                </React.Suspense>
              }
            />
          ))}
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="*"
            element={
              <PageContentBox>
                <Typography>Page not found. How did you get here?</Typography>
              </PageContentBox>
            }
          />
        </ReactRoutes>
      </BrowserRouter>
    </Box>
  );
};

export default Routes;
