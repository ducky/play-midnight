import React from 'react';

import { getUrl } from '../../utils/api';

import PlayMidnightLogo from '../../assets/images/play-logo-dark.png';
import StyledOptions, { Backdrop } from './PlayMidnightOptions.styled';

const VERSION_NUMBER = '3.0.0';

const PlayMidnightOptions = ({
  visible,
  options,
  optionValues,
  onOptionChange,
  onClose
}) => {
  const handleBackgroundClick = e => {
    if (e.target === e.currentTarget) onClose();
  };

  return visible ? (
    <Backdrop onClick={handleBackgroundClick}>
      <StyledOptions>
        <header className="PlayMidnightOptions__header">
          <div className="image-header">
            <img
              className="pm-logo"
              alt="Play Midnight Logo"
              src={getUrl(PlayMidnightLogo)}
            />
          </div>
          <h1>
            Play Midnight <span>Options</span>
          </h1>
          <h6>
            v{VERSION_NUMBER} by{' '}
            <a
              href="https://christieman.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Chris Tieman
            </a>
          </h6>
        </header>

        <section className="PlayMidnightOptions__options">
          <div className="PlayMidnightOptions__options-container">
            {options.map(option => (
              <div key={option.key} className="Options__option">
                <h3>{option.title}</h3>
                <h4>{option.description}</h4>
                <div>
                  <input
                    type="checkbox"
                    checked={optionValues[option.key]}
                    onChange={onOptionChange(option.key)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="PlayMidnightOptions__options-save">
            Your options saved successfully! Reloading...
          </div>
        </section>

        <footer className="PlayMidnightOptions__footer">
          <paper-button
            className="material-primary"
            role="button"
            tabindex="0"
            no-focus=""
          >
            Save Options
          </paper-button>
        </footer>
      </StyledOptions>
    </Backdrop>
  ) : null;
};

export default PlayMidnightOptions;
