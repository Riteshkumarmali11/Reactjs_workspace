import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Pagination } from 'antd';
import { FcAnswers } from "react-icons/fc";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { CSVLink } from 'react-csv';
import Sidebar from '../components/Sidebar';
import Card from 'react-bootstrap/Card';
import '../styles.css';



const PlantationList = () => {
    const [record, setRecord] = useState([]);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');

    const [value, setValue] = useState('');
    const [tablefilter, setTableFilter] = useState([]);

    const filterData = (e) => {
        if (e.target != "") {
            setValue(e.target.value);
            const filterTable = data.filter(o => Object.keys(o).some(k => String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())));
            setTableFilter([...filterTable])
        } else {
            setValue(e.target.value);
            setData([...data])
        }

    }

    const handleClick = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/plantlist?FARMER_ID=${record}`, {
                method: 'POST',
                body: JSON.stringify({ "p_farmer_id": record }),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);
            const responseData = await response.json();
            setData(responseData.PlList); // Update state with the FList data
            console.log(responseData);
        } catch (error) {
            setErr(error.message || 'Something went wrong!');
        } finally {
            setIsLoading(false);
        }
    };

    const exportPDF = async () => {
        const doc = new jsPDF({ orientation: 'landscape' });
        doc.autoTable({
            html: '#myTable'
        })
        doc.save('Farmerdata.pdf');
    }


    return (
        <>
            <Sidebar />
            <Card style={{ paddingBottom: '20px', height: '3rem' }} className='card'>
                <div>
                    <input
                        type='text'
                        placeholder='Search Plantation List..'
                        onChange={(e) => setRecord(e.target.value)} style={{ width: '20%', fontSize: '20px', marginLeft: '1rem', borderRadius: '5px' }} />
                    <Button variant="primary" className='lg-2 mb-3' style={{ marginLeft: '1rem' }} onClick={handleClick}>Search</Button>
                    <Button onClick={exportPDF} style={{ position: 'absolute', right: '1rem' }} >
                        PDF
                    </Button>
                    <CSVLink data={data} filename='FarmerList' className='btn btn-success ' style={{ position: 'absolute', right: '6rem' }}>EXCEL</CSVLink>
                </div>
            </Card>
            <div style={{ marginTop: '1rem', marginBottom: '1rem', marginLeft: '20rem' }}>
                <div>
                    <div className='mb-1' style={{ marginLeft: '64rem' }}>
                        <input type='text' name='' id="myInput" placeholder='Search Farmer...' value={value} onChange={filterData} />
                    </div>
                    <div >
                        <table id='myTable' className="table table-bordered table-striped" style={{ width: '95%' }}>
                            <thead style={{ backgroundColor: 'wheat' }}>
                                <tr>
                                    <th scope="col">FARMER ID</th>
                                    <th scope="col">FARMER NAME</th>
                                    <th scope="col">PLOT NO</th>
                                    <th scope="col">PLANT DATE</th>
                                    <th scope="col">PLANT AREA</th>
                                    <th scope="col">CV NAME</th>
                                    <th scope="col">BANK NAME</th>
                                    <th scope="col">PAYMENT ACCOUNT NO</th>
                                    <th scope="col">ROAD DISTANCE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {value.length > 0 ? tablefilter.map((user) => {   //For Table Search data with filter
                                    return (
                                        <tr >
                                            <td id="td">{user.FARMER_ID}</td>
                                            <td>{user.FARMER_NAME}</td>
                                            <td>{user.PLOT_NO}</td>
                                            <td>{user.PLANT_DATE}</td>
                                            <td>{user.PLANT_AREA}</td>
                                            <td>{user.PRIORITY_NO}</td>
                                            <td>{user.CV_NAME}</td>
                                            <td>{user.BANK_NAME}</td>
                                            <td>{user.PAYMENT_ACCOUNT_NO}</td>
                                            <td>{user.ROAD_DIST}</td>
                                        </tr>
                                    )
                                })
                                    :
                                    data.map((user) => {
                                        return (
                                            <tr >
                                                <td id="td">{user.FARMER_ID}</td>
                                                <td>{user.FARMER_NAME}</td>
                                                <td>{user.PLOT_NO}</td>
                                                <td>{user.PLANT_DATE}</td>
                                                <td>{user.PLANT_AREA}</td>
                                                <td>{user.PRIORITY_NO}</td>
                                                <td>{user.CV_NAME}</td>
                                                <td>{user.BANK_NAME}</td>
                                                <td>{user.PAYMENT_ACCOUNT_NO}</td>
                                                <td>{user.ROAD_DIST}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                            {/* <tfoot>
              <Pagination defaultCurrent={1} total={500} />;
            </tfoot> */}
                        </table>
                    </div>
                </div>
            </div>
        </>
    );

};

export default PlantationList;