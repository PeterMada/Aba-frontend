import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import cS from './Form.module.scss';

export default ({ personId }) => {
    const [message, setMessage] = useState(false);
    const succesfulMessage = <span className={cS.good}>Formulář byl úspěšně odeslán.</span>
    const errorMessage = <span className={cS.bad}>Nastala chyba, zkuste to prosím později.</span>



    const personClearId = personId ? personId.replace('Therapists_', '') : '';
    console.log(personClearId);


    // @TODO #5 @PeterMada
    return (

        <GoogleReCaptchaProvider
            reCaptchaKey='6LcnEToaAAAAAEVEqWaLisSesGREwWpKkJiO-OFu'
            language='cs'
        >

            <div>
                <div className={cS.message}>{message}</div>
                <Formik
                    initialValues={{ Jmeno: '', Text: '', Email: '', Interest: 'Terapie_Supervize', therapist: personClearId }}
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
                        console.log(updateValues);

                        const apiUrlFirstPart = process.env.GATSBY_API_URL;


                        fetch(`${apiUrlFirstPart}/emails`, {
                            method: 'POST',
                            body: subitJson,
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8'
                            }
                        }).then(function (response) {
                            if (response.ok) {
                                setMessage(succesfulMessage);
                            }
                        }).catch(function (error) {
                            setMessage(errorMessage);
                        });


                        fetch('/', {
                            method: 'POST',
                            headers: { "Content-Type": "application/x-www-form-urlencoded" },
                            body: new URLSearchParams(updateValues).toString()
                        }).then(() => console.log('Form successfully submitted')).catch((error) =>
                            alert(error))

                        actions.setSubmitting(false);
                        actions.resetForm({ Jmeno: '', Text: '', Email: '', Interest: 'Terapie_Supervize', therapist: personClearId });
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className={cS.wrap} data-netlify="true" name={`contact-form-${personId}`}>
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
                            <Field type='hidden' name='therapist' value={personClearId} />
                            <div className={cS.buttonWrap}>
                                <button type='submit' disabled={isSubmitting} className={cS.button}>
                                    Odeslat
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </GoogleReCaptchaProvider>
    );
}