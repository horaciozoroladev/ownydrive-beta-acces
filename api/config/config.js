export const CONFIG = {
    PORT: process.env.PORT || '3000',
    JWT_KEY: process.env.JWT_KEY || 'testKey',
    EXTERNAL_API: process.env.EXTERNAL_API || 'https://jsonplaceholder.typicode.com/',
    ROUTES: process.env.ROUTES || [
        'albums',
        'comments',
        'custom',
        'posts',
        'todos',
        'users',
    ],
    TOKEN_EXP_TIME: process.env.TOKEN_EXP_TIME || 1,
    TOKEN_EXP_TYPE: process.env.TOKEN_EXP_TYPE || 'h',
}