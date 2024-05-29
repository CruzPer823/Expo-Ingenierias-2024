import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function DoughnutChart({labels, data}) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(()=>{ 
        if(chartInstance.current){
            chartInstance.current.destroy();
        }
        const mychartRef = chartRef.current.getContext("2d");

        chartInstance.current = new Chart(mychartRef, {
            type: 'doughnut',
            data: {
                labels: labels,
                  datasets:[{
                    data: data,
                    backgroundColor: [
                        'rgb(7, 65, 115)',
                        'rgb(22, 121, 171)',
                        'rgb(93, 235, 215)'
                      ],
                  }
                  ]
            },
        });
        return() =>{
            if (chartInstance.current){
                chartInstance.current.destroy();
            }
        }
    },[])

    return(
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <canvas ref={chartRef} style={{ width: '300px', height: '300px' }} />
        </div>
    )
}

export default DoughnutChart