import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Home.css'

function Home() {
  const { userId } = useParams();
  const [reportData, setReportData] = useState([]);
  const [userData, setUserData] = useState({
    headBranch: "",
    userBranch: "",
    userRole: "",
    email: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:8000/branch/get/${userId}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const [newReportData, setNewReportData] = useState({
    headBranch: userData.headBranch,
    userBranch: userData.userBranch,
    file: ""
  });

  const handleOnSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8000/report/add', newReportData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        alert(response.data.message);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios.get("http://localhost:8000/report/all")
      .then((response) => {
        setReportData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //filter branch report data
  const relevantBranchReportData = reportData.filter((report) => {
    return userData.userRole === "Branch" && userData.userBranch === report.userBranch;
  });
  
  //filter headbranch report data
  const relevantCompanyReportData = reportData.filter((report) => {
    return userData.userRole === "Company" && userData.headBranch === report.headBranch;
  });

  const handleOnChange = (event) => {
    setNewReportData({
      ...newReportData,
      [event.target.name]: event.target.value
    });
  };

  const handleFileOnChange = async (event) => {
    const filePath = event.target.files[0];
    setNewReportData({
      ...newReportData,
      file: filePath
    });
  };

  const handleOnClick = (id) => {
    axios.delete(`http://localhost:8000/report/delete/${id}`)
      .then((response) => {
        alert(response.data.message);
        setReportData(reportData.filter((report) => report._id !== id));
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className='MainHome'>
      <div className='headContent'>
        <p className='userDetails'>User Role: {userData.userRole}</p>
        <p className='userDetails'>User Branch: {userData.userBranch}</p>
      </div>
      <div className='userBaseContent'>
        {userData.userRole === "Branch" && (
          <div className='loginForm'>
            <form onSubmit={handleOnSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Head Branch</label>
                <input type="text" className="form-control" id="headBranch" aria-describedby="emailHelp" name="headBranch" placeholder="Enter your Head Branch Name" onChange={handleOnChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Sub Branch</label>
                <input type="text" className="form-control" id="userBranch" aria-describedby="emailHelp" name="userBranch" placeholder="Enter your Sub Branch Name" onChange={handleOnChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">PDF File</label>
                <input type="file" className="form-control" id="pdfFile" aria-describedby="emailHelp" name="file" accept='.pdf' onChange={handleFileOnChange} />
              </div>
              <button type="submit" className="btn btn-success">Add Report</button>
            </form>
          </div>
        )}
        <p className='reportTableName'>Branch Reports</p>
        <div className='middleContainer'></div>
        {userData.userRole === "Branch" && (
          <div className='reportTable'>
            <div className='reportTable'>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">User Branch</th>
                    <th scope="col">Main Branch</th>
                    <th scope="col">Report</th>
                  </tr>
                </thead>
                <tbody>
                  {relevantBranchReportData.map((report, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{report.userBranch}</td>
                      <td>{report.headBranch}</td>
                      <td>
                        <a href={`http://localhost:8000/${report.report}`} target="_blank" rel="noopener noreferrer">
                          View PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {userData.userRole === "Company" && (
          <div className='reportTable'>
            <div className='reportTable'>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">User Branch</th>
                    <th scope="col">Main Branch</th>
                    <th scope="col">Report</th>
                  </tr>
                </thead>
                <tbody>
                  {relevantCompanyReportData.map((report, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{report.userBranch}</td>
                      <td>{report.headBranch}</td>
                      <td>
                        <a href={`http://localhost:8000/${report.report}`} target="_blank" rel="noopener noreferrer">
                          View PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {userData.userRole === "Admin" && (
          <div className='reportTable'>
            <div className='reportTable'>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">User Branch</th>
                    <th scope="col">Main Branch</th>
                    <th scope="col">Report</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((report, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{report.userBranch}</td>
                      <td>{report.headBranch}</td>
                      <td>
                        <a href={`http://localhost:8000/${report.report}`} target="_blank" rel="noopener noreferrer">
                          View PDF
                        </a>
                      </td>
                      <td><button type="button" className="btn btn-danger" onClick={() => handleOnClick(report._id)}>Reject</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
