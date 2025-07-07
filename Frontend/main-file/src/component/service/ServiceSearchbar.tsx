const ServiceSearchbar = () => {
  return (
    <div className="rv-service-details-sidebar-widget">
      <h5 className="rv-service-details-sidebar-widget__title">Search</h5>
      <form action="#" className="rv-service-details-sidebar__search-form">
        <input type="search" name="search" placeholder="Search here..." />
        <button type="submit">
          <i className="fa-regular fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
  );
};

export default ServiceSearchbar;
