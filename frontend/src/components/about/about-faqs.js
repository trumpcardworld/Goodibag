

'use client';
import React from "react";
// internal
import { Play } from "@svg/index";
import faq_bg from "@assets/img/faq/faq-img.jpg";
import SingleFaq from "@components/faq/single-faq";
import VideoModal from "@components/common/modals/modal-video";
import useModal from "@hooks/use-modal";

const faq_items = [
  {
    id: "packaging-one",
    title: "What types of cosmetic packaging do you offer?",
    show: true,
    desc: "We specialize in premium cosmetic packaging solutions including custom bottles, jars, tubes, compacts, and sustainable eco-friendly options. Our designs focus on both functionality and aesthetic appeal to enhance your brand image.",
    parent: "faqaccordion",
  },
  {
    id: "packaging-two",
    title: "Can you create custom gift packaging designs?",
    desc: "Absolutely! We offer bespoke gift packaging solutions including luxury boxes, ribbon finishes, custom inserts, and personalized branding. Perfect for special occasions, corporate gifts, and premium product presentations.",
    parent: "faqaccordion",
  },
  {
    id: "packaging-three",
    title: "Do you provide food-safe packaging solutions?",
    desc: "Yes, we offer comprehensive food packaging solutions that meet all safety standards. From takeaway containers and food boxes to specialized packaging for perishables, all our food packaging is FDA approved and food-grade certified.",
    parent: "faqaccordion",
  },
  {
    id: "packaging-four",
    title: "What options are available for tea and wine packaging?",
    desc: "We create elegant tea and wine packaging including custom tea tins, pouches, wine boxes, and protective packaging. Our designs preserve product quality while creating an premium unboxing experience for your customers.",
    parent: "faqaccordion",
  },
  {
    id: "packaging-five",
    title: "Do you offer jewelry packaging solutions?",
    desc: "We provide specialized jewelry packaging including ring boxes, necklace displays, jewelry pouches, and luxury presentation cases. All packaging is designed to protect delicate items while showcasing their beauty.",
    parent: "faqaccordion",
  },
];

const AboutFaqs = () => {
  const { isVideoOpen, setIsVideoOpen } = useModal();
  return (
    <React.Fragment>
      <section className="faq__area p-relative">
        <div
          className="faq__video"
          style={{ backgroundImage: `url(${faq_bg.src})` }}
        >
          <div className="faq__video-btn">
            <a
              style={{ cursor: "pointer" }}
              onClick={() => setIsVideoOpen(true)}
              className="tp-pulse-border popup-video"
            >
              <Play />
            </a>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row justify-content-end">
            <div className="col-xxl-7 col-xl-7 col-lg-7">
              <div className="faq__wrapper-2 faq__gradient-border faq__style-2 tp-accordion pl-160">
                <div className="faq__title-wrapper">
                  <span className="faq__title-pre">
                   Get in touch with us to see how
                  </span>
                  <h3 className="faq__title">
                    We deliver innovative packaging solutions
                  </h3>
                </div>
                <div className="accordion" id="faqaccordion">
                  {faq_items.map((item) => (
                    <SingleFaq key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* video modal start */}
      <VideoModal
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={"FWrz3bT-YoE"}
      />
      {/* video modal end */}
    </React.Fragment>
  );
};

export default AboutFaqs;