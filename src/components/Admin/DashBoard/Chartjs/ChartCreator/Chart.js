import React from 'react';

import { Doughnut, Line, Pie, Bar } from 'react-chartjs-2'


const defaultOptions = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: true
}

export default function makeChart(chartType, chartData, chartTitle, dataLabels) {
    if (chartType.toLowerCase() === "line") {
        return(
            <Line 
            className="chart"
            data={{
                labels: dataLabels,
                datasets: [
                    {
                        label: chartTitle,
                        data: chartData,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            }}
            width={50}
            height={20}
            options={{
                defaultOptions,
                title: {
                    display: true,
                    text: 'AFI PAINT'
                },
                legend: {
                    display: true,
                    position: 'right'
                },
                animation: {
                    animateScale: true
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }}
            />
        );
    } else if (chartType.toLowerCase() === "bar") {
        return(
            <Bar 
            className="chart"
            data={{
                labels: dataLabels,
                datasets: [
                    {
                        label: chartTitle,
                        data: chartData,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            }}
            width={50}
            height={20}
            options={{
                defaultOptions,
                title: {
                    display: true,
                    text: 'AFI PAINT'
                },
                legend: {
                    display: true,
                    position: 'right'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }}
            />
        );
    } else if (chartType.toLowerCase() === "pie") {
        return(
            <Pie 
            className="chart"
            data={{
                labels: dataLabels,
                datasets: [
                    {
                        label: chartTitle,
                        data: chartData,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            }}
            width={50}
            height={20}
            options={{
                defaultOptions,
                title: {
                    display: true,
                    text: 'AFI PAINT'
                },
                legend: {
                    display: true,
                    position: 'right'
                },
                animation: {
                    animateScale: true
                }
            }}
            />
        );
    } else if (chartType.toLowerCase() === "doughnut") {
        return(
            <Doughnut 
            className="chart"
            data={{
                labels: dataLabels,
                datasets: [
                    {
                        label: chartTitle,
                        data: chartData,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            }}
            width={50}
            height={20}
            options={{
                defaultOptions,
                title: {
                    display: true,
                    text: 'AFI PAINT'
                },
                legend: {
                    display: true,
                    position: 'right'
                },
                animation: {
                    animateScale: true
                }
            }}
            />
        );
    };
};



