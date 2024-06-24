import React from 'react';

const Home = () => {
  return (
    <div className="sketchfab-embed-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <iframe
        title="Betta Splendens"
        frameBorder="0"
        allowFullScreen
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        src="https://sketchfab.com/models/f4eeb7f50ad24873842bd954ad27d23b/embed?ui_infos=0&ui_controls=0&ui_stop=0&ui_watermark=0"
        style={{ width: '80%', height: '80%' }}
      ></iframe>
    </div>
  );
}

export default Home;
