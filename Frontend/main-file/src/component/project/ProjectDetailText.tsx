type Props = {
  title: string;
};
const ProjectDetailText = ({ title }: Props) => {
  return (
    <div className="rv-project-details__txt">
      <div className="left">
        <h3 className="rv-service-details__title">{title}</h3>

        <p className="rv-service-details__descr">
          It seems like your query is still quite broad. If you could provide
          more specific details or clarify your question about "Digital
          Product," I'd be happy to help. Are you looking for information on
          creating digital products, marketing them, or something else? Feel
          free to provide more context so I can provide a more targeted and
          helpful response.
        </p>
        <p className="rv-service-details__descr">
          Digital product is any product that is delivered and consumed in a
          digital format. Unlike physical products, digital products exist
          solely in electronic form. They can include a wide range of items,
          from software and e-books to online courses and digital artwork.
        </p>
      </div>

      <div className="rv-project-details__infos">
        <div className="rv-project-details-info">
          <h5 className="rv-project-details-info__name">Client:</h5>
          <span className="rv-project-details-info__value">
            Hermann P. Schnitzel
          </span>
        </div>

        <div className="rv-project-details-info">
          <h5 className="rv-project-details-info__name">Date:</h5>
          <span className="rv-project-details-info__value">
            Dec 2024 - Feb 2024
          </span>
        </div>

        <div className="rv-project-details-info">
          <h5 className="rv-project-details-info__name">Services:</h5>
          <span className="rv-project-details-info__value">
            Graphic Designing
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailText;
