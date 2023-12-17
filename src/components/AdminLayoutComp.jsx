import { Typography, Layout, Row, Button, Col } from "antd";
import React from "react";
import { useNavigate } from 'react-router-dom';

const AdminLayoutComp = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <Layout>
            <Row justify='center' align='bottom' style={{backgroundColor: 'Black'}}>
                <Col span={1} align>
                    <Button type="primary" onClick={() => navigate('/')}>Home</Button>
                </Col>
                <Col offset={10} span={token ? 12 : 13}>
                    <Typography.Title style={{color:"white"}}>Admin Panel</Typography.Title>
                </Col>
                {token &&
                <Col span={1}>
                    <Button type="primary" danger onClick={handleLogout}>Log Out</Button>
                </Col>
                }
            </Row>
        </Layout>
    );
};

export default AdminLayoutComp;