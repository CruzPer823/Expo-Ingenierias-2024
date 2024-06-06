import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomCarousel = ({ projectId }) => {
  const [judges, setJudges] = useState([]);

  useEffect(() => {
    const fetchJudges = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/Admin/getProjectJudges?projectId=${projectId}`);
        setJudges(response.data);
      } catch (error) {
        console.error('Error fetching judges:', error);
      }
    };

    fetchJudges();
  }, [projectId]);

  if (judges.length === 0) {
    return <></>;
  }

  return (
    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {judges.map((judge, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
            <img src={`/${judge.profileImg}`} className="d-block w-200" alt={`Slide ${index + 1}`} style={{ width: '200px' }} />
            <div className="carousel-caption d-none d-md-block">
              <h5>{`${judge.name} ${judge.lastName}`}</h5>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default CustomCarousel;
