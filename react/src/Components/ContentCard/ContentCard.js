import React from 'react';

import './ContentCard.css'

// function ContentCard({title, subtitle, content}) {
//   return (
//     <div className="content-card">
//         <h1 className="content-title">{title}</h1>
//         <p className="content-subtitle">{subtitle}</p>
//         <div className="card-content">{content}</div>
//     </div>
//   );
// }

// export default ContentCard;

function ContentCard({title, subtitle, content}) {
  return (
    <div className="content-card">
      <h1 className="content-title">{title}</h1>
      {subtitle && <p className="content-subtitle">{subtitle}</p>}
      <div className="card-content">{content}</div>
    </div>
  );
}

export default ContentCard;
