import { Card, Typography, Row, message, InputNumber, Col, Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../common/api";
import Loading from "../components/Loading"
import AdminLayoutComp from "../components/AdminLayoutComp";

const AdminPage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/admin/login');
    }
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api.get('/product/all').then((response) => {
            setProducts(response.data);
        })
        .catch((err) => message.error(err.response.data))
        .finally(() => setLoading(false));
    }, []);

    const handleCountChange = (e, product) => {
        product.count = e;
    };

    const handlePriceChange = (e, product) => {
        product.price = e;
    };

    const handleUpdate = (product) => {
        setLoading(true);
        api.put('/product/update', product).then(() => {
            Modal.success({
                title: `${product.name} successfully updated!`,
            });
        })
        .catch((err) => message.error(err.response.data))
        .finally(() => setLoading(false));
    };

    const collectMoney = () => {
        setLoading(true);
        api.put(`/balance/withdraw/TOTAL_SUM/all`).then((response) => {
            Modal.success({
                title: `Collected ${response.data.amount} UM!`,
            });
        })
        .catch((err) => {
            const status = err.response.status;
            if (status === 401) {
                localStorage.removeItem('token');
                Modal.error({
                    title: err.response.data,
                    afterClose:() => navigate('/admin/login'),
                });
            } else {
                message.error(err.response.data);
            }
        })
        .finally(() => setLoading(false));;
    };

    return (<>
        <AdminLayoutComp />
        {loading ? <Loading loading={loading} /> : <>
            <Row justify={"center"} style={{ marginTop: '40px'}}>
                {products && products.length > 0 && products.map((product) => {
                    return (
                        <Card
                            key={product.name}
                            style={{width: '20vh', marginLeft: '20px'}}
                            cover={<img alt={product.name}  src={product.source} height={'350vh'} />}
                        >
                            <Row><Typography.Title>{product.name}</Typography.Title></Row>
                            <Row><Col span={10}>Amount:</Col><Col span={4}><InputNumber onChange={(e) => handleCountChange(e, product)} min={0} defaultValue={product.count} /></Col></Row>
                            <Row><Col span={10}>Price:</Col><Col span={4}><InputNumber onChange={(e) => handlePriceChange(e, product)} min={0} defaultValue={product.price} /></Col></Row>
                            <Row justify='center' style={{marginTop: '10px'}}><Button type='primary' onClick={() => handleUpdate(product)}>Update</Button></Row>
                        </Card>
                    );
                })}
            </Row>
            <Row justify='center' style={{ marginTop: '20px'}}>
                <Button style={{ backgroundColor: '#06F506' }} onClick={collectMoney}>Collect Money</Button>
            </Row>
            </>
            }
    </>);
};

export default AdminPage;