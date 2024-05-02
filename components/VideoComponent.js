import React from 'react';

const VideoComponent = ({ refId }) => {
  return (
    <video width="320" height="240" controls>
      <source src={refId} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoComponent;
