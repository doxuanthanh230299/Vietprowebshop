import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getProducts } from '../../services/Api';
import ProductItem from '../../shared/components/product-item';
import Pagination from '../../shared/components/Pagination';

const Search = () => {
  const [products, setProducts] = useState([]);
  const [pages, setPage] = useState({
    limit: 12,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const page = searchParams.get('page') || 1;
  useEffect(() => {
    getProducts({
      params: {
        name: keyword,
        page: page,
        limit: pages.limit,
      },
    }).then(({ data }) => {
      setProducts(data.data.docs);
      setPage({ ...pages, ...data.data.pages });
    });
  }, [keyword, page]);

  return (
    <>
      <div>
        <div className="products">
          <div id="search-result">
            Kết quả tìm kiếm với sản phẩm <span>{keyword}</span>
          </div>
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

export default Search;
