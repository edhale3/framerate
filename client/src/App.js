import React, { Component } from 'react';
import './App.css';
import Unsplash from 'unsplash-js';
import { render } from 'react-dom';
// import Data from "./Data"

const unsplash = new Unsplash({
  accessKey:"U2SE5vPtSLO0Mq163QBMM4t4GxahTwC99CzfvJLYavo",
  secret:"W765JFE2FA2r7RcEVnzqB0SNnUVsFo7SKU4rnInUExs",
  callbackUrl: "https://api.unsplash.com/"
})

// console.log(unsplash)


// function getPictures(){

// }


// function App(){
//   return (
//     <div>{getPictures()}</div>
//   )
// }


class App extends Component {
    constructor(){
      super()
      this.state = {
        loading: false,
        data:'',
        search: "model"
      }
      this.input = React.createRef();
      this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    componentDidMount(){
      // fetch("https://api.unsplash.com/search/photos?query=dogs&client_id=U2SE5vPtSLO0Mq163QBMM4t4GxahTwC99CzfvJLYavo")
      // .then(res=> res.json())
      // .then(res=> this.setState({data: res}))
      console.log("up here:", this.state)
      const posts = 1
      const pageNum = Math.floor(Math.random() * 100)
      const search = this.state.search
      const orientation = {orientation: "landscape"}
      
      unsplash.search.photos(search , pageNum , posts , orientation)
        .then(res => res.json())
        .then(json => {
          console.log("json:", json)
          this.setState({
          data:json
          })
        })
        .catch(err => console.log(err))
    }

    getPictures(){
      const data = this.state.data.results
      if(typeof data !== "undefined"){
        const newData = data.map((pic)=>{
          document.querySelector("body").style.backgroundImage = `url(${pic.urls.full})`
          return (
            <div className="artistDiv">
              <div>{`Photographer: ${pic.user.first_name} ${pic.user.last_name}`}</div>
              <div>{`Instagram: ${pic.user.instagram_username}`}</div>
            </div>
          ) 
        })
        return newData } else return null
    }

    handleSubmit(event){
      event.preventDefault()
      console.log(this.input.current.value)
      this.setState({
        search:`${this.input.current.value}`
      })
      return true
      // setTimeout(()=> this.componentDidMount(), 1000)
    }

    render(){
      return (
        <div>
          {this.getPictures()}
          <form onSubmit={this.handleSubmit}>
            <label>
              Search:
              <input type="text" ref={this.input} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      )
    }
}



export default App;
