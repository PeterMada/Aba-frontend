import React, { useState } from 'react';
//import { Formik, Form, Field, ErrorMessage } from 'formik';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import cS from './Form.module.scss';



export default ({ personId }) => {
    const [message, setMessage] = useState(false);
    const succesfulMessage = <span className={cS.good}>Formulář byl úspěšně odeslán.</span>
    const errorMessage = <span className={cS.bad}>Nastala chyba, zkuste to prosím později.</span>



    const personClearId = personId ? personId.replace('Therapists_', '') : '';
    console.log(personClearId);

    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }

    /*
        <GoogleReCaptchaProvider
            reCaptchaKey='6LcnEToaAAAAAEVEqWaLisSesGREwWpKkJiO-OFu'
            language='cs'
        >
        
        </GoogleReCaptchaProvider >
    */

    return (
        <form name={`contact-form-${personId}`} method="post" data-netlify="true">
            <div class="field">
                <label>Nom *</label>
                <div class="control">
                    <input type="text" class="input is-medium" placeholder="Nom" name="firstname" required />
                </div>
            </div>
            <div class="field">
                <label>Prénom *</label>
                <div class="control">
                    <input type="text" class="input is-medium" placeholder="Prénom" name="lastname" required />
                </div>
            </div>
            <div class="field">
                <label>Adresse email *</label>
                <div class="control">
                    <input type="mail" class="input is-medium" placeholder="Adresse email" name="email" required />
                </div>
            </div>
            <div class="field">
                <label>Téléphone</label>
                <div class="control">
                    <input type="tel" class="input is-medium" placeholder="Téléphone" name="phone" minlength="10" />
                </div>
            </div>
            <input type="submit" class="button is-fullwidth secondary-btn is-rounded" value="Commencer" />
        </form>
    );


    // @TODO #5 @PeterMada

}