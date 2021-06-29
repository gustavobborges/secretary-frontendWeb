import React from 'react';
import { useParams } from 'react-router-dom';
import AppointmentForm from '../../components/Form/Form';
import './Form.css';

const PagesAppointmentForm = () => {
const {id} = useParams();
    return(
        <div>
            <AppointmentForm id={id ? id : null} />
        </div>
    )
}

export default PagesAppointmentForm;