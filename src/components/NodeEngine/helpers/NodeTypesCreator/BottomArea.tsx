import { Tooltip, Box, IconButton, Menu, MenuItem } from "@mui/material";
import React, { memo, useContext } from "react";
import { GlobalContext } from "../GlobalNodeState";
import LockIcon from "@mui/icons-material/Lock";
import UnLockIcon from "@mui/icons-material/LockOpen";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// import { Container } from './styles';

const BottomArea: React.FC<{ data: any }> = ({ data }) => {
  const { id } = data;
  const {
    removeNodeById,
    useNodeLock,
    useNodeValidity,
    duplicateNode,
    clearNode,
  } = useContext(GlobalContext);
  const [isLocked, toggleLock] = useNodeLock(id);
  const [isValid, invalidReason] = useNodeValidity(id);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        width: "100%",
        pl: 2,
        pr: 2,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <IconButton size="small" onClick={() => toggleLock()}>
        {isLocked ? <LockIcon /> : <UnLockIcon />}
      </IconButton>
      <Tooltip title={isValid ? "Node valid" : invalidReason}>
        <IconButton size="small">
          {isValid ? <CheckCircleIcon /> : <WarningIcon />}
        </IconButton>
      </Tooltip>
      <IconButton size="small" onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            duplicateNode(id);

            handleClose();
          }}
        >
          Duplicate
        </MenuItem>
        <MenuItem
          onClick={() => {
            clearNode(id);

            handleClose();
          }}
        >
          Clear
        </MenuItem>
        <MenuItem
          onClick={() => {
            removeNodeById(id);
            handleClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default memo(BottomArea);
