import { registerAs } from "@nestjs/config";

// const loadConfig = () => {
//     const { env } = process;
//     return {
//         db: {
//             host: env.TYPEORM_HOST,
//             port: parseInt(env.TYPEORM_PORT, 10),
//             username: env.TYPEORM_USERNAME,
//             password: env.TYPEORM_PASSWORD,
//             database: env.TYPEORM_DATABASE,
//             synchronize: env.TYPEORM_DATABASE === "true",
//         }
//     }
// }
export default registerAs('database', () => {
    const { env } = process;
    return {
        host: env.TYPEORM_HOST,
        port: parseInt(env.TYPEORM_PORT, 10),
        username: env.TYPEORM_USERNAME,
        password: env.TYPEORM_PASSWORD,
        database: env.TYPEORM_DATABASE,
        synchronize: env.TYPEORM_DATABASE === "true",

    }
})