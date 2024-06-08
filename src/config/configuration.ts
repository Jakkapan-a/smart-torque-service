export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        type: 'sqlite',
        database: 'db.sqlite',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        // logging: true,
    },
});
