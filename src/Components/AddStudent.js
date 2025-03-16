import React, { useEffect, useState } from "react"
import { CreateStudent, updateStudentById } from "../api";
import { notify } from "../utils";

function AddStudent({ showModal, setShowModal, fetchStudents, updateStuObj }) {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    age: '',
    course: '',
    profileImage: null
  })

  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    if (updateStuObj) {
      setUpdateMode(true);
      setStudent(updateStuObj);

    }
  }, [updateStuObj])

  const resetStudentStates = () => {
    setStudent({
      name: '',
      email: '',
      age: '',
      course: '',
      profileImage: null
    })
  }

  const handleClose = () => {
    setShowModal(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value })


  }

  const handleFileChange = (e) => {
    setStudent({ ...student, profileImage: e.target.files[0] })

  }


  //Add or Update Student
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(student);
    try {
      const { success, message } =
        await updateMode ? updateStudentById(student, student._id) :
          await CreateStudent(student);
      console.log(success, message);
      if (success) {
        notify(message, 'success');
      } else {
        notify(message, 'error')
      }
      setShowModal(false);
      resetStudentStates();
      fetchStudents();



    } catch (err) {
      notify('Failed to Add Student, please try Again later!!! ', 'error');
    }
  }
  return (
    <div className={`modal ${showModal} ? 'd-block' : ''}`}
      tabIndex={-1} role="dialog" style={{
        display: showModal ? 'block' : 'none'
      }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5>
              {updateMode ? 'Update Student' : 'Add Student'}
            </h5>
            <button type='button' className="btn-close" onClick={() => handleClose()}></button>
          </div>

          <div className="modal-body">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="mb-3">
                <label className="'form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={student.name}
                  onChange={handleChange} required
                />

              </div>

              <div className="mb-3">
                <label className="'form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={student.email}
                  onChange={handleChange} required
                />



              </div>

              <div className="mb-3">
                <label className="'form-label">Age</label>
                <input
                  type="number"
                  className="form-control"
                  name="age"
                  value={student.age}
                  onChange={handleChange} required
                />



              </div>

              <div className="mb-3">
                <label className="'form-label">Course</label>
                <input
                  type="text"
                  className="form-control"
                  name="course"
                  value={student.course}
                  onChange={handleChange} required
                />

              </div>

              <div className="mb-3">
                <label className="'form-label">Profile Image</label>
                <input
                  type="file"
                  className="form-control"
                  name="profileImage"

                  onChange={handleFileChange}
                />

              </div>
              <button className="btn btn-primary">
                {updateMode ? 'Update' : 'Save'}</button>
            </form>

          </div>
        </div>
      </div>

    </div>
  )
}
export default AddStudent