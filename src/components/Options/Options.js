import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { getUrl } from 'lib/api';

import { stripTransition, TRANSITION_FAST } from 'style/theme';
import Button from 'components/Button';
import PlayMidnightLogo from 'assets/images/play-logo-dark.png';

import StyledOptions, { Backdrop } from './Options.styled';
import { OptionArray, OptionCheckbox, OptionString, OptionThemes } from './Option';
import Section from './Section';

const VERSION_NUMBER = '3.0.0';

const OPTION_TYPES = {
  array: OptionArray,
  boolean: OptionCheckbox,
  string: OptionString,
  themes: OptionThemes,
};

const Options = ({ theme, visible, sections, onArrayChange, onOptionChange, onTargetedChange, onClose, onSave }) => {
  const handleBackgroundClick = e => {
    if (e.target === e.currentTarget) onClose();
  };

  const renderSections = sections =>
    sections.map(({ id, title, options }) => {
      return options.length > 0 ? (
        <Section key={id} title={title}>
          {options.map(option => {
            const Option = OPTION_TYPES[option.type];
            return (
              <Option
                key={option.id}
                theme={theme}
                options={options}
                reliesOn={option.reliesOn}
                onChange={onOptionChange}
                onChangeValues={onArrayChange}
                onTargetedChange={onTargetedChange}
                {...option}
              />
            );
          })}
        </Section>
      ) : null;
    });

  return (
    <ReactCSSTransitionGroup
      transitionName="animate"
      transitionEnterTimeout={stripTransition(TRANSITION_FAST)}
      transitionLeaveTimeout={stripTransition(TRANSITION_FAST)}
    >
      {visible ? (
        <Backdrop onClick={handleBackgroundClick}>
          <StyledOptions transitionEnter={TRANSITION_FAST} transitionLeave={TRANSITION_FAST} theme={theme}>
            <header className="Options__header">
              <div className="image-header">
                <img className="Options__header-logo" alt="Play Midnight Logo" src={getUrl(PlayMidnightLogo)} />
              </div>
              <div className="Options__header-title">
                Play Midnight <span>Options</span>
              </div>
              <div className="Options__header-version">
                v{VERSION_NUMBER} by{' '}
                <a href="https://christieman.com/" rel="noopener noreferrer" target="_blank">
                  Chris Tieman
                </a>
              </div>
            </header>

            <section className="Options__options">
              <div className="Options__options-container">
                {renderSections(sections)}
                <Section title="Message From The Developer" closed>
                  <OptionString>
                    <p style={{ fontSize: 14 }}>
                      Why hello! Just wanted to take another minute to thank all of you for checking out Play Midnight.
                      This project has been something that has grown with me over time and I can't begin to express how
                      much I've enjoyed hearing from all of you. There have been and will be bugs, and I appreciate that
                      you guys have been kind enough not to tear me apart while I fix them. I've poured as much of
                      myself into this as I can and I hope that you enjoy it as much as I do. :)
                    </p>
                    <p style={{ fontSize: 14 }}>
                      Again, if you notice any issues, or have any suggestions don't hesitate to shoot that over to me.
                      The best place to reach me is through the subreddit at{' '}
                      <a
                        style={{ color: theme.A50 }}
                        target="_blank"
                        rel="noopener noreferrer"
                        href="http://reddit.com/r/PlayMidnight"
                      >
                        /r/PlayMidnight
                      </a>{' '}
                      or through{' '}
                      <a
                        style={{ color: theme.A50 }}
                        target="_blank"
                        rel="noopener noreferrer"
                        href="mailto:iam@christieman.com"
                      >
                        email
                      </a>. If you'd like to shoot me a donation or buy me some coffee, you can do so via{' '}
                      <a
                        style={{ color: theme.A50 }}
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.paypal.me/datducky"
                      >
                        PayPal
                      </a>{' '}
                      or swing by my{' '}
                      <a
                        style={{ color: theme.A50 }}
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.etsy.com/shop/QuackingtonInc"
                      >
                        Etsy
                      </a>{' '}
                      shop. Once again, thanks again for all the feedback and I hope you enjoy Play Midnight, peace!
                    </p>
                  </OptionString>
                </Section>
              </div>
            </section>

            <footer className="Options__footer">
              <Button onClick={onSave}>Save Options</Button>
            </footer>
          </StyledOptions>
        </Backdrop>
      ) : null}
    </ReactCSSTransitionGroup>
  );
};

export default Options;
