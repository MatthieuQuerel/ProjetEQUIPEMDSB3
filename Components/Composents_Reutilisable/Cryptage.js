// import bcrypt from 'bcryptjs';
// const saltRounds = 10; // Vous pouvez ajuster cette valeur selon vos besoins

// export const crypte = async (Text_Hash) => {
//     try {
//         if (typeof Text_Hash !== 'string' || Text_Hash.length === 0) {
//             throw new Error('Le mot de passe n\'est pas une chaîne de caractères valide');
//         }
//         console.log("Text_Hash:", Text_Hash);
//         console.log("saltRounds:", saltRounds);

//         const hash = await bcrypt.hash(Text_Hash, saltRounds);
//         console.log(hash)
//         return hash;
//     } catch (error) {
//         console.error("Erreur lors du cryptage du mot de passe :", error);
//         throw error;
//     }
// };


// export const comparer = async (plainTextPassword, hashedPassword) => {
//     try {
//         const match = await bcrypt.compare(plainTextPassword, hashedPassword);
//         return match;
//     } catch (error) {
//         console.error('Erreur lors de la comparaison des mots de passe :', error);
//         throw error;
//     }
// };

// // module.exports = {
// //     crypte,
// //     comparer
// // };
