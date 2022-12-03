import React from 'react';
import Button from '@mui/material/Button';
import "../styles/components/ActionButton.css"

const ActionButton = (props) => {
  const { colour, text, onClick } = props;
  return (
    <Button
      variant="contained"
      color={colour || 'primary'}
      onClick={onClick}
      className="button"
    >
      { text }
    </Button>
  )
}

export default ActionButton;