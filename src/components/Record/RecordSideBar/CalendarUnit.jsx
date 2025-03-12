import {
    CalendarNavigator,
    Day,
    UnitContainer,
    MonthAndYear,
    Week,
    WeeksWrapper,
    Yoil,
    SelectedDay,
    SelectedDayBack,
    ArrowButtton,
} from "./RecordCalendarUnit.style";
import { useState } from "react";

import { IoIosArrowDown } from "react-icons/io";

const CalendarUnit = () => {

    // -----------------------------------------------------------------------------------------------
    // 날짜 초기화 로직
    // -----------------------------------------------------------------------------------------------

    const [currentDate, setCurrentDate] = useState(new Date());
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();



    // 현재 달의 첫 날
    const firstDayOfMonth = new Date(year, month, 1);
    // 달력 시작 날짜를 현재 달의 첫 날의 주의 일요일로 설정
    const startDay = new Date(firstDayOfMonth);
    startDay.setDate(1 - firstDayOfMonth.getDay());

    // 현재 달의 마지막 날
    const lastDayOfMonth = new Date(year, month + 1, 0);
    // 달력 끝 날짜를 현재 달의 마지막 날의 주의 토요일로 설정
    const endDay = new Date(lastDayOfMonth);
    endDay.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));


    /** startDay부터 endDay까지의 날짜를 주 단위로 그룹화하는 함수 */
    const groupDatesByWeek = (startDay, endDay) => {
        const weeks = []; // 최종적으로 주 단위로 그룹화된 날짜 배열들을 저장할 배열
        let currentWeek = []; // 현재 처리 중인 주를 나타내는 배열
        let currentDate = new Date(startDay); // 반복 처리를 위한 현재 날짜 변수, 시작 날짜로 초기화

        // 시작 날짜부터 끝 날짜까지 반복
        while (currentDate <= endDay) {
            currentWeek.push(new Date(currentDate)); // 현재 날짜를 현재 주에 추가
            // 현재 주가 7일을 모두 채웠거나 현재 날짜가 토요일인 경우
            if (currentWeek.length === 7 || currentDate.getDay() === 6) {
                weeks.push(currentWeek); // 완성된 주를 weeks 배열에 추가
                currentWeek = []; // 새로운 주를 시작하기 위해 currentWeek을 재초기화
            }
            currentDate.setDate(currentDate.getDate() + 1); // 현재 날짜를 다음 날로 변경
        }

        // 마지막 주 처리 (만약 남아있다면)
        if (currentWeek.length > 0) {
            weeks.push(currentWeek); // 남아 있는 날짜가 있다면 마지막 주로 weeks에 추가
        }

        return weeks; // 주 단위로 그룹화된 날짜 배열들을 반환
    };

    // -----------------------------------------------------------------------------------------------
    // 변수 선언
    // -----------------------------------------------------------------------------------------------

    const [startDateOfRecord, setStartDay] = useState(currentDate);
    const [endDateOfRecord, setEndDay] = useState(null);

    var thisMonthFlag = false;
    var pointedDateFlag = false;

    // -----------------------------------------------------------------------------------------------
    // event handler
    // -----------------------------------------------------------------------------------------------


    const handleDayClick = (date) => {
        // 날짜 클릭 시 이벤트
        const selectedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        if (startDateOfRecord === null) {
            setStartDay(selectedDate);
            setEndDay(selectedDate);
        } else if (startDateOfRecord && endDateOfRecord === null) {
            if (selectedDate < startDateOfRecord) {
                setStartDay(selectedDate);
                setEndDay(startDateOfRecord);
            } else if (selectedDate > startDateOfRecord) {
                setEndDay(selectedDate);
            }
        } else if (startDateOfRecord && endDateOfRecord) {
            setStartDay(selectedDate);
            setEndDay(null);
        }

    };

    // -----------------------------------------------------------------------------------------------
    // 함수 선언
    // -----------------------------------------------------------------------------------------------

    const compareDate = (date1, date2) => {

        if (date1 === null || date2 === null) return false;


        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    const isDateInRange = (date, startDate, endDate) => {
        if (!startDate || !endDate) return false;
        return date >= startDate && date <= endDate;
    };



    // -----------------------------------------------------------------------------------------------
    // 반환부
    // -----------------------------------------------------------------------------------------------

    return (
        <UnitContainer>
            <CalendarNavigator>
                <MonthAndYear>{`${year}.${month + 1 < 10 ? `0${month + 1}` : month + 1}`}</MonthAndYear>
                <ArrowButtton >
                    <IoIosArrowDown style={{ color: '#888888' }} />
                </ArrowButtton>
            </CalendarNavigator>
            <Week>
                {
                    ['일', '월', '화', '수', '목', '금', '토'].map((yoil, index) => (
                        <Yoil key={index}>{yoil}</Yoil>
                    ))
                }
            </Week>

            <WeeksWrapper>
                {
                    groupDatesByWeek(startDay, endDay).map((week, index) => (
                        <Week key={index}>
                            {week.map((date, index) => {
                                if (date.getDate() == 1) thisMonthFlag = !thisMonthFlag;

                                if (compareDate(date, startDateOfRecord)) {
                                    return (
                                        <SelectedDayBack
                                            key={index}
                                            thisMonthFlag={thisMonthFlag}
                                            onClick={() => handleDayClick(date)}
                                            isStartPoint={endDateOfRecord !== null}
                                        >
                                            {date.getDate()}
                                            < SelectedDay
                                                key={index}
                                                onClick={() => handleDayClick(date)}
                                            >
                                                {date.getDate()}
                                            </SelectedDay>
                                        </SelectedDayBack>
                                    )
                                }
                                else if (compareDate(date, endDateOfRecord)) {
                                    return (
                                        <SelectedDayBack
                                            key={index}
                                            thisMonthFlag={thisMonthFlag}
                                            onClick={() => handleDayClick(date)}
                                            isEndPoint={true}
                                        >
                                            {date.getDate()}
                                            <SelectedDay
                                                key={index}
                                                onClick={() => handleDayClick(date)}
                                            >
                                                {date.getDate()}
                                            </SelectedDay>
                                        </SelectedDayBack>
                                    )
                                }

                                else {
                                    return (
                                        <Day
                                            key={index}
                                            thisMonthFlag={thisMonthFlag}
                                            onClick={() => handleDayClick(date)}
                                            isDateInRange={isDateInRange(date, startDateOfRecord, endDateOfRecord)}
                                        >
                                            {date.getDate()}
                                        </Day>
                                    )
                                }
                            })}
                        </Week>
                    ))
                }
            </WeeksWrapper >
        </UnitContainer >
    )
};

export default CalendarUnit;