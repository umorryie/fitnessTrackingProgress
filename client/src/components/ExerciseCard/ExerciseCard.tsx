import React, { useState, useEffect } from 'react';
import './ExerciseCard.css'
import testInfo from './testInfo';
import { Line } from 'react-chartjs-2';

import Chart from "chart.js"
export const ExerciseCard = () => {

    const [exercise, setExercise] = useState<any>([]);
    const [displayData, setDisplayData] = useState<any>({});

    //const [data1, setData1] = useState<any>({});
    const [monthClass, setMonthClass] = useState<string>("");
    //const [data2, setData2] = useState<any>({});



    useEffect(() => {
        setExercise(testInfo);
        /*setData2({
            labels: ["3 Apr", "7 Apr", "11 Apr", "15 Apr", "20 Apr", "24 Apr", "27 Apr", "31 Apr"],
            datasets: [
                {
                    label: "Performance",
                    data: [90, 91, 94, 100, 120, 130, 150, 160, 170],
                },
            ],
        });
        setData1({
            labels: ["3 Mar", "7 Mar", "11 Mar", "15 Mar", "20 Mar", "24 Mar", "27 Mar", "31 Mar"],
            datasets: [
                {
                    label: "Performance",
                    data: [30, 48, 57, 60, 71, 83, 85, 87, 88],
                },
            ],
        });*/
        setDisplayData({
            labels: ["3 Mar", "7 Mar", "11 Mar", "15 Mar", "20 Mar", "24 Mar", "27 Mar", "31 Mar"],
            datasets: [
                {
                    label: "Performance",
                    data: [30, 48, 57, 60, 71, 83, 85, 87, 88],
                },
            ],
        });
        setMonthClass("data1");
    }, []);
    if (window.Chart) {
        testInfo.parseOptions(Chart, testInfo.chartOptions());
    }
    const toggleMonthClass = (dataNo: string) => {
        setMonthClass(dataNo);
        if (dataNo === "data1") {
            setDisplayData(testInfo.chart.data1);
        } else {
            setDisplayData(testInfo.chart.data2);
        }
    }


    return (
        <div className="exerciseCardInnerContainer">
            <div className="exerciseCardNavigation">
                <div className={monthClass === "data1" ? "selectedMonth" : "notSelectedMonth"}
                    onClick={() => toggleMonthClass("data1")}>
                    March
                </div>
                <div className={monthClass !== "data1" ? "selectedMonth" : "notSelectedMonth"}
                    onClick={() => toggleMonthClass("data2")}>
                    April
                </div>
            </div>
            <div className="exerciseCard">
                <Line
                    data={displayData}
                    options={testInfo.chart.options}
                />
            </div>
        </div>
    )
}