import React from 'react';
import { useParams } from 'react-router-dom';

function Show(props) {
    const { id } = useParams();
    return (
        <div>
            {id}
            show product details
        </div>
    );
}

export default Show;