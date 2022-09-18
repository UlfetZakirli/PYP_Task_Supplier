import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss'
import { deleteSupplier, getSuppliers } from '../../services/supplierServise';
import Spinner from '../../components/spinner';

const SupplierListPage = () => {

    const [suppliers, setSuppliers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getData = async () => {
        setSuppliers(await getSuppliers());
        setIsLoading(false);
    }

    useEffect(() => {
        getData();
    }, [])

    const handleDelete = (id) => {
        deleteSupplier(id);
        // getSuppliers().then(result => setSuppliers(result));
        getData();
    }

    return (
        <div id='supplier-list-page' style={{marginTop:'50px'}} className='grid place-items-center'>
            {isLoading
                ?
                <Spinner />
                :
                <table>
                    <thead>
                        <tr >
                            <th  style={{backgroundColor:'orange'}}>Company ID</th>
                            <th  style={{backgroundColor:'orange'}}>Company Name</th>
                            <th  style={{backgroundColor:'orange'}}>Contact Title</th>
                            <th  style={{backgroundColor:'orange'}}>Country</th>
                            <th  style={{backgroundColor:'orange'}}>Phone</th>
                            <th  style={{backgroundColor:'orange'}}>Postal Code</th>
                            <th  style={{backgroundColor:'orange'}}>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers && suppliers.map(supplier => (
                            <tr key={supplier.id} >
                                <td>{supplier.id}</td>
                                <td>{supplier.companyName}</td>
                                <td> {supplier.contactTitle}</td>
                                <td> {supplier.address?.country}</td>
                                <td> {supplier.address?.phone}</td>
                                <td> {supplier.address?.postalCode}</td>
                                <td> <Link to={`${supplier.id}`}>Link to Supplier</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            }

        </div>
    )
}

export default SupplierListPage