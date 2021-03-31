import { useState, useEffect } from 'react';
import './ExerciseCard.css';
import CanvasJSReact from '../../assets/canvasjs.react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faArrowLeft, faArrowRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import IDataPoints from '../../interfaces/IDataPoints';
import { selectUser } from '../../redux/features/user';
import EditableStats from '../EditableStats/EditableStats';
import { useSelector, useDispatch } from 'react-redux';
import { insertProgress } from '../../controllers/UserController';
import { validateExerciseInput } from '../../validations/validateExerciseInput';
import { handleError } from '../../errorHandler/errorHandler';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
let universalArray: any[] = [];

function ExerciseCard(data: any) {
    const addProgress = <FontAwesomeIcon icon={faPlusCircle} className="leftPadding" />;
    const arrowLeft = <FontAwesomeIcon icon={faArrowLeft} />;
    const arrowRight = <FontAwesomeIcon icon={faArrowRight} />;
    const exitButton = <FontAwesomeIcon icon={faTimes} className="exitIcon" onClick={() => { toggleAddingProgress() }} />;

    const dispatch = useDispatch();
    const [activeMonthName, setActiveMonthName] = useState('');
    const [activeYearNumber, setActiveYearNumber] = useState(0);
    const [activeMonthNameIndex, setActiveMonthNameIndex] = useState(0);
    const [activeYearNumberIndex, setActiveYearNumberIndex] = useState(0);
    const [previousMonthExists, setPreviousMonthExists] = useState(true);
    const [nextMonthExists, setNextMonthExists] = useState(true);
    const [exerciseName, setExerciseName] = useState('');
    const [allYears, setAllYears] = useState(universalArray);
    const [allMonths, setAllMonths] = useState(universalArray);
    const [addSets, setAddSets] = useState(0);
    const [addWeight, setAddWeight] = useState(0);
    const [addReps, setAddReps] = useState(0);
    const [addingProgress, setAddingProgress] = useState(false);
    const [addWeightUnit, setAddWeightUnit] = useState('kg');
    const [addDate, setAddDate] = useState(getDate(null));
    const user = useSelector(selectUser);
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const resultData = data.data;
        const { exerciseName, years } = resultData;
        const { yearNumber, months } = resultData.years[resultData.years.length - 1];
        const { monthName, options } = resultData.years[resultData.years.length - 1].months[resultData.years[resultData.years.length - 1].months.length - 1];
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
    }, []);
    const addInputs = (event: any, target: string) => {
        switch (target) {
            case 'addReps':
                setAddReps(event.target.value);
                break;
            case 'addSets':
                setAddSets(event.target.value);
                break;
            case 'addWeight':
                setAddWeight(event.target.value);
                break;
            case 'addDate':
                setAddDate(event.target.value);
                break;
        }
    }
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

        if (newMonthsDueYearChange === null) {
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
        if (newMonthsDueYearChange === null) {
            options = allMonths[newActiveMonthNameIndex].options;
            monthName = allMonths[newActiveMonthNameIndex].monthName;
        } else {
            options = newMonthsDueYearChange[newMonthIndexDueYearChange || 0].options;
            monthName = newMonthsDueYearChange[newMonthIndexDueYearChange || 0].monthName;
        }
        setActiveMonthName(monthName);
        setChartOptions(determineChartOptions(options.dataPoints, options.suffix, activeMonthName, activeYearNumber));

        if (newActiveYearNumberIndex != null) {
            determineNextMonthExistence(newActiveMonthNameIndex, newActiveYearNumberIndex, newMonthsDueYearChange || null, null);
        } else {
            determineNextMonthExistence(newActiveMonthNameIndex, activeYearNumberIndex, newMonthsDueYearChange || null, null);
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
    const toggleAddingProgress = () => {
        setAddingProgress(!addingProgress);
    }
    const validateAndInsertProgress = () => {
        const validationResponse = validateExerciseInput(null, addSets, addReps, addWeight);
        if (validationResponse) {
            handleError(validationResponse, dispatch);
        } else {
            insertProgress(data.data.exerciseName, addSets, addReps, addWeight, addWeightUnit, addDate, user.jwt, dispatch);
            toggleAddingProgress();
        }
    }
    const renderStatsContainer = () => {
        if (addingProgress) {
            return (<div className="insertProgressContainer">
                {exitButton}
                <input type="number" placeholder="Add reps" onChange={(event) => { addInputs(event, 'addReps'); }} />
                <input type="number" placeholder="Add sets" onChange={(event) => { addInputs(event, 'addSets'); }} />
                <input type="number" placeholder="Add weight" onChange={(event) => { addInputs(event, 'addWeight'); }} />
                <input type="date" value={addDate} onChange={(event) => { addInputs(event, 'addDate'); }} />
                <div className="checkboxes">
                    <div className="weightUnit">
                        <div className={addWeightUnit === 'lbs' ? "lbs weightUnitActive" : "lbs weightUnitNotActive"} onClick={() => { setAddWeightUnit('lbs'); }}><span>lbs</span></div>
                        <div className="slider"></div>
                        <div className={addWeightUnit === 'kg' ? "lbs weightUnitActive" : "lbs weightUnitNotActive"} onClick={() => { setAddWeightUnit('kg'); }}><span>kg</span></div>
                    </div>
                </div>
                <div className="insertProgressButton" onClick={() => {
                    validateAndInsertProgress();
                }}>Insert progress</div>
            </div>);
        } else {
            return (
                <div className="statsContainer">
                    <EditableStats exerciseName={exerciseName} />
                </div>);
        }
    }
    const determineAddElements = (): boolean => {
        if (addingProgress) {
            const { innerWidth } = window;
            if (innerWidth < 1050) {
                return true;
            }
        }

        return false;
    }

    return (
        <div className="exerciseContainer">
            <div className="exerciseInnerContainer">
                <div className="exerciseName bold">{exerciseName}</div>
                <div className="exerciseNavBar">
                    <div className="personalInfoDiv">
                        {determineAddElements() ? null :
                            <div className="months">
                                {previousMonthExists ?
                                    <div className="monthArrow" onClick={() => { changeMonthLeft(); }}>{arrowLeft}</div>
                                    : <div className="monthArrow hidden">{arrowLeft}</div>}
                                <div className="monthActive">{activeMonthName} {activeYearNumber}</div>
                                {nextMonthExists ?
                                    <div className="monthArrow" onClick={() => { changeMonthRight(); }}>{arrowRight}</div>
                                    : <div className="monthArrow hidden">{arrowRight}</div>}
                            </div>}
                        <div className="downloadAndAddProgress">
                            {determineAddElements() ? null : <div className="cursorHover downloadProgress leftPadding">Download progress</div>}
                            {determineAddElements() ? null : <div className="cursorHover addProgress whiteColor leftPadding" onClick={() => { toggleAddingProgress(); }}>Add progress{addProgress}</div>}
                        </div>
                    </div>
                </div>
                <div className="contentContainer">
                    <div className="graphContainer">
                        {!determineAddElements() ?
                            <CanvasJSChart options={chartOptions} /> :
                            null}
                    </div>
                    <div className="whiteSeparator"></div>
                    {renderStatsContainer()}
                </div>
                <div className="whiteSeparator"></div>
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
        axisX: {
            minimum: 0,
            maximum: 31
        },
        animationEnabled: true,
        toolTip: {
            shared: true
        },
        data: [{
            type: "area",
            name: `${month} ${year}`,
            showInLegend: false,
            toolTipContent: "<span style=\"color:#4F81BC \">{dateName}</span><br>Sets: {sets}<br>Weight: {y} {suffix}<br>Reps: {reps}",
            dataPoints
        }]
    }
}

function getDate(dateParam: (Date | null)) {
    if (dateParam) {
        const monthNumber: number = dateParam.getMonth() + 1;
        const day: number = dateParam.getDate();
        let monthString: string;
        let dateDay: string;

        if (monthNumber < 10) {
            monthString = `0${monthNumber.toString()}`;
        } else {
            monthString = monthNumber.toString();
        }
        if (day < 10) {
            dateDay = `0${day.toString()}`;
        } else {
            dateDay = day.toString();
        }

        return `${dateParam.getFullYear()}-${monthString}-${dateDay}`
    } else {
        const rightNow = new Date();
        const monthNumber: number = rightNow.getMonth() + 1;
        let monthString: string;
        if (monthNumber < 10) {
            monthString = `0${monthNumber.toString()}`;
        } else {
            monthString = monthNumber.toString();
        }

        return `${rightNow.getFullYear()}-${monthString}-${rightNow.getDate()}`
    }
}

export default ExerciseCard;
export { getDate };