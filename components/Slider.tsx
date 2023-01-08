import React from "react";

const Slider = () => {
  return (
    <div className="max-w-7xl overflow-x-scroll mx-auto flex  gap-16 p-5 justify-center items-center">
      <div className="  ">
        <img
          className="w-60 object-cover h-64 rounded-lg "
          src="https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/b7afc9da-4717-4f4b-beea-77c4c20c50ae"
        />
      </div>
      <div className="  ">
        <img
          className="w-60 object-cover h-64 rounded-lg"
          src="https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/5b3e72c3-964e-4198-9085-ead098708110"
        />
      </div>
      <div className="  ">
        <img
          className="w-60 object-cover h-64 rounded-lg"
          src="https://cdn.sanity.io/images/mrfd4see/production/82dd805312eef0138eeba7c14a5470649ed1e17e-1024x1024.png?w=2000&fit=max&auto=format"
        />
      </div>
    </div>
  );
};

export default Slider;
