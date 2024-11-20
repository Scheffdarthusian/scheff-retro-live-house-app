import React, { useState, useEffect } from "react";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Navigate,
  Routes,
} from "react-router-dom";
import RoomJoinPage from "./RoomJoinPage";
import TitleTypewriter from "./TitleTypewriter";
import { Grid2, Button, ButtonGroup, Typography } from "@mui/material";

const HomePage = () => {
  const [roomCode, setRoomCode] = useState(null);

  const clearRoomCode = () => {
    setRoomCode(null);
  };

  useEffect(() => {
    const fetchUserRoom = async () => {
      const response = await fetch("/api/user-in-room");
      const data = await response.json();
      setRoomCode(data.code);
    };
    fetchUserRoom();
  }, []);

  const renderHomePage = () => {
    return (
      <div>
        <Grid2 container spacing={3}>
          <Grid2
            size={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <TitleTypewriter />
          </Grid2>
          <Grid2
            size={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <ButtonGroup
              disableElevation
              variant="outlined"
              color="primary"
              size="large"
              aria-label="Large button group"
            >
              <Button color="primary" to="/join" component={Link}>
                Join a Room
              </Button>
              <Button color="secondary" to="/create" component={Link}>
                Create a Room
              </Button>
            </ButtonGroup>
          </Grid2>
        </Grid2>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            roomCode ? <Navigate to={`/room/${roomCode}`} /> : renderHomePage()
          }
        />
        <Route path="/join" element={<RoomJoinPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route
          path="/room/:roomCode"
          element={<Room leaveRoomCallBack={clearRoomCode} />}
        />
      </Routes>
    </Router>
  );
};

export default HomePage;
