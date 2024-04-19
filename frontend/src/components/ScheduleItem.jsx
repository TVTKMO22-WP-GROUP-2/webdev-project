import React from "react";

function ScheduleItem({imgSRC, time, auditorium, title}) {
    return (
        <div className="scheduleItemContainer">
            <img src={imgSRC} />
            <div className="timeAndLocation">
                <h1 className="time">{time}</h1>
                <h1 className="auditorium">{auditorium}</h1>
            </div>
            <h3 className="title">{title}</h3>
        </div>
    );
}

export default ScheduleItem;