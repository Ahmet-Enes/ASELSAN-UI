import { Col, Image, Row, Button, Typography, Modal, message } from 'antd';
import { LockOutlined } from '@ant-design/icons'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../common/api';
import Loading from '../components/Loading';

const HomePage = ({ balance, refreshBalance }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleRefund = () => {
        setLoading(true);
        api.put(`/balance/withdraw/CURRENT_SUM/all`).then((response) => {
            refreshBalance();
            Modal.success({title: `Successfully refunded ${response.data.amount} UM!`});
        })
        .catch((err) => message.error(err.response.data))
        .finally(() => setLoading(false));
    };

    return (
        <>
            <Row justify='center'>
                <Typography.Title>Welcome To Vending Machine</Typography.Title>
            </Row>
            <Row justify='center'>
                <Col offset={2}>
                    <Row>
                        <Image 
                            src='/vending_machine.jpg'
                            preview={false}
                            height={'70vh'}
                            width={'100%'}
                        />
                    </Row>
                    <Row justify='center'>
                        <Button onClick={() => navigate('/admin')} icon={<LockOutlined />}>Admin Panel</Button>
                    </Row>
                </Col>
                <Col offset={1}>
                    {loading ? <Loading loading={loading} /> : <>
                        <Row style={{ marginTop: '20vh'}}>
                            <Typography.Text>Balance: {balance} UM</Typography.Text>
                        </Row>
                        <Row style={{ marginTop: '20px'}}>
                            <Button
                                style={{width: '100%'}}
                                type='primary'
                                onClick={() => navigate('/products')}>
                                    Products
                            </Button>
                        </Row>
                        <Row style={{marginTop: '20px'}}>
                            <Button
                                style={{width: '100%', backgroundColor:'#01E115'}}
                                onClick={() => navigate('/topup')}>
                                    Top Up Money
                            </Button>
                        </Row>
                        <Row style={{marginTop: '20px'}}>
                            <Button
                                style={{width: '100%'}}
                                type='primary'
                                danger
                                onClick={handleRefund}
                            >
                                    Refund
                            </Button>
                        </Row>
                    </>
                    }
                </Col>
            </Row>
        </>
    );
};

export default HomePage;