import React from 'react';

const VideoCard = ({ url }) => {
  const getYoutubeId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYoutubeId(url);

  if (!videoId) {
    return <div>Invalid YouTube URL</div>;
  }

  return (
    <>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </>
  );
};

export default VideoCard;
