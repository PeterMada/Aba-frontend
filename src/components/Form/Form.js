import React from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';


export default () => {
    return (
        <div>
            <Formik
                initialValues={{ jmeno: '', sprava: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.jmeno) {
                        errors.email = 'Required';
                    }

                    if (!values.sprava) {
                        errors.sprava = 'Req';
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <Field type='text' name='jmeno' placeholder='Jméno' />
                            <ErrorMessage name='jmeno' component="span" />
                        </div>
                        <div>
                            <Field type='text' name='sprava' as='textarea' placeholder='Správa' />
                            <ErrorMessage name='sprava' component='span' />
                        </div>
                        <button type='submit' disabled={isSubmitting}>
                            Odeslat
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
} 