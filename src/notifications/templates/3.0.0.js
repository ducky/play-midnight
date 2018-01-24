const Notification = {
  buttonText: 'Allons-y!',
  content: [
    {
      type: 'Text',
      value: `Welcome to the all new Play Midnight! I took the old version 
  of Play Midnight and threw it straight into the garbage where it belonged.`,
    },
    {
      type: 'Text',
      value: `For those that
  are into development, I rewrote the entire extension from the ground up with React which made
  life so much easier on my end. For those that don't know what React is, check it out. Or if you don't care, 
  meh.`,
    },
    {
      type: 'Text',
      value: `<strong>TLDR;</strong> Updates on my end are much, much easier to maintain.`,
    },
    {
      type: 'List',
      title: 'Changelog',
      value: [
        {
          title: 'Brand New Source',
          value: `So far in my testing everything has been running much smoother, but please let me know if you encounter any issues.`,
        },
        {
          title: 'Instant Updates',
          value: `This is probably my favorite part about the new setup. All changes you make in the options now take effect <em>instantly</em>. However, you'll still need to click <strong>save</strong> in order to persist them in Chrome. <br/> The best part? No more page refreshes. 😌`,
        },
        {
          title: 'Options Button',
          value: `One of the most jarring changes will probably be the new location of the settings. <br/> You should now see a little settings cog right next to your queue/volume buttons.`,
        },
        {
          title: 'Color Picker/Edit Colors',
          value: `Yay! You can now finally use a color picker rather than just guessing with your sick HEX/RGB skills. You can also edit existing colors and their names!`,
        },
        {
          title: 'Removed Options',
          value: `I did go ahead and remove some no longer relevant options, or ones that I felt didn't fit well with how Play Midnight was set up. If I removed something you absolutely loved, let me know and I'll see what I can do.`,
        },
      ],
    },
    { type: 'Title', value: 'You da bomb squiggidy' },
    { type: 'Text', value: 'Testing Things' },
  ],
};

export default Notification;
