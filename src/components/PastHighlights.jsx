import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Play, Mic } from 'lucide-react';
import { motion } from 'framer-motion';

const videoIds = [
    "CxSdfx_eOPQ",
    "3O52Vo_H5XQ",
    "mU9gdHJlpGQ",
    "3aPvPPvMA9s"
];

const VideoCard = ({ videoId, title, date, thumbnail, loadedVideos, onPlay }) => (
    <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="group relative"
    >
        <div className="absolute inset-0 bg-dark transform translate-x-3 translate-y-3 border-4 border-dark"></div>
        <div className="relative bg-light border-4 border-dark overflow-hidden flex flex-col h-full transform transition-transform group-hover:-translate-y-2 group-hover:-translate-x-2">
            <div className="bg-primary text-dark font-heading font-bold px-4 py-3 border-b-4 border-dark overflow-hidden">
                <span className="text-xs md:text-sm whitespace-normal line-clamp-2 block leading-tight">{title}</span>
                {date && <span className="text-xs block text-dark/70 mt-1">{date}</span>}
            </div>
            <div className="relative w-full pt-[56.25%] bg-black">
                {loadedVideos[videoId] ? (
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        title={title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <button
                        onClick={() => onPlay(videoId)}
                        className="absolute inset-0 w-full h-full cursor-pointer group/play flex items-center justify-center bg-black"
                        aria-label={`Play ${title}`}
                    >
                        <img
                            src={thumbnail || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                            alt={title}
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                        />
                        <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 bg-secondary/90 border-4 border-white rounded-full flex items-center justify-center shadow-brutal transition-transform group-hover/play:scale-110">
                            <Play size={32} className="text-white fill-white ml-1" />
                        </div>
                    </button>
                )}
            </div>
        </div>
    </motion.div>
);

const PastHighlights = () => {
    const { t } = useLanguage();
    const [loadedVideos, setLoadedVideos] = useState({});
    const videos = t.highlights.videos.map((v, i) => ({ ...v, id: videoIds[i] }));
    const lectures = t.highlights.lectures;

    const handlePlay = (videoId) => {
        setLoadedVideos(prev => ({ ...prev, [videoId]: true }));
    };

    return (
        <section className="section-padding bg-secondary text-white border-b-4 border-dark" id="highlights">
            <div className="container mx-auto max-w-6xl">

                {/* Lecture Section */}
                <div className="mb-20">
                    <div className="flex flex-col items-center mb-12">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center gap-3 bg-white text-dark px-8 py-5 border-4 border-dark shadow-brutal transform rotate-1 text-center"
                        >
                            <div className="flex items-center gap-3">
                                <Mic size={36} className="text-secondary flex-shrink-0" />
                                <h2 className="text-2xl md:text-3xl font-heading font-black tracking-wide leading-tight">
                                    {lectures.title}
                                </h2>
                            </div>
                            <p className="text-lg md:text-xl font-heading font-bold text-secondary tracking-wide">
                                {lectures.subtitle}
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {lectures.videos.map((video, index) => (
                            <motion.div
                                key={video.id}
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <VideoCard
                                    videoId={video.id}
                                    title={video.title}
                                    date={video.date}
                                    thumbnail={video.thumbnail}
                                    loadedVideos={loadedVideos}
                                    onPlay={handlePlay}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Past Highlights Section */}
                <div>
                    <div className="flex flex-col items-center mb-16">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 bg-white text-dark px-8 py-4 border-4 border-dark shadow-brutal transform -rotate-2"
                        >
                            <Play size={40} className="text-secondary fill-secondary" />
                            <h2 className="text-4xl md:text-5xl font-heading font-black tracking-wide">
                                {t.highlights.title}
                            </h2>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {videos.map((video, index) => (
                            <motion.div
                                key={video.year}
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-dark transform translate-x-3 translate-y-3 border-4 border-dark"></div>
                                <div className="relative bg-light border-4 border-dark overflow-hidden flex flex-col h-full transform transition-transform group-hover:-translate-y-2 group-hover:-translate-x-2">
                                    <div className="bg-primary text-dark font-heading font-bold px-4 py-2 border-b-4 border-dark flex justify-between items-center">
                                        <span className="text-2xl">{video.year}</span>
                                        <span className="uppercase text-sm tracking-widest">{video.title}</span>
                                    </div>
                                    <div className="relative w-full pt-[56.25%] bg-black">
                                        {loadedVideos[video.id] ? (
                                            <iframe
                                                className="absolute inset-0 w-full h-full"
                                                src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                                                title={`${video.year} ASE Voice Highlight`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        ) : (
                                            <button
                                                onClick={() => handlePlay(video.id)}
                                                className="absolute inset-0 w-full h-full cursor-pointer group/play flex items-center justify-center bg-black"
                                                aria-label={`Play ${video.title}`}
                                            >
                                                <img
                                                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                                                    alt={`${video.year} ${video.title}`}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                                <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 bg-secondary/90 border-4 border-white rounded-full flex items-center justify-center shadow-brutal transition-transform group-hover/play:scale-110">
                                                    <Play size={32} className="text-white fill-white ml-1" />
                                                </div>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default PastHighlights;
