import React from 'react';

function PopupEvents() {
  const eventImages = [
    { src: '/images/588233096_17930485830151708_8090617093658869164_n.jpg', title: 'BAB POPUP 01' },
    { src: '/images/589232577_17930485884151708_1502246887562204663_n.jpg', title: 'BAB POPUP 02' },
    { src: '/images/599711487_17930485839151708_4647250437424007394_n.jpg', title: 'BAB POPUP 03' },
    { src: '/images/600268217_17930485875151708_2227880778010007964_n.jpg', title: 'BAB POPUP 04' },
    { src: '/images/600539551_17930485848151708_6394448470580292199_n.jpg', title: 'BAB POPUP 05' },
    { src: '/images/600574946_17930485866151708_289030740709781706_n.jpg', title: 'BAB POPUP 06' },
  ];

  return (
    <main className="popup-page">
      <div className="sec-hd">
        <span className="sec-title">POP-UP & EVENTS</span>
        <span className="sec-count">({eventImages.length})</span>
      </div>

      <div className="event-list">
        {eventImages.map((img, idx) => (
          <div key={idx} className="event-card">
            <div className="ec-img">
              <img src={img.src} alt={img.title} />
            </div>
            <div className="ec-info">
              <span className="ec-tag">PAST EVENT</span>
              <h3 className="ec-title">{img.title}</h3>
              <p className="ec-desc">Live Screen Printing · Fresh Vibes · Saigon Underground Streetwear.</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default PopupEvents;
