import React, { Fragment } from 'react';

import ModalWrapper from './ModalWrapper';
import StyledNotification from './NotificationModal.styles';

import PlayMidnightLogo from 'assets/images/play-logo-dark.png';
import { getUrl } from 'lib/api';

const Title = ({ value, style }) => (
  <div className="Modal__title" style={style} dangerouslySetInnerHTML={{ __html: value }} />
);

const Text = ({ value, style }) => (
  <div className="Modal__text" style={style} dangerouslySetInnerHTML={{ __html: value }} />
);

const List = ({ title, value, style }) => {
  const Feature = ({ title, value, style }) => (
    <div className="Modal__release" style={style}>
      <div className="Modal__release-title" dangerouslySetInnerHTML={{ __html: title }} />
      <div className="Modal__release-text" dangerouslySetInnerHTML={{ __html: value }} />
    </div>
  );

  return (
    <div className="Modal__list" style={style}>
      <Title value={title} />
      {value.map((feature, i) => <Feature key={i} title={feature.title} value={feature.value} />)}
    </div>
  );
};

const TEMPLATES = {
  List,
  Title,
  Text,
};

const NotificationModal = ({ details, ...props }) => {
  const { buttonText, content } = details.notification;
  const title = (
    <Fragment>
      <div className="Modal__header-image">
        <img className="Modal__header-logo" alt="Play Midnight Logo" src={getUrl(PlayMidnightLogo)} />
      </div>
      <h2 className="Modal__header-title">
        Play Midnight <em>Material</em>
      </h2>
      <h6 className="Modal__header-version">
        {`v${details.version} by `}
        <a href="http://christieman.com/" target="_blank" rel="noopener noreferrer">
          Chris Tieman
        </a>
      </h6>
    </Fragment>
  );

  return (
    <StyledNotification>
      <ModalWrapper
        {...props}
        title={title}
        collapse
        useAccentButton
        footNote={`You won't see this notification again for v${details.version}`}
        closeText={buttonText || 'Awesome!'}
        cancelButton={false}
        locked
      >
        <div className="Modal__content-container">
          {content.map((item, i) => {
            const Template = TEMPLATES[item.type] || Text;
            return <Template key={i} {...item} />;
          })}
        </div>
        {/* {JSON.stringify(details, null, 2)} */}

        {/* <p>
            Hello friend! Thanks for taking a chance to check out Play Midnight! I just wanted to give you a quick
            overview of how to tweak Play Midnight to your liking and then I'll be out of your way.
          </p>

          <p>
            Play Midnight activates itself anytime you visit Google Play Music, so you won't have to mess with it too
            much. You'll be able to easily change things via the Play Midnight options. To access the options, look for
            this little guy on the bottom right hand corner:
          </p>

          <div className="Modal__section">
            <div className="featured-header">
              <h2>Features</h2>

              <p className="text-center">Here's a quick explanation of the options available to you.</p>
            </div>

            <div className="featured-content">
              <h3>Enable Play Midnight</h3>
              <p className="text-center">
                Allows you to temporarily enable/disable Play Midnight if you're not feeling it.
              </p>

              <h3>Enable Light-Mode Accents</h3>
              <p className="text-center">This enables you to keep your accent color while Play Midnight is disabled.</p>

              <h3>Accent Colors</h3>
              <p className="text-center">My favorite feature: custom accent colors to fit whatever mood you're in.</p>

              <h3>Play Midnight Favicon</h3>
              <p className="text-center">Modifies the Orange headphone favicon on your url tab to be dark.</p>

              <h3>Accent Favicon</h3>
              <p className="text-center">Update the headphones favicon to be the same as your chosen accent color.</p>

              <h3>Dark Top Bar</h3>
              <p className="text-center">
                By request I've added the ability to disable the accent color on the top search bar to allow you to keep
                it dark to match the rest of the theme.
              </p>

              <h3>Larger Queue</h3>
              <p className="text-center">
                This extends the now playing popup queue to be wider so your songs don't get cut off.
              </p>

              <h3>Visible Menus</h3>
              <p className="text-center">Allows you to customize which menus are shown on the right-side menu.</p>

              <h3>Visible Auto-Playlists</h3>
              <p className="text-center">
                Allows you to customize which auto-playlists are shown on the right-side menu.
              </p>

              <h3>Update Notifications</h3>
              <p className="text-center">Whether or not you want to see these popups with news about updates.</p>

              <h3>Verbose Mode</h3>
              <p className="text-center">
                The ability to see behind the scenes into my dev ramblings on your browser console
                (ctrl+shift+j/cmd+option+j)
              </p>
            </div>
          </div>

          <h2>Feedback</h2>

          <p>
            As always, I'm sure there will be bugs/issues. Please let me know, preferably via{' '}
            <a href="http://reddit.com/r/PlayMidnight" target="_blank" rel="noopener noreferrer">
              Reddit
            </a>, <a href="mailto:iam@christieman.com">email</a>, or{' '}
            <a
              href="https://chrome.google.com/webstore/detail/ljmjmhjkcgfmfdhgplikncgndbdeckci"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chrome Webstore
            </a>{' '}
            if you happen to encounter any. Screenshots are definitely the most helpful, or even css fixes if you're
            into that kind of thing. I'll get to these as quickly as I can.
          </p>

          <h2>Personal Message</h2>

          <p>
            If you'd like to help support this project in any way, please consider spreading the word via friends,{' '}
            <a href="http://reddit.com/r/PlayMidnight" target="_blank" rel="noopener noreferrer">
              Reddit
            </a>, or by buying me some much needed coffee via{' '}
            <a href="https://www.paypal.me/datducky" target="_blank" rel="noopener noreferrer">
              PayPal
            </a>{' '}
            or{' '}
            <a href="https://www.coinbase.com/christieman" target="_blank" rel="noopener noreferrer">
              Bitcoin
            </a>.
          </p>

          <p>
            Best,<br />Chris Tieman
          </p>

          <p className="text-center">
            <small>
              <em>You won't see this message again for this version (v{'VERSION HERE'})</em>
            </small>
          </p> */}
      </ModalWrapper>
    </StyledNotification>
  );
};

export default NotificationModal;
