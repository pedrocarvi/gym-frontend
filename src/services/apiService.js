import apiClient from '../axiosConfig';

// Clases
const getClases = async () => {
    try {
        const response = await apiClient.get(`/clase/horario`);
        return response.data;
    } catch (err) {
        throw new Error("Error al cargar las clases. Intente nuevamente.");
    }
};

// Turnos
const getTurnos = async () => {
    try {
        const response = await apiClient.get(`/turnos`);
        return response.data;
    } catch (error) {
        throw new Error("Error en el service de getTurnos")
    }
}

const getTurnosUsuario = async (usuarioId) => {
    try {
        const response = await apiClient.get(`/turnos/usuario/${usuarioId}`)
        return response.data.turnos;
    } catch (error) {
        throw new Error("Error en el service de getTurnosUsuario");
    }
}

const getTurnoById = async (id) => {
    try {
        const response = await apiClient.get(`/turnos/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("Error en el service de getTurnosByUsuario")
    }
}
// services/apiService.js
const postTurno = async (body) => {
    try {
        const response = await apiClient.post("/turnos", body);
        return response.data;
    } catch (error) {
        const apiMsg = error.response?.data?.message;
        throw new Error(apiMsg || error.message);
    }
};


const deleteTurno = async (id) => {
    try {
        const response = await apiClient.delete(`/turnos/${id}`);
        return response.data
    } catch (error) {
        throw new Error("Error en el service de deleteTurno")
    }
}

// Rutinas
const getRutinas = async () => {
    try {
        const response = await apiClient.get("/rutinas");
        return response.data
    } catch (error) {
        throw new Error("Error en el service de getRutinas");
    }
}

const getRutinaById = async (rutinaId) => {
    try {
        const response = await apiClient.get(`/rutinas/${rutinaId}`);
        return response.data.rutina;
    } catch (error) {
        throw new Error("Error en el service de getRutinas");
    }
}

const getUserRutinas = async (id) => {
    try {
        const response = await apiClient.get(`/rutinas/usuario/${id}`);
        return response.data
    } catch (error) {
        throw new Error("Error en el service de getRutinas");
    }
}

const createRutina = async (data) => {
    try {
        const response = await apiClient.post("/rutinas", data);
        return response.data;
    } catch (error) {
        throw new Error("Error al crear la rutina");
    }
};

const editRutina = async (idRutina, data) => {
    try {
        const response = await apiClient.put(`/rutinas/${idRutina}`, data);
        return response.data
    } catch (error) {
        throw new Error("Error en el service de getRutinas");
    }
}

const deleteRutina = async (id) => {
    try {
        const response = await apiClient.delete(`/rutinas/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("Error al eliminar la rutina");
    }
}

const getRutinasEntrenadores = async (idEntrenador) => {
    try {
        const response = await apiClient.get(`/rutinas/entrenador/${idEntrenador}`)
        return response.data;
    } catch (error) {
        throw new Error("Error al traer las rutinas asignadas por el entrenador");
    }
}

/* Entrenadores */
const getEntrenadores = async () => {
    try {
        const response = await apiClient.get('/usuarios/entrenadores');
        return response.data;
    } catch (error) {
        throw new Error("Error al obtener entrenadores");
    }
};

const addEntrenadorToClase = async (idClase, idEntrenador) => {
    try {
        const response = await apiClient.post(`/clase/${idClase}/entrenador/${idEntrenador}`)
    } catch (error) {
        throw new Error("Error al asignar entrenador a una clase");
    }
}

const getAllUsuarios = async () => {
    try {
        const response = await apiClient('/usuarios');
        return response.data;
    } catch (error) {
        throw new Error(`Error al obtener los usuarios`);
    }
}

const getUserById = async (id) => {
    try {
        const response = await apiClient.get(`/usuarios/${id}`);
        return response.data
    } catch (error) {
        throw new Error(`Error al obtener el usuario con ID ${id}`);
    }
}

const updateUserById = async (id, body) => {
    try {
        const response = await apiClient.put(`/usuarios/${id}`, body);
        return response.data
    } catch (error) {
        throw new Error(`Error al editar el usuario con ID ${id}`);
    }
}

// Contraseñas
const forgotPassword = async (body) => {
    try {
        const response = await apiClient.post('/auth/forgot-password', body);
        return response.data;
    } catch (error) {
        throw new Error(`Error al enviar mail para recuperar contraseña`);
    }
}

const resetPassword = async (body) => {
    try {
        const response = await apiClient.post('/auth/reset-password', body);
        return response.data;
    } catch (error) {
        throw new Error('Error al crear nueva contraseña');
    }
}

const changePassword = async (body) => {
    try {
        const response = await apiClient.put("/auth/change-password", body);
        return response.data;
    } catch (error) {
        throw new Error('Error al cambiar contraseña');
    }
}

// Medicion resultado
const getEjerciciosResultados = async () => {
    try {
        const response = await apiClient.get('/ejercicios-resultados');
        return response.data;
    } catch (err) {
        throw new Error("Error al traer ejercicios y resultados");
    }
}

const getEjerciciosResultadosUsuario = async (usuarioId) => {
    try {
        const response = await apiClient.get(`/ejercicios-resultados/usuario/${usuarioId}`);
        return response.data.ejercicios;
    } catch (err) {
        throw new Error("Error en el servicio getEjerciciosResultadosUsuario");
    }
}

// Ejercicio
const postEjercicio = async (body) => {
    try {
        const response = await apiClient.post(`/ejercicios-resultados`, body);
        return response;
    } catch (err) {
        throw new Error("Error en el servicio postEjercicio");
    }
}

const postEjercicioResultado = async (body) => {
    try {
        const response = await apiClient.post("/historicoEjercicio", body);
        return response.data;
    } catch (error) {
        throw new Error("Error en el servicio postEjercicioResultado");
    }
}

const deleteEjercicio = async (ejercicioId) => {
    try {
        const response = await apiClient.delete(`/ejercicios-resultados/${ejercicioId}`);
        return response.data;
    } catch (err) {
        throw new Error("Error en el servicio postEjercicio");
    }
}

// Admin dashboard
const getKPIs = async () => {
    try {
        const response = await apiClient.get("/admin/dashboard");
        return response.data;
    } catch (error) {
        throw new Error("Error en el servicio de getKPIs")
    }
}

// Admin planes
const getPlanes = async() => {
    try {
        const response = await apiClient.get("/planes");
        return response.data;
    } catch (error) {
        throw new Error("Error en el servicio de getPlanes")
    }
}

const postPlanes = async(body) => {
    try {
        const response = await apiClient.post("/planes", body);
        return response;
    } catch (error) {
        throw new Error("Error en el servicio de postPlanes")
    }
}

const deletePlanes = async(id) => {
    try {
        const response = await apiClient.delete(`/planes/${id}`);
        return response;
    } catch (error) {
        throw new Error("Error en el servicio de deletePlanes")
    }
}

const putPlanes = async(id, body) => {
    try {
        const response = await apiClient.put(`/planes/${id}`, body)
        return response.data;
    } catch (error) {
        throw new Error("Error en el servicio de putPlanes")
    }
}

// Cuotas
const postCuotasMasivas = async(body) => {
    try {
        const response = await apiClient.post("cuotas/generate-cuotas", body);
        return response;
    } catch (error) {
        throw new Error("Error en el servicio de postCuotasMasivas")
    }
}

// Ejercicios
const getEjercicios = async() => {
    try {
        const response = await apiClient.get("/ejercicios");
        return response.data;
    } catch (error) {
        throw new Error("Error en el servicio de getEjercicios")
    }
}

const postEjercicios = async(body) => {
    try {
        const response = await apiClient.post("/ejercicios", body);
        return response;
    } catch (error) {
        throw new Error("Error en el servicio de postEjercicios")
    }
}

const deleteEjercicios = async(id) => {
    try {
        const response = await apiClient.delete(`/ejercicios/${id}`);
        return response;
    } catch (error) {
        throw new Error("Error en el servicio de deleteEjercicios")
    }
}

const putEjercicios = async(id, body) => {
    try {
        const response = await apiClient.put(`/ejercicios/${id}`, body)
        return response.data;
    } catch (error) {
        throw new Error("Error en el servicio de putEjercicios")
    }
}

export default {
    // Clases
    getClases,
    // Turnos
    getTurnos,
    getTurnosUsuario,
    getTurnoById,
    postTurno,
    deleteTurno,
    // Rutinas
    getRutinas,
    getRutinaById,
    getUserRutinas,
    createRutina,
    editRutina,
    deleteRutina,
    getRutinasEntrenadores,
    // Entrenadores
    getEntrenadores,
    addEntrenadorToClase,
    // Usuario
    getAllUsuarios,
    getUserById,
    updateUserById,
    // Contraseña
    forgotPassword,
    resetPassword,
    changePassword,
    // Medicion resultado
    getEjerciciosResultados,
    getEjerciciosResultadosUsuario,
    postEjercicio,
    deleteEjercicio,
    postEjercicioResultado,
    // Admin dashboard
    getKPIs,
    // Planes
    getPlanes,
    postPlanes,
    deletePlanes,
    putPlanes,
    // Cuotas
    postCuotasMasivas,
    // Ejercicios
    getEjercicios,
    postEjercicios,
    putEjercicios,
    deleteEjercicios,
};
