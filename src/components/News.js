import React, { useEffect, useState } from 'react';
import NewsItems from './NewsItems';
import PropTypes from 'react';
import Spinner from './spinner';

const News = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  

  const fetchData = async (page) => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=43b051e40381433c9a5034846efec749&page=${page}&pageSize=${props.pageSize}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      
      console.log(result);if (page === 1) {
        setData(result.articles); // Clear data for initial fetch
      } else {
        setData((prevData) => [...prevData, ...result.articles]); // Append for subsequent fetches
      }
      setHasMore(result.articles.length === props.pageSize);
      document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - newsHERE`;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 50 && hasMore) {
      
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    props.setProgress(5)
    props.setProgress(20)
    
    props.setProgress(90)
    props.setProgress(100)
    return <Spinner />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='container my-3'>
      <h2 className='text-center'>newsHERE - STAY UPDATED</h2>

      <div className='row'>
        {data.map((elements, index) => (
          <div className='col-md-4' key={index}>
            <NewsItems
              title={elements.title ? elements.title : ''}
              imgurl={elements.urlToImage ? elements.urlToImage : 'https://t3.ftcdn.net/jpg/03/36/72/16/360_F_336721635_dpBehVBnxlX6etU9mLMoF1GI8eiNzyCT.jpg'}
              description={elements.description ? elements.description : ''}
              newsurl={elements.url}
              author={elements.author ? elements.author : 'Unknown'}
              date={new Date(elements.publishedAt).toGMTString()}
              newsso={elements.source.name ? elements.source.name : 'SOURCE'}
            />
          </div>
        ))}
      </div>

      {hasMore && <Spinner />}
    </div>
  );
};

News.propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
    author:PropTypes.string,
    date:PropTypes.string,
    newsso:PropTypes.string,
}

News.defaultProps = {
  country: "in",
  pageSize: 9,
  category:"general",
  author:"Unknown",
  date:"Unknown",
  newsso:"Unknown"
};
export default News
