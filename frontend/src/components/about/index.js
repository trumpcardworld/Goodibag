// internal
import TextArea from "./text-area";
import Services from "./services";
import AboutFaqs from "./about-faqs";
import Awards from "@components/awards";
import BreadcrumbTwo from "@components/common/breadcrumb/breadcrumb-2";

const About = () => {
  return (
    <>
      <BreadcrumbTwo
        subtitle="About us"
        title={
          <>
            Welcome to <br /> Goodibag
          </>
        }
      />
      <TextArea />
      <Services />
      <Awards />
      <AboutFaqs />
    </>
  );
};

export default About;
