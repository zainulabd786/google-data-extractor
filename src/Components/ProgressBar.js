import React, { Component } from 'react';
import { ProgressBar } from 'react-fetch-progressbar';
import { progressBarFetch, setOriginalFetch } from 'react-fetch-progressbar';

// Let react-fetch-progressbar know what the original fetch is.
setOriginalFetch(window.fetch);

/*
  Now override the fetch with progressBarFetch, so the ProgressBar
  knows how many requests are currently active.
*/
window.fetch = progressBarFetch;

class Progress extends Component {
  render(){
    return(
      <div>
        <ProgressBar />
      </div>
    );
  }
}

export default Progress;
