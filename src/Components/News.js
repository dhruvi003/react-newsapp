import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import propTypes from 'prop-types'
export default class News extends Component {

  static defaultProps={
    country:'us',
    pageSize:8,
    category:'general',
  };

  static propTypes = {
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string,

  }

  constructor() {

    super();
    console.log("Inside constructor from news compoent")
    // we need to set the state
    this.state = {
      articles: [], // we need to empty this so this can store data from fetched
      loading: false,// when page is loading, we wish to show some other data
      page:1,
    }
  }

  async componentDidMount(){
    console.log("Componentttt indeed mount")
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=13446c8bb7584240818497c079099c6b&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url)
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles : parsedData.articles,
      totalResults: parsedData.totalResults,
      loading:false // when it loads the result, set the loading to false
    })
  }

  handlePreviousClick= async ()=>{
    console.log('previous')
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=13446c8bb7584240818497c079099c6b&page=${
      this.state.page-1
      }&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url)
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      page: this.state.page - 1,
      articles : parsedData.articles,
      loading:false
    })
  }

  handleNextClick=async ()=>{
    console.log('next')

    if(!(this.state.page+1 > Math.ceil(this.state.totalResults/(this.props.pageSize)))){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=13446c8bb7584240818497c079099c6b&page=${
        this.state.page+1
        }&pageSize=${this.props.pageSize}`;
        this.setState({loading:true}); // when the executing of the above url occurs, the loading symbol will be shown as true

        let data = await fetch(url)
        let parsedData = await data.json();
        // this.setState({loading:false}); // after alll the loading is done, we've set it to false
        // console.log(parsedData);
    
        this.setState({
          page: this.state.page + 1,
          articles : parsedData.articles,
          loading:false
        });
    }
    
  }

  render() {
    console.log("inside render")
    return (
      <div className='container my-4'>
        <h1 className='text-center'>Daily Gossip - trending gossip</h1>
       {this.state.loading && <Spinner />}
        <div className='row'>
        {!this.state.loading && this.state.articles.map((element)=>{
          {/* console.log(element) */}

        return  <div className='col-md-4 d-flex mb-3' key={element.url}>
            <NewsItem
              
              title={element.title?element.title:""}
              description={element.description?element.description : ""}
              imageUrl={element.urlToImage}
              newsUrl={element.url}
              author = {element.author}
              date = {element.publishedAt}
              source ={element.source.id}

            />
          </div>

        })}
        </div>
        <div className='container d-flex justify-content-between my-4' >
        <button 
        disabled={this.state.page <= 1}
        type="button" 
        className="btn btn-secondary"
        onClick={this.handlePreviousClick}> 
        &larr; Previous
        </button>

        <button 

        type="button" 
        className="btn btn-secondary" 
        onClick={this.handleNextClick}>
        Next &#8594;
        </button>

        </div>
      </div>
    );
  }
}
