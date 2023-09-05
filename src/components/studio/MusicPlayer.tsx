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
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

type Props = {
  audioUrl: string;
};

const MusicPlayer = ({ audioUrl }: Props) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const newAudio = new Audio(audioUrl);
    newAudio.preload = "auto";

    newAudio.addEventListener("loadeddata", () => {
      setIsLoading(false);
    });

    newAudio.addEventListener("timeupdate", () => {
      setCurrentTime(newAudio.currentTime);
    });

    setAudio(newAudio);
  }, [audioUrl]);

  const togglePlay = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
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
        width={"95%"}
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
