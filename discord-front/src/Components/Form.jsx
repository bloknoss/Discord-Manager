import React, { useState } from "react";
import { FormCheck, FormGroup, FormLabel, FormText, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function AddForm() {
    const [formData, setFormData] = useState({
        bot_token: "",
        bot_name: "",
        bot_avatar: "",
        bot_prefix: "",
        bot_status: "",
        bot_auto: "",
        bot_run: "",
        user_id: "",
    });

    const sendFormData = async () => {
        console.log(formData);
        fetch("http://0.0.0.0:3001/api/form-data", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        }).then(function (response) {
            return response.text();
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="container mt-5 w-50">
            <h1>Bot Creation Form</h1>
            <Form>
                <FormGroup className="mb-3">
                    <FormLabel htmlFor="bot_token" className="form-label">
                        Token:
                    </FormLabel>
                    <input type="text" className="form-control" id="bot_token" name="bot_token" onChange={handleChange} />
                </FormGroup>

                <FormGroup className="mb-3">
                    <FormLabel htmlFor="bot_name" className="form-label">
                        Name:
                    </FormLabel>
                    <input type="text" className="form-control" id="bot_name" name="bot_name" onChange={handleChange} />
                </FormGroup>

                <FormGroup className="mb-3">
                    <FormLabel htmlFor="bot_avatar" className="form-label">
                        Avatar:
                    </FormLabel>
                    <input type="text" className="form-control" id="bot_avatar" name="bot_avatar" onChange={handleChange} />
                </FormGroup>

                <FormGroup className="mb-3">
                    <FormLabel htmlFor="bot_prefix" className="form-label">
                        Prefix:
                    </FormLabel>
                    <input type="text" className="form-control" id="bot_prefix" name="bot_prefix" onChange={handleChange} />
                </FormGroup>

                <FormGroup className="mb-3">
                    <FormLabel htmlFor="bot_status" className="form-label">
                        Status:
                    </FormLabel>
                    <input type="text" className="form-control" id="bot_status" name="bot_status" onChange={handleChange} />
                </FormGroup>

                <FormGroup className="mb-3">
                    <FormLabel htmlFor="user_id" className="form-label">
                        User ID:
                    </FormLabel>
                    <input type="text" className="form-control" id="user_id" name="user_id" onChange={handleChange} />
                </FormGroup>
                <h4>Extra Settings</h4>
                <div key={`bot_settings`} className="mb-3">
                    <Form.Check // prettier-ignore
                        inline
                        type="switch"
                        name="bot_run"
                        label="Run"
                    />

                    <Form.Check // prettier-ignore
                        inline
                        type="switch"
                        name="bot_auto"
                        id={`bot_auto`}
                        label={`Auto`}
                    />
                </div>

                <Button type="button" className="btn btn-primary" onClick={sendFormData}>
                    Enviar
                </Button>
            </Form>
        </div>
    );
}

export default AddForm;
