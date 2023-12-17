import { Row, Select, Button, Modal, message } from "antd";
import React, { useState } from "react";
import LayoutComp from "../components/LayoutComp";
import { useNavigate } from 'react-router-dom';
import api from "../common/api";
import Loading from "../components/Loading";


const TopUpPage = () => {
    const navigate = useNavigate();
    const [selectedAmount, setSelectedAmount] = useState();
    const [loading, setLoading] = useState(false);
    const avaibleMoneyAmounts = [1,5,10,20];

    const handleTopUp = () => {
        setLoading(true);
        api.put('/balance/add', {name: 'CURRENT_SUM', amount: selectedAmount}).then((response) => {
            Modal.success({
                title: 'Operation successful!',
                content: `Your balance is ${response.data.amount} UM`,
                afterClose: () => navigate('/'),
            });
        })
        .catch((err) => message.error(err.response.data))
        .finally(() => setLoading(false));
    };

    return (
        <>
            <LayoutComp />
            {loading ? <Loading loading={loading} /> : <>
            <Row justify='center' style={{ marginTop: '20px'}}>
                <Select
                    placeholder="Please select amount"
                    options={avaibleMoneyAmounts.map((item) => {return {value: item, label: item}})}
                    onChange={(e) => setSelectedAmount(e)}
                    style={{ width: 200 }}
                />
            </Row>
            <Row justify='center' style={{ marginTop: '20px'}}>
                <Button type="primary" size="large" onClick={handleTopUp}>Top Up</Button>
                <Button
                    danger
                    type="primary"
                    size="large"
                    style={{ marginLeft  : '20px'}}
                    onClick={() => navigate('/')}
                >
                    Cancel
                </Button>
            </Row>
            </>
            }
        </>
    );
};

export default TopUpPage;