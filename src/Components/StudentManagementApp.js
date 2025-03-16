import React, { useEffect, useState } from "react"
import StudentTable from "./StudentTable"
import { DeleteStudentById, GetAllStudents } from "../api";
import AddStudent from "./AddStudent";
import { ToastContainer } from "react-toastify";
import { notify } from "../utils";


function StudentManagementApp() {

  const [showModal, setShowModal] = useState(false);
  const [updateStuObj, setUpdateStuObj] = useState(null);
  const [studentData, setStudentData] = useState({
    "students": [],
    "pagination": {
      "totalStudents": 0,
      "currentPage": 1,
      "totalPages": 1,
      "pageSize": 5
    }

  });
  const fetchStudents = async (search = '', page = 1, limit = 5) => {
    try {
      const { data } = await GetAllStudents(search, page, limit);
      // console.log(data);
      setStudentData(data);

    } catch (err) {
      alert('Error', err);

    }


  }
  // console.log('---studentData--', studentData)

  useEffect(() => {
    fetchStudents();
  }, [])

  const handleAddStudent = () => {
    setShowModal(true);

  }
  const handleUpdateStudent = (stuObj) => {
    console.log('Update Obj', stuObj);
    setUpdateStuObj(stuObj);
    setShowModal(true);

  }

  const handleDeleteStudent = async (stu) => {
    try {
      const { success, message } = await DeleteStudentById(stu._id);
      fetchStudents();
      if (success) {
        notify(message, 'success');
      } else {
        notify(message, 'error')
      }
      // console.log(data);


    } catch (err) {
      alert('Error', err);
      notify(err, 'error')

    }


  }
  const handleSearch = (e) => {
    const term = e.target.value;
    fetchStudents(term);
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-3" >
      <h1>Student Management App</h1>
      <div className="w-100 border bg-light p3">
        <div className="w-80 border bg-light p3" style={{ width: '80%' }}>
          <div className="d-flex justify-content-between mb-3">
            <button
              className="btn btn-primary"
              onClick={() => handleAddStudent()}>
              Add
            </button>

            <input
              onChange={handleSearch}
              type="text"
              placeholder="search students..."
              className="form-control w-50" />
          </div>

          <StudentTable
            handleUpdateStudent={handleUpdateStudent}
            fetchStudents={fetchStudents}
            students={studentData.students}
            pagination={studentData.pagination}
            handleDeleteStudent={handleDeleteStudent}
          />

          <AddStudent

            updateStuObj={updateStuObj}
            fetchStudents={fetchStudents}
            showModal={showModal}
            setShowModal={setShowModal}

          />

        </div>

      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />

    </div >
  )
}
export default StudentManagementApp