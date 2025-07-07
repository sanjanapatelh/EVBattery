import { teamData } from "../../data/Data";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const TeamSection = () => {
  return (
    <section className="rv-20-team_main_area_section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="rv-20-team_section_top">
              <div className="rv-20-team_section_heading">
                <div>
                  <p className="rv-20-team_sub_title rv-text-anime d-flex">
                    <span></span> Team Members
                  </p>
                </div>

                <div>
                  <h2 className="rv-20-team_section_title rv-text-anime">
                    Learn Who Nurtures Our Greenspaces.
                  </h2>
                </div>
              </div>
              <div className="rv-20-team_button_area">
                <a href="#" className="rv-20-team_btn">
                  View All Member
                </a>
              </div>
            </div>
          </div>
        </div>
        <DivAnimateYAxis className="row justify-content-center">
          {teamData.map((item) => (
            <div className="col-md-6 col-sm-8 col-lg-4" key={item.id}>
              <div className="rv-20-single_team ">
                <div className="rv-20-single_team_image">
                  <img src={item.mainImg} alt="image" />
                  <div className="rv-20-team_member_socials">
                    {item.socials.map((social, index) => (
                      <a href={social.url} key={index}>
                        <i className={social.icon}></i>
                      </a>
                    ))}
                  </div>
                </div>
                <div className="rv-20-team_member_info">
                  <i className="fas fa-share-alt"></i>
                  <span className="rv-20-team_member_designation">
                    {item.designation}
                  </span>
                  <h4 className="rv-20-team_member_name">
                    <a href="#">{item.name}</a>
                  </h4>
                  <h5 className="rv-20-team_drp_txt">{item.dropText}</h5>
                </div>
              </div>
            </div>
          ))}
        </DivAnimateYAxis>
      </div>
    </section>
  );
};

export default TeamSection;
