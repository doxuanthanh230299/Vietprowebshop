import { useEffect, useState } from 'react';
import moment from 'moment';
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { createCommentProduct, getCommentsProduct, getProduct } from '../../services/Api';
import { curFormatting, getImageProduct } from '../../shared/ultils';
import Pagination from '../../shared/components/Pagination';
import { ADD_TO_CART } from '../../shared/constants/action-type';
import { useDispatch } from 'react-redux';

const Product = () => {
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState({});
  const [pages, setPages] = useState({
    limit: 12,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInputComment({ ...inputComment, [name]: value });
  };

  const { id } = useParams();

  const onClickSubmit = (e) => {
    e.preventDefault();
    createCommentProduct(id, inputComment, {}).then(({ data }) => {
      if (data.status === 'success') {
        setInputComment({});
      }
      getComment(id);
    });
  };

  const addToCart = (type) => {
    if (product) {
      const { _id, name, price, image } = product;
      dispatch({
        type: ADD_TO_CART,
        payload: {
          _id,
          name,
          price,
          image,
          qty: 1,
        },
      });
    }
    if (type === 'buy-now') {
      navigate('/Cart');
    }
  };

  const getComment = (id) => {
    getCommentsProduct(id, {
      params: {
        page: page,
        limit: pages.limit,
      },
    }).then(({ data }) => {
      setComments(data.data.docs);
      setPages({ ...pages, ...data.data.pages });
    });
  };

  useEffect(() => {
    getProduct(id, {}).then(({ data }) => {
      setProduct(data.data);
    });
    getComment(id);
  }, [id, page]);
  return (
    <>
      <div>
        <div id="product">
          <div id="product-head" className="row">
            <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
              <img alt="product" src={getImageProduct(product?.image)} />
            </div>
            <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
              <h1>{product?.name}</h1>
              <ul>
                <li>
                  <span>Bảo hành:</span> 12 Tháng
                </li>
                <li>
                  <span>Đi kèm:</span> {product?.accessories}
                </li>
                <li>
                  <span>Tình trạng:</span> {product?.status}
                </li>
                <li>
                  <span>Khuyến Mại:</span> {product?.promotion}
                </li>
                <li id="price">Giá Bán (chưa bao gồm VAT)</li>
                <li id="price-number">{curFormatting(product?.price)}</li>
                <li id="status">{product?.is_stock ? 'Còn hàng' : 'Hết hàng'}</li>
              </ul>
              <div id="add-cart">
                <button className="btn btn-warning mr-2" onClick={() => addToCart('buy-now')}>
                  Mua ngay
                </button>

                <button className="btn btn-info" onClick={addToCart}>
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
          <div id="product-body" className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <h3>Đánh giá về {product?.name}</h3>
              <p>{product?.details}</p>
            </div>
          </div>
          {/*	Comment	*/}
          <div id="comment" className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <h3>Bình luận sản phẩm</h3>
              <form method="post">
                <div className="form-group">
                  <label>Tên:</label>
                  <input
                    name="name"
                    required
                    type="text"
                    className="form-control"
                    onChange={onChangeInput}
                    value={inputComment.name || ''}
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    name="email"
                    required
                    type="email"
                    className="form-control"
                    id="pwd"
                    onChange={onChangeInput}
                    value={inputComment.email || ''}
                  />
                </div>
                <div className="form-group">
                  <label>Nội dung:</label>
                  <textarea
                    name="content"
                    required
                    rows={8}
                    className="form-control"
                    onChange={onChangeInput}
                    value={inputComment.content || ''}
                  />
                </div>
                <button
                  type="submit"
                  name="sbm"
                  className="btn btn-primary"
                  onClick={onClickSubmit}
                >
                  Gửi
                </button>
              </form>
            </div>
          </div>
          {/*	End Comment	*/}
          {/*	Comments List	*/}
          <div id="comments-list" className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              {comments.map((comment) => (
                <div className="comment-item" key={comment?._id}>
                  <ul>
                    <li>
                      <b>{comment?.name}</b>
                    </li>
                    <li>{moment(comment.createAt).fromNow()}</li>
                    <li>
                      <p>{comment?.content}</p>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
          {/*	End Comments List	*/}
        </div>
        {/*	End Product	*/}
        <Pagination pages={pages} />
      </div>
    </>
  );
};

export default Product;
