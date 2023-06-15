import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { curFormatting, getImageProduct } from '../../shared/ultils';
import { useDispatch } from 'react-redux';
import { DELETE_ITEM_CART, EMPTY_CART, UPDATE_CART } from '../../shared/constants/action-type';
import { useState } from 'react';
import { order } from '../../services/Api';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const onClickOrder = (e) => {
    e.preventDefault();
    const items = products.map((product) => ({ prd_id: product._id, qty: product.qty }));
    order({
      items,
      ...inputs,
    }).then(({ data }) => {
      console.log(data);
      if (data.status === 'success') {
        navigate('/Success');
        dispatch({
          type: EMPTY_CART
        })
      }
    });
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const products = useSelector(({ Cart }) => {
    return Cart.items;
  });

  const updateCart = (e, _id) => {
    const val = parseInt(e.target.value);
    if (val < 1) {
      // eslint-disable-next-line no-restricted-globals
      const isConfirm = confirm('Bạn có chắc muốn xoá sản phẩm này');
      if (isConfirm) {
        dispatch({
          type: DELETE_ITEM_CART,
          payload: {
            _id,
          },
        });
      }
    }

    dispatch({
      type: UPDATE_CART,
      payload: {
        _id,
        qty: val,
      },
    });
  };

  const deleteItem = (e, _id) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    const isConfirm = confirm('Bạn có chắc muốn xoá sản phẩm này');
    if (isConfirm) {
      dispatch({
        type: DELETE_ITEM_CART,
        payload: {
          _id,
        },
      });
    }
  };
  return (
    <>
      <div>
        <div id="my-cart">
          <div className="row">
            <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">Thông tin sản phẩm</div>
            <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">Tùy chọn</div>
            <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
          </div>
          <form method="post">
            {products?.map((product) => (
              <div className="cart-item row" key={product._id}>
                <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                  <img src={getImageProduct(product.image)} alt={product.name} />
                  <h4>{product.name}</h4>
                </div>
                <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                  <input
                    type="number"
                    id="quantity"
                    className="form-control form-blue quantity"
                    onChange={(e) => updateCart(e, product._id)}
                    value={product.qty}
                  />
                </div>
                <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                  <b>{curFormatting(product.price * product.qty)}</b>

                  <a href="#" onClick={(e) => deleteItem(e, product._id)}>
                    Xóa
                  </a>
                </div>
              </div>
            ))}
            <div className="row">
              <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                <button id="update-cart" className="btn btn-success" type="submit" name="sbm">
                  Cập nhật giỏ hàng
                </button>
              </div>
              <div className="cart-total col-lg-2 col-md-2 col-sm-12">
                <b>Tổng cộng:</b>
              </div>
              <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                <b>
                  {curFormatting(
                    products?.reduce((total, product) => {
                      return total + product.qty * product.price;
                    }, 0)
                  )}
                </b>
              </div>
            </div>
          </form>
        </div>
        {/*	End Cart	*/}
        {/*	Customer Info	*/}
        <div id="customer">
          <form method="post">
            <div className="row">
              <div id="customer-name" className="col-lg-4 col-md-4 col-sm-12">
                <input
                  placeholder="Họ và tên (bắt buộc)"
                  type="text"
                  name="name"
                  className="form-control"
                  value={inputs?.name || ''}
                  onChange={onChangeInput}
                  required
                />
              </div>
              <div id="customer-phone" className="col-lg-4 col-md-4 col-sm-12">
                <input
                  placeholder="Số điện thoại (bắt buộc)"
                  type="text"
                  name="phone"
                  className="form-control"
                  value={inputs?.phone || ''}
                  onChange={onChangeInput}
                  required
                />
              </div>
              <div id="customer-mail" className="col-lg-4 col-md-4 col-sm-12">
                <input
                  placeholder="Email (bắt buộc)"
                  type="text"
                  name="email"
                  className="form-control"
                  value={inputs?.email || ''}
                  onChange={onChangeInput}
                  required
                />
              </div>
              <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
                <input
                  placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                  type="text"
                  name="address"
                  className="form-control"
                  value={inputs?.address || ''}
                  onChange={onChangeInput}
                  required
                />
              </div>
            </div>
          </form>
          <div className="row">
            <div className="by-now col-lg-6 col-md-6 col-sm-12">
              <a href="#" onClick={onClickOrder}>
                <b>Mua ngay</b>
                <span>Giao hàng tận nơi siêu tốc</span>
              </a>
            </div>
            <div className="by-now col-lg-6 col-md-6 col-sm-12">
              <a href="#">
                <b>Trả góp Online</b>
                <span>Vui lòng call (+84) 0988 550 553</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
