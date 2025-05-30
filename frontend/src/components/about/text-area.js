

const TextArea = () => {
  return (
    <section className="about__text pt-115 pb-100">
      <div className="container">
        <div className="row">
          <div className="col-xl-4 col-lg-4">
            <div
              className="about__text-wrapper wow fadeInUp"
              data-wow-delay=".3s"
              data-wow-duration="1s"
            >
              <h3 className="about__text-title">
                From innovative ideas to <br /> sustainable packaging solutions.
              </h3>
            </div>
          </div>
          <div className="col-xl-8 col-lg-8">
            <div
              className="about__text wow fadeInUp"
              data-wow-delay=".6s"
              data-wow-duration="1s"
            >
              <p>
                Starting with specialized packaging solutions across key market segments, we are 
                rapidly expanding to serve businesses of all sizes. Our expertise spans cosmetic 
                packaging, gift packaging, tea & wine packages, food packaging, and jewellery 
                packaging - each crafted with precision and attention to detail. What began as 
                focused product lines is now scaling into comprehensive packaging solutions that 
                help brands make lasting impressions.
              </p>

              <p>
                As we grow into large-scale operations, our commitment remains unchanged: delivering 
                premium quality packaging that enhances product presentation while ensuring maximum 
                protection. From luxury cosmetic boxes to elegant wine packaging and secure food 
                containers, we're building the infrastructure to meet growing demand while 
                maintaining the personalized service that sets us apart.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextArea;