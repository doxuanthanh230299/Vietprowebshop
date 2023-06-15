import { getProducts } from '../../services/Api';
import ProductItem from '../../shared/components/product-item';
import { useState, useEffect } from 'react';

const Home = () => {
  const [latestProduct, setLatestProduct] = useState([]);
  const [featuredProduct, setFeaturedProduct] = useState([]);
  useEffect(() => {
    getProducts({
      params: { limit: 6 },
    }).then((res) => {
      setLatestProduct(res.data.data.docs);
    });
    getProducts({
      params: {
        limit: 6,
        'filter[is_featured]': true,
      },
    }).then((res) => {
      setFeaturedProduct(res.data.data.docs);
    });
  }, []);

  return (
    <>
      {/*	Feature Product	*/}
      <div className="products">
        <h3>Sản phẩm nổi bật</h3>
        <div className="product-list card-deck">
          {featuredProduct.map((value) => (
            <ProductItem key={value._id} item={value} />
          ))}
        </div>
      </div>
      {/*	End Feature Product	*/}
      {/*	Latest Product	*/}
      <div className="products">
        <h3>Sản phẩm mới</h3>
        <div className="product-list card-deck">
          {latestProduct.map((value) => (
            <ProductItem key={value._id} item={value} />
          ))}
        </div>
      </div>
      {/*	End Latest Product	*/}
    </>
  );
};

export default Home;
