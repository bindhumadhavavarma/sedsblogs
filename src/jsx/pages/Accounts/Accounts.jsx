import React, { useState, useEffect } from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'
import Button from '@inovua/reactdatagrid-community/packages/Button';
import moment from "moment";
import { Modal } from "react-bootstrap";
import { AxiosPost } from '../../../context/UserContext';
import { toast } from 'react-toastify';

function Accounts() {
    const [isLoading, setIsLoading] = useState(false);
    const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
    const [accounts, setAccounts] = useState([]);
    const gridStyle = { height: 'calc(100vh - 16.5rem)', marginTop: 10 };
    const [gridRef, setGridRef] = useState(null)
    window.moment = moment

    const filterValue = [
        { name: 'username', operator: 'startsWith', type: 'string', value: '' },
        { name: 'email', operator: 'startsWith', type: 'string', value: '' },
        { name: 'fullname', operator: 'startsWith', type: 'string', value: '' },
        { name: 'privilege', operator: 'startsWith', type: 'string', value: '' },
    ];

    const columns = [
        { name: 'username', header: 'User Name', minWidth: 150 },
        { name: 'email', header: 'Email', minWidth: 150,defaultFlex: 2, },
        { name: 'fullname', header: 'Full Name', minWidth: 150 ,defaultFlex: 2, },
        { name: 'privilege', header: 'Privilege', minWidth: 150 },
        {
            name: 'id', header: 'Actions', minWidth: 150, editable: false,
            render: ({ value }) =>
                <button className="btn btn-sharp" style={{ color: "red" }} onClick={() => showDeleteForm(value)}><i className="fas fa-trash-alt"></i></button>
        },
    ];

    useEffect(() => {
        console.log("adfsasf")
        fetchAccounts()
    }, [])

    const fetchAccounts = async () => {
        setIsLoading(true);
        try {
            const data = await AxiosPost('fetchAccounts.php')
            console.log(data)
            if (data.success) {
                setAccounts(data.users)
            }
            else toast.error(data.error)
        } catch (err) {
            toast.error("Server Error!");
            console.log(err)
        }
        finally {
            setIsLoading(false);
        }
    }

    const showDeleteForm = (index) => {
        setDeleteModal({ show: true, id: index });
    }

    const deleteItem = async () => {
        setIsLoading(true);
        try {
            const data = await AxiosPost('deleteAccount.php', { username: deleteModal.id })
            console.log(data);
            if (data.success) toast.success('Account Deleted Successfully');
            else toast.error(data.error);
            setDeleteModal({ show: false, id: null });
            await fetchAccounts();
            console.log(data);
        } catch (err) {
            toast.error("Server Error!");
            console.log(err)
        }
        finally {
            setIsLoading(false);
        }
    }

    const cancelDelete = () => {
        setDeleteModal({ show: false, id: null });
    }


    return (
        <>
            <div className='d-flex align-items-center justify-content-center m-3 mt-5' >
                <div className="col-lg-12 col-md-12 col-sm-12 mt-5 accountTableWrapper" style={{maxWidth:"1000px"}}>
                    <Button style={{ "background-color": "var(--primary)", "color": "white" }} onClick={fetchAccounts}>
                        Sync Data
                    </Button>
                    <ReactDataGrid
                        idProperty="username"
                        style={gridStyle}
                        columns={columns}
                        pagination="local"
                        dataSource={accounts}
                        defaultLimit={25}
                        defaultFilterValue={filterValue}
                        handle={setGridRef}
                        loading={isLoading}
                    />
                    <Modal className="fade" show={deleteModal.show} centered>
                        <Modal.Header>
                            <Modal.Title>Delete Log?</Modal.Title>
                            <button
                                onClick={cancelDelete}
                                className="btn-close"
                            >
                            </button>
                        </Modal.Header>
                        <Modal.Body>
                            <h4>Are you sure you want to delete the Log?</h4>
                        </Modal.Body>
                        <Modal.Footer>
                            <button
                                onClick={deleteItem}
                                className="btn btn-danger"
                            >
                                Delete
                            </button>
                            <button className="btn btn-primary" onClick={cancelDelete}>Cancel</button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>

        </>
    )
}

export default Accounts