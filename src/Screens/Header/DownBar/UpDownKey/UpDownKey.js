import React, { useState, useEffect } from 'react';
import './UpDownKey.scss';

export default function UpDownKey(params) {
  useEffect(() => {
    if (params.keyStatus === 'down') {
      document.querySelector('.arrow-icon').classList.add('open');
    } else {
      document.querySelector('.arrow-icon').classList.remove('open');
    }
  });

  return (
    <>
      {/* <div className="UpDownKey-div"> */}
      <a class="arrow-icon">
        <span class="left-bar"></span>
        <span class="right-bar"></span>
      </a>
      {/* </div> */}
    </>
  );
}
