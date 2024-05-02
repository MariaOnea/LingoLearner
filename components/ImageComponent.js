import React from 'react';

const ImageComponent = ({ refId }) => {
  return (
    <img src={refId} alt="Quiz Content" style={{ width: '100%', height: 'auto' }} />
  );
};

export default ImageComponent;
