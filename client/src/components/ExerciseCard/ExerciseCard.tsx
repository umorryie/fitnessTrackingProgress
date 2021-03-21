import { useState, useEffect } from 'react';
import './ExerciseCard.css';
import CanvasJSReact from '../../assets/canvasjs.react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import IDataPoints from '../../interfaces/IDataPoints';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
let universalArray: any[] = [];

function ExerciseCard() {
    const [activeMonthName, setActiveMonthName] = useState('');
    const [activeYearNumber, setActiveYearNumber] = useState(0);
    const [activeMonthNameIndex, setActiveMonthNameIndex] = useState(0);
    const [activeYearNumberIndex, setActiveYearNumberIndex] = useState(0);
    const [previousMonthExists, setPreviousMonthExists] = useState(true);
    const [nextMonthExists, setNextMonthExists] = useState(true);
    const [exerciseName, setExerciseName] = useState('');
    const [allYears, setAllYears] = useState(universalArray);
    const [allMonths, setAllMonths] = useState(universalArray);
    const [chartOptions, setChartOptions] = useState({});
    const addProgress = <FontAwesomeIcon icon={faPlusCircle} className="leftPadding" />
    const arrowLeft = <FontAwesomeIcon icon={faArrowLeft} />
    const arrowRight = <FontAwesomeIcon icon={faArrowRight} />

    useEffect(() => {
        fetch('http://localhost:8080/exercises')
            .then(data => data.json())
            .then(jsonData => {
                const { exerciseName, years } = jsonData.exercises[0];
                const { yearNumber, months } = jsonData.exercises[0].years[jsonData.exercises[0].years.length - 1];
                const { monthName, options } = jsonData.exercises[0].years[jsonData.exercises[0].years.length - 1].months[jsonData.exercises[0].years[jsonData.exercises[0].years.length - 1].months.length - 1];
                const yearsLength = years.length - 1;
                const monthsLength = months.length - 1;
                setActiveMonthNameIndex(monthsLength);
                setActiveYearNumberIndex(yearsLength);
                setExerciseName(exerciseName);
                setAllMonths(months);
                setAllYears(years);
                setActiveMonthName(monthName);
                setActiveYearNumber(yearNumber);
                setChartOptions(determineChartOptions(options.dataPoints, options.suffix, activeMonthName, activeYearNumber));
                determineNextMonthExistence(monthsLength, yearsLength, years, months);
                determinePreviousMonthExistence(monthsLength, yearsLength);
            });
    }, []);

    const changeMonthLeft = () => {
        let newActiveYearNumberIndex = null;
        let newMonthIndexDueYearChange = null;
        let newMonthsDueYearChange = null;
        let newActiveMonthNameIndex = activeMonthNameIndex - 1;
        let options = null;
        let monthName = null;

        if (activeMonthNameIndex === 0 && activeYearNumberIndex > 0) {
            newActiveYearNumberIndex = activeYearNumberIndex - 1;
            setActiveYearNumberIndex(newActiveYearNumberIndex);
            setActiveYearNumber(allYears[newActiveYearNumberIndex].yearNumber);
            newMonthIndexDueYearChange = allYears[newActiveYearNumberIndex].months.length - 1;
            newMonthsDueYearChange = allYears[newActiveYearNumberIndex].months;
            setAllMonths(newMonthsDueYearChange);
        }

        if (newMonthIndexDueYearChange != null) {
            newActiveMonthNameIndex = newMonthIndexDueYearChange;
        }
        setActiveMonthNameIndex(newActiveMonthNameIndex);

        if (newMonthsDueYearChange == null) {
            options = allMonths[newActiveMonthNameIndex].options;
            monthName = allMonths[newActiveMonthNameIndex].monthName;
        } else {
            options = newMonthsDueYearChange[newMonthIndexDueYearChange || 0].options;
            monthName = newMonthsDueYearChange[newMonthIndexDueYearChange || 0].monthName;
        }

        setActiveMonthName(monthName);
        setChartOptions(determineChartOptions(options.dataPoints, options.suffix, activeMonthName, activeYearNumber));

        if (newActiveYearNumberIndex != null) {
            determinePreviousMonthExistence(newActiveMonthNameIndex, newActiveYearNumberIndex);
        } else {
            determinePreviousMonthExistence(newActiveMonthNameIndex, activeYearNumberIndex);
        }
        setNextMonthExists(true);
    }

    const changeMonthRight = () => {
        let newActiveYearNumberIndex = null;
        let newMonthIndexDueYearChange = null;
        let newMonthsDueYearChange = null;
        let newActiveMonthNameIndex = activeMonthNameIndex + 1;
        let options = null;
        let monthName = null;
        if (activeMonthNameIndex === allMonths.length - 1 && activeYearNumberIndex < allYears.length - 1) {
            newActiveYearNumberIndex = activeYearNumberIndex + 1;
            setActiveYearNumberIndex(newActiveYearNumberIndex);
            setActiveYearNumber(allYears[newActiveYearNumberIndex].yearNumber);
            newMonthIndexDueYearChange = 0;
            newMonthsDueYearChange = allYears[newActiveYearNumberIndex].months;
            setAllMonths(newMonthsDueYearChange);
        }

        if (newMonthIndexDueYearChange != null) {
            newActiveMonthNameIndex = newMonthIndexDueYearChange;
        }

        setActiveMonthNameIndex(newActiveMonthNameIndex);
        if (newMonthsDueYearChange == null) {
            options = allMonths[newActiveMonthNameIndex].options;
            monthName = allMonths[newActiveMonthNameIndex].monthName;
        } else {
            options = newMonthsDueYearChange[newMonthIndexDueYearChange || 0].options;
            monthName = newMonthsDueYearChange[newMonthIndexDueYearChange || 0].monthName;
        }
        setActiveMonthName(monthName);
        setChartOptions(determineChartOptions(options.dataPoints, options.suffix, activeMonthName, activeYearNumber));

        if (newActiveYearNumberIndex != null) {
            determineNextMonthExistence(newActiveMonthNameIndex, newActiveYearNumberIndex, null, null);
        } else {
            determineNextMonthExistence(newActiveMonthNameIndex, activeYearNumberIndex, null, null);
        }
        setPreviousMonthExists(true);
    }

    const determinePreviousMonthExistence = (monthIndex: Number, yearIndex: Number) => {
        if (monthIndex === 0 && yearIndex === 0) {
            setPreviousMonthExists(false);
        }
    }

    const determineNextMonthExistence = (monthIndex: Number, yearIndex: Number, allYearsArray: any, allMonthsArray: any) => {
        if (allYearsArray && allMonthsArray) {
            if (monthIndex === allMonthsArray.length - 1 && yearIndex === allYearsArray.length - 1) {
                setNextMonthExists(false);
            }
            return;
        }
        if (allYearsArray) {
            if (monthIndex === allMonths.length - 1 && yearIndex === allYearsArray.length - 1) {
                setNextMonthExists(false);
            }
            return;
        }
        if (allMonthsArray) {
            if (monthIndex === allMonthsArray.length - 1 && yearIndex === allYears.length - 1) {
                setNextMonthExists(false);
            }
            return;
        }
        if (monthIndex === allMonths.length - 1 && yearIndex === allYears.length - 1) {
            setNextMonthExists(false);
            return;
        }
        setNextMonthExists(true);
    }

    return (
        <div className="exerciseContainer">
            <div className="exerciseInnerContainer">
                <div className="exerciseName bold">{exerciseName}</div>
                {/*    NAV    START                      */}
                <div className="exerciseNavBar">
                    <div className="personalInfoDiv">
                        <div className="months">
                            {previousMonthExists ? <div className="monthArrow" onClick={() => { changeMonthLeft(); }}>{arrowLeft}</div> : null}
                            <div className="monthActive" onClick={() => { }}>{activeMonthName} {activeYearNumber}</div>
                            {nextMonthExists ? <div className="monthArrow" onClick={() => { changeMonthRight(); }}>{arrowRight}</div> : null}
                        </div>
                        <div className="cursorHover filter">Filter</div>
                        <div className="downloadAndAddProgress">
                            <div className="cursorHover downloadProgress leftPadding">Download progress</div>
                            <div className="cursorHover addProgress whiteColor leftPadding">Add progress{addProgress}</div>
                        </div>
                    </div>
                </div>
                <div className="contentContainer">
                    <div className="graphContainer">
                        <CanvasJSChart options={chartOptions}
                        />
                    </div>
                    <div className="statsContainer">
                        <div className="circle">
                            200lbs
                </div>
                        <div className="circle">
                            2 sets
                </div>
                        <div className="circle">
                            12 reps
                </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function determineChartOptions(dataPoints: IDataPoints[], suffix: string, month: string, year: Number) {
    return {
        theme: "light2",
        axisY: {
            includeZero: true,
            suffix
        },
        animationEnabled: true,
        toolTip: {
            shared: true
        },
        data: [{
            type: "area",
            name: `${month} ${year}`,
            showInLegend: false,
            dataPoints
        }]
    }
}

export default ExerciseCard;