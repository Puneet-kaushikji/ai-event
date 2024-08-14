import React, { useState } from "react";
import styles from "../Aievents.module.css";
import EventList from "../Report/EventList";

export default function Aievents() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateIndex, setSelectedDateIndex] = useState(0); // Start with index 0 for today

  const previousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7); // Move to the previous week
    setCurrentDate(newDate);
    handleDateSelect(selectedDateIndex, newDate); // Trigger date selection for the current index with the new date
  };

  const nextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7); // Move to the next week
    setCurrentDate(newDate);
    handleDateSelect(selectedDateIndex, newDate); // Trigger date selection for the current index with the new date
  };

  const getDayName = (date) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return daysOfWeek[date.getDay()];
  };

  const getMonthName = (date) => {
    const monthsOfYear = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return monthsOfYear[date.getMonth()];
  };

  const handleDateSelect = (index, baseDate = currentDate) => {
    setSelectedDateIndex(index);
    const selectedDate = new Date(baseDate);
    selectedDate.setDate(baseDate.getDate() + index);
    console.log("Selected date:", selectedDate.toDateString());
  };

  const renderDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      const isSelected = i === selectedDateIndex;

      dates.push(
        <button
          key={i}
          className={`${styles.dateBox} ${isSelected ? styles.selected : ""}`}
          onClick={() => handleDateSelect(i)}
        >
          <div className={styles.date}>
            {date.getDate()} {getMonthName(date)}
          </div>
          <div className={styles.day}>{getDayName(date)}</div>
        </button>
      );
    }
    return dates;
  };

  return (
    <div className={styles.eventsDesktop}>
      <div className={styles.div151}>
        <div className={styles.div15}>
          <h1 className={styles.aiEvents}>AI Events</h1>
        </div>
        <div className={styles.buttonGroup}>
          <button className={`${styles.tabButton} ${styles.active}`}>
            Events
          </button>
          <button className={styles.tabButton}>Notifications</button>
          <button className={styles.tabButton}>Reports</button>
        </div>
      </div>
      
      <div className={styles.div2}>
        <select className={styles.deviceDropdown}>
          <option>All Device</option>
        </select>
        <div className={styles.previousWeek} onClick={previousWeek}>
          previous week
        </div>
        <div className={styles.nextWeek} onClick={nextWeek}>
          next week
        </div>
      </div>
      <div className={styles.datesContainer}>{renderDates()}</div>

      <EventList />
    </div>
  );
}
