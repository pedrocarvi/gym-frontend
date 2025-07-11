import React, { useState, useEffect, useMemo } from 'react'
import SidebarMenu from '../../../Components/SidebarMenu/SidebarMenu'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './TurnosAdmin.css'
import LoaderFullScreen from '../../../Components/utils/LoaderFullScreen/LoaderFullScreen'
import { toast } from 'react-toastify'

moment.locale('es') 

const localizer = momentLocalizer(moment)
const CURRENT_YEAR = new Date().getFullYear()
const CURRENT_MONTH = moment().month()

const TurnosAdmin = () => {
  const [rawTurnos, setRawTurnos] = useState([])
  const [loading, setLoading] = useState(true)

  // filtros
  const [selectedMonth, setSelectedMonth] = useState(CURRENT_MONTH)
  const [selectedClass, setSelectedClass] = useState('')

  // modal
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const closeModal = () => { setIsModalOpen(false); setSelectedEvent(null) }

  useEffect(() => {
    fetch('https://gym-backend-rust.vercel.app/turnos')
      .then(res => {
        if (!res.ok) {
            toast.error("Hubo un error al traer los turnos. Intente nuevamente.")
        }
        return res.json()
      })
      .then(data => setRawTurnos(data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  // opciones de filtro
  const monthOptions = useMemo(() => {
    return Array.from(new Set(rawTurnos.map(t => moment(t.fecha).month())))
      .sort()
      .map(m => ({ value: m, label: moment().month(m).format('MMMM YYYY') }))
  }, [rawTurnos])

  const classOptions = useMemo(() => {
    return Array.from(
      new Set(rawTurnos.map(t => t.HorarioClase.Clase.nombre))
    ).sort()
  }, [rawTurnos])

  // construir eventos (solo filtro por clase)
  const events = useMemo(() => {
    const filtrados = rawTurnos.filter(t =>
      selectedClass === '' || t.HorarioClase.Clase.nombre === selectedClass
    )

    const grupos = filtrados.reduce((acc, t) => {
      const start = new Date(t.fecha)
      const key = `${start.toISOString()}__${t.HorarioClase.Clase.nombre}`

      if (!acc[key]) {
        acc[key] = {
          id: key,
          title: t.HorarioClase.Clase.nombre,
          start,
          end: new Date(start.getTime() + 60 * 60 * 1000),
          users: []
        }
      }
      acc[key].users.push(`${t.User.nombre} ${t.User.apellido}`)
      return acc
    }, {})

    return Object.values(grupos)
  }, [rawTurnos, selectedClass])

  const handleSelectEvent = ev => {
    setSelectedEvent(ev)
    setIsModalOpen(true)
  }

  // defaultDate: hoy si es el mes actual, o día 1 del mes seleccionado
  const initialDate =
    selectedMonth === CURRENT_MONTH
      ? new Date()
      : new Date(CURRENT_YEAR, selectedMonth, 1)

  return (
    <div className='page-layout turnos-admin'>
      <SidebarMenu isAdmin={true} />
      {loading && <LoaderFullScreen/>}
      <div className='content-layout'>
        <h2>Turnos – {moment().month(selectedMonth).format('MMMM YYYY')}</h2>

        <div className='filters'>
            <div className='filters-input-ctn'>
                <label>
                    Mes:{' '}
                </label>
                <select
                    value={selectedMonth}
                    onChange={e => setSelectedMonth(+e.target.value)}
                    >
                    {monthOptions.map(mo => (
                        <option key={mo.value} value={mo.value}>
                        {mo.label}
                        </option>
                    ))}
                    </select>
            </div>
            <div className="filters-input-ctn">
                <label>
                    Clase:{' '}
                </label>
                <select
                    value={selectedClass}
                    onChange={e => setSelectedClass(e.target.value)}
                    >
                    <option value=''>— Todas —</option>
                    {classOptions.map(cl => (
                        <option key={cl} value={cl}>
                        {cl}
                        </option>
                    ))}
                    </select>
            </div>

        </div>

        <Calendar
          key={selectedMonth}
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          views={['week']}
          step={60}
          timeslots={1}
          style={{ height: '75vh', margin: '24px 0' }}
          onSelectEvent={handleSelectEvent}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={initialDate}
          messages={{
            date: 'Fecha',
            time: 'Hora',
            event: 'Evento',
            allDay: 'Todo el día',
            week: 'Semana',
            day: 'Día',
            month: 'Mes',
            previous: 'Semana anterior',
            next: 'Semana siguiente',
            yesterday: 'Ayer',
            tomorrow: 'Mañana',
            today: 'Hoy',
            agenda: 'Agenda',
            noEventsInRange: 'No hay eventos en este rango.',
            showMore: total => `+ Ver más (${total})`,
          }}
        />
      </div>

      {/* Modal de reservas */}
      {isModalOpen && selectedEvent && (
        <div className="ta-modal" onClick={closeModal}>
          <div className="ta-modal-content" onClick={e => e.stopPropagation()}>
            <button className="ta-modal-close" onClick={closeModal}>×</button>
            <h4>Reservas para {selectedEvent.title}</h4>
            <ul>
              {selectedEvent.users.map((u, i) => (
                <li key={i}>{u}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default TurnosAdmin