import { Amplify } from 'aws-amplify';
import * as auth from '@aws-amplify/auth';

export default defineNuxtPlugin(({$config}) => {

    Amplify.configure({
        Auth: {
            Cognito: {
                userPoolId: $config.public.userPoolId,
                userPoolClientId: $config.public.userPoolClientId,
            }
        }
    })

    return {
        provide: {
            auth: auth
        }
    }

})
