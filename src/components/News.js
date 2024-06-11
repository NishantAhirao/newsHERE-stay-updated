import React, { useEffect, useState, useCallback } from 'react';
import NewsItems from './NewsItems';
import PropTypes from 'prop-types'; // Changed from 'react' to 'prop-types'
import Spinner from './spinner';
import './news.css';

const News = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const fetchData = useCallback(async (page) => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=13ea6676bbd74b9295d29e154e2a7fb9&page=${page}&pageSize=${props.pageSize}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (page === 1) {
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
  }, [props.country, props.category, props.pageSize]);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, fetchData]);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 50 && hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore]);

  if (loading) {
    props.setProgress(5);
    props.setProgress(20);
    props.setProgress(90);
    props.setProgress(100);
    return <Spinner />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='container my-3 '>
      <h2 className='text-center' style={{color:'black', backgroundColor:'white'}}>newsHERE - STAY UPDATED</h2>

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

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
};

News.defaultProps = {
  country: "in",
  pageSize: 9,
  category: "general",
};

export default News;
