import React from 'react';

const AudioComponent = ({ refId }) => {
  return (
    <audio controls>
      <source src={refId} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default AudioComponent;
