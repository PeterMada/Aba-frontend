import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import cS from './Form.module.scss';

export default () => {
    const [message, setMessage] = useState(false);
    const succesfulMessage = <span className={cS.good}>Formulář byl úspěšně odeslán.</span>
    const errorMessage = <span className={cS.bad}>Nastala chyba, zkuste to prosím později.</span>

    return (
        <div>
            <div className={cS.message}>{message}</div>
            <Formik
                initialValues={{ Jmeno: '', Text: '', Email: '', Interest: 'Terapie_Supervize' }}
                validate={values => {
                    const errors = {};
                    if (!values.Jmeno) {
                        errors.Jmeno = 'Vyplňte prosím vaše jméno a příjmení.';
                    }

                    if (!values.Text) {
                        errors.Text = 'Toto pole nemůže být prázdné.';
                    }

                    if (!values.Email) {
                        errors.Email = 'Toto pole nemůže být prázdné.';
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)) {
                        errors.Email = 'Nesprávný formát emailu.';
                    }

                    return errors;
                }}

                onSubmit={(values, actions) => {
                    const Url = window.location.pathname;
                    const updateValues = { ...values, Url };
                    const subitJson = JSON.stringify(updateValues, null, 2);

                    fetch(`${process.env.GATSBY_API_URL}/emails`, {
                        method: 'POST',
                        body: subitJson,
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8' // The type of data you're sending
                        }
                    }).then(function (response) {
                        if (response.ok) {
                            setMessage(succesfulMessage);
                        }
                    }).catch(function (error) {
                        setMessage(errorMessage);
                    });

                    actions.setSubmitting(false);
                    actions.resetForm({ Jmeno: '', Text: '', Email: '', Interest: 'Terapie_Supervize' });
                }}
            >
                {({ isSubmitting }) => (
                    <Form className={cS.wrap}>
                        <div className={`${cS.row} ${cS.rowHalf}`}>
                            <label htmlFor="Jmeno" className={cS.label}>Jméno</label>
                            <Field type='text' name='Jmeno' className={cS.input} />
                            <ErrorMessage name='Jmeno' component="span" className={cS.error} />
                        </div>
                        <div className={`${cS.row} ${cS.rowHalf}`}>
                            <label htmlFor="Email" className={cS.label}>Email</label>
                            <Field type='email' name='Email' className={cS.input} />
                            <ErrorMessage name='Email' component="span" className={cS.error} />
                        </div>
                        <div className={`${cS.row} ${cS.rowHalf}`}>
                            <label htmlFor="Interest" className={cS.label}>Mám zájem o</label>
                            <Field name="Interest" as="select" className={`${cS.input} ${cS.select}`}>
                                <option value="Terapie_Supervize">Terapie/Supervize</option>
                                <option value="Jine">Jiné</option>
                            </Field>
                        </div>
                        <div className={cS.row}>
                            <label htmlFor="Text" className={cS.label}>Zpráva</label>
                            <Field type='text' name='Text' as='textarea' className={`${cS.input} ${cS.textArea}`} />
                            <ErrorMessage name='Text' component='span' className={cS.error} />
                        </div>
                        <div className={cS.buttonWrap}>
                            <button type='submit' disabled={isSubmitting} className={cS.button}>
                                Odeslat
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
} 