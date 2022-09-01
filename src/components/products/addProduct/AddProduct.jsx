import React from 'react';

function AddProduct(props) {
    return (
        <div>
            <form>
                <div>
                    <label>Name</label>
                    <input type="text" name='name' placeholder='Enter Product Name '/>
                </div>
                <div>
                    <label>Price</label>
                    <input type="number" name='price' placeholder='Enter Price'/>
                </div>
                <div>
                    <label>Category </label>
                    <input type="text" name="Category" placeholder='Enter Category'/>
                </div>
                <div>
                    <label>State</label>
                    <input type="text" name="state" placeholder="Enter State"/>
                </div>
                <div>
                    <label>State</label>
                    <input type="text" name="state" placeholder="Enter State"/>
                </div>
                <div>
                    <label>Description</label>
                    <textarea type="text" name="description" placeholder="Enter Description"></textarea>
                </div>
                <div>
                    <label>Date</label>
                    <textarea type="date" name="description" placeholder="Enter State"></textarea>
                </div>
                <div>
                    <label>Images</label>
                    <input type="file" name="image" id="" multiple />
                </div>
            </form>
        </div>
    );
}

export default AddProduct;