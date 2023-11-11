import React, { useState } from "react";
import { FormGroup, FormLabel, Button, FormCheck } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ModalMessage from "./ModalMessage";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

function AddForm() {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        bot_token: "",
        bot_name: "",
        bot_avatar: "",
        bot_prefix: "",
        bot_status: "",
        user_id: "",
        bot_run: false,
        bot_auto: false,
    });

    const handleModalShow = () => {
        setShow(true);
    };
    const handleModalHide = () => {
        setShow(false);
    };

    const sendFormData = async () => {
        if (validateData(formData)) {
            fetch("http://localhost:3001/api/form-data", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }).then(function (response) {
                return response.text();
            });
        } else {
            handleModalShow();
        }
    };

    const validateData = () => {
        const discordTokenRegex = /([\w]{3})?[\w-]{24}\.[\w-]{6}\.[\w-]{27}[\w]+/;
        for (let key in formData) {
            if (formData[key].toString() == "") return false;
        }

        return discordTokenRegex.test(formData["bot_token"]);
    };

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        let finalValue = e.target.type == "checkbox" ? checked : value;
        setFormData({ ...formData, [name]: finalValue });
    };

    return (
        <>
            <ModalMessage
                modalTitle={"Error en la validación."}
                modalContent={"Los campos del formulario no se han introducido correctamente."}
                handleClose={handleModalHide}
                isShown={show}
            />
            <div className="container mt-5 w-50 ">
                <h1>Bot Creation Form</h1>
                <Form>
                    <FormGroup className="mb-3">
                        <FormLabel htmlFor="bot_token" className="form-label">
                            Token:
                        </FormLabel>
                        <input type="text" className="form-control" id="bot_token" name="bot_token" onChange={handleChange} required />
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <FormLabel htmlFor="bot_name" className="form-label">
                            Name:
                        </FormLabel>
                        <input type="text" className="form-control" id="bot_name" name="bot_name" onChange={handleChange} required />
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <FormLabel htmlFor="bot_avatar" className="form-label">
                            Avatar:
                        </FormLabel>
                        <input type="text" className="form-control" id="bot_avatar" name="bot_avatar" onChange={handleChange} required />
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <FormLabel htmlFor="bot_prefix" className="form-label">
                            Prefix:
                        </FormLabel>
                        <input type="text" className="form-control" id="bot_prefix" name="bot_prefix" onChange={handleChange} required />
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <FormLabel htmlFor="bot_status" className="form-label">
                            Status:
                        </FormLabel>
                        <input type="text" className="form-control" id="bot_status" name="bot_status" onChange={handleChange} required />
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <FormLabel htmlFor="user_id" className="form-label">
                            User ID:
                        </FormLabel>
                        <input type="text" className="form-control" id="user_id" name="user_id" onChange={handleChange} required />
                    </FormGroup>
                    <div key={`bot_settings`} className="mb-3 text-center">
                        <h4>Extra Settings</h4>
                        <Form.Check // prettier-ignore
                            inline
                            onChange={handleChange}
                            type="switch"
                            name="bot_run"
                            label="Run"
                        />

                        <Form.Check // prettier-ignore
                            inline
                            onChange={handleChange}
                            type="switch"
                            name="bot_auto"
                            id={`bot_auto`}
                            label={`Auto`}
                        />
                    </div>

                    <Button type="button" className="btn btn-primary w-100" onClick={sendFormData}>
                        Enviar
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default AddForm;
