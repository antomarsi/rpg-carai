import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import React from "react";
import ServerButton from "./ServerButton";
import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../lib/firebase/firebase";
import { UserContext } from "./../../lib/firebase/context";
import { RouteItem } from "../../pages";
import UserAvatar from "../UserAvatar";

interface Props {
  items: RouteItem[];
}

const ServerList: React.FC<Props> = ({ items }) => {
  const navigate = useNavigate();
  const { user, username } = React.useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignout = () => {
    signOut(auth).then(() => {
      navigate("/", { replace: true });
    });
    handleClose();
  };

  return (
    <Box
      sx={{
        display: "flex",
        gridArea: "PL",
        flexDirection: "column",
        alignItems: "center",
        padding: "11px 0px",
        maxHeight: "100vh",
        backgroundColor: grey[900],
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {items.map((item) => {
        if (item.isHome) {
          return (
            <React.Fragment key={item.path}>
              <ServerButton icon={item.icon} isHome to={item.path} />
              <Box
                sx={{
                  minWidth: "32px",
                  minHeight: "2px",
                  background: grey[600],
                  mb: "8px",
                }}
              />
            </React.Fragment>
          );
        }
        return <ServerButton key={item.path} icon={item.icon} to={item.path} />;
      })}
      <Box sx={{ mt: "auto" }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <UserAvatar />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleSignout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default ServerList;
