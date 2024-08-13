// import React, { useState } from 'react';
// import NavScrollExample from '../components/Navbar';
// import { Container, FloatingLabel, Form, Button } from 'react-bootstrap';
// import './StudentForm.css'; // Ensure this CSS file contains the necessary styles

// const StudentForm = () => {
//   // State variables to store form inputs
//   const [registrationNumber, setRegistrationNumber] = useState('');
//   const [department, setDepartment] = useState('');

//   // Function to handle form submission
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle form data submission
//     console.log({ registrationNumber, department });
//     // Optionally reset form fields
//     // setRegistrationNumber('');
//     // setDepartment('');
//   };

//   return (
//     <div>
//       <NavScrollExample />

//       <Container className="form-container pt-2">
//         <h2 >Student Information Form</h2>
//         <Form onSubmit={handleSubmit}>
//           <FloatingLabel controlId="floatingRegistrationNumber" label="Registration Number" className="mb-3">
//             <Form.Control
//               type="number"
//               placeholder="Registration Number"
//               value={registrationNumber}
//               onChange={(e) => setRegistrationNumber(e.target.value)}
//               required
//             />
//           </FloatingLabel>

//           <FloatingLabel controlId="floatingDepartment" label="Department (Classroom)" className="mb-3">
//             <Form.Control
//               type="text"
//               placeholder="Department (Classroom)"
//               value={department}
//               onChange={(e) => setDepartment(e.target.value)}
//               required
//             />
//           </FloatingLabel>

//           <Button className='btn1' variant="primary" type="submit">
//             Submit
//           </Button>
//         </Form>
//       </Container>
//     </div>
//   );
// };

// export default StudentForm;




import React, { useState } from 'react';
import { Container, FloatingLabel, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import NavScrollExample from '../components/Navbar'; // Adjust import path if needed
import './StudentForm.css'; // Adjust import path if needed

const StudentForm = () => {
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [classroomNumber, setClassroomNumber] = useState('');
    const [timetable, setTimetable] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');
        setTimetable([]);

        try {
            const response = await axios.post('http://localhost:5000/timetable-by-classroom', {
                classroomNumber: classroomNumber
            });
            setTimetable(response.data);
            setSuccess('Timetable fetched successfully!');
        } catch (err) {
            console.error('Error fetching timetable', err);
            setError('There was an error fetching the timetable. Please try again.');
        }
    };

    return (
        <div>
            <NavScrollExample />
            <Container className="form-container pt-2">
                <h2>Student Information Form</h2>
                <Form onSubmit={handleSubmit}>
                    <FloatingLabel controlId="floatingRegistrationNumber" label="Registration Number" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Registration Number"
                            value={registrationNumber}
                            onChange={(e) => setRegistrationNumber(e.target.value)}
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingClassroomNumber" label="Classroom Number" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Classroom Number"
                            value={classroomNumber}
                            onChange={(e) => setClassroomNumber(e.target.value)}
                            required
                        />
                    </FloatingLabel>

                    <Button className='btn1' variant="primary" type="submit">
                        Fetch Timetable
                    </Button>
                </Form>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                {success && <div className="alert alert-success mt-3">{success}</div>}
                
                {timetable.length > 0 && (
                    <div className="timetable-container mt-4">
                        <h3>Timetable</h3>
                        <table className="timetable-table">
                            <thead>
                                <tr>
                                    <th>Teacher ID</th>
                                    <th>Subject Name</th>
                                    <th>Day</th>
                                    <th>Time Slot</th>
                                    <th>Classroom ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {timetable.map((entry, index) => (
                                    <tr key={index}>
                                        <td>{entry.teacher_id}</td>
                                        <td>{entry.subject_name}</td>
                                        <td>{entry.day}</td>
                                        <td>{entry.time_slot}</td>
                                        <td>{entry.classroom_id}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default StudentForm;
