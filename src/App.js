import React, {useEffect, useState} from 'react';
import './App.scss';
import {ReactComponent as TwitterLogo} from './twitterlogo.svg';
import COLORS_ARRAY from './colorsArray';

function App() {

  let quoteDataBaseURL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

  const [quote, setQuote] = useState("Winning isn't everything, but wanting to win is.");
  const [author, setAuthor] = useState("Charles Swindoll");
  const [quotesArray, setQuotesArray] = useState(null);
  const [randomColor, setRandomColor] = useState("#282c34");

  const fetchQuotes = async(url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes);
  }

  useEffect(() => {
    fetchQuotes(quoteDataBaseURL)
  }, [quoteDataBaseURL])
  
  const getQuoteAndAuthor = () => {
    let randomIndex = Math.floor(Math.random() * quotesArray.length);
    let randomColorIndex = Math.floor(Math.random() * COLORS_ARRAY.length);
    
    setRandomColor(COLORS_ARRAY[randomColorIndex]);
    setQuote(quotesArray[randomIndex].quote);
    setAuthor(quotesArray[randomIndex].author);
  }

  return (
    <div className="App" style={
      {backgroundColor: randomColor, transition: '1s ease-in'}
    }>
      <div id='app-box'>
        <wrapper id='quote-box'>
          <h3 id='text' style={
            {color: randomColor, transition: '1s ease-in'}
          }>{quote}</h3>
          <p id='author' style={
            {color: randomColor, transition: '1s ease-in'}
          }>- {author}</p>
          <div id='button-box'>
            <a id='tweet-quote' href={encodeURI(
              `https://www.twitter.com/intent/tweet?text=${quote} - ${author}`)} style={
                {backgroundColor: randomColor, transition: '1s ease-in'}
            }>
              <TwitterLogo id='twitter-logo'/>
            </a>
            <button onClick={() => getQuoteAndAuthor()} id='new-quote' style={
              {backgroundColor: randomColor, transition: '1s ease-in'}
            }>Change Quote</button>
          </div>
        </wrapper>
      </div>
    </div>
  );
}

export default App;