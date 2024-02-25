import { IconButton, Stack, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from "react";
import UserMenu from "./UserMenu/UserMenu";

const UserSection = () => {
  const { user } = useSelector((state) => state.user)

  const [anchorEl, setAnchorEl] = useState(null)

  const hendleToggleMenu = (event) => {
    setAnchorEl(event.currentValue)
  }
  return (
    <>
      {user &&
        <>
          <Stack 
          sx={{
            display: "flex",
            flexDirection:'row',
            alignItems: 'center',
            gap: '1rem'
            
          }}>
            <Typography
              variant="h6">
              {user.displayName}
            </Typography>
            <IconButton>
              <FaRegUserCircle
                cursor='pointer'
                onClick={hendleToggleMenu} />
            </IconButton>
            <UserMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
          </Stack>
        </>}
    </>
  )
}

export default UserSection