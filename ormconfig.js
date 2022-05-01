module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'test',
    password: 'test',
    database: 'trellotest',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
};