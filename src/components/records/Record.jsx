import React,{ useState,useEffect } from 'react';
function Record(props) {
    console.log(props)
    return(
        <tr>
            <td>{props.record.renter.name}</td>
            <td>{props.record.product.owner.name}</td>
            <td>{props.record.product.name}</td>
            <td>{props.record.product.state}</td>
        </tr>
    )
}

export default Record