import { Amplify } from 'aws-amplify';

export default defineNuxtPlugin(({$config}) => {

    Amplify.configure({
        Auth: {
            Cognito: {
                userPoolId: $config.public.userPoolId,
                userPoolClientId: $config.public.userPoolClientId,
            }
        }
    })

})
