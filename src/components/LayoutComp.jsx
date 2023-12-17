import { Typography, Layout, Row, Col } from "antd";
import React from "react";

const LayoutComp = ({ balance }) => {

    return (
        <Layout>
            <Row justify='center' style={{backgroundColor: 'orange'}}>
                <Typography.Title>Vending Machine</Typography.Title>
                <Col offset={22}><Typography.Text>Balance: {balance} UM</Typography.Text></Col>
            </Row>
        </Layout>
    );
};

export default LayoutComp;