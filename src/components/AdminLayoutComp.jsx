import { Typography, Layout, Row } from "antd";
import React from "react";

const LayoutComp = () => {

    return (
        <Layout>
            <Row justify='center' style={{backgroundColor: 'Black'}}>
                <Typography.Title style={{color:"white"}}>Admin Panel</Typography.Title>
            </Row>
        </Layout>
    );
};

export default LayoutComp;