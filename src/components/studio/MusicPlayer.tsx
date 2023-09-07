import Loader from "@/_ui/loader/Loader";
import GlobalIcons from "@/styles/GlobalIcons";
import {
  Box,
  CircularProgress,
  Image,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";

type Props = {
  audioUrl: string;
};

const MusicPlayer = ({ audioUrl }: Props) => {
  console.log("audioUrl", audioUrl);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const toast = useToast();
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const newAudio = new Audio(audioUrl);
    newAudio.preload = "auto";

    newAudio.addEventListener("error", (e) => {
      console.error("Error loading audio:", e);
      toast({
        title: "Error in loading music",
        status: "error",
        duration: 3000,
      });
      setIsLoading(false); // Ensure that isLoading is set to false even in case of an error.
    });

    newAudio.addEventListener("loadeddata", () => {
      console.log("loaded");
      setIsLoading(false);
    });

    newAudio.addEventListener("timeupdate", () => {
      console.log("loaded time update");
      setCurrentTime(newAudio.currentTime);
    });

    setAudio(newAudio);
  }, [audioUrl]);

  const togglePlay = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        if (currentAudioRef.current) {
          currentAudioRef.current.pause();
        }
        audio.play();
        currentAudioRef.current = audio;
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSliderChange = (value: number) => {
    if (audio) {
      audio.currentTime = value;
      setCurrentTime(value);
    }
  };
  return (
    <Box display={"flex"} justifyContent={"space-between"}>
      {isLoading ? (
        <Loader size="sm" />
      ) : (
        <>
          {" "}
          {isPlaying ? (
            <Image src={GlobalIcons["icon-pause"]} onClick={togglePlay} />
          ) : (
            <Image src={GlobalIcons["icon-play"]} onClick={togglePlay} />
          )}
        </>
      )}
      <Slider
        width={"90%"}
        min={0}
        max={audio ? audio.duration : 100}
        step={0.1}
        value={currentTime}
        onChange={handleSliderChange}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
};

export default MusicPlayer;
