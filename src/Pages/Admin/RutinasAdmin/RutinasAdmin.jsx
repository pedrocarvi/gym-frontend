import React, { useEffect, useState } from 'react';
import '../../../App.css';
import './RutinasAdmin.css';
import SidebarMenu from '../../../Components/SidebarMenu/SidebarMenu.jsx';
import PrimaryButton from '../../../Components/utils/PrimaryButton/PrimaryButton.jsx';
import apiService from '../../../services/apiService.js';
import LoaderFullScreen from '../../../Components/utils/LoaderFullScreen/LoaderFullScreen.jsx';
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/trash.svg';
import { useNavigate } from 'react-router-dom';


const RutinasAdmin = () => {
  const [rutinas, setRutinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    let userId = localStorage.getItem("usuarioId")
    const fetchRutinas = async () => {
      try {
        const data = await apiService.getUserRutinas(userId);
        setRutinas(data.rutinas);
      } catch (error) {
        console.error("Error al obtener rutinas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRutinas();
  }, []);

  const deleteRutina = async (idRutina) => {
    try {
      await apiService.deleteRutina(idRutina);
      console.log("Rutina " + idRutina + " eliminada correctamente");
      setRutinas((prevRutinas) =>
        prevRutinas.filter((rutina) => rutina.ID_Rutina !== idRutina)
      );
    } catch (error) {
      console.error("Error al eliminar rutina", error);
    }
  };

  return (
    <div className='page-layout'>
      {loading && <LoaderFullScreen />}
      <SidebarMenu isAdmin={true} />
      <div className='content-layout mi-rutina-ctn'>
        <div className="mi-rutina-title">
          <div>
            <h2>Mi Rutina</h2>
            {/* <p>Creá tu rutina semanal y consultá la de tu clase o la asignada por tu entrenador personal.</p> */}
          </div>
          <PrimaryButton text="Crear rutina" linkTo="/admin/crear-rutina" />
        </div>

        <div className="mis-rutinas-list">
          {rutinas.length === 0 ? (
            <p>No hay rutinas cargadas</p>
          ) : (
            rutinas.map((rutina) => (
              <div key={rutina.ID_Rutina} className="rutina-card">
                <div className='rutina-header'>
                  <h3>{rutina.nombre}</h3>
                  <div className="rutina-header-acciones">
                    <button onClick={() => deleteRutina(rutina.ID_Rutina)} className='mi-rutina-eliminar-btn'>
                      <DeleteIcon width={20} height={20} />
                    </button>
                    <button
                      onClick={() => navigate(`/admin/editar-rutina/${rutina.ID_Rutina}`)}
                      className='mi-rutina-eliminar-btn'
                      title='Editar rutina'
                    >
                      <EditIcon width={20} height={20} />
                    </button>
                  </div>
                </div>

                <div className="rutina-data">
                  {/* Aca deberia ir categoria y duración también */}
                  <p> Día de la semana: {rutina.dayOfWeek}</p>
                </div>

                {/* Mostrar bloques de cada rutina */}
                {rutina.Bloques && rutina.Bloques.length > 0 && (
                  <div className="bloques-list">
                    {rutina.Bloques.map((bloque) => (
                      <div key={bloque.ID_Bloque} className="bloque-card">
                        {/* SETS & REPS */}
                        {bloque.type === 'SETS_REPS' && (
                          <div>
                            <p>
                              {`${bloque.setsReps} ${bloque.nombreEj} ${bloque.weight || ''}`.trim()}
                            </p>
                            {/* <ul style={{ paddingLeft: '20px' }}> */}
                            {bloque.ejercicios.map((ej) => (
                              <p key={ej.ID_Ejercicio}>
                                {`${ej.reps} ${ej.setRepWeight}`}
                              </p>
                            ))}
                            {/* </ul> */}
                          </div>
                        )}

                        {/* ROUNDS */}
                        {bloque.type === 'ROUNDS' && (
                          <>
                            <p>{`${bloque.cantRondas} rondas de:`}</p>
                            <ul style={{ paddingLeft: '20px' }}>
                              {bloque.ejercicios.map((ej) => (
                                <li key={ej.ID_Ejercicio}>
                                  {`${ej.reps} ${ej.setRepWeight}`}
                                </li>
                              ))}
                            </ul>
                            {bloque.descansoRonda != null && (
                              <p>{`con ${bloque.descansoRonda} segs de descanso`}</p>
                            )}
                          </>
                        )}

                        {/* AMRAP */}
                        {bloque.type === 'AMRAP' && (
                          <>
                            <p>{`AMRAP ${bloque.durationMin}min:`}</p>
                            <ul style={{ paddingLeft: '20px' }}>
                              {bloque.ejercicios.map((ej) => (
                                <li key={ej.ID_Ejercicio}>
                                  {`${ej.reps} ${ej.setRepWeight}`}
                                </li>
                              ))}
                            </ul>
                          </>
                        )}

                        {/* EMOM */}
                        {bloque.type === 'EMOM' && (
                          <>
                            <p>{`EMOM ${bloque.durationMin}min:`}</p>
                            <ul style={{ paddingLeft: '20px' }}>
                              {bloque.ejercicios.map((ej, idx) => (
                                <li key={ej.ID_Ejercicio}>
                                  {`0-${idx}: ${ej.reps} ${ej.setRepWeight}`}
                                </li>
                              ))}
                            </ul>
                          </>
                        )}

                        {/* LADDER */}
                        {bloque.type === 'LADDER' && (
                          <>
                            <p>{bloque.tipoEscalera}</p>
                            <ul style={{ paddingLeft: '20px' }}>
                              {bloque.ejercicios.map((ej) => (
                                <li key={ej.ID_Ejercicio}>{ej.setRepWeight}</li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RutinasAdmin;