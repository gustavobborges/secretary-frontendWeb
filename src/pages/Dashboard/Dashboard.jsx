import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import store from '../../store/store';
import * as S from './styles';

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import getAppointments from '../../services/appointments';
import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment) // or globalizeLocalizer

const PagesDashboard = () => {
  const dispatch = useDispatch();
  const _appointments = useSelector((state) => state.appointments);
  const [appointments, setAppointments] = useState(_appointments);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function _getAppointments() {
      const data = await(getAppointments());
      console.log(data);
      await setAppointments(data);
    }
    _getAppointments();
  }, []);

  useEffect(() => {
    console.log(`appointments ` + appointments)
    dispatch({ type: 'SET_APPOINTMENTS', payload: appointments });
  }, [appointments]);

  useEffect(() => {
    const array = [];
    Object.values(appointments).map((appointment) => {
      console.log(appointment)
      array.push({
        title: appointment.name,
        start: appointment.initialDate,
        end: appointment.finalDate,
        allDay: false, 
        resource: appointment.id
      });
    })
    setEvents(array);
  }, [appointments]);



  return (
    <S.Dashboard>
      <S.DashboardLeft className="col-lg-4 col-sm-12">
        <h1>ola</h1>
      </S.DashboardLeft>
      <S.DashboardRight className="col-lg-8 col-sm-12" >
      <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </S.DashboardRight>
    </S.Dashboard>
  );
}

export default PagesDashboard;