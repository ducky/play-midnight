import React from 'react';
import styled from 'styled-components';

export const NOTIFICATION_TYPE = 'TOAST';

export const DETAILS = {
  title: 'Update v3.2.1',
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
    <p>Hello! Just a tiny little update these days.</p>
    <ul>
      <li>
        <strong>New Logo</strong> - Our friends over at Google weren't too keen on me making a black version of the
        Google Play logo (as one would expect), so Play Midnight now has a new logo designed by my{' '}
        <a href="http://tiahapner.com/" rel="noopener noreferrer" target="_blank">
          lovely girlfriend
        </a>.
      </li>
      <li>
        <strong>I'm Feeling Lucky Loader</strong> - Looks like I missed one of the loading modals, so this should be all
        fixed up now. Thanks for looking out /u/Digger412!
      </li>
      <li>
        <strong>Keyboard Shortcuts Dialog</strong> - Some things changed on Google's end, so the keyboard shortcuts (?
        on Keyboard) were somewhat hard to read. These should be all fixed up now. Thanks /u/NIGHTFIRE777!
      </li>
    </ul>
    <p>That's all for now! Have a swell day (or evening)!</p>
  </Wrapper>
);
