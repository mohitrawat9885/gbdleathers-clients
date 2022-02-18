import React, { useEffect, useState } from 'react';
import './Reviews.css';
import Rating from '@mui/material/Rating';

export default function Reviews(props) {
  const [rating, setRating] = useState();
  const [review, setReview] = useState();
  const [reviewList, setReviewList] = useState([]);
  const [reviewListLoading, setReviewListLoading] = useState(true);
  const [reviewImages, setReviewImages] = useState([]);

  const createReview = async () => {
    try {
      let data = new FormData();
      if (!rating) {
        alert('Please give some rating!');
        return;
      }
      if (!review) {
        alert('Please give review!');
        return;
      }
      data.append('rating', rating);
      data.append('review', review);
      const response = await fetch(
        `api/v1/gbdleathers/client/customer/reviews/${props.productId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: data,
        }
      );
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        alert(res.message);
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllReviews = async () => {
    try {
      const response = await fetch(
        `/api/v1/gbdleathers/client/reviews/${props.productId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        setReviewList(res.data);
        console.log('Reviews', res.data);
        setReviewListLoading(false);
      }
    } catch (error) {
      console.log('Error Fetching reviews', error);
      setReviewListLoading(false);
    }
    // setLoading(false);
  };
  // useEffect(() => {
  //   console.log(reviewImages);
  // }, [reviewImages]);

  const imageHandler = (e) => {
    var files = e.target.files; //FileList object
    var output = document.getElementById('result');
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      //Only pics
      if (!file.type.match('image')) continue;
      var picReader = new FileReader();
      picReader.addEventListener('load', function (event) {
        var picFile = event.target;
        var div = document.createElement('div');
        div.innerHTML =
          "<img class='review-upload-images' src='" +
          picFile.result +
          "'" +
          "title='" +
          picFile.name +
          "'/>";
        output.insertBefore(div, null);
      });
      //Read the image
      picReader.readAsDataURL(file);
    }
  };
  function GetReviewdateTime(date) {
    let d = new Date(date);

    return d.toUTCString();
  }

  function renderReviewsList() {
    if (reviewListLoading) {
      getAllReviews();
      return <p>Loading...</p>;
    }
    return (
      <div
        style={{
          width: '100%',
        }}
      >
        {reviewList.map((review, i) => (
          <div
            key={i}
            style={{
              width: '100%',
              padding: '.5rem',
              marginTop: '1rem',
              borderTop: '1px solid lightgray',
            }}
          >
            <div
              style={{
                width: '100%',
                display: 'flex',
                marginTop: '.6rem',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}
                >
                  {review.customer.first_name} {review.customer.last_name}
                </p>
                <br />
                <Rating
                  style={{
                    marginLeft: '.6rem',
                  }}
                  size="small"
                  value={review.rating}
                  precision={0.5}
                  readOnly
                />
              </div>
              <p>{GetReviewdateTime(review.updated_at)}</p>
            </div>
            <br />
            <div>
              <p
                style={{
                  fontSize: 16,
                  color: 'rgb(80, 80, 80)',
                }}
              >
                {review.review}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="review-div">
      <div className="review-holder">
        <div className="review-header">
          <div className="review-header-rating">
            <div
              style={{
                display: 'flex',
                flexFlow: 'row',
                alignItems: 'center',
              }}
            >
              <p
                style={{
                  fontSize: '2.2rem',
                }}
              >
                {props.rating}
              </p>
              <Rating
                style={{ marginLeft: '1rem' }}
                value={parseFloat(props.rating)}
                size="large"
                precision={0.5}
                readOnly
              />
            </div>
            <br />
            <p>{props.numberOfReviews} Reviews</p>
          </div>
          <div className="review-create-review-div">
            <p
              style={{
                fontSize: '1.6rem',
                color: 'rgb(80, 80, 80)',
              }}
            >
              Give Your Review
            </p>
            <br />
            <div className="review-create-review">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <p>Rating</p>
                <Rating
                  style={{
                    marginLeft: '.6rem',
                  }}
                  size="small"
                  value={rating}
                  onChange={(event, newValue) => setRating(newValue)}
                  precision={0.5}
                />
              </div>
              <br />
              <div>
                <p
                  style={{
                    marginBottom: '.8rem',
                  }}
                >
                  Review
                </p>
                <textarea
                  name="message"
                  rows="10"
                  style={{
                    width: '100%',
                    fontSize: '1.3rem',
                    padding: '.4rem',
                    fontStyle: 'revert',
                    border: '1px solid lightgray',
                  }}
                  onChange={(e) => setReview(e.target.value)}
                ></textarea>
              </div>
              <br />
              <div
                className="review-submit"
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row-reverse',
                }}
              >
                <div
                  style={{
                    width: '22rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <label htmlFor="review-upload-image">
                    <input
                      name="review-upload-image"
                      id="review-upload-image"
                      type="file"
                      style={{
                        display: 'none',
                      }}
                      accept="image/*"
                      multiple
                      onChange={imageHandler}
                    />
                    <div className="review-upload-image-button">
                      <span>ADD PHOTOS</span>
                    </div>
                  </label>
                  <div className="review-upload-image-submit-button">
                    <button onClick={() => createReview()}>SUBMIT</button>
                  </div>
                </div>
              </div>
              <div
                id="result"
                // className='review-upload-images-div'
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  height: '6rem',
                }}
              >
                {/* <output id="result" /> */}
              </div>
            </div>
            <br />
            <br />
            {renderReviewsList()}
          </div>
        </div>
      </div>
      <div
        style={{
          width: '100%',
          height: '16vh',
          borderBottom: '1px solid lightgray',
        }}
      ></div>
    </div>
  );
}
