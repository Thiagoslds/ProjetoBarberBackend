export default{
    jwt: {
        secret: process.env.APP_SECRET || 'default', /*pode ser nula, tira erro do secret*/
        expiresIn: '1d'
    }
}