import { Button, Card, Modal, Radio, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import LayoutComp from "../components/LayoutComp";
import { useNavigate } from 'react-router-dom';
import api from "../common/api";
import Loading from "../components/Loading";

const ProductsPage = () => {
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState();
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

    const handleProductSelection = () => {
        setLoading(true);
        api.get(`/product/${selectedProduct?.name}`).then((response) => {
            Modal.success({
                title: `Enjoy your ${selectedProduct.name}!`,
                content: response.data.amount ? `Do not forget to take your change: ${response.data.amount} UM!` : '',
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
            <Row justify={"center"} style={{ marginTop: '20px'}}>
                {products && products.length > 0 && products.map((product) => {
                    return (
                        <Card
                            key={product.name}
                            style={{width: '20vh', marginLeft: '20px', backgroundColor: product.color}}
                            cover={<img alt={product.name}  src={product.source} height={'350vh'} />}
                            extra={<Radio checked={product.name === selectedProduct?.name} onClick={() => setSelectedProduct(product)}/>}
                        >
                            <Card.Meta style={{justifyContent:'center'}} title={`${product.name} - ${product.price}UM`} ></Card.Meta>
                        </Card>
                    
                    );
                })}
            </Row>
            <Row justify='center' style={{ marginTop: '20px'}}>
                <Button type="primary" size="large" onClick={handleProductSelection}>Select</Button>
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

export default ProductsPage;