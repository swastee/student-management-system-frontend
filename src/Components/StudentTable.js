import React from "react"
import { Link } from 'react-router-dom'

function StudentTable({
  students,
  pagination,
  fetchStudents,
  handleUpdateStudent,
  handleDeleteStudent


}) {

  const headers = ['Name', 'Email', 'Age', 'Course', 'Actions'];

  const { currentPage, totalPages } = pagination;

  const TableRow = ({ student }) => {
    return <tr>
      <td>
        <Link to={`/student/${student._id}`} className="text-decoration-none">
          {student.name}
        </Link>
      </td>
      {/* <td>{'deepak@gmail.com'}</td>
      <td>{'24'}</td>
      <td>{'IT'}</td> */}
      <td>{student.email}</td>
      <td>{student.age}</td>
      <td>{student.course}</td>
      <td>
        <i
          className="bi bi-pencil-fill text-warning me-4"
          role="button"
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          onClick={() => handleUpdateStudent(student)}

        >

        </i>
        <i
          className="bi bi-trash-fill text-danger"
          role="button"
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          onClick={() => handleDeleteStudent(student)}

        >

        </i>


      </td>
    </tr>
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePagination(currentPage + 1);

    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePagination(currentPage - 1);

    }
  }


  const handlePagination = (currentPage) => {
    fetchStudents('', currentPage, 5);
  }



  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            {
              headers.map((header, i) => (
                <th key={i}>{header}</th>
              ))
            }

          </tr>
        </thead>

        <tbody>
          {
            students.map((stu) => (
              <TableRow student={stu} key={stu._id} />
            ))
          }

        </tbody>

      </table>

      <div className="d-flex justify-content-between align-items-center my-3">
        <span className="badge bg-primary">Page {currentPage} of {totalPages}

        </span>
        <div>
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => handlePrevPage()}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {
            pageNumbers.map((page) => (
              <button
                onClick={() => handlePagination(page)}
                className={`btn btn-outline-primary me-1 ${currentPage === page ? 'active' : ''}`}>
                {page}
              </button>
            ))
          }
          <button
            className="btn btn-outline-primary ms-2"
            onClick={() => handleNextPage()}
            disabled={totalPages === currentPage}
          >
            Next
          </button>
        </div>

      </div>

    </>
  )
}
export default StudentTable