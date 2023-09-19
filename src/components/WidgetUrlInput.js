import React, { useState } from "react";
import IframeWidget from "./IframeWidget";

const WidgetUrlInput = () => {

  const [url, setUrl] = useState("");
  const [seoData, setSeoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isIframeVisible, setIsIframeVisible] = useState(false);

  const handleURLChange = (e) => {
    setUrl(e.target.value);
  };

  const handleCheckSEO = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const login = "nafeesahmed01.na@gmail.com";
    const password = "743e3d5abbabb091";
    const cred = btoa(`${login}:${password}`);

    const requestData = [
      {
        url: url,
        enable_javascript: true,
        enable_browser_rendering: true,
      },
    ];

    try {
      const response = await fetch(
        "https://api.dataforseo.com/v3/on_page/instant_pages",
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${cred}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSeoData(data);
        setIsIframeVisible(true);
      } else {
        throw new Error("API request failed");
      }
    } catch (error) {
      setError("API request error");
      console.error("API request error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-4">URL Checker</h2>
      <form
        onSubmit={handleCheckSEO}
        className="mb-4 flex flex-col sm:flex-row"
      >
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={handleURLChange}
          className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500 w-full sm:w-64 mb-2 sm:mb-0"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-0 sm:ml-2 disabled:opacity-50"
        >
          {isLoading ? "Checking..." : "Check SEO"}
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}
      {isIframeVisible && <IframeWidget url={url} />}

      {seoData && (
        <div>
          <h3 className="text-2xl font-semibold mt-4">SEO Data</h3>
          <div className="bg-gray-100 p-4 rounded-lg mt-2">
            <ul>
              {Object.entries(seoData.tasks[0].result[0]).map(
                ([key, value]) => (
                  <li key={key} className="mb-2">
                    <span className="font-semibold">{key}:</span>
                    <span className="ml-2">
                      {typeof value === "object"
                        ? JSON.stringify(value)
                        : value}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default WidgetUrlInput;
