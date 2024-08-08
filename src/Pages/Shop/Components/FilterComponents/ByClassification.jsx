const ByClassification = ({
  classifications,
  selectedClassification,
  onClassificationFilter,
}) => {
  const titleHeader = "rb-bold text-lg uppercase ";
  const checkBox = "text-gray-500 rb-medium";

  return (
    <div className="px-6 mb-secondary  min-w-[fit-content] py-2 lg:py-0">
      <div className="flex items-center justify-between mb-4">
        <p className={titleHeader}>Classification</p>
      </div>
      <div className="flex flex-col gap-y-3">
        {classifications.map((classification, index) => (
          <div key={index}>
            <label className="flex items-center space-x-2">
              <input
                onChange={() => onClassificationFilter(classification)}
                type="checkbox"
                className="form-checkbox h-4 w-4"
                checked={selectedClassification === classification}
              />
              <span className={checkBox}>{classification}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ByClassification;
