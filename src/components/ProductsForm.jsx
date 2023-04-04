import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"


const ProductsForm = ({ getUsers, userSelected, setUserSelected, closeForm }) => {

    const { handleSubmit, register, reset } = useForm();
    const [isVisible, setIsVisible] = useState(false)
    const inputNull = { first_name: "", last_name: "", email: "", password: "", brithday: "" };

    /* useEffect */

    useEffect(() => {
        if (userSelected) {
            reset(userSelected);
        } else {
            reset(inputNull);
        }
    }, [userSelected]);

    /* Constante submit */

    const submit = (data) => {
        status()
        if (userSelected) {
            axios
                .put(`https://users-crud.academlo.tech/users/${userSelected.id}/`, data)
                .then(() => {
                    getUsers()
                });
        } else {
            axios
                .post("https://users-crud.academlo.tech/users/", data)
                .then(() => {
                    getUsers();
                    reset(inputNull);
                });
        }
    };


//Constante Status 
    const status = () => {
        setIsVisible(true)
        setTimeout(() => {
            setIsVisible(false)
            setUserSelected(null)
            closeForm()
        }, 1500)
    }

    return (
        <div className='container__form'>
            <div className='card__form'>
                <div className='border__form'>
                    <i onClick={() => closeForm()} className='bx bxs-x-circle bx-md'></i>
                    <h2>Ingrese los Datos</h2>
                    {isVisible ?
                        <div className='status'>
                            <h3>{userSelected ? "Actualizando" : "Nuevo Usuario creado"}</h3>
                            <i className='bx bxs-check-circle bx-burst bx-lg' ></i>
                        </div> : 
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="input-container_m">
                            <label htmlFor="first_name"><i className='bx bx-user bx-sm'></i></label>
                            <div className='container_name'>
                                <input required type="text" id="first_name" placeholder='Nombre' {...register("first_name")} />
                                <input required type="text" id="last_name" placeholder='Apellido' {...register("last_name")} />
                            </div>

                            {/* INPUTS */}
                        </div>
                        {/* Email */}
                        <div className="input-container">
                            <label htmlFor="email"><i className='bx bx-envelope bx-sm'></i></label>
                            <input required type="email" id="email" placeholder='Correo electrónico' {...register("email")} />
                        </div>
                        {/* Contraseña */}
                        <div className="input-container">
                            <label htmlFor="password"><i className='bx bx-lock-alt bx-sm' ></i></label>
                            <input required type="password" id="password" placeholder='Contraseña' {...register("password")} />
                        </div>
                        {/* Fecha de cumpleaños */}
                        <div className="input-container">
                            <label htmlFor="birthday"><i className='bx bx-cake bx-sm'></i></label>
                            <input required type="date" id="birthday" {...register("birthday")} />
                        </div>

                        {/* Precio */}
                        <div className="input-container">
                            <label htmlFor="price"><i className='bx bx-dollar '></i></label>
                            <input required type="text" id="price" {...register("price")} />
                        </div>
                    
                        {/* De seleccionar */}
                        <div className="input-container">
                            <label htmlFor="isAvailable"><i className='bx bx-square'></i></label>
                            <input required type="radio" id="price" {...register("isAvailable")} />
                        </div>

                        <button className='btn__form'>{userSelected ? "Actualizar usuario" : "Nuevo usuario"}</button>
                    </form>
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductsForm;