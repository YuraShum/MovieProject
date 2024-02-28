import { IconButton, Stack, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from "react";
import UserMenu from "./UserMenu/UserMenu";


const UserSection = () => {
  const { user } = useSelector((state) => state.user)

  const [anchorEl, setAnchorEl] = useState(null)

  const hendleToggleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }
  return (
    <>
      {user &&
        <>
          <Stack
            sx={{
              display: "flex",
              flexDirection: 'row',
              alignItems: 'center',
              gap: '1rem'

            }}>

            <Typography
              variant="h6">
              {user.displayName}
            </Typography>
            <IconButton
              cursor='pointer'
              onClick={hendleToggleMenu} >
              <FaRegUserCircle
              style={{color: 'white'}}
              />
            </IconButton>
            
          </Stack>
          <UserMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl}  />
        </>}
    </>
  )
}

export default UserSection