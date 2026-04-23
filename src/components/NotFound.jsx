import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * NotFound Component — 404 / "Video not found" page.
 *
 * Why this file is important:
 * Previously the Watch page returned a bare <div> with an inline
 * error message. This dedicated component:
 *   - Can be reused anywhere (bad URL, missing video, broken channel, etc.)
 *   - Gives users a clear, branded path back to Home
 *   - Matches the overall app's colour tokens (light + dark mode)
 *
 * Props:
 *   @param {string} [heading]   - Main heading, default "Video not found"
 *   @param {string} [message]   - Sub-message shown below the heading
 */
function NotFound({
    heading = 'This page isn\'t available',
    message = 'The video you\'re looking for has been removed, or the link might be broken.',
}) {
    const navigate = useNavigate();

    return (
        <div style={styles.container} role="main" aria-labelledby="notfound-heading">
            {/* YouTube-style sad face ghost illustration */}
            <div style={styles.iconWrapper} aria-hidden="true">
                <svg
                    width="100" height="100" viewBox="0 0 100 100"
                    fill="none" xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Ghost body */}
                    <ellipse cx="50" cy="45" rx="32" ry="34" fill="var(--hover-bg)" stroke="var(--border)" strokeWidth="2" />
                    {/* Ghost bottom wavy skirt */}
                    <path
                        d="M18 79 Q22 70 26 79 Q30 88 34 79 Q38 70 42 79 Q46 88 50 79 Q54 70 58 79 Q62 88 66 79 Q70 70 74 79 Q78 88 82 79 L82 45 Q82 11 50 11 Q18 11 18 45 Z"
                        fill="var(--hover-bg)" stroke="var(--border)" strokeWidth="2"
                    />
                    {/* Left eye */}
                    <ellipse cx="39" cy="43" rx="4" ry="5" fill="var(--text)" />
                    {/* Right eye */}
                    <ellipse cx="61" cy="43" rx="4" ry="5" fill="var(--text)" />
                    {/* Sad mouth */}
                    <path
                        d="M39 60 Q50 53 61 60"
                        stroke="var(--text)" strokeWidth="2.5" strokeLinecap="round" fill="none"
                    />
                </svg>
            </div>

            <h1 id="notfound-heading" style={styles.heading}>{heading}</h1>
            <p style={styles.message}>{message}</p>

            <div style={styles.actions}>
                <button
                    onClick={() => navigate('/')}
                    style={styles.primaryBtn}
                    onMouseEnter={e => (e.target.style.backgroundColor = '#cc0000')}
                    onMouseLeave={e => (e.target.style.backgroundColor = '#ff0000')}
                >
                    Go to Home
                </button>
                <button
                    onClick={() => navigate(-1)}
                    style={styles.secondaryBtn}
                    onMouseEnter={e => (e.target.style.backgroundColor = 'var(--border)')}
                    onMouseLeave={e => (e.target.style.backgroundColor = 'var(--hover-bg)')}
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        padding: '40px 24px',
        textAlign: 'center',
    },
    iconWrapper: {
        marginBottom: '24px',
        opacity: 0.85,
    },
    heading: {
        fontSize: '24px',
        fontWeight: '600',
        margin: '0 0 12px 0',
        color: 'var(--text)',
    },
    message: {
        fontSize: '15px',
        color: 'var(--text-secondary)',
        maxWidth: '400px',
        lineHeight: '1.6',
        margin: '0 0 32px 0',
    },
    actions: {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    primaryBtn: {
        padding: '10px 24px',
        borderRadius: '20px',
        border: 'none',
        backgroundColor: '#ff0000',
        color: '#fff',
        fontWeight: '600',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
    },
    secondaryBtn: {
        padding: '10px 24px',
        borderRadius: '20px',
        border: 'none',
        backgroundColor: 'var(--hover-bg)',
        color: 'var(--text)',
        fontWeight: '600',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
    },
};

export default NotFound;
