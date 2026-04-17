import React from 'react';
import { useParams } from 'react-router-dom';

function Watch() {
    const { id } = useParams();

    return (
        <div style={{ padding: '20px' }}>
            <h2>Video Player for Video ID: {id}</h2>
            <p>Video description, comments, and related videos will go here.</p>
        </div>
    );
}

export default Watch;
