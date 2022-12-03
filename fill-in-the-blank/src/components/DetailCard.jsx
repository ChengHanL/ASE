import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import "../styles/components/DetailCard.css"

const DetailCard = (props) => {
  const { text, heading } = props
  return (
    <Card sx={{ width: '30%', margin: '10px' }}>
      <CardContent className='card-content'>
        <p style={{ fontSize: 30, margin: 0, fontWeight: 'bold'}}>{text}</p>
        <p style={{ fontSize: 18, margin: 0}}>{heading}</p>
      </CardContent>
    </Card>
  );
}

export default DetailCard;