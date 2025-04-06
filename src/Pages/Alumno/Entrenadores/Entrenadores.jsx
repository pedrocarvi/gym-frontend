import React, { useEffect, useState } from 'react';
import SidebarMenu from '../../../Components/SidebarMenu/SidebarMenu';
import apiService from '../../../services/apiService';
import '../../../App.css';
import './Entrenadores.css'; 
import LoaderFullScreen from '../../../Components/utils/LoaderFullScreen/LoaderFullScreen';

const Entrenadores = () => {
  const [entrenadores, setEntrenadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntrenadores = async () => {
      try {
        const data = await apiService.getEntrenadores();
        setEntrenadores(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEntrenadores();
  }, []);

  return (
    <div className="page-layout">
      {loading && <LoaderFullScreen/> }
      <SidebarMenu isAdmin={false} />
      
      <div className="content-layout">
        <h2>Entrenadores</h2>
        <p style={{paddingTop: '12px'}}>Conocé a nuestros instructores en Wembley</p>

        <div className="trainers-grid">
          {!loading && !error && entrenadores.map((trainer) => (
            <div className="trainer-card" key={trainer.ID_Usuario}>
              {/* Imagen fija, por ahora */}
              <img
                src="https://hips.hearstapps.com/hmg-prod/images/mh-trainer-2-1533576998.png"
                alt={`${trainer.nombre || ''} ${trainer.apellido || ''}`}
              />

            <p> 
                <strong> 
                    {trainer.nombre ? trainer.nombre : 'Nombre'}, {' '}
                    {/* {trainer.apellido ? trainer.apellido : 'Apellido'} , {' '}  */}
                </strong>
                <span className='profesion'>
                    {trainer.profesion ? trainer.profesion : 'Profesión'}                
                </span>
            </p>

              

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Entrenadores;
