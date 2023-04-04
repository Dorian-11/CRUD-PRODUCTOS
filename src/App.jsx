import { useEffect, useState } from 'react'
import './App.css'
import ProductsForm from './components/ProductsForm'
import UserList from './components/UserList'
import axios from 'axios'
/* Para eliminar los datos */
import WarningDelete from './components/WarningDelete'

function App() {

  const [usersList, setUsersList] = useState([])
  const [userSelected, setUserSelected] = useState(null)
  const [form, setForm] = useState(false)
  const [alert, setAlert] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = () => {
    axios
    /* Api  */
      .get(`https://users-crud.academlo.tech/users/`)
      .then(res => setUsersList(res.data))
  }








  const selectUser = (user) => {
    getForm()
    setUserSelected(user)
  }

//Constante de peligro
  const warning = (user) => {
    setAlert(true)
    setUserToDelete(user)
  }
  
// Constante de eliminar 
  const deleteUser = (user) => {
    axios
      .delete(`https://users-crud.academlo.tech/users/${user.id}/`)
      .then(() => getUsers());

    setAlert(false)
  };
  const cancelDelete = () => {
    setUserToDelete(null)
    setAlert(false)
  }

//Cerrar Formulario
  const getForm = () => {
    setForm(true)
  }
  const closeForm = () => {
    setForm(false)
    setUserSelected(null)
  }


  return (
    <div className="App">
      {form &&
        <ProductsForm
          getUsers={getUsers}
          userSelected={userSelected}
          setUserSelected={setUserSelected}
          closeForm={closeForm}
        />}
      <UserList
        usersList={usersList}
        selectUser={selectUser}
        getForm={getForm}
        warning={warning} />
      <WarningDelete
        alert={alert}
        userToDelete={userToDelete}
        deleteUser={deleteUser}
        cancelDelete={cancelDelete}
      />
      <footer><p>Creado por : <strong>Dorian Sánchez </strong> |  Academlo</p></footer>
    </div>
  )
}

export default App