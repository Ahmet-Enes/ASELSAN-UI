import { Typography, Layout, Row } from "antd";
import React from "react";

const LayoutComp = () => {

    return (
        <Layout>
            <Row justify='center' style={{backgroundColor: 'orange'}}>
                <Typography.Title>Vending Machine</Typography.Title>
            </Row>
        </Layout>
    );
};

export default LayoutComp;