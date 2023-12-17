import React from "react";
import {Row, Spin } from "antd";

const Loading = ({ loading }) => {

    return loading ? <Row justify='center' style={{marginTop: '20vh'}}><Spin size="large" /></Row>
    :
    <></>;
}

export default Loading;