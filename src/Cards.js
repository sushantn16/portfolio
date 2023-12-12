import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Cards = (props) => {
    return (
        <Card key={props.item.id} variant="outlined" className='m-3' sx={{ backgroundColor: '#000', color: '#fff', borderColor: '#fff' }}>
            <CardContent>
                {props.item.organisation && <Typography sx={{ fontSize: 14, color: '#fff' }} color="text.primary" gutterBottom>
                    {props.item.organisation}
                </Typography>}
                {props.item.name && <Typography variant="h5" component="div" sx={{ color: '#fff' }}>
                    {props.item.name}
                </Typography>}
                {props.item.country && <Typography sx={{ mb: 1.5, color: '#fff' }} color="text.primary">
                    {props.item.country}
                </Typography>}
                {props.item.description && <Typography variant="body2">
                    {props.item.description}
                </Typography>}
            </CardContent>
        </Card>
    )
}
export default Cards;