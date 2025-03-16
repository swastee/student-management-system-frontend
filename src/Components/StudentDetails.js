import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { notify } from "../utils";
import { GetStudentById } from "../api";

function StudentDetails() {

  const { id } = useParams();
  const [stuDetails, setStuDetails] = useState({});
  const navigate = useNavigate();
  console.log(id);

  const fetchStuById = async () => {
    try {
      const { data } =
        await GetStudentById(id);
      setStuDetails(data);
      console.log(data);


    } catch (err) {
      notify('Failed to Fetch Student, please try Again later!!! ', 'error');
    }

  }

  useEffect(() => {
    fetchStuById();
  }, [])

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2>Student Details</h2>

        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col md-3">
              <img
                src={stuDetails.profileImage}
                alt={stuDetails.name}
                className="img-fluid rounded" />
            </div>
            <div className="col-md-9">
              <h4>{stuDetails.name}</h4>
              <p><strong>Email: </strong>{stuDetails.email}</p>
              <p><strong>Age: </strong>{stuDetails.age}</p>
              <p><strong>Course: </strong>{stuDetails.course}</p>

            </div>

          </div>
          <button className="btn btn-primary" onClick={() => navigate('/student')}>back</button>

        </div>

      </div>
    </div>
  )
}
export default StudentDetails