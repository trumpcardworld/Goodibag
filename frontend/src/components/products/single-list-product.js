import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
// internal
import { CartTwo, Compare, Eye, HeartTwo } from "@svg/index";
import { RatingFull, RatingHalf } from "./rating";
import OldNewPrice from "./old-new-price";
import {
  add_cart_product,
  initialOrderQuantity,
} from "src/redux/features/cartSlice";
import { add_to_wishlist } from "src/redux/features/wishlist-slice";
import { setProduct } from "src/redux/features/productSlice";

const SingleListProduct = ({ product }) => {
  const { _id, image, title, price, discount, originalPrice } = product || {};
  
  // handle dispatch
  const dispatch = useDispatch();
  const { cart_products } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  
  // check if product is already in cart or wishlist
  const isWishlistAdded = wishlist.some(item => item._id === _id);
  const isAddedToCart = cart_products.some((prd) => prd._id === _id);

  // handle add product to cart
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };

  // handle add wishlist
  const handleAddWishlist = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  // handle quick view
  const handleQuickView = (prd) => {
    dispatch(initialOrderQuantity())
    dispatch(setProduct(prd))
  };

  return (
    <React.Fragment>
      <div className="product__list-item mb-30">
        <div className="row">
          <div className="col-xl-5 col-lg-5">
            <div className="product__thumb product__list-thumb p-relative fix m-img">
              <Link href={`product-details/${_id}`}>
                <Image
                  src={image}
                  alt="image"
                  width={335}
                  height={325}
                  style={{
                    width: "335px",
                    height: "325px",
                    objectFit: "contain",
                  }}
                />
              </Link>
              {discount > 0 && (
                <div className="product__badge d-flex flex-column flex-wrap">
                  <span className={`product__badge-item has-new`}>sale</span>
                  <span className={`product__badge-item has-offer`}>
                    {`-${discount}%`}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="col-xl-7 col-lg-7">
            <div className="product__list-content">
              <div className="product__rating product__rating-2 d-flex">
                <RatingFull />
                <RatingFull />
                <RatingFull />
                <RatingFull />
                <RatingHalf />
              </div>

              <h3 className="product__list-title">
                <Link href={`product-details/${_id}`}>{title}</Link>
              </h3>
              
              <div className="product__list-price">
                {discount > 0 ? (
                  <OldNewPrice originalPrice={originalPrice} discount={discount} />
                ) : (
                  <span className="product__list-ammount">
                    ${originalPrice ? originalPrice.toFixed(2) : price}
                  </span>
                )}
              </div>
              
              <div className="product__list-action d-flex flex-wrap align-items-center">
                {isAddedToCart ? (
                  <Link
                    href="/cart"
                    className="product-add-cart-btn product-add-cart-btn-2"
                  >
                    <CartTwo />
                    View Cart
                  </Link>
                ) : (
                  <button
                    onClick={() => handleAddProduct(product)}
                    type="button"
                    className="product-add-cart-btn product-add-cart-btn-2"
                  >
                    <CartTwo />
                    Add to Cart
                  </button>
                )}
                
                <button
                  onClick={() => handleAddWishlist(product)}
                  type="button"
                  className={`product-action-btn product-action-btn-2 ${isWishlistAdded ? "active" : ""}`}
                >
                  <HeartTwo />
                  <span className="product-action-tooltip">
                    {isWishlistAdded ? "Added to Wishlist" : "Add To Wishlist"}
                  </span>
                </button>
                
                <button
                  onClick={() => handleQuickView(product)}
                  type="button"
                  className="product-action-btn"
                >
                  <Eye />
                  <span className="product-action-tooltip">Quick view</span>
                </button>

                <Link href={`/product-details/${_id}`}>
                  <button
                    type="button"
                    className="product-action-btn product-action-btn-2"
                  >
                    <i className="fa-solid fa-link"></i>
                    <span className="product-action-tooltip">
                      Product Details
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SingleListProduct;