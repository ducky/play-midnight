import React, { Fragment } from 'react';

import { Text, Title } from 'notifications/components';

const FootNote = () => (
  <Fragment>
    <Title>Feedback</Title>

    <Text>
      As always, I'm sure there will be bugs/issues. Please let me know, preferably via{' '}
      <a href="http://reddit.com/r/PlayMidnight" target="_blank" rel="noopener noreferrer">
        Reddit
      </a>,{' '}
      <a href="mailto:iam@christieman.com" target="_blank" rel="noopener noreferrer">
        email
      </a>, or{' '}
      <a
        href="https://chrome.google.com/webstore/detail/ljmjmhjkcgfmfdhgplikncgndbdeckci"
        target="_blank"
        rel="noopener noreferrer"
      >
        Chrome Webstore
      </a>{' '}
      if you happen to encounter any. Screenshots are definitely the most helpful, or even submitting a Pull Request on{' '}
      <a href="https://github.com/chrisxclash/play-midnight" target="_blank" rel="noopener noreferrer">
        Github
      </a>{' '}
      if you're into that kind of thing. I'll get to these as quickly as I can.
    </Text>

    <Title>Personal Message</Title>

    <Text>
      If you'd like to help support this project in any way, please consider spreading the word via friends,{' '}
      <a href="http://reddit.com/r/PlayMidnight" target="_blank" rel="noopener noreferrer">
        Reddit
      </a>, buying me some much needed coffee via{' '}
      <a href="https://www.paypal.me/datducky" target="_blank" rel="noopener noreferrer">
        PayPal
      </a>, or checking out my work on{' '}
      <a href="https://www.etsy.com/shop/QuackingtonInc" target="_blank" rel="noopener noreferrer">
        Etsy
      </a>.
    </Text>

    <Text>
      Best,<br />🐤 Ducky (Chris Tieman)
    </Text>
  </Fragment>
);

export default FootNote;
