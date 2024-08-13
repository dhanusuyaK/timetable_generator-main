// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const mysql = require('mysql');

// const app = express();
// const port = 4000;

// app.use(cors());
// app.use(bodyParser.json());

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'college_database'
// });

// // Endpoint to submit teacher data
// app.post('/submit', (req, res) => {
//     const { facultyId, subject1, subject2, labSubject } = req.body;
//     pool.query(
//         'INSERT INTO teachers (teacher_id, subject1, subject2, subject3) VALUES (?, ?, ?, ?)',
//         [facultyId, subject1, subject2, labSubject],
//         (error, results) => {
//             if (error) {
//                 console.error('Error saving teacher data:', error);
//                 res.status(500).send('Error saving teacher data');
//             } else {
//                 res.status(200).json({ teacherId: results.insertId });
//             }
//         }
//     );
// });

// // Endpoint to generate timetable
// app.post('/generate-timetable', (req, res) => {
//     const { teacherId } = req.body;
//     const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     const timeSlots = [
//         '8:45 - 9:35 AM',
//         '9:35 - 10:25 AM',
//         '10:40 - 11:30 AM',
//         '11:30 AM - 12:20 PM',
//         '2:20 - 3:10 PM',
//         '3:25 - 4:40 PM'
//     ];

//     pool.query('SELECT * FROM teachers WHEREteacher_id = ?', [teacherId], (error, results) => {
//         if (error) {
//             console.error('Error fetching teacher data:', error);
//             res.status(500).send('Error fetching teacher data');
//             return;
//         }

//         const teacher = results[0];
//         const subjects = [teacher.subject1, teacher.subject2, teacher.subject3].filter(Boolean);
//         const timetableEntries = [];

//         // Function to get random classroom ID
//         const getRandomClassroomId = () => Math.floor(Math.random() * 50) + 1; // Random classroom between 1 and 50

//         subjects.forEach((subject, index) => {
//             days.forEach((day, dayIndex) => {
//                 if (index + dayIndex < timeSlots.length) {
//                     timetableEntries.push({
//                        teacher_id: teacherId,
//                         subject_name: subject,
//                         day: day,
//                         time_slot: timeSlots[index + dayIndex],
//                         classroom_id: getRandomClassroomId() // Assign a random classroom
//                     });
//                 }
//             });
//         });

//         timetableEntries.forEach(entry => {
//             pool.query(
//                 'INSERT INTO timetables (teacher_id, subject_name, day, time_slot, classroom_id) VALUES (?, ?, ?, ?, ?)',
//                 [entry.teacher_id, entry.subject_name, entry.day, entry.time_slot, entry.classroom_id],
//                 (error) => {
//                     if (error) {
//                         console.error('Error inserting timetable entry:', error);
//                         res.status(500).send('Error inserting timetable entry');
//                         return;
//                     }
//                 }
//             );
//         });

//         res.status(200).send('Timetable generated successfully');
//     });
// });

// // Endpoint to get timetable for a specific teacher
// app.get('/timetable/:teacherId', (req, res) => {
//     const { teacherId } = req.params;
//     pool.query('SELECT * FROM timetables WHEREteacher_id = ?', [teacherId], (error, results) => {
//         if (error) {
//             console.error('Error fetching timetable:', error);
//             res.status(500).send('Error fetching timetable');
//         } else {
//             res.status(200).json(results);
//         }
//     });
// });

// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });
































// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const mysql = require('mysql');

// const app = express();
// const port = 4000;

// app.use(cors());
// app.use(bodyParser.json());

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '', // Add your MySQL password if needed
//     database: 'college_database'
// });

// // Endpoint to submit teacher data
// app.post('/submit', (req, res) => {
//     const { facultyId, subject1, subject2, labSubject } = req.body;
//     pool.query(
//         'INSERT INTO teachers (teacher_id, subject1, subject2, subject3) VALUES (?, ?, ?, ?)',
//         [facultyId, subject1, subject2, labSubject],
//         (error, results) => {
//             if (error) {
//                 console.error('Error saving teacher data:', error);
//                 res.status(500).send('Error saving teacher data');
//             } else {
//                 res.status(200).json({ teacherId: results.insertId });
//             }
//         }
//     );
// });

// // Endpoint to generate timetable
// app.post('/generate-timetable', (req, res) => {
//     const { teacherId } = req.body;
//     const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     const timeSlots = [
//         '8:45 - 9:35 AM',
//         '9:35 - 10:25 AM',
//         '10:40 - 11:30 AM',
//         '11:30 AM - 12:20 PM',
//         '2:20 - 3:10 PM',
//         '3:25 - 4:40 PM'
//     ];

//     pool.query('SELECT * FROM teachers WHEREteacher_id = ?', [teacherId], (error, results) => {
//         if (error) {
//             console.error('Error fetching teacher data:', error);
//             res.status(500).send('Error fetching teacher data');
//             return;
//         }

//         const teacher = results[0];
//         const subjects = [teacher.subject1, teacher.subject2, teacher.subject3].filter(Boolean);
//         const timetableEntries = [];

//         // Function to get random classroom ID
//         const getRandomClassroomId = () => Math.floor(Math.random() * 50) + 1; // Random classroom between 1 and 50

//         subjects.forEach((subject, index) => {
//             days.forEach((day, dayIndex) => {
//                 if (index * days.length + dayIndex < timeSlots.length) {
//                     timetableEntries.push({
//                        teacher_id: teacherId,
//                         subject_name: subject,
//                         day: day,
//                         time_slot: timeSlots[index * days.length + dayIndex],
//                         classroom_id: getRandomClassroomId() // Assign a random classroom
//                     });
//                 }
//             });
//         });

//         timetableEntries.forEach(entry => {
//             pool.query(
//                 'INSERT INTO timetables (teacher_id, subject_name, day, time_slot, classroom_id) VALUES (?, ?, ?, ?, ?)',
//                 [entry.teacher_id, entry.subject_name, entry.day, entry.time_slot, entry.classroom_id],
//                 (error) => {
//                     if (error) {
//                         console.error('Error inserting timetable entry:', error);
//                         res.status(500).send('Error inserting timetable entry');
//                         return;
//                     }
//                 }
//             );
//         });

//         res.status(200).send('Timetable generated successfully');
//     });
// });

// // Endpoint to get timetable for a specific teacher
// app.get('/timetable/:teacherId', (req, res) => {
//     const { teacherId } = req.params;
//     pool.query('SELECT * FROM timetables WHEREteacher_id = ?', [teacherId], (error, results) => {
//         if (error) {
//             console.error('Error fetching timetable:', error);
//             res.status(500).send('Error fetching timetable');
//         } else {
//             res.status(200).json(results);
//         }
//     });
// });

// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });














// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const mysql = require('mysql');

// const app = express();
// const port = 4000;

// app.use(cors());
// app.use(bodyParser.json());

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '', // Add your MySQL password if needed
//     database: 'college_database'
// });

// // Endpoint to submit teacher data
// app.post('/submit', (req, res) => {
//     const { facultyId, subject1, subject2, labSubject } = req.body;

//     // Validate input data
//     if (!facultyId || !subject1 || !subject2 || !labSubject) {
//         return res.status(400).send('All fields are required');
//     }

//     pool.query(
//         'INSERT INTO teachers (teacher_id, subject1, subject2, subject3) VALUES (?, ?, ?, ?)',
//         [facultyId, subject1, subject2, labSubject],
//         (error, results) => {
//             if (error) {
//                 console.error('Error saving teacher data:', error);
//                 return res.status(500).send('Error saving teacher data');
//             }
//             res.status(200).json({ teacherId: results.insertId });
//         }
//     );
// });

// // Endpoint to generate timetable
// app.post('/generate-timetable', (req, res) => {
//     const { teacherId } = req.body;

//     // Validate input data
//     if (!teacherId) {
//         return res.status(400).send('Teacher ID is required');
//     }

//     const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     const timeSlots = [
//         '8:45 - 9:35 AM',
//         '9:35 - 10:25 AM',
//         '10:40 - 11:30 AM',
//         '11:30 AM - 12:20 PM',
//         '2:20 - 3:10 PM',
//         '3:25 - 4:40 PM'
//     ];

//     pool.query('SELECT * FROM teachers WHEREteacher_id = ?', [teacherId], (error, results) => {
//         if (error) {
//             console.error('Error fetching teacher data:', error);
//             return res.status(500).send('Error fetching teacher data');
//         }

//         if (results.length === 0) {
//             return res.status(404).send('Teacher not found');
//         }

//         const teacher = results[0];
//         const subjects = [teacher.subject1, teacher.subject2, teacher.subject3].filter(Boolean);
//         const timetableEntries = [];

//         // Function to get random classroom ID
//         const getRandomClassroomId = () => Math.floor(Math.random() * 50) + 1; // Random classroom between 1 and 50

//         subjects.forEach((subject, index) => {
//             days.forEach((day, dayIndex) => {
//                 if (index * days.length + dayIndex < timeSlots.length) {
//                     timetableEntries.push({
//                        teacher_id: teacherId,
//                         subject_name: subject,
//                         day: day,
//                         time_slot: timeSlots[index * days.length + dayIndex],
//                         classroom_id: getRandomClassroomId() // Assign a random classroom
//                     });
//                 }
//             });
//         });

//         timetableEntries.forEach(entry => {
//             pool.query(
//                 'INSERT INTO timetables (teacher_id, subject_name, day, time_slot, classroom_id) VALUES (?, ?, ?, ?, ?)',
//                 [entry.teacher_id, entry.subject_name, entry.day, entry.time_slot, entry.classroom_id],
//                 (error) => {
//                     if (error) {
//                         console.error('Error inserting timetable entry:', error);
//                         return res.status(500).send('Error inserting timetable entry');
//                     }
//                 }
//             );
//         });

//         res.status(200).send('Timetable generated successfully');
//     });
// });

// // Endpoint to get timetable for a specific teacher
// app.get('/timetable/:teacherId', (req, res) => {
//     const { teacherId } = req.params;

//     pool.query('SELECT * FROM timetables WHEREteacher_id = ?', [teacherId], (error, results) => {
//         if (error) {
//             console.error('Error fetching timetable:', error);
//             return res.status(500).send('Error fetching timetable');
//         }
//         res.status(200).json(results);
//     });
// });

// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });











const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // Add your MySQL password if needed
    database: 'college_database'
});

const checkConnection = () => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.stack);
            return;
        }
        console.log('Connected to the database as id ' + connection.threadId);
        connection.release(); // Release the connection back to the pool
    });
};

// Call the function to check connection
checkConnection();

// Endpoint to submit teacher data
app.post('/submit', (req, res) => {
    const {faculty_id, subject1, subject2, lab_subject } = req.body;
    pool.query(
        'INSERT INTO teachers (faculty_id, subject1, subject2, lab_subject) VALUES (?, ?, ?, ?)',
        [faculty_id, subject1, subject2, lab_subject],
        (error, results) => {
            if (error) {
                console.error('Error saving teacher data:', error);
                res.status(500).send('Error saving teacher data');
            } else {
                res.status(200).json({ teacherId: results.insertId });
            }
        }
    );
});

app.post('/generate-timetable', (req, res) => {
    const { teacherId } = req.body;
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const timeSlots = [
        '8:45 - 9:35 AM',
        '9:35 - 10:25 AM',
        '10:40 - 11:30 AM',
        '11:30 AM - 12:20 PM',
        '2:20 - 3:10 PM',
        '3:25 - 4:40 PM'
    ];

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection:', err.stack);
            return res.status(500).send('Error connecting to database');
        }

        // Fetch valid classroom IDs
        connection.query('SELECT classroom_id FROM classrooms', (err, classroomResults) => {
            if (err) {
                connection.release();
                console.error('Error fetching classrooms:', err.stack);
                return res.status(500).send('Error fetching classroom data');
            }

            const validClassroomIds = classroomResults.map(row => row.classroom_id);

            // Fetch teacher data
            connection.query('SELECT * FROM teachers WHERE teacher_id = ?', [teacherId], (error, results) => {
                connection.release();
                if (error) {
                    console.error('Error fetching teacher data:', error.stack);
                    return res.status(500).send('Error fetching teacher data');
                }

                if (results.length === 0) {
                    return res.status(404).send('Teacher not found');
                }

                const teacher = results[0];
                const theorySubjects = [teacher.subject1, teacher.subject2].filter(Boolean);
                const labSubject = teacher.lab_subject;
                const timetableEntries = [];
                const usedTimeSlots = new Set(); // To track used time slots and avoid conflicts

                // Function to get random valid classroom ID
                const getRandomClassroomId = () => {
                    const randomIndex = Math.floor(Math.random() * validClassroomIds.length);
                    return validClassroomIds[randomIndex];
                };

                // Helper function to allocate theory subjects
                const allocateTheorySubjects = (subject) => {
                    const availableSlots = timeSlots.slice(); // Copy of time slots
                    let allocatedHours = 0;

                    while (allocatedHours < 4) {
                        const day = days[Math.floor(Math.random() * days.length)];
                        const slot = availableSlots.splice(Math.floor(Math.random() * availableSlots.length), 1)[0];

                        if (!usedTimeSlots.has(`${day}-${slot}`)) {
                            timetableEntries.push({
                                teacher_id: teacherId,
                                subject_name: subject,
                                day: day,
                                time_slot: slot,
                                classroom_id: getRandomClassroomId() // Assign a random valid classroom
                            });
                            usedTimeSlots.add(`${day}-${slot}`);
                            allocatedHours++;
                        }
                    }
                };

                // Helper function to allocate lab subjects
                const allocateLabSubject = (subject) => {
                    const availableDays = days.slice(); // Copy of days
                    let allocatedDays = 0;

                    while (allocatedDays < 2) {
                        const day = availableDays.splice(Math.floor(Math.random() * availableDays.length), 1)[0];
                        const startSlotIndex = Math.floor(Math.random() * (timeSlots.length - 1));
                        const endSlotIndex = startSlotIndex + 1;

                        if (endSlotIndex < timeSlots.length) {
                            const startSlot = timeSlots[startSlotIndex];
                            const endSlot = timeSlots[endSlotIndex];

                            if (!usedTimeSlots.has(`${day}-${startSlot}`) && !usedTimeSlots.has(`${day}-${endSlot}`)) {
                                // Allocate the first time slot
                                const classroom = getRandomClassroomId();
                                timetableEntries.push({
                                    teacher_id: teacherId,
                                    subject_name: subject,
                                    day: day,
                                    time_slot: startSlot, // Store start slot
                                    classroom_id: classroom // Assign a random valid classroom

                                });
                                // Allocate the second consecutive time slot
                                timetableEntries.push({
                                    teacher_id: teacherId,
                                    subject_name: subject,
                                    day: day,
                                    time_slot: endSlot, // Store end slot
                                    classroom_id: classroom // Assign a random valid classroom
                                });
                                usedTimeSlots.add(`${day}-${startSlot}`);
                                usedTimeSlots.add(`${day}-${endSlot}`);
                                allocatedDays++;
                            }
                        }
                    }
                };

                // Allocate theory subjects
                theorySubjects.forEach(subject => allocateTheorySubjects(subject));

                // Allocate lab subject
                if (labSubject) {
                    allocateLabSubject(labSubject);
                }

                // Fill remaining slots with empty entries (if needed)
                days.forEach(day => {
                    timeSlots.forEach(slot => {
                        if (!usedTimeSlots.has(`${day}-${slot}`)) {
                            timetableEntries.push({
                                teacher_id: teacherId,
                                subject_name: 'EMPTY',
                                day: day,
                                time_slot: slot,
                                classroom_id: getRandomClassroomId() // Assign a random valid classroom
                            });
                        }
                    });
                });

                console.log('Generated timetable entries:', timetableEntries);

                // Insert timetable entries into the database
                const insertQuery = 'INSERT INTO timetables (teacher_id, subject_name, day, time_slot, classroom_id) VALUES ?';
                const values = timetableEntries.map(entry => [
                    entry.teacher_id,
                    entry.subject_name,
                    entry.day,
                    entry.time_slot,
                    entry.classroom_id
                ]);

                pool.getConnection((err, connection) => {
                    if (err) {
                        console.error('Error getting connection for insert:', err.stack);
                        return res.status(500).send('Error connecting to database');
                    }

                    connection.query(insertQuery, [values], (error) => {
                        connection.release();
                        if (error) {
                            console.error('Error inserting timetable entries:', error.stack);
                            return res.status(500).send('Error inserting timetable entries');
                        }

                        res.status(200).json({
                            message: 'Timetable generated and saved successfully',
                            timetableEntries: timetableEntries
                        });
                    });
                });
            });
        });
    });
});





// Endpoint to get timetable for a specific teacher
app.get('/timetable/:teacherId', (req, res) => {
    const { teacherId } = req.params;
    pool.query('SELECT * FROM timetables WHERE teacher_id = ?', [teacherId], (error, results) => {
        if (error) {
            console.error('Error fetching timetable:', error);
            res.status(500).send('Error fetching timetable');
        } else {
            res.status(200).json(results);
        }
    });
});


// Endpoint to get timetable for a specific department
app.get('/faculty-names', (req, res) => {
    pool.query('SELECT faculty_id, CONCAT(first_name, " ", last_name) AS name FROM teachers', (error, results) => {
        if (error) {
            console.error('Error fetching faculty names:', error);
            res.status(500).send('Error fetching faculty names');
        } else {
            // Map faculty ID to name
            const facultyNames = results.reduce((acc, row) => {
                acc[row.faculty_id] = row.name;
                return acc;
            }, {});
            res.status(200).json(facultyNames);
        }
    });
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
