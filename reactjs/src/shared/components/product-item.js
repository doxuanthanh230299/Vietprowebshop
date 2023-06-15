import { Link } from 'react-router-dom';
import { curFormatting, getImageProduct } from '../ultils';

const ProductItem = ({ item }) => {
  return (
    <div className="product-item card text-center">
      <Link to={`/ProductDetail-${item._id}`}>
        <img src={getImageProduct(item.image)} alt="abc" />
      </Link>
      <h4>
        <Link to={`/ProductDetail-${item._id}`}>{item.name}</Link>
      </h4>
      <p>
        Giá Bán: <span>{curFormatting(item.price)}</span>
      </p>
    </div>
  );
};

export default ProductItem;
