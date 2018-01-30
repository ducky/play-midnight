import React, { Fragment } from 'react';

import { FootNote, List, ListItem, Text } from 'notifications/components';

export const DETAILS = {
  buttonText: 'Onward Friend!',
};

export const Template = () => (
  <Fragment>
    <Text>
      <strong>You spoke, I listened!</strong>
    </Text>
    <Text>
      Firstly, I just want to say thanks to all the people that contacted me with kind words about the new version. I've
      really enjoyed hearing your thoughts/suggestions! Keep them coming. :)
    </Text>
    <Text>
      I took your guys feedback about some of the removed options and went ahead and reimplemented them. Also cleaned up
      my codebase and fixed up a few bugs while I was at it.
    </Text>
    <Text>
      <strong>TLDR;</strong> Thanks for the feedback! Here's some updates:
    </Text>
    <List title="Changelog">
      <ListItem title="Cooperating Websites">
        In case anyone saw this new permission request in Chrome, it's because I added a property that was listing Play
        Music as an allowed url for offloading the accented favicon to a background page. After toying with it, I now
        realize I didn't actually need this option and was able to remove it. Sorry if I spooked anyone in the process.
        You can read more about why I added it{' '}
        <a
          href="https://www.reddit.com/r/PlayMidnight/comments/7tr0tv/update_v300_whooo_brand_new_version_of_play/"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>.
      </ListItem>
      <ListItem title="Static Playlists">
        <Text nopad>
          After multiple requests I've now added this option back. It allows you to keep the right playlists sidebar
          open permanently.
        </Text>
      </ListItem>
      <ListItem title="Static Sidebar">
        <Text nopad>As with Static Playlists, this allows you to keep the main left sidebar open permanently.</Text>
        <Text nopad>
          <strong>Note</strong> - Using both static options together can cause some bugginess with the content since
          Google has set widths on a few things. I'd stick to one or the other unless you have a huge screen.
        </Text>
      </ListItem>
      <ListItem title="Large Song Table">
        <Text nopad>
          Another requested feature to bring back is the "Larger Song Table". Tables are much larger (height and
          text-wise) if you prefer a more spacious option.
        </Text>
      </ListItem>
      <ListItem title="Theme Modal">
        <Text nopad>
          I made a minor change to the theme editor to show actual buttons/sliders to give you a more accurate
          representation of what a theme will look like.
        </Text>
      </ListItem>
      <ListItem title="Style/Code Tweaks">
        <Text nopad>
          - Fixed up a styling issue on the browse stations section<br />
          - Cleaned up some of my codebase
        </Text>
      </ListItem>
    </List>

    <FootNote />
  </Fragment>
);
