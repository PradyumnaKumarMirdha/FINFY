'use client'
import React, { useEffect, useState } from "react";

const StockNews = () => {
  const [news, setNews] = useState([]);
  const [expandedArticle, setExpandedArticle] = useState(null);
  const [showAllNews, setShowAllNews] = useState(false);

  const handleReadMoreClick = (articleTitle) => {
    setExpandedArticle(articleTitle === expandedArticle ? null : articleTitle);
  };

  useEffect(() => {
    const url = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=07a38a0ca43f418fb5ae79051436cf73"; // remove /update

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setNews(data.articles || []); // Update state with articles array or an empty array if data.articles is undefined
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{position: 'relative', zIndex: 21}}
    className="m-3 p-3">
      <h1 className="dark:text-white text-black text-xl">Recent News</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-6 auto-rows-max dark:text-white text-black antialiased transition-all transition-ease">
        {news
          .slice(0, showAllNews ? news.length : 8)
          .map((article, index) => (
            <div
              key={index}
              className={`w-full flex flex-wrap flex-col grow items-center justify-start p-[8px]  ${
                expandedArticle === article.title ? "lg:h-[220px]" : "lg:h-[160px]"
              }`}
            >
              <div style={{background: '#f0f3fa'}}
                className={`flex flex-col align-center justify-center rounded-lg overflow-hidden h-auto lg:h-full shadow-lg transition-all transition-ease hover:scale-[1.1] hover:shadow-2xl ${
                  expandedArticle === article.title ? "bg-[#f0f3fa]" : ""
                }`}
              >
                <div className="w-full grid gap-x-[8px] p-3">
                  <div className="flex items-start">
                    <div className="bg-white rounded-lg p-1 flex flex-col justify-between z-2 leading-normal ml-2 hover:shadow-inner">
                      <span className="text-[13px] text-[#6a6d78] font-normal mb-4 leading-tight ">
                        {article.publishedAt}
                      </span>
                      <a href={article.url}>
                      <div className="dark:text-white text-black font-bold text-sm mb-2 leading-tight ">{article.title}</div>
                      </a>
                      {expandedArticle === article.title && (
                        <p className="mb-3 font-medium text-sm transition-all transition-ease tracking-wider">
                          {article.description}
                        </p>
                      )}
                      <button
                        onClick={() => handleReadMoreClick(article.title)}
                        className="text-[#d1d4dc] text-[12px] hover:text-black focus:text-black outline-none transition-all transition-ease self-start "
                      >
                        Read more
                      </button>
                    </div>
                    <img
                      className={`block aspect-square size-[full] self-center flex-none bg-cover rounded-md ${
                        expandedArticle === article.title ? "absolute inset-0 z-0 blur-lg size-0" : "size-[100px]"
                      }`}
                      src={article.urlToImage}
                      alt={article.author}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {showAllNews ? (
        <div
          className="mt-3 text-center cursor-pointer text-[#8018f7] font-semibold hover:text-green-500 duration-300"
          onClick={() => setShowAllNews(false)}
        >
          Show Less
        </div>
      ) : (
        <div
          className="mt-3 text-center cursor-pointer text-[#8018f7] font-semibold hover:text-green-500 duration-300"
          onClick={() => setShowAllNews(true)}
        >
          View All Recent News
        </div>
      )}
    </div>
  );
};

export default StockNews;
