import React from "react";
import { Avatar } from '@mui/material';
import { UserContext } from './../../lib/firebase/context';
import { stringAvatar } from "../../utils/colors";

const UserAvatar: React.FC = () => {
  const {user, username} = React.useContext(UserContext)

  return (
    <Avatar
      alt={username || user?.displayName || undefined}
      src={user?.photoURL || undefined}
      {...stringAvatar(user?.displayName || "")}
    />
  );
};

export default UserAvatar;
