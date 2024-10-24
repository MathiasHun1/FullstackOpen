import { useState, forwardRef, useImperativeHandle } from 'react';
import Button from './Button';
import PropTypes from 'prop-types';

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : 'block' };
  const showWhenVisible = { display: visible ? 'block' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <span style={hideWhenVisible}>
        <Button onClick={toggleVisibility} text={props.buttonLabel} />
      </span>

      <span style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility} text="cancel" />
      </span>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
