const ByCategory = ({
  data,
  onCloseFiler,
  onHanldeCategoryId,
  selectedCategoryId,
  setSelectedCategoryId,
}) => {
  const handleChange = (e) => {
    const newSelectedCategoryId = e.target.value
      ? parseInt(e.target.value)
      : null;
    setSelectedCategoryId(newSelectedCategoryId);
    onCloseFiler();
    onHanldeCategoryId(newSelectedCategoryId);
  };

  return (
    <div className="flex flex-col gap-y-3 border-b-[1.5px] border-black pb-2">
      <select
        onChange={handleChange}
        value={selectedCategoryId || ""}
        className="outline-0"
      >
        <option value="">By category</option>
        {data?.map(({ name, id }, index) => (
          <option key={index} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ByCategory;
