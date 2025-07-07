import CustomImageAnimate from "../utils/CustomImageAnimate";
import { teamData3 } from "../../data/Data";

const TeamSection3 = () => {
  return (
    <section className="rv-inner-team rv-section-spacing rv-team-members-section">
      <div className="container">
        <div className="rv-inner-team-row" data-aos="fade-up">
          <div className="row row-cols-lg-3 row-cols-2 row-cols-xxs-1 g-30">
            {teamData3.map((item) => (
              <div className="col" key={item.id}>
                <div className="rv-9-member rv-inner-member">
                  <div className="rv-9-member__img">
                    <CustomImageAnimate src={item.img} alt="Project Image" />
                  </div>

                  <div className="rv-9-member__txt">
                    <div className="rv-9-member-socials rv-inner-member-socials">
                      <div className="rv-1-speaker__socials">
                        <a href="#">
                          <i className="fa-brands fa-facebook-f"></i>
                        </a>
                        <a href="#">
                          <i className="fa-brands fa-twitter"></i>
                        </a>
                        <a href="#">
                          <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                      </div>
                      <div className="rv-9-member-socials__icon">
                        <i className="fa-regular fa-circle-nodes"></i>
                      </div>
                    </div>
                    <div>
                      <span className="rv-3-project__sub-title">
                        {item.subTitle}
                      </span>
                    </div>
                    <div>
                      <h5 className="rv-3-project__title">
                        <a href="#">{item.title}</a>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection3;
