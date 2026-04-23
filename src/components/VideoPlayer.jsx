import React, { useRef, useState } from 'react';

/**
 * VideoPlayer Component
 *
 * Why this file is important:
 * The Watch page previously showed only a <img> thumbnail — not an actual
 * playable video. This component creates a real HTML5 <video> player with:
 *   - A thumbnail used as the poster (shown before play)
 *   - A play/pause overlay button for a YouTube-like feel
 *   - A duration badge (bottom-right) mimicking YT's thumbnail overlay
 *   - Graceful fallback: if no videoSrc is given it stays as a static poster
 *
 * Props:
 *   @param {string} src       - Direct URL to an .mp4 / video file (optional)
 *   @param {string} poster    - Thumbnail image shown before video plays
 *   @param {string} title     - Video title (used for aria-label)
 *   @param {string} duration  - Pre-formatted duration string e.g. "12:34"
 */
function VideoPlayer({ src, poster, title, duration }) {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
            video.play();
            setIsPlaying(true);
            setHasStarted(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    const handleVideoEnd = () => setIsPlaying(false);

    return (
        <div className="video-player-wrapper" style={styles.wrapper}>
            {/* ── HTML5 Video Element ── */}
            <video
                ref={videoRef}
                src={src || undefined}
                poster={poster}
                title={title}
                onEnded={handleVideoEnd}
                controls={hasStarted}          /* Show native controls only after first play */
                aria-label={title}
                style={styles.video}
                preload="metadata"
            />

            {/* ── Play / Pause Overlay (hidden once native controls appear) ── */}
            {!hasStarted && (
                <button
                    className="play-overlay-btn"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    style={styles.playBtn}
                >
                    {/* Play triangle */}
                    <svg
                        width="68" height="48" viewBox="0 0 68 48"
                        style={styles.playIcon}
                    >
                        <path
                            d="M66.52,7.74C65.69,4.55,63.19,2.05,60,1.22 C54.78,0,34,0,34,0S13.22,0,8,1.22C4.81,2.05,2.31,4.55,1.48,7.74 C0.26,12.96,0,24,0,24s0.26,11.04,1.48,16.26C2.31,43.45,4.81,45.95,8,46.78 C13.22,48,34,48,34,48s20.78,0,26-1.22C63.19,45.95,65.69,43.45,66.52,40.26 C67.74,35.04,68,24,68,24S67.74,12.96,66.52,7.74z"
                            fill="#ff0000"
                        />
                        <path d="M 45,24 27,14 27,34" fill="#fff" />
                    </svg>
                </button>
            )}

            {/* ── Duration Badge (shown before video starts) ── */}
            {!hasStarted && duration && (
                <span style={styles.durationBadge} aria-label={`Duration: ${duration}`}>
                    {duration}
                </span>
            )}
        </div>
    );
}

// ─── Inline styles (scoped to this component, no global CSS pollution) ───────
const styles = {
    wrapper: {
        position: 'relative',
        width: '100%',
        backgroundColor: '#000',
        borderRadius: '12px',
        overflow: 'hidden',
        aspectRatio: '16 / 9',
        cursor: 'pointer',
    },
    video: {
        width: '100%',
        height: '100%',
        display: 'block',
        objectFit: 'contain',
        backgroundColor: '#000',
    },
    playBtn: {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        width: '100%',
        height: '100%',
    },
    playIcon: {
        filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.6))',
        transition: 'transform 0.15s ease',
    },
    durationBadge: {
        position: 'absolute',
        bottom: '8px',
        right: '8px',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        color: '#fff',
        fontSize: '12px',
        fontWeight: '600',
        padding: '2px 6px',
        borderRadius: '4px',
        letterSpacing: '0.5px',
        pointerEvents: 'none',
    },
};

export default VideoPlayer;
