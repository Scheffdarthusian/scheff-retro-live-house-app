import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid2, Button, Typography } from "@mui/material";
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayerSlider from "./MusicPlayer";

const Room = ({ leaveRoomCallBack }) => {
  const { roomCode } = useParams();
  const navigate = useNavigate();

  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
  const [song, setSong] = useState({});

  const getRoomDetails = async () => {
    try {
      const response = await fetch("/api/get-room" + "?code=" + roomCode);
      if (!response.ok) {
        leaveRoomCallBack(); // Handle if room not found
        navigate("/"); // Redirect to home
        return;
      }
      const data = await response.json(); // Correctly parse the data
      setVotesToSkip(data.votes_to_skip);
      setGuestCanPause(data.guest_can_pause);
      setIsHost(data.is_host);

      // Check if the user is a host, then authenticate Spotify
      if (data.is_host) {
        authenticateSpotify();
      }
    } catch (error) {
      console.error("Error fetching room details:", error);
    }
  };

  // Similar to componentDidMount and componentWillUnmount
  useEffect(() => {
    getRoomDetails();
    const interval = setInterval(getCurrentSong, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []); // Empty dependency array ensures effect runs once on mount

  const authenticateSpotify = async () => {
    try {
      const response = await fetch("/spotify_api/is-authenticated");
      const data = await response.json();
      setSpotifyAuthenticated(data.status);

      if (!data.status) {
        const authResponse = await fetch("/spotify_api/get-auth-url");
        const authData = await authResponse.json();
        window.location.replace(authData.url);
      }
    } catch (error) {
      console.error("Error authenticating Spotify:", error);
    }
  };

  const getCurrentSong = async () => {
    try {
      const response = await fetch("/spotify_api/current-song");
      if (response.ok) {
        const data = await response.json();
        setSong(data);
      }
    } catch (error) {
      console.error("Error fetching song:", error);
    }
  };

  const leaveButtonPressed = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };
      await fetch("/api/leave-room", requestOptions);
      leaveRoomCallBack();
      navigate("/");
    } catch (error) {
      console.error("Error leaving room:", error);
    }
  };

  const renderSettings = () => {
    return (
      <Grid2 container spacing={2}>
        <Grid2
          size={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CreateRoomPage
            update={true}
            votesToSkip={votesToSkip}
            guestCanPause={guestCanPause}
            roomCode={roomCode}
            updateCallback={getRoomDetails}
          />
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
            onClick={() => setShowSettings(false)}
          >
            Close
          </Button>
        </Grid2>
      </Grid2>
    );
  };

  const renderSettingButton = () => (
    <Grid2 size={12} display="flex" justifyContent="center" alignItems="center">
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setShowSettings(true)}
      >
        Settings
      </Button>
    </Grid2>
  );

  if (showSettings) {
    return renderSettings();
  }

  return (
    <Grid2 container spacing={1}>
      <Grid2
        size={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4" component="h4" color="white">
          Code: {roomCode}
        </Typography>
      </Grid2>
      <MusicPlayerSlider {...song} />
      {isHost && renderSettingButton()}
      <Grid2
        size={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          color="secondary"
          variant="outlined"
          onClick={leaveButtonPressed}
          sx={{ paddingLeft: "28px", paddingRight: "28px" }}
        >
          Leave
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default Room;
