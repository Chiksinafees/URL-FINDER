import React from "react";

const IframeWidget = ({ url }) => {
  return (
    <div className="mx-20">
      <div className="border border-black rounded-md">
        <iframe src={url} title="default" className="w-full h-80"></iframe>
      </div>
    </div>
  );
};

export default IframeWidget;
