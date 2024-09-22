import React, { useState, useRef } from 'react';
import { FaPlay, FaPause, FaExpand, FaCompress, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import Video from 'next-video';

interface VideoPlayerProps {
    src: string;
    type: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, type }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const toggleFullscreen = () => {
        if (videoRef.current) {
            if (isFullscreen) {
                document.exitFullscreen();
            } else {
                videoRef.current.requestFullscreen();
            }
            setIsFullscreen(!isFullscreen);
        }
    };

    console.log('src :>> ', src);
    return (
        <div className="video-player">
            {/* <div className="video-controls">
                <button onClick={togglePlay} className="control-button">
                    {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button onClick={toggleMute} className="control-button">
                    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
                <button onClick={toggleFullscreen} className="control-button">
                    {isFullscreen ? <FaCompress /> : <FaExpand />}
                </button>
            </div> */}
            <Video ref={videoRef} src={src} controls={true} className="video-element" />
        </div>
    );
};

export default VideoPlayer;
