import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";

const ProductList = ({ dispatch, state }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <section className="pt-12 lg:pt-8 ">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} dispatch={dispatch} state={state} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductList;