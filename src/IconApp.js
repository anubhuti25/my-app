import React, { Component } from 'react';
import App from './App';
import icons from './icons';
import './IconApp.css';

const wordMap = icons.reduce(function(chain, i) {
  const parts = i.split('-');
  const key = parts[1];

  chain[key] = i;
  return chain;
}, {});

class IconApp extends Component {

  constructor() {
    // In a constructor, call `super` first if the class extends another class
    super();
    this.state = {
      colorIndices: [],
      text:[],
    };

    this.myFunction=this.myFunction.bind(this);
  }
  
  myFunction(val,i){
    const nextText=[...this.state.text];
    nextText[i]=val;
    this.setState({text:nextText});
  }
 
  componentWillReceiveProps(nextProps) {
    const nextWordCount = nextProps.text.split(' ').length;

    // If we pushed directly to the `this.state.colorIndicies` array, we'd be
    // updating state without using `.setState`! For this reason, we make a
    // shallow copy of the array, and push to that shallow copy.
    const nextColorIndices = [...this.state.colorIndices];

    // Assign random colors to new words
    while (nextColorIndices.length < nextWordCount) {
      var xr=Math.floor(Math.random() * 255).toString(16);
      var xb=Math.floor(Math.random() * 255).toString(16);
      var xg=Math.floor(Math.random() * 255).toString(16);
      nextColorIndices.push(xr+xb+xg);
    }

    // Now update state with our new array of color indices
    this.setState({ colorIndices: nextColorIndices });
    this.setState({text:''});
  }

  render() {
    const colorIndices = this.state.colorIndices;
    let words = this.props.text.split(' ')

    words = words.map(function(w, i) {
      w = w.replace(/\W/g, '').toLowerCase();
      const clicked=false;
      const colorIndex = colorIndices[i];
      const style = {
        color:'#'+colorIndex+'',
      };

     if(wordMap[w]&&this.state.text[i]==undefined) {
        // Found an icon! Return the icon instead of the word
          return (<i onClick={()=>this.myFunction(w,i)} style={style} key={i} id={i} className={'fa-stack fa ' + wordMap[w]}/>);
      }
      
      else {
        const x=w.replace(/s?$/, '');
        
        if(wordMap[x]&&this.state.text[i]==undefined)
        {
          return (<i onClick={()=>this.myFunction(x,i)} style={style} key={i} id={i} className={'fa-stack fa ' + wordMap[x]}/>);
        }
        
        else {
          // Didn't find an icon for this word. Just return the word.
          return (
            <span key={i}>{w}</span>
          );
        }
      }
    },this);

    return (
        <p>{words}</p>
    );
  }
}

export default IconApp;
