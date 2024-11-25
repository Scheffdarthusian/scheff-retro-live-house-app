import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Grid2,
  TextField,
  FormControlLabel,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  Collapse,
  Alert,
} from "@mui/material";

const CreateRoomPage = ({
  votesToSkip = 2,
  guestCanPause = true,
  update = false,
  roomCode = null,
  updateCallback = () => {},
}) => {
  const [guestCanPauseState, setGuestCanPauseState] = useState(guestCanPause);
  const [votesToSkipState, setVotesToSkipState] = useState(votesToSkip);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleVotesChange = (e) => {
    setVotesToSkipState(e.target.value);
  };

  const handleGuestCanPauseChange = (e) => {
    setGuestCanPauseState(e.target.value === "true");
  };

  const handleRoomButtonPressed = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkipState,
        guest_can_pause: guestCanPauseState,
      }),
    };
    try {
      const response = await fetch("/api/create-room", requestOptions);
      const data = await response.json();
      navigate("/room/" + data.code);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const handleUpdateButtonPressed = async () => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkipState,
        guest_can_pause: guestCanPauseState,
        code: roomCode,
      }),
    };
    try {
      const response = await fetch("/api/update-room", requestOptions);
      if (response.ok) {
        setSuccessMsg("Room updated successfully!");
      } else {
        setErrorMsg("Failed to update room");
      }
      updateCallback();
    } catch (error) {
      console.error("Error updating room:", error);
      setErrorMsg("An error occurred while updating the room");
    }
  };

  const renderCreateButton = () => (
    <Grid2 container spacing={2}>
      <Grid2
        size={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button variant="outlined" onClick={handleRoomButtonPressed}>
          Create a Room
        </Button>
      </Grid2>
      <Grid2
        size={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          color="secondary"
          variant="outlined"
          sx={{ paddingLeft: "52px", paddingRight: "52px" }}
          to="/"
          component={Link}
        >
          Back
        </Button>
      </Grid2>
    </Grid2>
  );

  const renderUpdateButton = () => (
    <Grid2 size={12} display="flex" justifyContent="center" alignItems="center">
      <Button
        color="primary"
        variant="outlined"
        onClick={handleUpdateButtonPressed}
      >
        Update Room
      </Button>
    </Grid2>
  );

  const title = update ? "Update Room" : "Create a Room";

  return (
    <Grid2 container spacing={2}>
      <Grid2
        size={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Collapse in={errorMsg !== "" || successMsg !== ""}>
          {successMsg !== "" ? (
            <Alert severity="success" onClose={() => setSuccessMsg("")}>
              {successMsg}
            </Alert>
          ) : (
            <Alert severity="error" onClose={() => setErrorMsg("")}>
              {errorMsg}
            </Alert>
          )}
        </Collapse>
      </Grid2>
      <Grid2
        size={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography component="h3" variant="h3" color="white">
          {title}
        </Typography>
      </Grid2>
      <Grid2
        size={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup
            row
            value={guestCanPauseState.toString()}
            onChange={handleGuestCanPauseChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="red" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid2>
      <Grid2
        size={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <FormControl>
          <TextField
            required={true}
            type="number"
            onChange={handleVotesChange}
            defaultValue={votesToSkipState}
            slotProps={{
              input: {
                min: 2,
              },
            }}
            sx={{
              input: {
                textAlign: "center", // Center the text in the input field
              },
            }}
          />
          <FormHelperText style={{ textAlign: "center" }}>
            Votes Required To Skip Song
          </FormHelperText>
        </FormControl>
      </Grid2>
      <Grid2
        size={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {update ? renderUpdateButton() : renderCreateButton()}
      </Grid2>
    </Grid2>
  );
};

export default CreateRoomPage;
