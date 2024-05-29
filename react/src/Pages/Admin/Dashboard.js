import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Widget from '../../Components/Widget/Widget';
import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar';
import DoughnutChart from '../../Components/DoughnutChart/DoughnutChart';
import Checklist from '../../Components/Checklist/Checklist';
import Timer from '../../Components/Timer/Timer';
import Loader from '../../Components/Loader/Loader';

const useFetchData = (url, isChecklist = false) => {
  const [data, setData] = useState(isChecklist ? [] : { labels: [], data: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(url)
      .then(response => {
        const responseData = response.data;
        if (isChecklist) {
          setData(responseData);
        } else {
          setData({
            labels: responseData.labels,
            data: responseData.data
          });
        }
        setLoading(false);
      })
      .catch(error => {
        console.error(`Error fetching data from ${url}:`, error);
        setError('Error fetching data');
        setLoading(false);
      });
  }, [url, isChecklist]);

  return { data, loading, error };
};

function Dashboard() {
  const userApiUrl = 'http://localhost:8000/users/getUsersDoughnut/ChartData';
  const categoryApiUrl = 'http://localhost:8000/categories/getCategoriesDoughnut/ChartData';
  const projectStatusApiUrl = 'http://localhost:8000/projects/getProjectStatusDoughnut/ChartData';
  const checklistApiUrl = ' http://localhost:8000/projects/getMaterialChecklist/Data'; // URL to fetch materials

  const { data: userData, loading: loadingUserData, error: errorUserData } = useFetchData(userApiUrl);
  const { data: categoryData, loading: loadingCategoryData, error: errorCategoryData } = useFetchData(categoryApiUrl);
  const { data: projectStatusData, loading: loadingProjectStatusData, error: errorProjectStatusData } = useFetchData(projectStatusApiUrl);
  const { data: checklistData, loading: loadingChecklistData, error: errorChecklistData } = useFetchData(checklistApiUrl, true); // Fetching checklist items

  if (loadingUserData || loadingCategoryData || loadingProjectStatusData || loadingChecklistData) {
    return (
      <>
      <NavigationBar NameSection={"Tablero"} />
      <div style={{display:'flex', justifyContent:'center'}}>
      <Loader/>
      </div>
      </>
    );
  }

  if (errorUserData || errorCategoryData || errorProjectStatusData || errorChecklistData) {
    return <div>{errorUserData || errorCategoryData || errorProjectStatusData || errorChecklistData}</div>;
  }

  return (
    <>
      <NavigationBar NameSection={"Tablero"} />
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-lg-4">
            <Widget title={"Usuarios"} content={<DoughnutChart labels={userData.labels} data={userData.data} />} />
          </div>
          <div className="col-lg-4">
            <Widget title={"Categorías"} content={<DoughnutChart labels={categoryData.labels} data={categoryData.data} />} />
          </div>
          <div className="col-lg-4">
            <Widget title={"Revisión de Proyectos"} content={<DoughnutChart labels={projectStatusData.labels} data={projectStatusData.data} />} />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8">
            <Widget title={"Material Solicitado"} content={<Checklist initialItems={checklistData} />} />
          </div>
          <div className="col-lg-4">
            <Widget title={"Tiempo para Expo-Ingeniería"} content={<Timer />} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
