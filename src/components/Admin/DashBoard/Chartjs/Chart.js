import React from 'react';

import { Doughnut, Line, Pie, Bar } from 'react-chartjs-2'


const defaultOptions = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: true
}

export default function makeChart(chartType, data) {
    if (chartType.toLowerCase() === "line") {
        return(
            <Line 
            className="chart"
            data={data} 
            width={50}
            height={10}
            options={{
                defaultOptions,
                title: {
                    display: true,
                    text: 'AFI PAINT'
                },
                legend: {
                    display: true,
                    position: 'right'
                }
            }}
            />
        );
    } else if (chartType.toLowerCase() === "bar") {
        return(
            <Bar 
            className="chart"
            data={data} 
            width={50}
            height={10}
            options={{
                title: {
                    display: true,
                    text: 'AFI PAINT'
                },
                legend: {
                    display: true,
                    position: 'right'
                },
                defaultOptions
            }}/>
        );
    } else if (chartType.toLowerCase() === "pie") {
        return(
            <Pie
            className="chart"
            data={data} 
            width={50}
            height={10}
            options={{
                defaultOptions,
                title: {
                    display: true,
                    text: 'AFI PAINT',
                },
                legend: {
                    display: true,
                    position: 'right'
                }
            }}/>
        );
    } else if (chartType.toLowerCase() === "doughnut") {
        return(
            <Doughnut
            className="chart"
            data={data} 
            width={50}
            height={10}
            options={{
                defaultOptions,
                title: {
                    display: true,
                    text: 'AFI PAINT',
                },
                legend: {
                    display: true,
                    position: 'right'
                }
            }}/>
        );
    };
};



