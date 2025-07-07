import ContactForm2 from "../form/ContactForm2";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const ContactSection = () => {
  return (
    <section className="rv-20-contact_main_section">
      <div className="container">
        <DivAnimateYAxis className="row">
          <div className="col-md-12 col-lg-5">
            <div className="rv-20-contact_image">
              <img src="assets/img/contact/home-6-1.png" alt="image" />
            </div>
          </div>
          <div className="col-md-12 col-lg-7">
            <div className="rv-20-contact_form_area">
              <div className="rv-20-contact_section_heading">
                <div>
                  <p className="rv-20-contact_sub_title rv-text-anime d-flex">
                    <span></span>Get in Touch
                  </p>
                </div>
                <div>
                  <h2 className="rv-20-contact_section_title rv-text-anime">
                    Seeking a Home Gardener? Reach Out To Us.
                  </h2>
                </div>
              </div>
              <ContactForm2 />
            </div>
          </div>
        </DivAnimateYAxis>
      </div>
      <span className="home-6-sh-1">
        <img src="assets/img/contact/home-6-sh-1.png" alt="image" />
      </span>
      <span className="home-6-sh-2">
        <img src="assets/img/contact/home-6-sh-2.png" alt="image" />
      </span>
    </section>
  );
};

export default ContactSection;
