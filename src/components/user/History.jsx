import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Record from "../records/Record";
import Table from "react-bootstrap/Table";

function History(props) {
  const { userId } = useParams();
  const [renterRecords, setRenterRecords] = useState([]);

  const getRecords = async () => {
    axios.defaults.withCredentials = true;
    const recordsinfo = await axios.get(
      `http://localhost:4000/user/history/${userId}`
    );
    setRenterRecords(recordsinfo.data);
  };

  useEffect(() => {
    getRecords();
  }, []);

  if (renterRecords === undefined) return <p>No records found.</p>;

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Owner</th>
            <th>Item</th>
            <th>State</th>
            <th>operation</th>
          </tr>
        </thead>
        <tbody>
          {renterRecords.map((record, index) => (
            <Record record={record} key={index} userId={userId} />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default History;
