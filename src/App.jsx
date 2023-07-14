// Objetivo: archivo principal de la aplicación, se encarga de definir las rutas y los layouts de la aplicación

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthLayout from './layouts/AuthLayout.jsx';
import RutaProtegida from './layouts/RutaProtegida.jsx';
import Login from './pages/Login.jsx';
import Registrar from './pages/Registrar.jsx';
import OlvidePassword from './pages/OlvidePassword.jsx';
import NuevoPassword from './pages/NuevoPassword.jsx';
import ConfirmarCuenta from './pages/ConfirmarCuenta.jsx';
import Proyectos from './pages/Proyectos.jsx';
import NuevoProyecto from './pages/NuevoProyecto.jsx';
import Proyecto from './pages/Proyecto.jsx';
import EditarProyecto from './pages/EditarProyecto.jsx';
import NuevoColaborador from './pages/NuevoColaborador.jsx';

import { AuthProvider } from './context/AuthProvider.jsx';
import { ProyectosProvider } from './context/ProyectosProvider.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ProyectosProvider>
            <Routes>
              {/* Rutas de autenticación o publicas */}
              <Route path='/' element={<AuthLayout />}>
                <Route index element={<Login />} />
                <Route path='registrar' element={<Registrar />} />
                <Route path='olvide-password' element={<OlvidePassword />} />
                <Route
                  path='olvide-password/:token'
                  element={<NuevoPassword />}
                />
                <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
              </Route>

              {/* Rutas protegidas */}
              <Route path='/proyectos' element={<RutaProtegida />}>
                <Route index element={<Proyectos />} />
                <Route path='crear-proyecto' element={<NuevoProyecto />} />
                <Route
                  path='nuevo-colaborador/:id'
                  element={<NuevoColaborador />}
                />
                <Route path=':id' element={<Proyecto />} />
                <Route path='editar/:id' element={<EditarProyecto />} />
              </Route>
            </Routes>
          </ProyectosProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
