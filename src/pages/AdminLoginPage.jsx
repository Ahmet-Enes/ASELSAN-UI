import React, { useState } from "react";
import AdminLayoutComp from "../components/AdminLayoutComp";
import { Input, Row, Button } from "antd";

const AdminLoginPage = () => {
    const [key, setKey] = useState();

    const handleSubmit = () => {
        console.log(key);
    };

    return (
        <div style={{ height:'99vh', backgroundColor: '#D9E1D9'}}>
            <AdminLayoutComp />
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
        </div>
    );
};

export default AdminLoginPage;