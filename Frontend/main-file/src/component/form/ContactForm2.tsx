const ContactForm2 = () => {
  return (
    <form action="#" className="rv-20-contact_form">
      <div className="row rv-20-form_row">
        <div className="col">
          <input type="text" className="form-control" placeholder="Full Name" />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Phone Number"
          />
        </div>
      </div>
      <div className="row rv-20-form_row">
        <div className="col">
          <input
            type="email"
            className="form-control"
            placeholder="Email Address"
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Choose Services"
          />
        </div>
      </div>
      <textarea placeholder="Your Message"></textarea>
      <div className="rv-20-contact_form_button">
        <button>
          Send Message <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </form>
  );
};

export default ContactForm2;
