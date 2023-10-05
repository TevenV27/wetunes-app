import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import '../stylesheet/editprofile-style.css';

export default function EditProfile(props) {

    const [open, setOpen] = useState(props.handleOpen);
    
    const [userData, setUserData] = useState({
        Nombre: props.data.firstname,
        Apellido: props.data.lastname,
        Correo: props.data.email,
        Avatar: props.data.avataruser
    });
    
    
    const [editableFields, setEditableFields] = useState({
        Nombre: { value: userData.Nombre, isEditing: false },
        Apellido: { value: userData.Apellido, isEditing: false },
        Correo: { value: userData.Correo, isEditing: false },
    });

    const handleClose = () => {
        props.closeModal(false);
    };

    const enableEdit = (fieldName) => {
        const updatedEditableFields = { ...editableFields };
        updatedEditableFields[fieldName].isEditing = true;
        setEditableFields(updatedEditableFields);
    };

    return (
        <Modal className="modal-container" open={open} onClose={handleClose}>
            <Box className="box-container">
                <div className="user-edit-panel">
                    <div className='avatar-change-container'>
                        <div className='img-box'>
                            <img className='img-user' src={`https://wetunes-api.onrender.com/images/${userData.Avatar}`} alt='user' />
                        </div>
                        <button className='b-change-avatar'>Cambiar</button>
                    </div>
                    <div className="grid">
                        {Object.entries(editableFields).map(([fieldName, fieldData]) => (
                            <div className="grid-item" style={{ gridColumn: '1 / span 2' }} key={fieldName}>
                                <label htmlFor={fieldName}>{fieldName}:</label>
                                <div className="input-container">
                                    <input
                                        className='inputs-data'
                                        type="text"
                                        name={fieldName}
                                        id={fieldName}
                                        readOnly={!fieldData.isEditing} // Use readOnly
                                        value={fieldData.value}
                                        onChange={(e) => {
                                            if (fieldData.isEditing) {
                                                const updatedEditableFields = { ...editableFields };
                                                updatedEditableFields[fieldName].value = e.target.value;
                                                setEditableFields(updatedEditableFields);
                                            }
                                        }}
                                    />
                                    {fieldData.isEditing ? (
                                        <button className='b-data' onClick={() => enableEdit(fieldName)}>Guardar</button>
                                    ) : (
                                        <button className='b-data' onClick={() => enableEdit(fieldName)}>Editar</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Box>
        </Modal>
    );
}
