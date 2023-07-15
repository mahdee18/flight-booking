const SingleCheckbox = () => {
    return (
      <div className="flex items-center">
        <input type="checkbox" className="form-checkbox text-gray-600 h-5 w-5 cursor-pointer" />
        <span className="ml-2 font-semibold text-gray-500">
          Direct flight only
        </span>
      </div>
    );
  };
  
  export default SingleCheckbox;