import PropTypes from 'prop-types';
import noop from 'lodash/noop';

export const propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      action: PropTypes.func.isRequired,
      text: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ),
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element, PropTypes.string]).isRequired,
  collapse: PropTypes.bool,
  cancelText: PropTypes.string,
  closeText: PropTypes.string,
  cancelButton: PropTypes.bool,
  closeButton: PropTypes.bool,
  footNote: PropTypes.string,
  locked: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  type: PropTypes.string,
  width: PropTypes.number,
  valid: PropTypes.bool,
  edited: PropTypes.bool,

  // Methods
  close: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onClose: PropTypes.func,
};

export const defaultProps = {
  buttons: [],
  cancelText: 'Cancel',
  closeText: 'OK',
  collapse: false,
  cancelButton: true,
  closeButton: true,
  locked: false,
  title: '',
  type: '',
  useCloseAction: false,
  useCancelAction: false,
  valid: true,
  edited: false,

  // Methods
  close: noop,
  showModal: noop,
  onCancel: noop,
  onClose: noop,
};
