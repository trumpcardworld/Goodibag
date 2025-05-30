import BoxItems from "./box-items";
import FormArea from "./form-area";
import LocationArea from "./location-area";
import TopBar from "./top-bar";

const ContactArea = () => {
  return (
    <>
      <TopBar
        title="GET TO KNOW US"
        subtitle="Have a query in mind ? Contact Us."
      />
      <BoxItems/>
      <FormArea/>
      <LocationArea/>
    </>
  );
};

export default ContactArea;
