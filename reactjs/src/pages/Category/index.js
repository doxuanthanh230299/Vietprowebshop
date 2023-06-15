import { useParams, useSearchParams } from 'react-router-dom';
import { getProductsCategory, getCategoryInfoId } from '../../services/Api';
import { useEffect, useState } from 'react';
import ProductItem from '../../shared/components/product-item';
import Pagination from '../../shared/components/Pagination';

const Category = () => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const [totalProduct, setTotalProduct] = useState(0);
  const [categoryName, setCategoryName] = useState('');
  const [pages, setPages] = useState({
    limit: 10,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  useEffect(() => {
    getCategoryInfoId(id, {}).then(
      ({ data }) => {
        setCategoryName(data.data.name);
      },
      [id]
    );
    getProductsCategory(id, {
      params: {
        page: page,
        limit: pages.limit
      },
    }).then(({ data }) => {
      setTotalProduct(data.data.docs.length);
      setProducts(data.data.docs);
      setPages({ ...pages, ...data.data.pages });
    });
  }, [id, page]);
  return (
    <>
      <div>
        <div className="products">
          <h3>
            {categoryName} (hiện có {totalProduct} sản phẩm)
          </h3>
          <div className="product-list card-deck">
            {products.map((product) => (
              <ProductItem item={product} key={product._id} />
            ))}
          </div>
        </div>
        {/*	End List Product	*/}
        <Pagination pages={pages} />
      </div>
    </>
  );
};

export default Category;
