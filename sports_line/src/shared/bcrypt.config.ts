import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10; // Define el número de rondas de sal. / 

// Función para hashear el txto plano. / 
export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, SALT_ROUNDS);
};

// Función para comparar la contraseña ingresada con el hash almacenado. / 
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};
