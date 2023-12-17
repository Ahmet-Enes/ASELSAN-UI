import React, { useEffect, useState } from "react";
import AdminLayoutComp from "../components/AdminLayoutComp";
import { Input, Row, Button, message } from "antd";
import api from "../common/api";
import { useNavigate } from 'react-router-dom';
import Loading from "../components/Loading";

const AdminLoginPage = () => {
    const navigate = useNavigate();
    const [key, setKey] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api.get('/admin/validateToken').then((response) => {
            if (response.data) {
                navigate('/admin');
            } else {
                localStorage.removeItem('token');
            }
        })
        .finally(() => setLoading(false));
    }, [navigate]);

    const handleSubmit = () => {
        api.post(`/admin/login`,{'password': key}).then((response) => {
            localStorage.setItem('token', response.data);
            navigate('/admin');
        })
        .catch((err) => message.error(err.response.data))
    };

    return (
        <div style={{ height:'99vh', backgroundColor: '#D9E1D9'}}>
            <AdminLayoutComp />
            {loading ? <Loading loading={loading} /> : <>
            <Row justify='center' style={{ marginTop: '20vh'}}>
                <Input
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="Please enter key"
                    style={{ width: 300 }}
                />
            </Row>
            <Row justify='center' style={{ marginTop: '20px'}}>
                <Button type="primary" size="large" onClick={handleSubmit}>Submit</Button>
            </Row>
            </>
            }
        </div>
    );
};

export default AdminLoginPage;