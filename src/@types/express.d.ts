import { ICard, IJWTPayload } from "./@types";

declare global {
    namespace Express {
        interface Request {
            payload?: IJWTPayload,
        }
    }
}

// declare global {
//     namespace Express {
//         interface Request {
//             payload2?: ICard
//         }
//     }
// }