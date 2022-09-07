import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
function Record({record, userId}) {

  // /:productId/return

  const rent = async () => {
    axios.get(`http://localhost:4000/product/return/${record.product._id}`)
  }

  const checkState = () => {
    if(record.product.state === "rented") {
      return <button onClick={rent}>Return</button>
    } else if(record.product.state === "returned") {
      return <Link to={`/review/${record.product.owner._id}`}><button>Review</button></Link>
    }
  }

  return (
    <tr>
      <td>{record.product.owner.name}</td>
      <td>{record.product.name}</td>
      <td>{record.product.state}</td>
      <td>
        {checkState()}
      </td>
    </tr>
  );
}

export default Record;