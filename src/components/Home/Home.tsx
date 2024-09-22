'use client'
import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaTimes, FaExpand, FaCompress, FaPause } from 'react-icons/fa';
import Image from 'next/image';
import Video from 'next-video';

interface Stream {
    id: number;
    src: string;
    type: string;
    title: string;
    thumbnail: string;
}

const Home: React.FC = () => {
    const [streams, setStreams] = useState<Stream[]>([]);
    const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const [isPiP, setIsPiP] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Simulating fetching streams from backend
        const fetchStreams = async () => {
            // Replace this with actual API call
            const mockStreams: Stream[] = [
                { id: 1, src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', type: 'application/x-mpegURL', title: 'Cosmic Voyage', thumbnail: 'https://picsum.photos/seed/1/400/225' },
                { id: 2, src: 'https://test-streams.mux.dev/test_001/stream.m3u8', type: 'application/x-mpegURL', title: 'Ocean Depths', thumbnail: 'https://picsum.photos/seed/2/400/225' },
                { id: 3, src: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8', type: 'application/x-mpegURL', title: 'Mountain Peak', thumbnail: 'https://picsum.photos/seed/3/400/225' },
                // Add more streams as needed
            ];
            setStreams(mockStreams);
        };

        fetchStreams();
    }, []);

    const handleSelectStream = (stream: Stream) => {
        setSelectedStream(stream);
        setIsFullScreen(true);
        setIsPiP(false);
        setIsPlaying(true);
    };

    const handleClose = () => {
        setIsFullScreen(false);
        setIsPiP(false);
        setSelectedStream(null);
        setIsPlaying(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    // const toggleFullScreen = () => {
    //     setIsFullScreen(!isFullScreen);
    //     setIsPiP(false);
    // };

    const togglePiP = () => {
        setIsPiP(!isPiP);
        setIsFullScreen(false);
    };

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white p-8">
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-12 animate-pulse">
                Ethereal Streams
            </h1>

            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 transition-all duration-500 ${isFullScreen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                {streams.map((stream) => (
                    <div key={stream.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                        <div className="relative aspect-video">
                            <Image
                                src={stream.thumbnail}
                                alt={stream.title}
                                layout="fill"
                                objectFit="cover"
                                className="transition-opacity duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <button
                                    onClick={() => handleSelectStream(stream)}
                                    className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 transition-transform duration-300 hover:scale-110"
                                >
                                    <FaPlay className="w-8 h-8" />
                                </button>
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold p-4">{stream.title}</h3>
                    </div>
                ))}
            </div>

            {selectedStream && (
                <div className={`fixed ${isPiP ? 'bottom-4 right-4 w-80 h-45' : 'inset-0'} ${isFullScreen ? 'z-50' : 'z-40'} transition-all duration-500 bg-black`}>
                    <div className="relative w-full h-full">
                        <Video
                            ref={videoRef}
                            src={selectedStream.src}
                            className="w-full h-full object-contain"
                            autoPlay={isPlaying}
                        />
                        <div className="absolute top-4 right-4 flex space-x-4">
                            <button
                                onClick={togglePlayPause}
                                className="bg-gray-800 hover:bg-gray-700 text-white rounded-full p-2 transition-colors duration-300"
                            >
                                {isPlaying ? <FaPause className="w-6 h-6" /> : <FaPlay className="w-6 h-6" />}
                            </button>
                            <button
                                onClick={togglePiP}
                                className="bg-gray-800 hover:bg-gray-700 text-white rounded-full p-2 transition-colors duration-300"
                            >
                                {isPiP ? <FaExpand className="w-6 h-6" /> : <FaCompress className="w-6 h-6" />}
                            </button>
                            <button
                                onClick={handleClose}
                                className="bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-colors duration-300"
                            >
                                <FaTimes className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;