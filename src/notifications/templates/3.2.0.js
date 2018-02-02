import React from 'react';
import styled from 'styled-components';

export const NOTIFICATION_TYPE = 'TOAST';

export const DETAILS = {
  title: 'Update v3.2.0',
};

const Wrapper = styled.div`
  h2 {
    font-size: 16px;
  }

  p {
    margin: 0 0 10px;
    font-size: 14px;
  }

  ul {
    margin: 0 0 10px;
    list-style-type: none;
    padding: 0;

    li {
      margin: 0 0 8px;
    }
  }
`;

export const Template = () => (
  <Wrapper>
    <p>
      Hello again! I decided to go the route of using notifications like this for smaller updates so it's not so{' '}
      <em>in your face</em>. However, I still wanted to make sure you'd be aware of newer features as they appear!
    </p>
    <h2>New Feature(s)</h2>
    <ul>
      <li>
        <strong>Album Accents</strong> - Changes your accent color based on the currently playing song! This color comes
        from the more vibrant colors in the album art, similar to Android Oreo. Props to /u/DankCool for the suggestion!{' '}
        <span role="img" aria-label="Sob">
          👍
        </span>
      </li>
      <li>
        <strong>Miscellaneous</strong> - Fixed some colors in the player; Fixed version number bug in Play Midnight
        Options; Some smaller optimizations.
      </li>
    </ul>
    <p>
      That's all for now! Sorry for the interruption!{' '}
      <span role="img" aria-label="Sob">
        😭
      </span>
    </p>
  </Wrapper>
);
