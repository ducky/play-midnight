import React, { Fragment } from 'react';

import { FootNote, List, ListItem, Text } from 'notifications/components';

export const DETAILS = {
  buttonText: 'Allons-y!',
};

export const Template = () => (
  <Fragment>
    <Text>Welcome to the all new Play Midnight!</Text>
    <Text>
      I took the old version of Play Midnight and threw it straight into the garbage where it belonged. I think you'll
      enjoy your stay here.
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
      <ListItem title="Themes">
        <Text nopad>
          You can now create a theme with a background color and accent to tweak the entire site to be your own personal
          playground! Not a fan of straight black? How about a nice cool blue, or even purple? This feature has been
          something I've wanted to do for a long time, but wasn't going to be very easy to implement in the older code.
          The feature you never knew you wanted is finally here!
        </Text>
        <Text nopad>
          <strong>Note</strong> - All your old accent colors have been converted to themes, so don't worry you haven't
          lost them. Your accent colors will show up at the top of the themes list, followed by the default themes. Feel
          free to delete any you don't like!
        </Text>
        <Text nopad>
          I really want to see what you guys come up with, so if you post theme combos on{' '}
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
          This is probably my second favorite part about the new setup (after those sick themes!). All changes you make
          in the options now take effect <em>instantly</em>. However, you'll still need to click <strong>save</strong>{' '}
          in order to persist them in Chrome.
        </Text>
        <Text nopad>
          The best part? No more page refreshes.{' '}
          <span role="img" aria-label="Pleased">
            😌
          </span>
        </Text>
        <Text nopad>
          <strong>Note</strong> - I'm aware of a small issue that exists when you disable/enable Play Midnight where the
          home screen stays dark/light. For now if you just switch to your library and back to home it should be okay.
        </Text>
      </ListItem>
      <ListItem title="Options Button">
        <Text nopad>One of the most jarring changes will probably be the new location of the settings.</Text>
        <Text nopad>
          You should now see a little settings cog right next to your queue/volume buttons on the player. There were
          some issues with the old floating button that were annoying to fix. Plus I feel like it fits it much better on
          the player.
        </Text>
      </ListItem>
      <ListItem title="Color Picker/Edit Colors">
        Yay! You can now finally use a color picker rather than just guessing with your sick HEX/RGB skills. You can
        also edit existing colors and their names! You can even duplicate an existing color to make minor changes, wow!
      </ListItem>
      <ListItem title="Removed Options">
        I did go ahead and remove some no longer relevant options, or ones that I felt didn't fit well with how Play
        Midnight was set up. If I removed something you absolutely loved, let me know and I'll see what I can do.
      </ListItem>
    </List>

    <FootNote />
  </Fragment>
);
