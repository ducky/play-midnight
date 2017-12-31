import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { getUrl } from 'lib/api';

import Button from 'components/Button';
import PlayMidnightLogo from 'assets/images/play-logo-dark.png';

import StyledOptions, { Backdrop } from './PlayMidnightOptions.styled';
import { OptionArray, OptionCheckbox, OptionString } from './Option';

const VERSION_NUMBER = '3.0.0';

const OPTION_TYPES = {
  array: OptionArray,
  boolean: OptionCheckbox,
  string: OptionString
};

const PlayMidnightOptions = ({
  visible,
  sections,
  onOptionChange,
  onArrayChange,
  onClose,
  onSave
}) => {
  const handleBackgroundClick = e => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <ReactCSSTransitionGroup
      transitionName="animate"
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}
    >
      {visible ? (
        <Backdrop onClick={handleBackgroundClick}>
          <StyledOptions>
            <header className="PlayMidnightOptions__header">
              <div className="image-header">
                <img
                  className="PlayMidnightOptions__header-logo"
                  alt="Play Midnight Logo"
                  src={getUrl(PlayMidnightLogo)}
                />
              </div>
              <div className="PlayMidnightOptions__header-title">
                Play Midnight <span>Options</span>
              </div>
              <div className="PlayMidnightOptions__header-version">
                v{VERSION_NUMBER} by{' '}
                <a
                  href="https://christieman.com/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Chris Tieman
                </a>
              </div>
            </header>

            <section className="PlayMidnightOptions__options">
              <div className="PlayMidnightOptions__options-container">
                {sections.map(({ id, title, options }) => (
                  <div key={id} className="PlayMidnightOptions__section">
                    {title && (
                      <div className="PlayMidnightOptions__section-title">
                        {title}
                      </div>
                    )}
                    <div className="PlayMidnightOptions__section-options">
                      {options.filter(option => !option.static).map(option => {
                        const Option = OPTION_TYPES[option.type];
                        return (
                          <Option
                            key={option.id}
                            onChange={onOptionChange}
                            onChangeValues={onArrayChange}
                            {...option}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="PlayMidnightOptions__options-save">
                Your options saved successfully! Reloading...
              </div>
            </section>

            <footer className="PlayMidnightOptions__footer">
              <Button onClick={onSave}>Save Options</Button>
            </footer>
          </StyledOptions>
        </Backdrop>
      ) : null}
    </ReactCSSTransitionGroup>
  );
};

export default PlayMidnightOptions;
