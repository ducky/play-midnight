import React, { Fragment } from 'react';
import styled from 'styled-components';

import withTheme from 'hoc/withTheme';

import { TRANSITION_FAST } from 'style/theme';

import { FootNote, List, ListItem, Text } from 'notifications/components';
import IconGear from 'components/Icons/IconGear';

const FAB = withTheme(styled.div`
  display: inline-flex;
  cursor: pointer;
  opacity: 0.9;
  color: ${props => props.theme.font_primary};
  transition: color ${TRANSITION_FAST}, opacity ${TRANSITION_FAST}, transform ${TRANSITION_FAST};

  &:hover {
    opacity: 1;
    transform: scale3d(1.1, 1.1, 1.1);
  }

  &:active,
  &:focus {
    opacity: 0.8;
    transform: scale3d(0.95, 0.95, 0.95);
  }
`);

export const NOTIFICATION_TYPE = 'MODAL';

export const DETAILS = {
  buttonText: 'Cool Beans!',
};

export const Template = () => (
  <Fragment>
    <Text>
      Hello, friend. I really appreciate you taking the time to check out Play Midnight. This has been an ongoing
      project for me for the last few years and it holds a dear place in my heart. I hope it makes your day slightly
      better, or at least saves your eyes some straining.
    </Text>
    <Text>
      I just wanted to give you a quick overview of how to tweak Play Midnight to your liking and then I'll be out of
      your way, since I know these interruptions are terrible.
    </Text>
    <Text>
      Play Midnight activates itself automatically when you visit Google Play Music, so you won't have to mess with it
      too much. You'll also be able to easily change things via the Play Midnight options. To access the options, look
      for this little guy on the right side of your player bar (near the volume and queue buttons):
    </Text>
    <Text style={{ margin: '30px 0', textAlign: 'center' }}>
      <div>
        <FAB>
          <IconGear />
        </FAB>
      </div>
      <small>(Go ahead, you can play with it. It's pretty fun.)</small>
    </Text>
    <Text>
      This little guy will live in his own little world in the bottom right corner of your screen to give you easy
      access to all the customizations you'd like to make to Play Midnight.
    </Text>
    <List title="Available Features">
      <ListItem title="Enable Play Midnight">
        <Text nopad>Allows you to temporarily enable/disable Play Midnight if you're not feeling it.</Text>
        <Text nopad>
          <strong>Note</strong> - I'm aware of a small issue that exists when you disable/enable Play Midnight where the
          home screen stays dark/light. For now if you just switch to your library and back to home it should be okay.
        </Text>
      </ListItem>

      <ListItem title="Enable Light-Mode Accents">
        This enables you to keep your accent color while Play Midnight is disabled.
      </ListItem>

      <ListItem title="Themes">
        Customize the look and feel of Play Music to look exactly how you want. Allows you to update background and
        accent colors.
      </ListItem>

      <ListItem title="Play Midnight Favicon">
        Modifies the Orange headphone favicon on your url tab to be dark.
      </ListItem>

      <ListItem title="Accent Favicon">
        Update the headphones favicon to be the same as your chosen accent color.
      </ListItem>

      <ListItem title="Larger Queue">
        This extends the now playing popup queue to be wider so your songs don't get cut off.
      </ListItem>

      <ListItem title="Larger Song Table">
        Makes the song table rows and text much larger if you prefer it to be less cramped.
      </ListItem>

      <ListItem title="Static Playlists">
        Allows you to lock the playlists sidebar to the right side of the screen.
      </ListItem>

      <ListItem title="Larger Queue">
        <Text nopad>Allows you to lock the main left sidebar to the left side of the screen.</Text>
        <Text nopad>
          <strong>Note</strong> - Using both static options together can cause some bugginess with the content since
          Google has set widths on a few things. I'd stick to one or the other unless you have a huge screen.
        </Text>
      </ListItem>

      <ListItem title="Visible Menus">Allows you to customize which menus are shown on the left-side menu.</ListItem>

      <ListItem title="Visible Auto-Playlists">
        Allows you to customize which auto-playlists are shown on the right-side menu.
      </ListItem>
    </List>

    <FootNote />
  </Fragment>
);
