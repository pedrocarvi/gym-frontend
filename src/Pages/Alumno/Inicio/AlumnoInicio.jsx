import React from 'react';
import '../../../App.css';
import SidebarMenu from '../../../Components/SidebarMenu/SidebarMenu';

const AlumnoInicio = () => {
    return(
        <div className='page-layout'>
            <SidebarMenu isAdmin={false}/>
            <div className='content-layout'>
                <h2> Alumno</h2>
            </div>            
        </div>
    );
}

export default AlumnoInicio;