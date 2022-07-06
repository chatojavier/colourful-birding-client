const TourInclusions = ({ toursInclusions }) => {
  return (
    <div className="tour-inclusions p-4">
      <div className="tour-inclusions__content" dangerouslySetInnerHTML={{ __html: toursInclusions }}></div>
    </div>
  );
};

export default TourInclusions;
