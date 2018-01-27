import React, { Fragment } from 'react';

import { FootNote, List, ListItem, Text } from 'notifications/components';

export const DETAILS = {
  buttonText: 'Allons-y!',
};

export const Template = () => (
  <Fragment>
    <Text>
      Welcome to the all new Play Midnight! I took the old version of Play Midnight and threw it straight into the
      garbage where it belonged. I'm so happy to be done with my past self's codebase.
    </Text>
    <Text>
      For those that are interested in development, I rewrote the entire extension from the ground up with React which
      made life so much easier on my end. For those that don't know what React is, you should{' '}
      <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
        check it out
      </a>. Or if you don't care, meh.
    </Text>
    <Text>
      <strong>TLDR;</strong> Updates on my end are much, much easier to maintain.
    </Text>
    <List title="Changelog">
      <ListItem title="Brand New Source">
        Basically everything is brand spanking new and was rewritten from the ground up. So far in my testing everything
        has been running much smoother, but please let me know if you encounter any issues.
      </ListItem>
      <ListItem title="Background Colors">
        <Text nopad>
          You can now set a background color to change the entire site to be your own color! Not a fan of straight
          black? How about a nice cool blue, or even purple? This feature has been something I've wanted to do for a
          long time, but wasn't going to be very easy to implement in the older code. The feature you never knew you
          wanted is finally here!
        </Text>
        <Text nopad>
          I really want to see what you guys come up with, so if you post backgrounds/accent combos on{' '}
          <a href="http://reddit.com/r/PlayMidnight" target="_blank" rel="noopener noreferrer">
            Reddit
          </a>{' '}
          or{' '}
          <a href="mailto:iam@christieman.com" target="_blank" rel="noopener noreferrer">
            email
          </a>{' '}
          me about them, I can totally add them as future defaults. Show me what chu got!
        </Text>
      </ListItem>
      <ListItem title="Instant Updates">
        <Text nopad>
          This is probably my second favorite part about the new setup (after those sick backgrounds!). All changes you
          make in the options now take effect <em>instantly</em>. However, you'll still need to click{' '}
          <strong>save</strong> in order to persist them in Chrome.
        </Text>
        <Text nopad>
          The best part? No more page refreshes.{' '}
          <span role="img" aria-label="Pleased">
            😌
          </span>
        </Text>
      </ListItem>
      <ListItem title="Options Button">
        <Text nopad>One of the most jarring changes will probably be the new location of the settings.</Text>
        <Text nopad>
          You should now see a little settings cog right next to your queue/volume buttons on the player.
        </Text>
      </ListItem>
      <ListItem title="Color Picker/Edit Colors">
        Yay! You can now finally use a color picker rather than just guessing with your sick HEX/RGB skills. You can
        also edit existing colors and their names! You can also duplicate an existing color to make minor changes, wow!
      </ListItem>
      <ListItem title="Removed Options">
        I did go ahead and remove some no longer relevant options, or ones that I felt didn't fit well with how Play
        Midnight was set up. If I removed something you absolutely loved, let me know and I'll see what I can do.
      </ListItem>
    </List>

    <FootNote />
  </Fragment>
);
