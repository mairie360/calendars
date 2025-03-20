'use client';

import { useState } from "react";

export default function Page() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2));
  const [viewMode, setViewMode] = useState("month");

  const prevPeriod = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (viewMode === "month") return new Date(newDate.getFullYear(), newDate.getMonth() - 1);
      if (viewMode === "week") {
        newDate.setDate(newDate.getDate() - 7);
        return new Date(newDate);
      }
      newDate.setDate(newDate.getDate() - 1);
      return new Date(newDate);
    });
  };
  
  const nextPeriod = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (viewMode === "month") return new Date(newDate.getFullYear(), newDate.getMonth() + 1);
      if (viewMode === "week") {
        newDate.setDate(newDate.getDate() + 7);
        return new Date(newDate);
      }
      newDate.setDate(newDate.getDate() + 1);
      return new Date(newDate);
    });
  };
  
  const today = new Date();
  const isToday = (date: Date) =>
    today.getDate() === date.getDate() &&
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear();

  const monthName = currentDate.toLocaleString("en-US", { month: "long" });
  const year = currentDate.getFullYear();
  const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(year, currentDate.getMonth(), 1).getDay();

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDay = currentDate.getDate();
  const currentWeekStart = new Date(currentDate);
  currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay());

  const changeViewMode = (mode : string) => {
    if (mode === "week") {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      setCurrentDate(startOfWeek);
    } else if (mode === "day") {
      setCurrentDate(new Date());
    }
    setViewMode(mode);
  };

  return (
    <div className="flex h-full flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 shadow-md p-6 flex flex-col items-center md:items-start justify-start gap-4">
        <h2 className="text-lg w-full font-semibold text-center md:text-left">Calendars</h2>
        <ul className="flex flex-col gap-2 w-full">
          <li className="p-2 rounded-md bg-primary text-white w-full text-center md:text-left">Work</li>
          <li className="p-2 rounded-md cursor-pointer hover:bg-primary hover:text-white w-full text-center md:text-left">Personal</li>
          <li className="p-2 rounded-md cursor-pointer hover:bg-primary hover:text-white w-full text-center md:text-left">Meetings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header with filters and navigation */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
          <div className="flex gap-4">
            <button onClick={prevPeriod} className="btn p-2 rounded-md">&lt; Prev</button>
            <h1 className="text-xl md:text-2xl font-bold text-center">
              {viewMode === "month" && `${monthName} ${year}`}
              {viewMode === "week" && `Week of ${currentWeekStart.toLocaleDateString()}`}
              {viewMode === "day" && `Day ${currentDay} - ${monthName} ${year}`}
            </h1>
            <button onClick={nextPeriod} className="btn p-2 rounded-md">Next &gt;</button>
          </div>

          <div className="flex items-center">
            <label htmlFor="viewMode" className="sr-only">
              Select View Mode
            </label>
            <select 
              id="viewMode"
              onChange={(e) => changeViewMode(e.target.value)} 
              value={viewMode}
              className="p-2 border rounded-md bg-transparent appearance-none text-center text-black dark:text-white"
            >
              <option value="month" className="bg-white dark:bg-gray-800">Month View</option>
              <option value="week" className="bg-white dark:bg-gray-800">Week View</option>
              <option value="day" className="bg-white dark:bg-gray-800">Day View</option>
            </select>
            <div className="ml-4 h-6 w-px dark:bg-white bg-black"></div>
            <button className="ml-4 p-2 bg-primary text-white rounded-md">Add Event</button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="border p-4 rounded-lg shadow-md">
          {/* Month View */}
          {viewMode === "month" && (
            <div className="grid grid-cols-7 gap-1 text-sm">
              {weekDays.map((day) => (
                <div key={day} className="text-center font-semibold">{day}</div>
              ))}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="p-4"></div>
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const dayDate = new Date(year, currentDate.getMonth(), i + 1);
                return (
                  <div 
                    key={i} 
                    className={`p-4 text-center rounded-md border-2 ${
                      isToday(dayDate) ? "bg-primary text-white font-bold" : ""
                    }`}
                  >
                    {i + 1}
                  </div>
                );
              })}
            </div>
          )}

          {/* Week View */}
          {viewMode === "week" && (
            <div className="grid grid-cols-7 gap-1">
              {weekDays.map((day) => (
                <div key={day} className="text-center font-semibold">{day}</div>
              ))}
              {weekDays.map((day, i) => {
                const weekDayDate = new Date(currentWeekStart);
                weekDayDate.setDate(currentWeekStart.getDate() + i);
                return (
                  <div
                    key={day}
                    className={`p-4 text-center rounded-md border-2 ${
                      isToday(weekDayDate) ? "bg-primary text-white font-bold" : ""
                    }`}
                  >
                    {weekDayDate.getDate()}
                  </div>
                );
              })}
            </div>
          )}

          {/* Day View */}
          {viewMode === "day" && (
            <div className="text-center">
              <div className="text-lg font-semibold">{weekDays[currentDate.getDay()]}</div>
              <div
                className={`p-6 text-xl font-bold border rounded-md border-2 ${
                  isToday(currentDate) ? "bg-primary text-white" : ""
                }`}
              >
                {currentDate.getDate()}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
