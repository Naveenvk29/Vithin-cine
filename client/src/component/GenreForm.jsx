const GenreForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "submit",
  handleDelete,
}) => {
  return (
    <div className="p-5">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write Genre name "
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="py-3 px-4 border-2 border-black  outline-none rounded-xl w-[60vw] text-md font-medium"
        />
        <div className="flex justify-between mt-[1.5vw]">
          <button className="bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50  font-semibold ">
            {buttonText}
          </button>
        </div>
        {handleDelete && (
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50  font-semibold "
          >
            Delete
          </button>
        )}
      </form>
    </div>
  );
};

export default GenreForm;
