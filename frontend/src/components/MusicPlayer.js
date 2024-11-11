import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


const Widget = styled("div")(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 343,
  maxWidth: "90%",
  margin: "auto",
  position: "relative",
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)",
  backdropFilter: "blur(40px)",
}));

const CoverImage = styled("div")({
  width: 100,
  height: 100,
  objectFit: "cover",
  overflow: "hidden",
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: "rgba(0,0,0,0.08)",
  "& > img": {
    width: "100%",
  },
});

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export default function MusicPlayerSlider({
  title,
  artist,
  image_url,
  is_playing,
  time,
  duration,
  votes,
  votes_required,
}) {
  const [position, setPosition] = React.useState(time || 0);
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    setIsPlaying(is_playing);
  }, [is_playing]);

  // Sync position with the time prop when it changes
  React.useEffect(() => {
    setPosition(time);
  }, [time]);

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseSong();
      setIsPlaying(false);
    } else {
      playSong();
      setIsPlaying(true);
    }
  };

  const pauseSong = async () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    try {
      const response = await fetch("/spotify_api/pause", requestOptions);
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("Pause response:", jsonResponse); // Log the response
        setIsPlaying(false); // Update state only if the request was successful
      } else {
        console.error("Error pausing song:", response.statusText);
      }
    } catch (error) {
      console.error("Error pausing song:", error);
    }
  };

  const playSong = async () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    try {
      const response = await fetch("/spotify_api/play", requestOptions);
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("Play response:", jsonResponse); // Log the response
        setIsPlaying(true); // Update state only if the request was successful
      } else {
        console.error("Error playing song:", response.statusText);
      }
    } catch (error) {
      console.error("Error playing song:", error);
    }
  };

  const skipSong = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify_api/skip", requestOptions);
  };

  function formatDuration(value) {
    const seconds = Math.floor(value / 1000); // Convert from milliseconds to seconds
    const minute = Math.floor(seconds / 60);
    const secondLeft = seconds - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  return (
    <Box sx={{ width: "100%", overflow: "hidden", position: "relative", p: 3 }}>
      <Widget>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CoverImage>
            <img alt={title} src={image_url} />
          </CoverImage>
          <Box sx={{ ml: 1.5, minWidth: 0 }}>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontWeight: 500 }}
            >
              {artist}
            </Typography>
            <Typography noWrap>
              <b>{title}</b>
            </Typography>
          </Box>
        </Box>
        <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration || 0}
          onChange={(_, value) => setPosition(value)}
          sx={(t) => ({
            color: "rgba(0,0,0,0.87)",
            height: 4,
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&::before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0px 0px 0px 8px ${"rgb(0 0 0 / 16%)"}`,
                ...t.applyStyles("dark", {
                  boxShadow: `0px 0px 0px 8px ${"rgb(255 255 255 / 16%)"}`,
                }),
              },
              "&.Mui-active": {
                width: 20,
                height: 20,
              },
            },
            "& .MuiSlider-rail": {
              opacity: 0.28,
            },
            ...t.applyStyles("dark", {
              color: "#fff",
            }),
          })}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(position)}</TinyText>
          <TinyText>-{formatDuration(duration - position)}</TinyText>
        </Box>
        <Box
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: -1,
            "& svg": {
              color: "#000",
              ...theme.applyStyles("dark", {
                color: "#fff",
              }),
            },
          })}
        >
          <IconButton
            aria-label={is_playing ? "pause" : "play"}
            onClick={handlePlayPause}
          >
            {is_playing ? (
              <PauseRounded sx={{ fontSize: "3rem" }} />
            ) : (
              <PlayArrowRounded sx={{ fontSize: "3rem" }} />
            )}
          </IconButton>
          <IconButton aria-label="next song" onClick={skipSong}>
            <ArrowForwardIosIcon fontSize="large" />
            <Typography variant="body2" sx={{ marginRight: 1 }}>
              {votes} / {votes_required}
            </Typography>
          </IconButton>
        </Box>
        <Stack
          spacing={2}
          direction="row"
          sx={(theme) => ({
            mb: 1,
            px: 1,
            "& > svg": {
              color: "rgba(0,0,0,0.4)",
              ...theme.applyStyles("dark", {
                color: "rgba(255,255,255,0.4)",
              }),
            },
          })}
          alignItems="center"
        ></Stack>
      </Widget>
    </Box>
  );
}
