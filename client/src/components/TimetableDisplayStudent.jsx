import React, { useState, useEffect } from 'react';
import './TimetableDisplay.css'; // Ensure this CSS file contains the necessary styles
import axios from 'axios';

const TimetableDisplay = ({ timetable }) => {
    const [facultyNames, setFacultyNames] = useState({});
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const timeSlots = [
        '8:45 - 9:35 AM',
        '9:35 - 10:25 AM',
        '10:40 - 11:30 AM',
        '11:30 AM - 12:20 PM',
        '2:20 - 3:10 PM',
        '3:25 - 4:40 PM'
    ];

    // Function to fetch faculty names from the backend
    const fetchFacultyNames = async () => {
        try {
            const response = await axios.get('http://localhost:5000/faculty-names');
            setFacultyNames(response.data);
        } catch (error) {
            console.error('Error fetching faculty names:', error);
        }
    };

    useEffect(() => {
        fetchFacultyNames();
    }, []);

    // Create a structure for timetable data
    const timetableMap = {};

    // Initialize timetableMap with empty values
    timeSlots.forEach(slot => {
        timetableMap[slot] = {};
        days.forEach(day => {
            timetableMap[slot][day] = { subject: 'EMPTY', faculty_id: '' };
        });
    });

    // Populate timetableMap with actual data
    timetable.forEach(entry => {
        timetableMap[entry.time_slot][entry.day] = {
            subject: entry.subject_name,
            faculty_id: entry.teacher_id
        };
    });

    return (
        <div className="timetable-container">
            <h3>Timetable</h3>
            <table className="timetable-table">
                <thead>
                    <tr>
                        <th>Time Slot</th>
                        {days.map(day => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {timeSlots.map(slot => (
                        <tr key={slot}>
                            <td>{slot}</td>
                            {days.map(day => {
                                const { subject, faculty_id } = timetableMap[slot][day];
                                const facultyName = facultyNames[faculty_id] || 'Unknown';
                                return (
                                    <td key={day}>
                                        {subject}<br />
                                        {facultyName}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TimetableDisplay;
