import React, { useState } from "react";
import { TextField, Button, Grid2, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const RoomJoinPage = () => {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleTextFieldChange = (e) => {
    setRoomCode(e.target.value);
  };

  const roomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomCode,
      }),
    };
    fetch("/api/join-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          navigate(`/room/${roomCode}`);
        } else {
          setError("Room not found");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid2 container spacing={2}>
      <Grid2
        size={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h3" component="h3" color="white">
          Join A Room
        </Typography>
      </Grid2>
      <Grid2
        size={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <TextField
          error={!!error}
          label="Code"
          placeholder="Enter a Room Code"
          value={roomCode}
          helperText={error}
          variant="outlined"
          onChange={handleTextFieldChange}
        />
      </Grid2>
      <Grid2
        size={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button variant="outlined" color="primary" onClick={roomButtonPressed}>
          Enter Room
        </Button>
      </Grid2>
      <Grid2
        size={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          variant="outlined"
          color="secondary"
          sx={{ paddingLeft: "42px", paddingRight: "42px" }}
          to="/"
          component={Link}
        >
          Back
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default RoomJoinPage;
